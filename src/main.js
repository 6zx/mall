import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {formatDate} from 'common/utils'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

// 源代码写在DetailShopInfo.vue中报错，改为全局的
Vue.filter('sellCountFilter', function(value) {
  if (value < 10000) return value;
  return (value / 10000).toFixed(1) + '万';
})

Vue.filter('showDate', function (value) {
  let date = new Date(value * 1000);
  return formatDate(date, "yyyy-MM-dd hh:mm");
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
