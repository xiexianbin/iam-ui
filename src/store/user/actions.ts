/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'

import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

import { getUser } from 'src/rest/users'
import { IUser } from 'src/components/models/users';
import { Cookies } from 'quasar';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async asyncSetUser(context, token: string) {
    if (token) {
      // store token to localStorage
      localStorage.setItem('token', token)

      // set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization'];
      return
    }

    // get user info and storage to store
    const user: IUser = await getUser('')
    context.commit('signIn')
    context.commit('setUser', user)

    // set cookie, and expires form token
    // suggest: server side set cookie is HttpOnly
    Cookies.set('HASCOOKIE', 'true', {
      expires: 20,
    });
  },
  signOut(context) {
    localStorage.removeItem('token')
    context.commit('setUser', null)
    context.commit('signOut')
  }
};

export default actions;
