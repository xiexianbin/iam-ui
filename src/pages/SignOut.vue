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
    <div class="row justify-center q-pa-md">
      <p>已退出，3秒后跳转 <a href="/signin">signin</a>...</p>
    </div>
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
