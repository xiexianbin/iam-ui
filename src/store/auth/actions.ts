/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { Cookies } from 'quasar';
import { ActionTree } from 'vuex';

import { getUser } from 'src/rest/users'
import { StateInterface } from '../index';
import { IAuthState } from './state';
import { IUser } from 'src/components/models/users';

const actions: ActionTree<IAuthState, StateInterface> = {
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
    const user: IUser = await getUser('/user') //.catch((err) => {
    //  // get user info err, may be token is expired, remove token from Cookies and localStorage
    //   console.log(err);
    //   Cookies.remove('token');
    //   localStorage.removeItem('token');
    // });
    context.commit('signIn')
    context.commit('setUser', user)

    // set cookie, and expires form token
    // suggest: server side set cookie is HttpOnly
    // Cookies.set('token', 'true', {
    //   expires: 20,
    // });
  },

  signOut(context) {
    Cookies.remove('token');
    localStorage.removeItem('token')
    context.commit('setUser', null)
    context.commit('signOut')
  }
};

export default actions;
