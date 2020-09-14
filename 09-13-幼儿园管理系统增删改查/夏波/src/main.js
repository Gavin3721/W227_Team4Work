import Vue from 'vue'
import App from './App.vue'
import router from '../../../myvue2/src/router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import './element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)
Vue.prototype.$axiod=Axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
