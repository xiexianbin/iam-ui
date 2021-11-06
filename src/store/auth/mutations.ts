import { IUser } from 'src/components/models/users';

import { MutationTree } from 'vuex';
import { IAuthState } from './state';

const mutation: MutationTree<IAuthState> = {
  setUser (state: IAuthState, user: IUser) {
    state.user = user
  },
  signIn (state: IAuthState) {
    state.isSignin = true
  },
  signOut (state: IAuthState) {
    state.isSignin = false
  }
};

export default mutation;
