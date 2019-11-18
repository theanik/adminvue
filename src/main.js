/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import './registerServiceWorker'
import moment from 'moment';
import axios from 'axios'
import ArgonDashboard from './plugins/argon-dashboard'
import { BModal, VBModal } from 'bootstrap-vue'
import wrap from '@vue/web-component-wrapper'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import VueAxios from 'vue-axios'
import { Form, HasError, AlertError } from 'vform'

window.Form = Form;
Vue.use(VueAxios, axios)
window.fetch = fetch;
const Snotifyoptions = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}
Vue.component('b-modal', BModal)
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive('b-modal', VBModal)

Vue.use(Snotify, Snotifyoptions)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.filter('mydate',function(createAt){
  return moment(createAt).format('MMMM Do YYYY');
});
Vue.use(ArgonDashboard)
new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
