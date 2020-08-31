import Vue from "vue";
import router from "./router"; // 路由
import store from "./store"; // vuex
import EVueContextmenu from "e-vue-contextmenu"; // 右键菜单
import "./styles/global.css"; // 全局样式
import "./utils/EUI"; // element-ui
import "./utils/directive"; // 指令
import "./utils/filter"; // 过滤器
import "./icons"; // svg
import App from "./App.vue";
import {lang} from "@/utils/common";

// Vue.prototype.$fileSaver = require('file-saver'); // 下载文件
Vue.prototype.$nodeEnv = process.env.NODE_ENV;
Vue.prototype.$baseApi = process.env.VUE_APP_BASE_API;
Vue.prototype.$lang = lang; // 语言
Vue.use(EVueContextmenu);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
