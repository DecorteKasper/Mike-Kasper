import { createRouter, createWebHistory } from 'vue-router'



import useFirebase from '@/composables/useFirebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/temp',
      component: () => import('../views/Temp.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/redder',
      component: () => import('../views/redder/Home.vue'),
      meta: { shouldBeAuthenticated: true },
    },


    // {
    //   path: '/birds',
    //   component: () => import('../views/birds/index.vue'),
    // },
    // {
    //   path: '/birds/:slug',
    //   component: () => import('../views/birds/_slug.vue'),
    // },

    // {
    //   path: '/observations',
    //   component: () => import('../views/observations/index.vue'),
    //   meta: { shouldBeAuthenticated: true },
    // },

    {
      path: '/account',
      component: () => import('../views/Account.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/auth',
      component: () => import('../components/wrappers/AuthWrap.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/Login.vue'),
          meta: { preventLoggedIn: true },
        },

        {
          path: 'register',
          component: () => import('../views/auth/Register.vue'),
        },

        {
          path: 'forgot-password',
          component: () => import('../views/auth/ForgotPassword.vue'),
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { firebaseUser } = useFirebase()

  if (to.meta.shouldBeAuthenticated && !firebaseUser.value) {
    console.log('HACKER')
    next({ path: '/auth/login' })
  } else {
    next()
  }
})

export default router
