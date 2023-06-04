import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HelloWorld'
import SponsorPage from '@/components/SponsorPage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: SponsorPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
