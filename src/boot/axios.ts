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
  timeout: 10000,
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
