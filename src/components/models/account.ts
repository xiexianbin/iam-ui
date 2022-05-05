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
