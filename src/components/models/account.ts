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
