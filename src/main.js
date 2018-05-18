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
//全局过滤器
import filter from '../handle/filter.js'
//api接口地址
import InterFace from '../handle/interface.js'
Vue.config.productionTip = false
Vue.prototype.urlApi = InterFace;
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
