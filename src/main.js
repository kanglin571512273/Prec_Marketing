// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "@/utils/importFile";
import "@/assets/css/base.css";
import "@/assets/iconfont/iconfont.css";

// 引入css
import "./assets/css/reset.css";

// 引入UI组件样式
import "element-ui/lib/theme-chalk/index.css";

// 引用公共方法
import { selectDictLabel } from "@/utils/public";

// 全局方法挂载
Vue.prototype.selectDictLabel = selectDictLabel;

// 移动端适配
import "amfe-flexible/index.js";

/* // 无限加载
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll); */

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
