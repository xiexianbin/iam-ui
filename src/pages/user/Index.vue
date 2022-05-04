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
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input densev-model="user_details.user_name" label="User Name"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input densev-model="user_details.email" label="Email Address"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input densev-model="user_details.first_name" label="First Name"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input densev-model="user_details.last_name" label="Last Name"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark autogrow dense v-model="user_details.address" label="Address"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input densev-model="user_details.city" label="City"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input densev-model="user_details.post_code" label="Postal Code"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dark type="textarea" dense v-model="user_details.about" label="About"/>
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
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Current Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" denseoutlined round
                  v-model="password_dict.current_password"
                  label="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" denseoutlined round v-model="password_dict.new_password"
                  label="New Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Confirm New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password" denseoutlined round
                  v-model="password_dict.confirm_new_password"
                  label="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="bg-primary text-white">Change Password</q-btn>
          </q-card-actions>
        </q-card>

        <q-card class="q-mb-md">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">第三方认证</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-sm row">
            github qq
          </q-card-section>
        </q-card>
      </div>

      <div class="col-4">
        <q-card>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img src="https://www.xiexianbin.cn/images/logo/logo-white.svg">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-btn label="Add Photo" class="text-capitalize" rounded color="info"
                    style="max-width: 120px"></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'UserProfile',
  setup() {
    return {
      user_details: {},
      password_dict: {}
    }
  }
})
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
