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
  <div class="q-pa-md flex flex-center">
    <img class="code-img q-gutter-md" v-bind:src="'data:image/png;base64,' + humanCheck.captchaImage">
    <q-input
      counter
      dense
      v-model="checkKey"
      :maxlength="maxlength"
      label="Please Enter code"
      :rules="[
        (val) =>
          (val && val !== '' && val.length === 5) ||
          'code length must equal 5',
      ]"
    >
    </q-input>
  </div>
  <div class="q-pa-md q-gutter-sm" align="right">
    <q-btn dense flat color="primary" label="Cancel" @click="clickCancel" />
    <q-btn dense flat color="primary" label="Ok" @click="clickOk" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as Util from 'src/Util'
import * as UserBackend from 'src/backend/UserBackend'
import { IHumanCheck } from '../models/account';

function emitChange(type: string) {
  console.log(type);
  if (type == 'success') {
    // this.$emit('callback');
  }
}

export default defineComponent({
  name: 'CodeVerify',
  props :{
    maxlength: {
      type: Number,
      default: 5
    }
  },
  emits: [
    'close-code-verify',
    'human-check-callback'
  ],
  setup(props, { emit }) {
    let humanCheck = ref({} as IHumanCheck)
    const checkKey = ref('')

    async function loadHumanCheck() {
      void await UserBackend.getHumanCheck().then(res => {
        if (res.type === 'none') {
          // void UserBackend.sendCode('none', '', '', ...onButtonClickArgs);
          // checkType, checkId, checkKey, dest, type, orgId, checkUser
        } else if (res.type === 'captcha') {
          humanCheck.value = res
        } else {
          Util.showMessage('error', 'Unknown Check Type');
        }
      })
    }

    function clickOk() {
      emit('human-check-callback', humanCheck.value.type, humanCheck.value.captchaId, checkKey.value)
    }

    function clickCancel() {
      emit('close-code-verify')
    }

    onMounted(async () => {
      await loadHumanCheck()
    })

    return {
      emitChange,
      humanCheck,
      checkKey,

      clickOk,
      clickCancel,
    };
  }
});
</script>

<style lang="sass" scoped>
.code-img
  background-repeat: "no-repeat"
  height: 40px
  width: 100px
</style>
