import { createRouter, createWebHistory } from 'vue-router'
import i18n from './locales/index.js'
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
    meta: { titleKey: 'nav.home' }
  },
  {
    path:'/aboutus',
    name: 'AboutUs',
    component: AboutUsPage,
    meta: { titleKey: 'nav.about' }
  },
  {
    path:'/joinus',
    name: 'JoinUs',
    component: JoinUsPage,
    meta: { titleKey: 'nav.joinUs' }
  },
  {
    path: '/membership',
    name: 'Membership',
    component: MembershipPage,
    meta: { titleKey: 'nav.membership' }
  },
  {
    path: '/benefits',
    name: 'Benefits',
    component: BenefitsPage,
    meta: { titleKey: 'nav.benefits' }
  },
  {
    path: '/access/qrscan',
    redirect: '/benefits'
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    component: SponsorPage,
    meta: { titleKey: 'nav.sponsor' }
  },
  {
    path: '/events',
    name: 'Events',
    component: EventPage,
    meta: { titleKey: 'nav.event' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { t } = i18n.global
  if (to.meta.titleKey) {
    document.title = `McGill CSSA | ${t(to.meta.titleKey)}`
  } else {
    document.title = 'McGill CSSA'
  }
  next()
})

export default router
