/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/boot/axios';
import { IAccount, IResponse } from 'src/components/models/account';
import { IApplication } from 'src/components/models/application'
import { IOAuthParams } from 'src/components/models/oauth';

export const getAccount = async (query: string): Promise<IAccount> => {
  return await api.get(`/api/get-account${query}`);
};

function oAuthParamsToQuery(oAuthParams: IOAuthParams | null) {
  // login
  if (oAuthParams === null) {
    return '';
  }

  // code
  return `?clientId=${oAuthParams.clientId}&responseType=${oAuthParams.responseType}&redirectUri=${oAuthParams.redirectUri}&scope=${oAuthParams.scope}&state=${oAuthParams.state}&nonce=${oAuthParams.nonce}&code_challenge_method=${oAuthParams.challengeMethod}&code_challenge=${oAuthParams.codeChallenge}`;
}

export const getApplicationLogin = async (oAuthParams: IOAuthParams | null): Promise<IApplication> => {
  return await api.get(`/api/get-app-login${oAuthParamsToQuery(oAuthParams)}`)
}

export const login = async (values: any, oAuthParams: any): Promise<IResponse> => {
  return await api.post(`/api/login${oAuthParamsToQuery(oAuthParams)}`, JSON.stringify(values))
}

export const logout = async (): Promise<IResponse> => {
  return await api.post('/api/logout', {})
}
