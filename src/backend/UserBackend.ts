import * as Util from 'src/auth/Util';
import { api } from 'src/boot/axios';
import { IHumanCheck, IResponse } from 'src/components/models/account';

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
