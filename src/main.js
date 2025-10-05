import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js'
import i18n from './locales/index.js'
import './assets/css/global.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, fas)

createApp(App).component('fa', FontAwesomeIcon).use(store).use(router).use(i18n).mount('#app')
