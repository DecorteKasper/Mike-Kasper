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
    {
      path: '/redder/schedule',
      component: () => import('../views/redder/Schedule.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/redder/months',
      component: () => import('../views/redder/ChooseMonths.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/redder/report',
      component: () => import('../views/redder/Report.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/redder/chooseschedule',
      component: () => import('../views/redder/ChooseSchedule.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/jobs',
      component: () => import('../views/admin/Jobs.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/reports',
      component: () => import('../views/admin/Reports.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/schedule',
      component: () => import('../views/admin/Schedule.vue'),
      meta: { shouldBeAuthenticated: true },
    },
    {
      path: '/sos',
      component: () => import('../views/admin/Sos.vue'),
      meta: { shouldBeAuthenticated: true },
    },
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
