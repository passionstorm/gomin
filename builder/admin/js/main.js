import Vue from 'vue';
import App from './vue/App.vue';
import router from './vue/router';
import store from './vue/store';
import toast from './vue/widgets/toast'
import notification from './vue/widgets/notification'

import { extend,  localize} from 'vee-validate';

import * as rules from 'vee-validate/dist/rules';
for (let rule in rules) {
  // add the rule
  extend(rule, rules[rule]);
}
// import locale from 'vee-validate';


Vue.use(toast)
Vue.use(notification)
// console.log(Vue);
export const bus = new Vue();
new Vue({
  render: h => h(App),
  router,
  store,
  bus,
  locale : 'vi'
}).$mount('#app');

