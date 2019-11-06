import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import Card from '@/components/widgets/Card';
import Editor from '@/components/widgets/Editor';

Vue.config.productionTip = false;

Vue.component('Card', Card);
Vue.component('Editor', Editor);
export const bus = new Vue();
new Vue({
  render: h => h(App),
  router,
  store,
  bus,
}).$mount('#app');

