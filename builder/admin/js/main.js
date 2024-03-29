import Vue from 'vue';
import App from './vue/App.vue';
import router from './vue/router';
import store from './vue/store';
import toast from './vue/widgets/toast';
import notification from './vue/widgets/notification';
import {loadLocale} from './vue/validator';
import VueFroala from 'vue-froala-wysiwyg';

Vue.use(toast);
Vue.use(notification);
Vue.use(VueFroala);
let locale = 'vi';
loadLocale(locale);

export const bus = new Vue();
new Vue({
  render: h => h(App),
  router,
  store,
  bus,
  locale: locale,
}).$mount('#app');

