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

export interface IProvider {
  owner: string;
  name: string;
  createdTime: Date;
  displayName: string;
  category: string;
  type: string;
  subType: string;
  method: string;
  clientId: string;
  clientSecret: string;
  clientId2: string;
  clientSecret2: string;
  cert: string;
  customAuthUrl: string;
  customScope: string;
  customTokenUrl: string;
  customUserInfoUrl: string;
  customLogo: string;
  host: string;
  port: number;
  title: string;
  content: string;
  regionId: string;
  signName: string;
  templateCode: string;
  appId: string;
  endpoint: string;
  intranetEndpoint: string;
  domain: string;
  bucket: string;
  metadata: string;
  idP: string;
  issuerUrl: string;
  enableSignAuthnRequest: boolean;
  providerUrl: string;
}
