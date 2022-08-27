import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Update from '@/pages/Update'

const routes = [
  { path: '/',
    component: Home,
    // beforeEnter: (to, from) => {

    //   // return { path: '/login', component: Login }
    // }
  },
  { path: '/login', component: Login },
  { path: '/update', component: Update },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router