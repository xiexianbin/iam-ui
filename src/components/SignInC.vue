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

<template>
  <div class="row justify-center items-center q-pa-md">

    <div class="column items-center">
      <div class="col q-pb-md">
        <q-card class="col-sm-10 col-md-4 card-width" v-if="signedInBox">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Continue with</div>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <div>
              <!-- -{{account}}- <br>
              -{{account.data.name}}- <br>
              -{{account.data.name ? account.data !== undefined : 'abc'}}- <br>
              <br>
              -{{accountRef}}- <br>
              -{{accountRef.value ? accountRef.value !== undefined : ''}}- <br> -->
              <q-btn
                v-bind:label="'Sign in with ' + account.data.name + '(' + account.data.displayName + ')'"
                type="button"
                color="primary"
                :loading="submitLoading"
                @click="onReSignin()"
              />
            </div>
            <q-separator class="q-my-md" />
            <div>
              <span>Or sign in with another account</span>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col q-pb-md" v-if="msg === ''">
        <q-card class="col-sm-10 col-md-4 card-width">
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">Sign in</div>
          </q-card-section>

          <q-separator v-if="applicationRef.enablePassword" />
          <q-card-section>
            <q-form @submit="onSignin" class="q-gutter-md" v-if="applicationRef.enablePassword">
              <q-input
                v-model="username"
                label="Email *"
                type="model.email"
                hint="Email Address is login Account"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please Input Email Address',
                ]"
              />

              <q-input
                v-model="password"
                label="Password *"
                :type="isPassword ? 'password' : 'text'"
                hint="Pleast input your Password"
                :rules="[
                  (val) =>
                    (val && val !== '' && val.length >= 6) ||
                    'Please Password must more then 6',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPassword = !isPassword"
                  />
                </template>
              </q-input>

              <q-toggle
                v-model="agreement"
                label="I accept the license and terms"
              />

              <div>
                <q-btn
                  label="Sign in"
                  type="submit"
                  color="primary"
                  :loading="submitLoading"
                />
                No account yet?
                <router-link class="text-primary" to="/signup" :disabled="!applicationRef.enableSignUp">
                  Signup
                </router-link>
              </div>
              <div>
                <router-link class="text-primary" to="/forgot">
                  Forgot password?
                </router-link>
              </div>
            </q-form>
            <q-separator class="q-my-md" />
            <div class="q-gutter-md q-gutter-sm" v-for="(k, i) in applicationRef.providers" :key="i">
              <q-btn
                round
                class="q-my-md"
                :color="thirdPartLogo[k.provider.type].color"
                :icon="thirdPartLogo[k.provider.type].icon"
                size="sm"
                type="a"
                v-if='k.provider.category === "OAuth"' :key='k.provider.clientId'
                :href='getAuthUrl(applicationRef, k.provider, "signup")'
              />
              <a v-else-if='k.provider.category === "SAML"'>
                SAML
              </a>
              <a v-else-if="getAuthUrl(applicationRef, k.provider, 'signup') !== ''" :href='getAuthUrl(applicationRef, k.provider, "signup")'>
                {{k.provider.name}}
              </a>
            </div>
          </q-card-section>
        </q-card>
      </div>

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
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, ref, reactive } from 'vue';
import { useQuasar } from 'quasar'

import * as ApplicationBackend from 'src/backend/ApplicationBackend'
import * as AuthBackend from 'src/auth/AuthBackend'
import * as Setting from 'src/Setting'
import * as Util from 'src/auth/Util'
import { getAuthUrl } from 'src/auth/Provider';
import { IAccount, IResponse } from './models/account';
import { IApplication } from 'src/components/models/application';

