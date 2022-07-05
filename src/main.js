import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'; 
import axios from "axios";  
import './theme/index.css'
import router from './router'
import Base64 from './assets/base64.js' 
import store from './store/store'
Vue.prototype.$Base64 = Base64
Vue.prototype.axios = axios;
Vue.use(ElementUI) 
import Rubik from 'i-rubik'
Vue.use(Rubik)
new Vue({
  store,
  router, 
  Element,
  Rubik,
  render: h => h(App),
}).$mount('#app')
