import Vue from "vue";
import VueResource from "vue-resource";
import interceptor from "./interceptor";

Vue.use(VueResource);
Vue.http.options.root =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_SERVER_PROD
    : process.env.VUE_APP_SERVER_DEV;

Vue.http.interceptors.push(interceptor);
