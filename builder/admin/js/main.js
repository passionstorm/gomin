import Vue from 'vue';
import App from './vue/App.vue';
import router from './vue/router';
import store from './vue/store';

Vue.config.productionTip = false;
export const bus = new Vue();
new Vue({
  render: h => h(App),
  router,
  store,
  bus,
}).$mount('#app');

