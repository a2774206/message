// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios;
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
Vue.use(MintUI)
import filter from './store/filter.js'
//import VueSocketio from 'vue-socket.io';
//Vue.use(VueSocketio, 'http://127.0.0.1:8080/gs-guide-websocket');
Vue.config.productionTip = false

//import vonic from 'vonic'
//Vue.use(Vonic.app)
//全局过滤器注册
for (let i in filter) {  
    Vue.filter(i,filter[i]);
}  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
