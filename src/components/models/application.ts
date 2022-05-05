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

import { IOrganization } from './organization';
import { IProviderItem } from './providerItem';
import { ISignupItem } from './signupItem';

export interface IApplication {
  owner: string;
  name: string;
  createdTime: Date;

  displayName: string;
  logo: string;
  homepageUrl: string;
  description: string;
  organization: string;
  cert: string;
  enablePassword: boolean;
  enableSignUp: boolean;
  enableSigninSession: boolean;
  enableCodeSignin: boolean;
  providers: IProviderItem[];
  signupItems: ISignupItem[];
  grantTypes: string[];
  organizationObj: IOrganization;

  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  tokenFormat: string;
  expireInHours: number;
  refreshExpireInHours: number;
  signupUrl: string;
  signinUrl: string;
  forgetUrl: string;
  affiliationUrl: string;
  termsOfUse: string;
  signupHtml: string;
  signinHtml: string;
}
