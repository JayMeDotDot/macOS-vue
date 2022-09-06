import { createRouter, createWebHistory } from 'vue-router'
import { useSysState } from '@/store/sysState'

import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Update from '@/pages/Update'

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: () => {
    //   const sysState = useSysState()
    //   if (!sysState.isLogged) { return { name: 'Login'}}
    // }
  },
  { 
    path: '/login',
    name: 'Login',
    component: Login,
  },
  { 
    path: '/update', 
    name: 'Update',
    component: Update 
  },
  { 
    path: '/:pathMatch(.*)*',
    redirect: '/' 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router