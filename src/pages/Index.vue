<template>
  <q-page padding>
    <div class="row justify-center q-pa-md">
      <router-link to="/user">user</router-link>
      <span>--</span>
      <router-link to="/manager">manager</router-link>
    </div>
  </q-page>
</template>

<script lang="ts">
import { goToLink } from 'src/Setting';
import { defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    onBeforeMount(() => {
      goToLink('/user')
    })
  }
});
</script>
