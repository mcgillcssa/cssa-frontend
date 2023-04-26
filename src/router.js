import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import EventPage from './pages/EventPage.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/event',
    name: 'event',
    component: EventPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
