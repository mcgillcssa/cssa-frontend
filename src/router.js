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
    component: MembershipBenefitsPage,
    meta: { title: 'McGill CSSA | 会员福利' }
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'McGill CSSA'
  next()
})

export default router
