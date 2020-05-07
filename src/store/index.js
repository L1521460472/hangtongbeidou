import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuex)
Vue.use(ElementUI)

export default new Vuex.Store({
  state: {
    cookie:'',//vuex 的数据是存储在浏览器维护的内存中，页面刷新会重新初始化，简单的说，就是没了。
    loginDTO: {
      userName: "admin",
      userPassword: "888888"
    },
  },
  mutations: {
    getCookie(state,payload){
      state.cookie = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
