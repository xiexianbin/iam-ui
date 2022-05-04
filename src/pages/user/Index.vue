<template>
  <q-page padding class="q-pa-sm">
    <div class="row page-wrapper justify-center q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">User Profile</div>
            <div class="text-subtitle2">Update your profile</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-8">
        <q-card class="q-mb-md">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">User Info</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.id" label="User ID" disable />
                </q-item-section>
                <q-item-section>
                  <q-input v-model="user.email" label="Primary Email" disable />
                </q-item-section>
              </q-item>
              <q-item class="col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.name" label="Name" disable />
                </q-item-section>
                <q-item-section>
                  <q-input v-model="user.displayName" label="Display Name" />
                </q-item-section>
              </q-item>
              <q-item class="col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.firstName" label="First Name" />
                </q-item-section>
                <q-item-section>
                  <q-input v-model="user.lastName" label="Last Name" />
                </q-item-section>
              </q-item>
              <q-item class="col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.phone" label="Phone" />
                </q-item-section>
              </q-item>
              <q-item class="col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.region" label="Region" />
                </q-item-section>
                <q-item-section>
                  <q-input v-model="user.location" label="Location" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.address" label="Address" />
                </q-item-section>
              </q-item>
              <q-item class="col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.homepage" label="Home Page" />
                </q-item-section>
              </q-item>
              <q-item class="col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input v-model="user.createdTime" label="Created Time" disable />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="bg-primary text-white">Update User Info</q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  v-model="password"
                  label="Old Password *"
                  :type="isPassword ? 'password' : 'text'"
                  hint="Old Password"
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
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="bg-primary text-white">Change Password</q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Signup application</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-sm row">
            <q-item class="col-md-12 col-sm-12 col-xs-12">
              <div class="q-gutter-sm">
                <q-btn
                  flat
                  color="primary"
                  type="a"
                  target="_blank"
                  size="md"
                  :label="application.displayName"
                  :href="application.homepageUrl"
                  v-for="(application, i) in applications" :key="i" />
              </div>
            </q-item>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">3rd-party logins</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-sm">
            <div>
              <q-list class="row">
                <q-item class="col-md-12 col-sm-12 col-xs-12">
                  <q-item-section v-for="(k, i) in application.providers" :key="i">
                    <div v-if="k.provider.category === 'OAuth'">
                      <q-btn
                        round
                        :color="user.github !=='' ? thirdPartLogo[k.provider.type].color : 'grey'"
                        :icon="thirdPartLogo[k.provider.type].icon"
                        size="sm"
                        type="a"
                        v-if='k.provider.category === "OAuth"' :key='k.provider.clientId'
                        :href="user.github !=='' ? unlinkUser(k.provider.type) : getAuthUrl(application, k.provider, 'link')"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-4">
        <q-card>
          <q-card-section class="q-pa-sm">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-avatar size="120px">
                    <img :src="user.avatar">
                  </q-avatar>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn label="Update" class="bg-primary text-white" style="max-width: 120px"></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import { useStore } from 'src/store'

import * as ApplicationBackend from 'src/backend/ApplicationBackend'
import * as AuthBackend from 'src/auth/AuthBackend'
import * as UserBackend from 'src/backend/UserBackend'
import * as Setting from 'src/Setting'
import * as Util from 'src/auth/Util'
import { getAuthUrl } from 'src/auth/Provider';
import { IUser } from 'src/components/models/user';
import { IApplication } from 'src/components/models/application';

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const $store = useStore()
    const account = $store.state.auth.account

    const user = ref({} as IUser)
    const applications = ref([] as IApplication[])
    const application = ref({} as IApplication)

    const isPassword = ref(true)
    const grey = ref('grey')

    async function getUserApplication() {
      void await ApplicationBackend.getUserApplication(String(account.organization?.name), user.value.name)
        .then((res) => {
          application.value = res
        });
    }

    async function getApplicationsByOrganization() {
      void await ApplicationBackend.getApplicationsByOrganization('admin', String(account.organization?.name))
        .then((res) => {
          applications.value = res
        });
    }

    async function unlinkUser(providerType: string) {
      const body = {
        providerType: providerType,
      };
      void await AuthBackend.unlink(body).then((res) => {
          if (res.status === 'ok') {
            Util.showMessage('success', 'Unlinked successfully');
            Setting.goToLink('/user')
          } else {
            Util.showMessage('error', `Failed to unlink: ${res.msg}`);
          }
        });
    }

    onMounted(async () => {
      void await UserBackend.getUser(String(account.user?.owner), String(account.user?.name)).then(resp => {
        user.value = resp
      })
      void await getUserApplication()
      void await getApplicationsByOrganization()
    })

    return {
      user_details: {},
      password_dict: {},

      thirdPartLogo: Setting.ThirdPartLogo,
      getAuthUrl,
      unlinkUser,

      user,
      application,
      applications,

      isPassword,
      grey,
    }
  }
})
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
