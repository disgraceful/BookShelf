import Vue from "vue";

export default {
  signIn(email, password) {
    return Vue.http.post("auth/login", { email, password });
  },

  signUp(email, password) {
    return Vue.http.post("auth/register", { email, password });
  },

  signInGoogle(token) {
    return Vue.http.post("auth/google/login", { token });
  },
};
