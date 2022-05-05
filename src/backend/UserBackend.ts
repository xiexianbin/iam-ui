import * as Util from 'src/auth/Util';
import { api } from 'src/boot/axios';
import { IHumanCheck, IResponse } from 'src/components/models/account';
import { IUser } from 'src/components/models/user';

export const getUser = async (owner: string, name: string): Promise<IUser> => {
  return api.get(`/api/get-user?id=${owner}/${encodeURIComponent(name)}`)
}


export const setPassword = async (userOwner: string, userName: string, oldPassword: string, newPassword: string): Promise<IResponse> => {
  const formData = new FormData();
  formData.append('userOwner', userOwner);
  formData.append('userName', userName);
  formData.append('oldPassword', oldPassword);
  formData.append('newPassword', newPassword);
  return api.post('/api/set-password', formData);
}

export const sendCode = async (checkType: string, checkId: string, checkKey: string, dest: string, type: string, orgId: string, checkUser: string) => {
  const formData = new FormData();
  formData.append('checkType', checkType);
  formData.append('checkId', checkId);
  formData.append('checkKey', checkKey);
  formData.append('dest', dest);
  formData.append('type', type);
  formData.append('organizationId', orgId);
  formData.append('checkUser', checkUser);
  const res: IResponse = await api.post('/api/send-verification-code', formData)
  if (res.status === 'ok') {
    Util.showMessage('success', 'Code Sent');
    return true;
  } else {
    Util.showMessage('error', res.msg);
    return false;
  }
}

export const getHumanCheck = async(): Promise<IHumanCheck> => {
  return await api.get('/api/get-human-check');
}
