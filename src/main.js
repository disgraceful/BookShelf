import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueResource from "vue-resource"
import "./css/style.css"
import "@/css/style.css"

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:4200/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  async beforeCreate() {
    console.log("validating user");
    await this.$store.dispatch("validateUser");
  }
}).$mount('#app')
