import { IUser } from 'src/components/models/users';

import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  setUser (state: UserStateInterface, user: IUser) {
    state.user = user
  },
  signIn (state: UserStateInterface) {
    state.isSignin = true
  },
  signOut (state: UserStateInterface) {
    state.isSignin = false
  }
};

export default mutation;
