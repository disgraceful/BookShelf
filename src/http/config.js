import Vue from "vue";
import VueResource from "vue-resource";
import interceptor from "./interceptor";

Vue.use(VueResource);
Vue.http.options.root = "https://bookshelf-server.herokuapp.com/";

Vue.http.interceptors.push(interceptor);
