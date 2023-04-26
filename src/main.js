import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js'
import './assets/css/global.css'

createApp(App).use(store).use(router).mount('#app')
