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

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/boot/axios';
import { IApplication } from 'src/components/models/application';

export const getApplicationsByOrganization = async (owner: string, organization: string): Promise<IApplication[]>  => {
  return api.get(`/api/get-applications?owner=${owner}&organization=${organization}`);
}

export const getApplication = async (owner: string, name: string): Promise<IApplication> => {
  return await api.get(`/api/get-application?id=${owner}/${encodeURIComponent(name)}`);
};

export const getUserApplication = async (owner: string, name: string | number | boolean): Promise<IApplication> => {
  return await api.get(`/api/get-user-application?id=${owner}/${encodeURIComponent(name)}`);
}
