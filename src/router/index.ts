import { Cookies } from 'quasar';
import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { StateInterface } from '../store';
import routes from './routes';

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
  Router.beforeEach((to, from, next) => {
    // if current status is sign out, and localStorage has token, then auto sign in
    if (!store.state.auth.isSignin && localStorage.getItem('token')) {
      console.log('localStorage is valid, auto sign in.');
      void store.dispatch('user/asyncSetUser', localStorage.getItem('token'));
    }

    // get token from cookies
    if (!store.state.auth.isSignin && !to.meta.isPublic && Cookies.has('token')) {
      const token = Cookies.get('token')
      console.log('jwt is:', token)
      void store.dispatch('auth/asyncSetUser', token);
    }

    // guard token

    next();
  });

  return Router;
});
