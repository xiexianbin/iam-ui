// Copyright 2022 me@xiexianbin.cn. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page padding>
    <div class="row page-wrapper justify-center q-pa-md">
      <div class="col q-pb-md" v-if="msg !== ''">
        <q-card class="col-sm-10 col-md-4 card-width">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs text-negative">Errors</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div>
              <span class="text-negative">{{ msg }}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar'
import * as AuthBackend from 'src/auth/AuthBackend'
import * as Setting from 'src/Setting'
import * as Util from 'src/auth/Util'

export default defineComponent({
  name: 'CallBack',
  setup() {
    const $q = useQuasar()
    const msg = ref('');

    $q.loading.show({
      message: 'Logging...',
    });

    function getInnerParams() {
      // For example, for Casbin-OA, realRedirectUri = 'http://localhost:9000/login'
      // realRedirectUrl = 'http://localhost:9000'
      const params = new URLSearchParams(window.location.search);
      const state = params.get('state');
      const queryString = Util.stateToGetQueryParams(state);
      return new URLSearchParams(queryString);
    };

    function getResponseType() {
      // 'http://localhost:8000'
      const authServerUrl = Setting.ServerUrl;

      const innerParams = getInnerParams();
      const method = innerParams.get('method');
      if (method === 'signup') {
        const realRedirectUri = innerParams.get('redirect_uri');
        // Casdoor's own login page, so 'code' is not necessary
        if (realRedirectUri === null) {
          const samlRequest = innerParams.get('SAMLRequest');
          if (samlRequest !== null && samlRequest !== undefined && samlRequest !== '') {
            return 'saml'
          }
          return 'login';
        }

        const realRedirectUrl = new URL(realRedirectUri).origin;
        console.log('xiexianbin, need to update authServerUrl:', authServerUrl, '-, realRedirectUrl:', realRedirectUrl)

        // For Casdoor itself, we use 'login' directly
        if (authServerUrl === realRedirectUrl) {
          return 'login';
        } else {
          const responseType = innerParams.get('response_type');
          if (responseType !== null) {
            return responseType
          }
          return 'code';
        }
      } else if (method === 'link') {
        return 'link';
      } else {
        return 'unknown';
      }
    }

    onMounted(() => {
      const params = new URLSearchParams(window.location.search);
      let isSteam = params.get('openid.mode')
      let code = params.get('code');
      // WeCom returns 'auth_code=xxx' instead of 'code=xxx'
      if (code === null) {
        code = params.get('auth_code');
      }
      // Dingtalk now  returns 'authCode=xxx' instead of 'code=xxx'
      if (code === null) {
        code = params.get('authCode')
      }
      // Steam don't use code, so we should use all params as code.
      if (isSteam !== null && code === null) {
        code = window.location.search
      }

      const innerParams = getInnerParams();
      const applicationName = innerParams.get('application');
      const providerName = innerParams.get('provider');
      const method = innerParams.get('method');
      const samlRequest = innerParams.get('SAMLRequest');

      let redirectUri = `${window.location.origin}/callback`;

      const body = {
        type: getResponseType(),
        application: applicationName,
        provider: providerName,
        code: code,
        samlRequest: samlRequest,
        // state: innerParams.get('state'),
        state: applicationName,
        redirectUri: redirectUri,
        method: method,
      };
      const oAuthParams = Util.getOAuthGetParameters(innerParams);
      const concatChar = oAuthParams?.redirectUri?.includes('?') ? '&' : '?';
      void AuthBackend.login(body, oAuthParams)
        .then((res) => {
          if (res.status === 'ok') {
            const responseType = getResponseType();
            if (responseType === 'login') {
              Util.showMessage('success', 'Signin successfully')

              const link = Setting.getFromLink();
              Setting.goToLink(link);
            } else if (responseType === 'code') {
              const code = String(res.data);
              Setting.goToLink(`${oAuthParams.redirectUri}${concatChar}code=${code}&state=${oAuthParams.state}`);
              // Util.showMessage('success', `Authorization code: ${res.data}`);
            } else if (responseType === 'token' || responseType === 'id_token'){
              const token = String(res.data);
              Setting.goToLink(`${oAuthParams.redirectUri}${concatChar}${responseType}=${token}&state=${oAuthParams.state}&token_type=bearer`);
            } else if (responseType === 'link') {
              const from = innerParams.get('from');
              Setting.goToLinkSoft(null, from);
            } else if (responseType === 'saml') {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const SAMLResponse = res.data;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const redirectUri = res.data2;
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              Setting.goToLink(`${redirectUri}?SAMLResponse=${encodeURIComponent(SAMLResponse)}&RelayState=${oAuthParams.relayState}`);
            }
          } else {
            $q.loading.hide()
            Util.showMessage('warning', res.msg)
            msg.value = res.msg
          }
        });
    });

    return {
      msg,
    }
  },
})
</script>
