// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import VueLazyLoad from 'vue-lazyload'
import './assets/css/main.css'
import 'lib-flexible'
import './assets/stylus/index.styl'
Vue.config.productionTip = false
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/store.js'
Vue.use(VueLazyLoad,{
    error:'./static/error.png',
    loading:require('./assets/images/manhead-default.png'),
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

