import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入 axios
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAxios from "vue-axios";
 
Vue.use(VueAxios, axios)
	

//配置请求的根路径
//axios.defaults.baseURL = 'http://127.0.0.1:8080/'
// 可以通过 this.访问到prototype的$http
//Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
