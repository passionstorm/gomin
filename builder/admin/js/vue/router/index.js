import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';

Vue.use(Router);
import Layout from '@/components/layouts/DefaultLayout'
const r = new Router({
  mode: 'history',
  routes: routes,
});


export default r;
