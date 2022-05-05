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
  <q-footer class="page-wrapper bg-grey-1 text-grey q-pb-xl q-px-md">
    <q-separator />
    <!-- Section: Links  -->
    <section class="row text-center">
      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-uppercase q-mb-md q-mt-md">Website</h6>
        <p class="q-mb-none">Identity and Access Management (IAM)</p>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2">
        <h6 class="text-uppercase q-mb-md q-mt-md">About</h6>
        <p class="q-mb-none">
          <a href="https://www.xiexianbin.cn/_/about/index.html"> About </a>
        </p>
        <p class="q-mb-none">
          <a href="http://localhost:1313/_/logo/index.html"> Logos </a>
        </p>
        <p>
          <a href="https://www.xiexianbin.cn/_/policies/index.html">
            Privacy & Terms
          </a>
        </p>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2">
        <h6 class="text-uppercase q-mb-md q-mt-md">Links</h6>
        <p>
          <a href="https://www.xiexianbin.cn/">Blog</a>
        </p>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2">
        <h6 class="text-uppercase q-mb-md q-mt-md">SOCIAL</h6>
        <p class="q-mb-none">
          <a href="https://keybase.io/xiexianbin">Keybase</a>
        </p>
        <p>
          <a href="https://github.com/xiexianbin">Github</a>
        </p>
      </div>
      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-uppercase q-mb-md q-mt-md">Contact</h6>
        <p class="q-mb-none"><i class="home"></i> Shanghai, China</p>
        <p>
          <i class="email"></i>
          me@xiexianbin.cn
        </p>
      </div>
    </section>
    <!-- Section: Links  -->

    <!-- Copyright -->
    <q-separator />
    <section class="row">
      <div class="col-md-6 col-lg-6 col-xl-6 q-my-md text-left">
        <p class="q-mb-none">
          Copyright © 2012-2021 xiexianbin.cn All rights reserved.
        </p>
        <p class="q-mb-none">
          Auto Build and Public by
          <a href="https://github.com/x-actions">x-actions</a>
        </p>
        <p class="q-mb-none">
          <a target="_blank" href="http://beian.miit.gov.cn/">
            豫ICP备14020342号-11
          </a>
        </p>
        <p>联系邮箱：me@xiexianbin.cn</p>
      </div>
    </section>
    <!-- Copyright -->
  </q-footer>
</template>

<script>
export default {
  name: 'Footer',
  setup() {
    return {};
  },
};
</script>

<style lang="sass"></style>
