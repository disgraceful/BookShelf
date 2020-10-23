import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMq from "vue-mq";
import "./css/style.css";
import "./http/config";

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
