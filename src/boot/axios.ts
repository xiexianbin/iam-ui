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
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.API,
  timeout: 30000,
  withCredentials: true,
});

// Request interceptors
api.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

// Response interceptors
api.interceptors.response.use(
  (response) => {
    console.debug(response);
    if (response.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  (err) => {
    console.debug(err);
    let errMsg = 'unknown error'

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (err && err.response && err.response.status) {
      const errCode = err.response.status;
      if (errCode == 401) {
        errMsg = 'Please Login'
      } else if (errCode == 404) {
        errMsg = 'Resource Not Found'
      } else if (errCode >= 400) {
        errMsg = err.response.data.message
      }
    }
    Notify.create({
      color: 'error',
      message: errMsg
    })
    return Promise.reject(err);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
