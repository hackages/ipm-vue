import {getConfig} from '@/constants/config';
import '@/filters';
import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$config = getConfig();
Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
}).$mount('#app');
