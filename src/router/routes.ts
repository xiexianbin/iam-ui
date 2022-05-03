import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Index.vue'),
      meta: {
        isPublic: false
      }
    }],
  },
  {
    path: '/signin',
    component: () => import('layouts/SampleLayout.vue'),
    children: [{
        path: '',
        component: () => import('src/pages/SignIn.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/signout',
    component: () => import('layouts/SampleLayout.vue'),
    children: [{
        path: '',
        component: () => import('src/pages/SignOut.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/signup',
    component: () => import('layouts/SampleLayout.vue'),
    children: [
      {
        path: '', component: () => import('src/pages/SignUp.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/signin/oauth/authorize',
    component: () => import('layouts/SampleLayout.vue'),
    children: [{
        path: '',
        component: () => import('src/pages/SignInOAuth.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/signup/oauth/authorize',
    component: () => import('layouts/SampleLayout.vue'),
    children: [{
        path: '',
        component: () => import('src/pages/SignUpOAuth.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/callback',
    component: () => import('layouts/SampleLayout.vue'),
    children: [{
        path: '',
        component: () => import('src/pages/Callback.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('src/pages/About.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('src/pages/user/Index.vue'),
        meta: {
          isPublic: false,
          role: 'user'
        }
      },
      {
        path: 'tokens', component: () => import('src/pages/user/tokens/Index.vue'),
        meta: {
          isPublic: false,
          role: 'admin'
        }
      },
      {
        path: 'records', component: () => import('src/pages/user/records/Index.vue'),
        meta: {
          isPublic: false,
          role: 'admin'
        }
      }
    ],
  },
  {
    path: '/manager',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '', component: () => import('src/pages/manager/Index.vue'),
        meta: {
          isPublic: false,
          role: 'admin'
        }
      },
      {
        path: 'providers', component: () => import('src/pages/manager/providers/Index.vue'),
        meta: {
          isPublic: false,
          role: 'admin'
        }
      },
      {
        path: 'tokens', component: () => import('src/pages/manager/tokens/Index.vue'),
        meta: {
          isPublic: false,
          role: 'admin'
        }
      },
      {
        path: 'records', component: () => import('src/pages/manager/records/Index.vue'),
        meta: {
          isPublic: false,
          role: 'admin'
        }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ],
  },
];

export default routes;
