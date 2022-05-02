<template>
  <q-page padding>
    <p>已退出，3秒后跳转 <a href="/signin">signin</a>...</p>
  </q-page>
</template>

<script>
import { goToLink } from 'src/Setting';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignOut',
  setup() {
    setTimeout(
      ()=>{
        goToLink('/signin')
      }, 3000)
    return {}
  }
})
</script>
