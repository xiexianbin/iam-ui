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
