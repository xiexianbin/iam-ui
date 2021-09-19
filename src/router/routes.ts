import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Index.vue'),
      meta: {
        isPublic: true
      }
    }],
  },
  {
    path: '/signin',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
        path: '',
        component: () => import('src/pages/Signin.vue'),
        meta: {
          isPublic: true
        }
      }],
  },
  {
    path: '/signup',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('src/pages/Signup.vue'),
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
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '', component: () => import('src/pages/user/Index.vue'),
        meta: {
          isPublic: false,
          role: 'user'
        }
      }],
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
        path: 'organizations', component: () => import('src/pages/manager/organizations/Index.vue'),
        meta: {
          isPublic: false,
          role: 'admin'
        }
      },
      {
        path: 'users', component: () => import('src/pages/manager/users/Index.vue'),
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
        path: 'applications', component: () => import('src/pages/manager/applications/Index.vue'),
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
