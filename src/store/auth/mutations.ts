import { IAccount } from 'src/components/models/account';

import { MutationTree } from 'vuex';
import { IAuthState } from './state';

const mutation: MutationTree<IAuthState> = {
  setAccount (state: IAuthState, account: IAccount | null) {
    if (account != null) {
      account.user = account.data
      account.organization = account.data2
      state.account = account
    } else {
      state.account = {} as IAccount
    }
  },
  signIn (state: IAuthState) {
    state.isSignin = true
  },
  signOut (state: IAuthState) {
    state.isSignin = false
  }
};

export default mutation;
