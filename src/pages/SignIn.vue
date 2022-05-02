<template>
  <q-page padding>
    <div class="row justify-center items-center q-pa-md">
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
          <div class="q-gutter-md q-gutter-sm" v-for="(k, i) in applicationRef.providers" :key="i">
            <q-btn
              round
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
            <a v-else :href='getAuthUrl(application, k.provider, "signup")'>
              {{k.provider.name}}
            </a>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, reactive } from 'vue';
import * as ApplicationBackend from 'src/backend/ApplicationBackend'
import { IApplication } from 'src/components/models/application';
import { getAuthUrl } from 'src/auth/Provider';
import { IMap } from 'src/components/models/base';

const thirdPartLogo = {
  GitHub: {
    color: 'black',
    icon: 'mdi-github'
  },
  Google: {
    color: 'blue',
    icon:'mdi-google'
  },
  QQ: {
    color: 'black',
    icon: 'mdi-qqchat'
  },
  Wechat: {
    color: 'black',
    icon: 'mdi-wechat'
  },
} as IMap;

export default defineComponent({
  name: 'Signin',
  components: {  },
  data() {
    return {
      model: {
        email: '',
        password: '',
        accept: false,
      },
      isPassword: true,
      submitLoading: false,

      // classes: this,

      // applicationName:
      //   this.applicationName !== undefined
      //     ? this.applicationName
      //     : this.match === undefined
      //     ? null
      //     : this.match.params.applicationName,
      // owner:
      //   this.owner !== undefined
      //     ? this.owner
      //     : this.match === undefined
      //     ? null
      //     : this.match.params.owner,
      // application: null,
      // mode:
      //   this.mode !== undefined
      //     ? this.mode
      //     : this.match === undefined
      //     ? null
      //     : this.match.params.mode,

    };
  },
  setup() {
    let type = 'cas';
    const typeRef = ref(type);
    let applicationName = 'app-built-in'
    const applicationNameRef = ref(applicationName);
    const owner = '';
    let application: IApplication = {} as IApplication;
    let applicationRef = ref<IApplication>(application);
    let mode = '';
    const isCodeSignin = ref(false);
    const msg = ref(null);
    const username = ref(null);
    const validEmailOrPhone = ref(null);
    const validEmail = ref(null);
    const validPhone = ref(null);

    async function getApplication() {
      if (applicationName === null) {
        return
      }

      void await ApplicationBackend.getApplication('admin', applicationName).then(
        app => {
          application = app
          applicationRef.value = reactive(app)
        }
      )
    }

    onMounted(async () => {
      if (type === 'login' || type === 'cas') {
        await getApplication()
      // } else if (type === 'code') {
      //   getApplicationLogin()
      // } else if (type === 'saml') {
      //   getSamlApplication()
      } else {
        console.log('error', `Unknown authentication type: ${type}`)
      }
    });

    return {
      thirdPartLogo,
      typeRef,
      applicationNameRef,
      // owner,
      applicationRef,
      // mode,
      isCodeSignin,
      msg,
      username,
      validEmailOrPhone,
      validEmail,
      validPhone,

      getAuthUrl,
    };
  },
  methods: {
    async onSubmit() {
      console.log('signup')
    },
  }
});
</script>
