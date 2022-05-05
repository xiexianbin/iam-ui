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
  <slider-verify
    v-model:is-show-self="isShowSelf"
    :width="width"
    :height="height"
    :img-url="imgUrl"
    :s-text="sText"
    :e-text="eText"
    :is-border="isBorder"
    :is-close-btn="isCloseBtn"
    :is-reload-btn="isReloadBtn"
    :is-parent-node="isParentNode"
    @reload="emitChange('reload')"
    @show="emitChange('show')"
    @hide="emitChange('hide')"
    @close="emitChange('close')"
    @success="emitChange('success')"
    @fail="emitChange('fail')"
  ></slider-verify>
</template>

<script>
export default {
  name: 'SlideVerify',
  setup() {
    return {};
  },
  data() {
    return {
      isShowSelf: true,
      width: 300,
      height: 180,
      imgUrl: './slide-verify/img-1.jpg',
      sText: 'Congratulations',
      eText: 'Please Re-Slider',
      isBorder: false,
      isCloseBtn: false,
      isReloadBtn: true,
      isParentNode: false,
    };
  },
  methods: {
    emitChange(type) {
      console.log(type);
      if (type == 'success') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.$emit('callback');
      }
    },
  },
};
</script>
