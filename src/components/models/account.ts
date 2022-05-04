/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrganization } from './organization';
import { IUser } from './user';

export interface IAccount {
  status: string;
  msg: string;
  sub: string;
  name: string;
  data?: IUser | null;
  data2?: IOrganization | null;

  user?: IUser | null;
  organization?: IOrganization | null;
}

export interface IResponse {
  status: string;
  msg: string;
  sub: string;
  name: string;
  data: any;
  data2?: any;
}

export interface IHumanCheck {
  type: string;
  appKey: string;
  scene: string;
  captchaId: string;
  captchaImage: string;
}

export interface ISignupRequestForm {
  application: string;
  organization: string;
  username: string;
  name: string;
  password: string;
  confirm: string;
  email: string;
  emailCode: string;
  agreement: boolean;
  phonePrefix: string;
}
