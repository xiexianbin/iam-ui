<template>
  <q-header
    elevated
    class="text-black"
    style="background: #f8f9fa"
    height-hint="61.59"
  >
    <q-toolbar class="q-px-md" v-if="$store.state.user.isSignin">
      <q-btn
        round
        dense
        flat
        no-caps
        :ripple="false"
        to="/"
        icon="img:/icons/favicon-128x128.png"
        size="19px"
        class="q-mr-sm"
      />
      <div
        v-if="$store.state.user.role === 'admin'"
        class="
          layout__toolbar-link
          q-ml-xs q-gutter-md
          text-body2 text-weight-bold
          row
          items-center
          no-wrap
        "
      >
        <router-link to="/manager/organizations">Organizations</router-link>
        <router-link to="/manager/users">Users</router-link>
        <router-link to="/manager/providers">Providers</router-link>
        <router-link to="/manager/applications">Applications</router-link>
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
        <router-link to="/user/organizations">Organizations</router-link>
        <router-link to="/user/users">Users</router-link>
        <router-link to="/user/providers">Providers</router-link>
        <router-link to="/user/applications">Applications</router-link>
        <router-link to="/user/tokens">Tokens</router-link>
        <router-link to="/user/records">Records</router-link>
        <router-link to=""> API </router-link>
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

        <q-btn label="Sign in" v-if="!$store.state.user.isSignin" />
        <q-btn dense flat no-wrap v-else>
          <q-avatar rounded size="20px">
            <img :src="$store.state.user.user.avatar_url" />
          </q-avatar>
          <q-icon name="arrow_drop_down" size="16px" />

          <q-menu auto-close>
            <q-list dense>
              <q-item class="layout__menu-link-signed-in">
                <q-item-section>
                  <div>
                    Signed in as
                    <strong>{{ $store.state.user.user.username }}</strong>
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
              <q-item clickable class="layout__menu-link">
                <q-item-section>Your profile</q-item-section>
              </q-item>
              <q-item clickable class="layout__menu-link">
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
              </q-item>
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
import { useStore } from 'vuex';

export default {
  name: 'Header',
  setup() {
    const store = useStore();

    function signOut() {
      void store.dispatch('user/signOut');
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