export default defineComponent({
  name: 'SignInC',
  props: {
    applicationName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    account: {
      type: Object as PropType<IAccount>,
      default: {} as IAccount,
      required: true,
    }
  },
  setup(props) {
    const $q = useQuasar()

    const submitLoading = ref(false);
    const isPassword = ref(true);

    let type = ref(props.type);
    const typeRef = ref(type);
    let applicationName = ref(props.applicationName);
    const owner = 'admin';
    let application: IApplication = {} as IApplication;
    let applicationRef = ref<IApplication>(application);
    let mode = ref(props.mode);
    const accountRef = ref(props.account);
    const signedInBox = ref(false);
    const isCodeSignin = false;
    const msg = ref('');
    const username = ref('');
    const password = ref('');
    const validEmailOrPhone = false;
    const validEmail = false;
    const validPhone = false;
    const agreement = ref(false);

    async function getApplicationLogin() {
      const oAuthParams = Util.getOAuthGetParameters(undefined)
      void await AuthBackend.getApplicationLogin(oAuthParams).then(res => {
        if (res.name !== '') {
          application = res as IApplication
          applicationRef.value = reactive(res as IApplication)
        } else {
          res = res as IResponse
          Util.showMessage('error', res.msg);
          application = res.data as IApplication
          applicationRef.value = reactive(res.data as IApplication)
          msg.value = res.msg
        }
      })
    }

    async function getApplication() {
      if (applicationName.value === null) {
        return
      }

      void await ApplicationBackend.getApplication('admin', applicationName.value).then(
        app => {
          application = app
          applicationRef.value = reactive(app)
        }
      )
    }

    function getApplicationObj() {
      // need rewrite
      if (application !== undefined) {
        return application
      } else {
        return application
      }
    }

    // function onUpdateAccount(account: string) {
    //   onUpdateAccount(account)
    // }

    function onFinish(values: Record<string, unknown>) {
      const application = getApplicationObj()

      //here we are supposed to judge whether casdoor is working as a oauth server or CAS server
      if (type.value === 'cas') {
        //cas
        // const casParams = Util.getCasParameters()
        // values['type'] = this.type
        // void AuthBackend.loginCas(values, casParams).then(res => {
        //   if (res.status === 'ok') {
        //     let msg = 'Logged in successfully.'

        //     if (casParams.service === '') {
        //       //If service was not specified, CAS MUST display a message notifying the client that it has successfully initiated a single sign-on session.
        //       msg += 'Now you can visit apps protected by casdoor.'
        //     }

        //     Util.showMessage('success', msg)

        //     if (casParams.service !== '') {
        //       let st = res.data
        //       window.location.href = casParams.service + '?ticket=' + st
        //     }
        //   } else {
        //     Util.showMessage('error', `Failed to log in: ${res.msg}`)
        //   }
        // })
      } else {
        //oauth
        const oAuthParams = Util.getOAuthGetParameters(undefined)

        if (
          oAuthParams !== null &&
          oAuthParams.responseType != null &&
          oAuthParams.responseType !== ''
        ) {
          values['type'] = oAuthParams.responseType
        } else {
          values['type'] = type.value
        }

        values['phonePrefix'] =
          getApplicationObj()?.organizationObj.phonePrefix

        if (oAuthParams !== null) {
          values['samlRequest'] = oAuthParams.samlRequest
        }

        if (values['samlRequest'] != null && values['samlRequest'] !== '') {
          values['type'] = 'saml'
        }

        void AuthBackend.login(values, oAuthParams).then(res => {
          if (res.status === 'ok') {
            const responseType = values['type']

            if (responseType === 'login') {
              Util.showMessage('success', 'Logged in successfully')
              const link = Setting.getFromLink()
              Setting.goToLink(link)
            } else if (responseType === 'code' && oAuthParams !== null) {
              const code = String(res.data)
              const concatChar = oAuthParams?.redirectUri?.includes('?') ? '&' : '?'

              if (Setting.hasPromptPage(application)) {
                void AuthBackend.getAccount('').then(res => {
                  if (res.status === 'ok') {
                    // onUpdateAccount(res)

                    if (Setting.isPromptAnswered(res.data, application)) {
                      Setting.goToLink(
                        `${oAuthParams.redirectUri}${concatChar}code=${code}&state=${oAuthParams.state}`
                      )
                    } else {
                      Setting.goToLinkSoft(
                        { props: { history: [] } },
                        `/prompt/${application.name}?redirectUri=${oAuthParams.redirectUri}&code=${code}&state=${oAuthParams.state}`
                      )
                    }
                  } else {
                    Util.showMessage(
                      'error',
                      `Failed to sign in: ${res.msg}`
                    )
                  }
                })
              } else {
                Setting.goToLink(
                  `${oAuthParams.redirectUri}${concatChar}code=${code}&state=${oAuthParams.state}`
                )
              }
            } else if (
              (responseType === 'token' ||
              responseType === 'id_token') &&
              oAuthParams !== null
            ) {
              const accessToken = String(res.data)
              Setting.goToLink(
                `${oAuthParams.redirectUri}#${responseType}=${accessToken}?state=${oAuthParams.state}&token_type=bearer`
              )
            } else if (responseType === 'saml') {
              // const SAMLResponse = res.data
              // const redirectUri = res.data2
              // Setting.goToLink(
              //   `${redirectUri}?SAMLResponse=${encodeURIComponent(
              //     SAMLResponse
              //   )}&RelayState=${oAuthParams.relayState}`
              // )
            }
          } else {
            Util.showMessage('error', `Failed to log in: ${res.msg}`)
          }
        })
      }
    }
    // function getSamlUrl(provider: any) {
    //   console.log('call getSamlUrl')
    //   // const params = new URLSearchParams(this.location.search)
    //   // let clientId = params.get('client_id')
    //   // let application = params.get('state')
    //   // let realRedirectUri = params.get('redirect_uri')
    //   // let redirectUri = `${window.location.origin}/callback/saml`
    //   // let providerName = provider.name
    //   // let relayState = `${clientId}&${application}&${providerName}&${realRedirectUri}&${redirectUri}`
    //   // AuthBackend.getSamlLogin(
    //   //   `${provider.owner}/${providerName}`,
    //   //   btoa(relayState)
    //   // ).then(res => {
    //   //   if (res.data2 === 'POST') {
    //   //     document.write(res.data)
    //   //   } else {
    //   //     window.location.href = res.data
    //   //   }
    //   // })
    // }
    // function isProviderVisible(providerItem: IProviderItem) {
    //   if (mode === 'signup') {
    //     return Setting.isProviderVisibleForSignUp(providerItem)
    //   } else {
    //     return Setting.isProviderVisibleForSignIn(providerItem)
    //   }
    // }

    function renderSigned() {
      if (props.account === null || props.account.status === 'error') {
        signedInBox.value = false
        return null;
      }
      let application = getApplicationObj()
      if (props.account.data?.owner !== application.organization) {
        signedInBox.value = false
        return null;
      }
      signedInBox.value = true

      const params = new URLSearchParams(window.location.search);
      let silentSignin = params.get('silentSignin');
      if (silentSignin !== null) {
        if (window !== window.parent) {
          const message = {tag: 'Casdoor', type: 'SilentSignin', data: 'signing-in'};
          window.parent.postMessage(message, '*');
        }

        let values = {} as Record<string, unknown>;
        values['application'] = application.name;
        onFinish(values);
      }
    }

    function onSignin() {
      const values = {
        application: application.name,
        organization: application.organization,
        username: username.value,
        password: password.value,
        autoSignin: true,
      }
      // check arguments
      if (!arguments) {
        $q.notify({
          color: 'warning',
          message: 'Please accept arguments',
        });
        return;
      }

      submitLoading.value = true;
      $q.loading.show({
        message: 'Logging...',
      });

      onFinish(values)

      // await signIn(this.model)
      //   .then((resp) => {
      //     console.log('generate token success, token is:', resp.token);
      //     void this.$store.dispatch('user/asyncSetUser', resp.token);
      //     console.log(this.model.email, 'signin success.');
      //     this.$q.notify({
      //       message: 'Sign in success.',
      //     });
      //   })
      //   .catch((err) => {
      //     console.log('signin err:', err);
      //   });

      submitLoading.value = false;
      $q.loading.hide();
    }

    function onReSignin() {
      const values = {
        application: application.name
      }
      onFinish(values);
    }

    onMounted(async () => {
      if (type.value === 'login' || type.value === 'cas') {
        await getApplication()
      } else if (type.value === 'code') {
        await getApplicationLogin()
      // } else if (type.value === 'saml') {
      //   getSamlApplication()
      } else {
        console.log('error', `Unknown authentication type: ${type.value}`)
      }

      renderSigned();
    });

    return {
      submitLoading,
      isPassword,

      thirdPartLogo: Setting.ThirdPartLogo,
      typeRef,
      applicationRef,
      accountRef,
      signedInBox,
      msg,
      username,
      password,
      validEmailOrPhone,
      validEmail,
      validPhone,
      agreement,

      getAuthUrl,
      onSignin,
      onReSignin,
    };
  }
});
</script>

<style lang="sass" scoped>
.card-width
  width: 450px
</style>
