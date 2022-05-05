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
  <q-page padding class="page-wrapper">
    <div class="text-center q-pa-md">
      <div style="font-size: 15vh">404</div>

      <div class="text-h5" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn class="q-mt-xl" unelevated to="/" label="Go Home" no-caps />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
});
</script>
