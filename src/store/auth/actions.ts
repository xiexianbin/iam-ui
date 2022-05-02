/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ActionTree } from 'vuex';

import { StateInterface } from '../index';
import { IAuthState } from './state';
import { IAccount } from 'src/components/models/account';

const actions: ActionTree<IAuthState, StateInterface> = {
  setAccount(context, account: IAccount) {
    // get user info and storage to store
    context.commit('signIn')
    context.commit('setAccount', account)
  },

  signOut(context) {
    context.commit('setAccount', null)
    context.commit('signOut')
  }
};

export default actions;
