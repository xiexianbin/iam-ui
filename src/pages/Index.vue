<template>
  <q-page padding>
    <div class="row">
      <router-link to="/user">user</router-link>
      <span>--</span>
      <router-link to="/manager">manager</router-link>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
});
</script>
