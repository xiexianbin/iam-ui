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
  <q-header
    elevated
    class="text-black"
    style="background: #f8f9fa"
    height-hint="61.59"
  >
    <q-toolbar class="q-px-md" v-if="$store.state.auth.isSignin">
      <q-btn
        round
        dense
        flat
        no-caps
        :ripple="false"
        to="/user"
        icon="img:/icons/favicon-128x128.png"
        size="19px"
        class="q-mr-sm"
      />
      <div
        v-if="$store.state.auth.account.user === 'admin'"
        class="
          layout__toolbar-link
          q-ml-xs q-gutter-md
          text-body2 text-weight-bold
          row
          items-center
          no-wrap
        "
      >
        <router-link to="/manager/tokens">Tokens</router-link>
        <router-link to="/manager/records">Records</router-link>
        <router-link to=""> API </router-link>
      </div>

      <div
        v-else
        class="
          layout__toolbar-link
          q-ml-xs q-gutter-md
          text-body2 text-weight-bold
          row
          items-center
          no-wrap
        "
      >
        <router-link to="/user/tokens">Tokens</router-link>
        <router-link to="/user/records">Records</router-link>
      </div>

      <q-space />

      <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
        <q-btn
          v-if="$q.screen.gt.xs"
          dense
          flat
          round
          size="sm"
          icon="notifications"
        />
        <q-btn v-if="$q.screen.gt.xs" dense flat>
          <div class="row items-center no-wrap">
            <q-icon name="add" size="20px" />
            <q-icon
              name="arrow_drop_down"
              size="16px"
              style="margin-left: -2px"
            />
          </div>
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable class="layout__menu-link">
                <q-item-section>New repository</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
                <q-item-section>Import repository</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
                <q-item-section>New gist</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
                <q-item-section>New organization</q-item-section>
              </q-item>
              <q-separator />
              <q-item-label header>This repository</q-item-label>
              <q-item clickable class="layout__menu-link">
                <q-item-section>New issue</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn label="Sign in" v-if="!$store.state.auth.isSignin" />
        <q-btn dense flat no-wrap v-else>
          <q-avatar rounded size="20px">
            <img :src="$store.state.auth.account.user.avatar" />
          </q-avatar>
          <q-icon name="arrow_drop_down" size="16px" />

          <q-menu auto-close>
            <q-list dense>
              <q-item class="layout__menu-link-signed-in">
                <q-item-section>
                  <div>
                    Signed in as
                    <strong>{{ $store.state.auth.account.user.displayName }}</strong>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="layout__menu-link-status">
                <q-item-section>
                  <div>
                    <q-icon name="tag_faces" color="blue-9" size="18px" />
                    Set your status
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="layout__menu-link" to="/user">
                <q-item-section>Your profile</q-item-section>
              </q-item>
              <!-- <q-item clickable class="layout__menu-link">
                <q-item-section>Your repositories</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
                <q-item-section>Your projects</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
                <q-item-section>Your stars</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
                <q-item-section>Your gists</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="layout__menu-link">
                <q-item-section>Help</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
                <q-item-section>Settings</q-item-section>
              </q-item> -->
              <q-item clickable class="layout__menu-link" @click="signOut">
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
    <q-toolbar class="q-px-md" v-else>
      <q-space />
      <router-link to="/about">About</router-link>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { goToLink } from 'src/Setting';
import { logout } from 'src/auth/AuthBackend';

export default {
  name: 'Header',
  setup() {
    const $store = useStore();

    async function signOut() {
      await logout()
      void $store.dispatch('auth/signOut');
      goToLink('/signout')
    }

    return { signOut };
  },
};
</script>

<style lang="sass">
.layout
  &__select-layout__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #0366d6
      color: black
      .q-item__section--side
        color: black
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: black
      text-decoration: none
      height: 62px
      line-height: 62px
      &:hover
        opacity: 0.7
        border-bottom: 3px solid #0086b6
        transition: all .15s ease-in-out

  &__menu-link:hover
    background: #F8F9FA
    color: black

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
