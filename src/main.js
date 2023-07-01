import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

createApp(App).use(store).use(router).mount('#app')
