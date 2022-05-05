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

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/boot/axios';
import { IAccount, IResponse, ISignupRequestForm } from 'src/components/models/account';
import { IApplication } from 'src/components/models/application'
import { IOAuthParams } from 'src/components/models/oauth';

export const getAccount = async (query: string): Promise<IAccount> => {
  return await api.get(`/api/get-account${query}`);
};

export const signup = async (values: ISignupRequestForm): Promise<IResponse> => {
  return await api.post('/api/signup', JSON.stringify(values))
}


function oAuthParamsToQuery(oAuthParams: IOAuthParams | null) {
  // login
  if (oAuthParams === null) {
    return '';
  }

  // code
  return `?clientId=${oAuthParams.clientId}&responseType=${oAuthParams.responseType}&redirectUri=${oAuthParams.redirectUri}&scope=${oAuthParams.scope}&state=${oAuthParams.state}&nonce=${oAuthParams.nonce}&code_challenge_method=${oAuthParams.challengeMethod}&code_challenge=${oAuthParams.codeChallenge}`;
}

export const getApplicationLogin = async (oAuthParams: IOAuthParams | null): Promise<IApplication|IResponse> => {
  return await api.get(`/api/get-app-login${oAuthParamsToQuery(oAuthParams)}`)
}

export const login = async (values: any, oAuthParams: any): Promise<IResponse> => {
  return await api.post(`/api/login${oAuthParamsToQuery(oAuthParams)}`, JSON.stringify(values))
}

export const logout = async (): Promise<IResponse> => {
  return await api.post('/api/logout', {})
}

export const unlink = async (values: Record<string, string>): Promise<IResponse> => {
  return api.post('/api/unlink', JSON.stringify(values));
}
