<template>
  <q-page padding>
    <SingInC :applicationName="applicationName" :type="type" :mode="mode" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import SingInC from 'components/SignInC.vue'
import * as Setting from 'src/Setting'

export default defineComponent({
  name: 'SignUpOAuth',
  components: {SingInC},
  setup() {
    const applicationName = ref(Setting.ApplicationName)
    const type= ref('code')
    const mode= ref('signup')
    return {
      applicationName,
      type,
      mode,
    }
  }
})
</script>
