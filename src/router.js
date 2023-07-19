import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/Home.vue'
import MembershipBenefitsPage from './pages/MembershipBenefits.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/membership-benefits',
    name: 'Membership Benefits',
    component: MembershipBenefitsPage
  },
  {
    path: '/access/qrscan',
    redirect: '/membership-benefits'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
