import Vue from "vue";
import Vuex from "vuex";
import { ServiceFactory } from "../services/serviceFactory";
const authService = ServiceFactory.get("auth");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authUser: null,
    error: null,
    loading: false,
  },
  mutations: {
    setUser(state, payload) {
      state.authUser = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    signUpUser({ commit }, payload) {
      commit("setLoading", true);
      authService
        .signUp(payload.email, payload.password)
        .then((response) => {
          const user = response.user;
          const token = response.token;
          user.token = token;
          localStorage.setItem("token", token);
          commit("setUser", user);
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error.body);
          commit("setLoading", false);
        });
    },

    signInUser({ commit }, payload) {
      commit("setLoading", true);
      authService
        .signIn(payload.email, payload.password)
        .then((response) => {
          const user = response.user;
          const token = response.token;
          console.log(user);
          localStorage.setItem("token", token);
          commit("setUser", { id: user.id, email: user.email, token: token });
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error.body);
          commit("setLoading", false);
        });
    },

    validateUser({ commit }) {
      commit("setLoading", true);
      let token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        console.log("validating user");
        authService.validateToken(token).then((response) => {
          console.log(response);
          const user = response;
          user.token = token;
          commit("setUser", user);
          commit("setLoading", false);
        });
      } else {
        commit("setLoading", false);
      }
    },

    logOutUser({ commit }) {
      localStorage.removeItem("token");
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    },
  },
  getters: {
    getAuthUser(state) {
      return state.authUser;
    },
    getError(state) {
      return state.error;
    },
    getLoading(state) {
      return state.loading;
    },
  },
});
