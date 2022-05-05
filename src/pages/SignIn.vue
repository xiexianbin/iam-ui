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
  <q-page padding>
    <SingInC :applicationName="applicationName" :type="type" :mode="mode" :account="account" />
  </q-page>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from 'vue';
import SingInC from 'components/SignInC.vue'
import * as AuthBackend from 'src/auth/AuthBackend'
import * as Setting from 'src/Setting'

export default defineComponent({
  name: 'SignIn',
  components: {SingInC},
  setup() {
    const applicationName = ref(Setting.ApplicationName)
    const type = ref('login')
    const mode = ref('signin')
    const account = ref({})

    // onMounted(() => {
    onBeforeMount(async () => {
      void await AuthBackend.getAccount('').then(resp => {
        account.value = resp
      })
    });

    return {
      applicationName,
      type,
      mode,
      account,
    }
  }
})
</script>
