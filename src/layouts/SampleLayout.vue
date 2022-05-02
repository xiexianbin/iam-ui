<template>
  <q-layout class="bg-grey-1">
    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterSample />
  </q-layout>
</template>

<script>
import FooterSample from 'src/components/layout/FooterSample.vue';

export default {
  name: 'SampleLayout',
  components: {
    FooterSample,
  },
};
</script>
