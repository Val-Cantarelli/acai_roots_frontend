import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/acai_roots',
    redirect:{ name : 'home'}
  },

  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/acai_roots/Orders',
    redirect:{ name : 'orders'}
  },
  {
    path: '/Orders',
    name: 'orders',
    component: () => import('../views/Orders.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
