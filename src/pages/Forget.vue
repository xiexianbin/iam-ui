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
  <q-page padding class="q-pa-md">
    <div class="row page-wrapper column items-center q-pa-md">
      <div class="column">
        <div class="col q-pb-md">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
          >
            <q-step
              :name="1"
              class="flex flex-center"
              title="Account"
              icon="settings"
              :done="step > 1"
            >
              <q-list class="q-gutter-md" style="width: 400px">
                <q-item>
                  <q-item-section>
                    <q-input
                      :disable="usernameInputDisable"
                      v-model="username"
                      label="UserName *"
                      hint="UserName Email or Phone"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please Input UserName Email or Phone',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item v-if="usernameInputDisable === true">
                  <q-item-section>
                    <q-input
                      v-model="emailCode"
                      label="Email Verify Code"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Please type your Email Verify Code',
                        (val) => val.length <= 5 || 'Please type a real age',
                      ]"
                    >
                      <template v-slot:after>
                        <q-btn
                          flat
                          no-caps
                          icon="send"
                          :label="codeVerifyLabel"
                          :loading="verifyCodeLoading"
                          @click="openCodeVerify"
                        >
                          <template v-slot:loading>
                            <q-spinner-hourglass class="on-left" />
                            {{ reSendVerifyCodeTime }}s
                          </template>
                        </q-btn>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-btn @click="stepCheck('step' + step1)" color="primary" label="Next Step" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-step>

            <q-step
              :name="2"
              title="Verification"
              icon="create_new_folder"
              :done="step > 2"
            >
            updatePassword
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
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

                  <q-input
                    v-model="confirm"
                    label="Confirm Password *"
                    :type="isPassword ? 'password' : 'text'"
                    hint="Pleast reinput your Password"
                    :rules="[
                      (val) => val == password || 'Password do not match',
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
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn :loading="changePwdBtnLoading" @click="changePassword" color="primary" label="Change Password" />
                </q-item-section>
              </q-item>
            </q-step>

            <q-step
              :name="3"
              title="Reset"
              icon="key"
              :done="step > 3"
            >
              Password Change Success, Please click <q-btn label="signin" to="/signin"></q-btn>...
            </q-step>

            <!-- <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" />
                < !-- <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" /> -- >
              </q-stepper-navigation>
            </template> -->
          </q-stepper>
        </div>
      </div>

      <q-dialog v-model="showCodeVerify" persistent>
        <q-card class="q-dialog-plugin">
          <q-card-section class="row">
            <p class="text-h6">Code Verify</p>
            <q-space />
            <q-btn color="primary" flat icon="close" v-close-popup></q-btn>
          </q-card-section>
          <q-card-section class="items-center">
            <CodeVerify @close-code-verify="closeCodeVerify" @human-check-callback="humanCheckCallback" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'

import CodeVerify from 'src/components/utils/CodeVerify.vue';
import * as ApplicationBackend from 'src/backend/ApplicationBackend'
import * as AuthBackend from 'src/auth/AuthBackend'
import * as Setting from 'src/Setting'
import * as UserBackend from 'src/backend/UserBackend'
import * as AUtil from 'src/auth/Util'
import * as Util from 'src/Util'
import { IApplication } from 'src/components/models/application'
import { IUser } from 'src/components/models/user'

