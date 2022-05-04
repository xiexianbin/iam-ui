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
  name: 'SignUpOAuth',
  components: {SingInC},
  setup() {
    const applicationName = ref(Setting.ApplicationName)
    const type= ref('code')
    const mode= ref('signup')
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
