import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Orders',
    name: 'orders',

    component: () => import('../views/Orders.vue')
  },

  {
     path: '/SignUpView',
     name: 'signup',

     component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/Login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
