import Vue from 'vue';
import App from './vue/App.vue';
import router from './vue/router';
import store from './vue/store';
import toast from './vue/widgets/toast'
import notification from './vue/widgets/notification'
// import Buefy from 'buefy'
// Vue.use(Buefy)


Vue.use(toast)
Vue.use(notification)
// console.log(Vue);
export const bus = new Vue();
new Vue({
  render: h => h(App),
  router,
  store,
  bus,
}).$mount('#app');

