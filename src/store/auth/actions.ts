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
