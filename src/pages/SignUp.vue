<template>
  <q-page padding>
    <div class="row justify-center q-pa-md">
      <q-card class="col-md-3 col-xs-12">
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">Sign up</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="email"
              label="Email *"
              type="email"
              hint="Email Address is login Account"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please Input Email Address',
              ]"
            />

            <q-input
              v-model="username"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please Input your name',
              ]"
            />

            <q-input
              v-model="emailCode"
              label="Email Verify Code"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Please type your Email Verify Code',
                (val) => val.length !== 6 || 'Please type a real age',
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

            <q-toggle
              v-model="agreement"
              label="I accept the license and terms"
            />

            <div>
              <q-btn
                label="Sign up"
                type="submit"
                color="primary"
                :loading="submitLoading"
              />
              Have account?
              <router-link class="text-primary" to="/signin">
                Sign in
              </router-link>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

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
import { defineComponent, ref, reactive, onMounted } from 'vue';

import CodeVerify from 'src/components/utils/CodeVerify.vue';
import * as ApplicationBackend from 'src/backend/ApplicationBackend'
import * as AuthBackend from 'src/auth/AuthBackend'
import * as Setting from 'src/Setting'
import * as UserBackend from 'src/backend/UserBackend'
import * as Util from 'src/auth/Util'
import { IApplication } from 'src/components/models/application';
import { ISignupRequestForm } from 'src/components/models/account';

export default defineComponent({
  name: 'SignUp',
  components: {
    CodeVerify,
  },
  setup() {
    const applicationName = ref(Setting.ApplicationName)
    let application: IApplication = {} as IApplication;
    let applicationRef = ref<IApplication>(application);

    const isPassword = ref(true)
    const showCodeVerify = ref(false)
    const codeVerifyLabel = 'Send Code'
    const verifyForm = ref(false)

    const verifyCodeLoading = ref(false)
    const submitLoading = ref(false)
    const reSendVerifyCodeTime = ref(0)

    const username = ref('')
    const name = ref('')
    const password = ref('')
    const confirm = ref('')
    const email = ref('')
    const phonePrefix = ref('')
    const phone = ref('')
    const emailCode = ref('')
    const phoneCode = ref('')
    const validEmail = ref(false)
    const validPhone = ref(false)
    const agreement = ref(false)

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

    function onSubmit() {
      submitLoading.value = false;
      if (agreement.value == false) {
        Util.showMessage('error', 'please accept agreement.')
        return
      }

      let form = {
        application: application.name,
        organization: application.organization,
        username: username.value,
        password: password.value,
        confirm: confirm.value,
        email: email.value,
        emailCode: emailCode.value,
        agreement: agreement.value,
        phonePrefix: application.organizationObj.phonePrefix,
      } as ISignupRequestForm

      void AuthBackend.signup(form).then(resp => {
        if (resp.status === 'ok') {
          Util.showMessage('success', 'signup success, skip to signin page')
          setTimeout(() => {
            Setting.goToLink('/signin')
          }, 3000);
        } else {
          Util.showMessage('error', resp.msg)
        }
      })
    }
    function closeCodeVerify() {
      showCodeVerify.value = false;
    }
    function openCodeVerify() {
      validEmail.value = Setting.isValidEmail(email.value)
      if (validEmail.value === true) {
        showCodeVerify.value = true;
      } else {
        Util.showMessage('error', 'emial is unValid')
      }
      if (username.value === '') {
        Util.showMessage('error', 'username is unValid')
      }
    }
    function humanCheckCallback(checkType: string, checkId: string, checkKey: string) {
      console.log('humanCheckCallback is', checkType, checkId, checkKey)
      closeCodeVerify();
      if (validEmail.value === true && username.value !== '' && checkKey.length === 5) {
        verifyCodeLoading.value = true;
        reSendVerifyCodeTime.value = 120;
        reSendVerifyCodeTimer();

        let orgId = Setting.getApplicationOrgName(application)
        void UserBackend.sendCode(checkKey, checkId, checkKey, email.value, 'email', orgId, 'undefined')
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

    onMounted(async () => {
      await getApplication()
    })

    return {
      username,
      name,
      password,
      confirm,
      email,
      phonePrefix,
      phone,
      emailCode,
      phoneCode,
      validEmail,
      validPhone,
      agreement,

      isPassword,
      showCodeVerify,
      codeVerifyLabel,
      verifyForm,

      verifyCodeLoading,
      submitLoading,
      reSendVerifyCodeTime,

      closeCodeVerify,
      openCodeVerify,
      humanCheckCallback,
      onSubmit,
    };
  },
})
</script>

<style lang="sass" scoped></style>
