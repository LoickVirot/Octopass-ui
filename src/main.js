// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import Octopass from 'octopass-client-sdk/dist/octopass'
import VClipboard from 'v-clipboard'

Vue.config.productionTip = false
let octopass = new Octopass('123456')

Vue.use(VueCookie)
Vue.use(VClipboard)
Vue.prototype.$octopassSdk = octopass

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
