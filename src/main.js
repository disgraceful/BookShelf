import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueResource from "vue-resource";
import VueMq from 'vue-mq'
import "./css/style.css";
import Preloader from "./components/shared/Preloader";

Vue.use(VueResource);
Vue.config.productionTip = false
Vue.http.options.root = 'http://localhost:4200/';

Vue.use(VueMq, {
  breakpoints: {
    xs: 500,
    sm: 800,
    md: 1200,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm'
})

Vue.component("bs-loader", Preloader)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  async beforeCreate() {
    await this.$store.dispatch("validateUser");
  }
}).$mount('#app')
