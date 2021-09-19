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
              v-model="model.email"
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
              v-model="model.username"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please Input your name',
              ]"
            />

            <q-input
              v-model="model.verify_code"
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
                  dense
                  no-caps
                  icon="send"
                  :label="slivdeVerifyLabel"
                  :loading="verifyCodeLoading"
                  @click="openSlideVerify"
                >
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    {{ reSendVerifyCodeTime }}s
                  </template>
                </q-btn>
              </template>
            </q-input>

            <q-input
              v-model="model.password"
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
              v-model="model.repassword"
              label="rePassword *"
              :type="isPassword ? 'password' : 'text'"
              hint="Pleast reinput your Password"
              :rules="[
                (val) => val == model.password || 'Password do not match',
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
              v-model="model.accept"
              label="I accept the license and terms"
            />

            <div>
              <q-btn
                label="Sign up"
                type="submit"
                color="primary"
                :loading="submitLoading"
              />
              <q-btn
                flat
                no-caps
                label="Sign in"
                color="primary"
                to="/signin"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-dialog v-model="showSlideVerify" persistent>
        <q-card class="q-dialog-plugin">
          <q-card-section class="row">
            <p class="text-h6">Slide Verify</p>
            <q-space />
            <q-btn color="primary" flat icon="close" v-close-popup></q-btn>
          </q-card-section>
          <q-card-section class="items-center">
            <SlideVerify @callback="slideVerifyed" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import SlideVerify from 'src/components/utils/SlideVerify.vue';

export default {
  name: 'Signup',
  components: {
    SlideVerify,
  },
  data() {
    return {
      model: {
        email: '',
        username: '',
        verify_code: '',
        password: '',
        repassword: '',
        accept: false,
      },
      isPassword: true,
      showSlideVerify: false,
      slivdeVerifyLabel: 'Send Code',
      verifyForm: false,

      verifyCodeLoading: false,
      submitLoading: false,
      reSendVerifyCodeTime: 0,
    };
  },
  methods: {
    onSubmit() {
      this.submitLoading = false;
      // this.$api.post('auth/signup', this.model).then((response) => {
      //   console.debug(response);
      //   let msg = response.data.message;
      //   let color = '';
      //   if (response.data.errorCode === 400) {
      //     color = 'warning';
      //   } else {
      //     color = 'green-5';
      //   }
      //   this.$q.notify({
      //     color: color,
      //     message: msg,
      //   });
      //   this.submitLoading = false;
      // });
    },
    openSlideVerify() {
      this.showSlideVerify = true;
    },
    slideVerifyed() {
      this.showSlideVerify = false;
      this.sendVerifyCode();
    },
    sendVerifyCode() {
      this.verifyCodeLoading = true;
      this.reSendVerifyCodeTime = 15;
      this.reSendVerifyCodeTimer();

      // let from = {
      //   email: this.model.email,
      //   actions: 'register',
      // };
      // this.$api
      //   .post('auth_code', from)
      //   .then((response) => {
      //     console.log(response);
      //     this.$q.notify({ message: response.data.message });
      //   })
      //   .catch((err) => {
      //     console.log('err', err);
      //     this.verifyCodeLoading = false;
      //     clearTimeout(timeout);
      // });
      return;
    },
    reSendVerifyCodeTimer() {
      if (this.reSendVerifyCodeTime > 0) {
        this.reSendVerifyCodeTime--;
        setTimeout(() => {
          this.reSendVerifyCodeTimer();
        }, 1000);
      } else {
        this.reSendVerifyCodeTime = 0;
        this.verifyCodeLoading = false;
      }
    },
  },
};
</script>

<style lang="sass" scoped></style>
