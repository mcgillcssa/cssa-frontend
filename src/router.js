import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/Home.vue'
import MembershipPage from './pages/Membership.vue'
import BenefitsPage from './pages/Benefits.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/membership',
    name: 'Membership',
    component: MembershipPage,
    meta: { title: 'McGill CSSA | 会员' }
  },
  {
    path: '/benefits',
    name: 'Benefits',
    component: BenefitsPage,
    meta: { title: 'McGill CSSA | 会员福利' }
  },
  {
    path: '/access/qrscan',
    redirect: '/benefits'
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    component: SponsorPage,
    meta: { title: 'McGill CSSA | 赞助商' }
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
