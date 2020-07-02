import Vue from "vue";
import VueResource from "vue-resource";
import interceptor from "./interceptor";

Vue.use(VueResource);
Vue.http.options.root = "http://localhost:4200/";

Vue.http.interceptors.push(interceptor);
