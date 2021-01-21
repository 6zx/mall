import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {formatDate} from 'common/utils'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue();

// 添加事件总线对象
Vue.use(toast)

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
  render: h => h(App),
  store
}).$mount('#app')
