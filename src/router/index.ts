import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { StateInterface } from '../store';
import routes from './routes';
import * as AuthBackend from 'src/auth/AuthBackend'
import { goToLink } from 'src/Setting';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function ({ store } /* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  // router Guard
  Router.beforeEach(async (to, from, next) => {
    // if current status is sign out, and Cookies has iam_session_id, then auto sign in
    if (!store.state.auth.isSignin && !to.meta.isPublic) {
      console.log('not signin, try auto sign in...');
      await AuthBackend.getAccount('').then((resp) => {
        if (resp.status === 'error') {
          console.log('not signin', resp)
          goToLink('/signin')
        } else {
          void store.dispatch('auth/setAccount', resp);
        }
      })
    }

    next();
  });

  return Router;
});
