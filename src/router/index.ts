import { createRouter, createWebHistory } from 'vue-router'
import { useSysState } from '@/store/sysState'

import JLogin from '@/pages/Login'
import JHome from '@/pages/Home'
import JUpdate from '@/pages/Update'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: JHome,
    beforeEnter: () => {
      const sysState = useSysState()
      if (!sysState.isLogged) {
        return { name: 'Login' }
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: JLogin
  },
  {
    path: '/update',
    name: 'Update',
    component: JUpdate
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
