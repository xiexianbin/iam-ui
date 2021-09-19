<template>
  <q-layout class="bg-grey-1">
    <Header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'src/components/layout/Header.vue';

export default {
  name: 'AuthLayout',
  components: {
    Header,
  },
};
</script>
