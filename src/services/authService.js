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

  getTwitterAuthUrl() {
    return Vue.http.get("auth/twitter/url");
  },

  signInTwitter(token, verifier) {
    return Vue.http.post(`auth/twitter/login?token=${token}&verifier=${verifier}`);
  },
};
