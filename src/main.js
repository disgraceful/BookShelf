import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMq from "vue-mq";
import "./css/style.css";
import "./http/config";

// 463636811603-dujav8toqr9ijfek13vfclg723dnqrfe.apps.googleusercontent.com
// xmPuJHJ0AXV7BgSgtxObPJ_d;

Vue.use(VueMq, {
  breakpoints: {
    xs: 500,
    sm: 800,
    md: 1200,
    lg: Infinity,
  },
  defaultBreakpoint: "sm",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    this.$store.dispatch("getSavedUser");
  },
}).$mount("#app");
