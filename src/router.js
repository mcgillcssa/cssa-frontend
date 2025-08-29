import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/Home.vue'
import AboutUsPage from './pages/AboutUs.vue'
import JoinUsPage from './pages/JoinUs.vue'
import MembershipPage from './pages/Membership.vue'
import BenefitsPage from './pages/Benefits.vue'
import SponsorPage from './pages/SponsorPage.vue'
import EventPage from './pages/Event.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'McGill CSSA | 首页' }
  },
  {
    path:'/aboutus',
    name: 'AboutUs',
    component: AboutUsPage,
    meta: { title: 'McGill CSSA | 关于我们' }
  },
  {
    path:'/joinus',
    name: 'JoinUs',
    component: JoinUsPage,
    meta: { title: 'McGill CSSA | 加入我们' }
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
  },
  {
    path: '/events',
    name: 'Events',
    component: EventPage,
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
