import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import Echarts from "echarts";
import 'echarts/extension/bmap/bmap';
// import BaiduMap from 'vue-baidu-map'

Vue.use(ElementUI);
Vue.use(Echarts);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
