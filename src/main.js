import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toasts from './toasts';

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(toasts)
  .mount('#app')