export default defineComponent({
  name: 'Forget',
  components: {
    CodeVerify,
  },
  setup () {
    const applicationName = ref(Setting.ApplicationName)
    let application: IApplication = {} as IApplication;
    let applicationRef = ref<IApplication>(application);

    // q-step counter
    const step = ref(1)
    // q-step 1 flow counter
    const step1 = ref(1)

    const user = ref({} as IUser)
    const username = ref('')
    const usernameInputDisable = ref(false)
    const email= ref('')
    const phone= ref('')
    const emailCode= ref('')
    const phoneCode= ref('')
    const verifyType = ref('')

    const showCodeVerify = ref(false)
    const codeVerifyLabel = 'Send Code'

    const verifyCodeLoading = ref(false)
    const reSendVerifyCodeTime = ref(0)

    const isPassword = ref(true)
    const password = ref('')
    const confirm = ref('')
    const changePwdBtnLoading = ref(false)

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

    async function stepCheck(name: string) {
      switch (name) {
        case 'step1':
          void await AuthBackend.getEmailAndPhone({
            application: application.name,
            organization: application.organization,
            username: username.value
          }).then((res) => {
            if (res.status === 'ok') {
              user.value = res.data as IUser;
              phone.value = user.value.phone;
              email.value = user.value.email;
              username.value = user.value.email
              usernameInputDisable.value = true;
              step1.value = 2

              if (phone.value !== '' && email.value === '') {
                verifyType.value = 'phone'
              } else if (phone.value === '' && email.value !== '') {
                verifyType.value = 'email'
              }

              console.log('username type is', res.data2)
            } else {
              Util.showMessage('error', res.msg);
            }
          });
          break;
        case 'step2':
          const oAuthParams = AUtil.getOAuthGetParameters(undefined);
          let code = ''
          if (verifyType.value === 'email') {
            code = emailCode.value
          } else if (verifyType.value === 'phone') {
            code = phoneCode.value
          }
          void await AuthBackend.login({
            application: application.name,
            organization: application.organization,
            username: username.value,
            name: user.value.name,
            code: code,
            phonePrefix: application?.organizationObj.phonePrefix,
            type: 'login'
          }, oAuthParams).then(res => {
            if (res.status === 'ok') {
              step.value = 2
            } else {
              Util.showMessage('error', res.msg);
            }
          })
          break
        default:
          break
      }
    }

    function closeCodeVerify() {
      showCodeVerify.value = false;
    }
    function openCodeVerify() {
      showCodeVerify.value = true;
    }
    function humanCheckCallback(checkType: string, checkId: string, checkKey: string) {
      console.log('humanCheckCallback is', checkType, checkId, checkKey)
      closeCodeVerify();
      if (username.value !== '' && checkKey.length === 5) {
        let orgId = Setting.getApplicationOrgName(application)
        void UserBackend.sendCode(checkKey, checkId, checkKey, email.value, 'email', orgId, user.value.name).then(res => {
          if (res === true) {
            verifyCodeLoading.value = true;
            reSendVerifyCodeTime.value = 120;
            reSendVerifyCodeTimer();
          }
        })
      } else {
        console.log('Missing parameter.')
      }
    }
    function reSendVerifyCodeTimer() {
      if (reSendVerifyCodeTime.value > 0) {
        reSendVerifyCodeTime.value--;
        setTimeout(() => {
          reSendVerifyCodeTimer();
        }, 1000);
      } else {
        reSendVerifyCodeTime.value = 0;
        verifyCodeLoading.value = false;
      }
    }

    async function changePassword() {
      if (password.value === '' || confirm.value === '') {
        Util.showMessage('error', 'password or confirm Empty input!');
        return;
      }
      if (password.value !== confirm.value) {
        Util.showMessage('error', 'user: password and confirm typed do not match.');
        return;
      }
      changePwdBtnLoading.value = true;
      void await UserBackend.setPassword(application.organization, user.value.name, '', password.value).then((res) => {
        changePwdBtnLoading.value = false;
        if (res.status === 'ok') {
          Util.showMessage('success', 'Password Update Success');
          step.value = 3
        }
        else Util.showMessage('error', res.msg);
      })
    }

    onMounted(async () => {
      await getApplication()
    })

    return {
      step,
      step1,

      stepCheck,

      usernameInputDisable,
      username,
      email,
      phone,
      emailCode,
      phoneCode,
      verifyType,

      showCodeVerify,
      codeVerifyLabel,

      verifyCodeLoading,
      reSendVerifyCodeTime,

      closeCodeVerify,
      openCodeVerify,
      humanCheckCallback,

      isPassword,
      password,
      confirm,
      changePassword,
      changePwdBtnLoading,
    }
  }
})
</script>

<style lang="sass" scoped>
.q-stepper
  width: 600px
</style>
