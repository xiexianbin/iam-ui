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

export interface IUser {
  owner: string;
  name: string;
  createdTime: Date;
  updatedTime: string;

  id: string;
  type: string;
  password: string;
  passwordSalt: string;
  displayName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  permanentAvatar: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  location: string;
  address: string|string[];
  affiliation: string;
  title: string;
  idCardType: string;
  idCard: string;
  homepage: string;
  bio: string;
  tag: string;
  region: string;
  language: string;
  gender: string;
  birthday: string;
  education: string;
  score: number;
  karma: number;
  ranking: number;
  isDefaultAvatar: boolean;
  isOnline: boolean;
  isAdmin: boolean;
  isGlobalAdmin: boolean;
  isForbidden: boolean;
  isDeleted: boolean;
  signupApplication: string;
  hash: string;
  preHash: string;

  createdIp: string;
  lastSigninTime: string;
  lastSigninIp: string;

  github: string;
  google: string;
  qq: string;
  wechat: string;
  unionId: string;
  facebook: string;
  dingtalk: string;
  weibo: string;
  gitee: string;
  linkedin: string;
  wecom: string;
  lark: string;
  gitlab: string;
  adfs: string;
  baidu: string;
  alipay: string;
  casdoor: string;
  infoflow: string;
  apple: string;
  azuread: string;
  slack: string;
  steam: string;
  custom: string;

  ldap: string;
  properties: Record<string, unknown>;
}
