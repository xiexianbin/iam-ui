/* eslint-disable @typescript-eslint/no-unsafe-assignment */
<template>
  <div class="row justify-center items-center q-pa-md">
    <q-card class="col-md-3 col-xs-12">
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">Sign in</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
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
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { useQuasar } from 'quasar'

import * as ApplicationBackend from 'src/backend/ApplicationBackend'
import * as AuthBackend from 'src/auth/AuthBackend'
import * as Setting from 'src/Setting'
import * as Util from 'src/auth/Util'
import { getAuthUrl } from 'src/auth/Provider';
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
  },
  data() {
    return {
      model: {
        accept: false,
      },

    };
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
    const isCodeSignin = false;
    const msg = null;
    const username = ref('');
    const password = ref('');
    const validEmailOrPhone = false;
    const validEmail = false;
    const validPhone = false;

    async function getApplicationLogin() {
      const oAuthParams = Util.getOAuthGetParameters(undefined)
      void await AuthBackend.getApplicationLogin(oAuthParams).then(app => {
        application = app
        applicationRef.value = reactive(app)
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
                void AuthBackend.getAccount('').then(account => {
                  if (res.status === 'ok') {
                    // onUpdateAccount(account)

                    if (Setting.isPromptAnswered(account.data, application)) {
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
    // function getSigninButton(type: string) {
    //   return 'login:Sign in with {type}'.replace('{type}', type)
    // }
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

    function onSubmit() {
      const values = {
        application: application.name,
        organization: application.organization,
        username: username.value,
        password: password.value,
        autoSignin: true,
      }
      // check
      // if (!this.model.accept) {
      //   this.$q.notify({
      //     color: 'warning',
      //     message: 'Please accept license and terms',
      //   });
      //   return;
      // }

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
    });

    return {
      submitLoading,
      isPassword,

      thirdPartLogo: Setting.ThirdPartLogo,
      typeRef,
      applicationRef,
      msg,
      username,
      password,
      validEmailOrPhone,
      validEmail,
      validPhone,

      getAuthUrl,
      onSubmit,
    };
  }
});
</script>
