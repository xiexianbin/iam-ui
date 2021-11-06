<template>
  <q-page padding>
    <div class="row justify-center q-pa-md">
      <q-card class="col-md-3 col-xs-12">
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">Sign in</div>
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

            <q-toggle
              v-model="model.accept"
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
              <router-link class="text-primary" to="/signup">
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
          <div class="q-gutter-md q-gutter-sm">
            <q-btn
              round
              class="glossy"
              color="black"
              icon="mdi-github"
              size="sm"
              type="a"
              href="/auth/github/redirect?redirect="
            />
            <q-btn
              round
              class="glossy"
              color="black"
              icon="mdi-qqchat"
              size="sm"
              type="a"
              href="https://qq.com"
            />
            <q-btn
              round
              class="glossy"
              color="green"
              icon="mdi-wechat"
              size="sm"
              type="a"
              href="https://wechat.com"
            />
            <q-btn
              round
              class="glossy"
              color="blue"
              icon="mdi-google"
              size="sm"
              type="a"
              href="https://google.com"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { signIn } from 'src/rest/users';

export default defineComponent({
  name: 'Signin',
  data() {
    return {
      model: {
        email: '',
        password: '',
        accept: false,
      },
      isPassword: true,
      submitLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.submitLoading = false;

      if (!this.model.accept) {
        this.$q.notify({
          color: 'warning',
          message: 'Please accept license and terms',
        });
        return;
      }
      this.$q.loading.show({
        message: 'Logging...',
      });

      await signIn(this.model)
        .then((resp) => {
          console.log('generate token success, token is:', resp.token);
          void this.$store.dispatch('user/asyncSetUser', resp.token);
          console.log(this.model.email, 'signin success.');
          this.$q.notify({
            message: 'Sign in success.',
          });
        })
        .catch((err) => {
          console.log('signin err:', err);
        });
      this.submitLoading = false;
      this.$q.loading.hide();
    },
  },
});
</script>
