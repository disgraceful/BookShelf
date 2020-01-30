
import Vue from "vue"
import Vuex from "vuex"
import { ServiceFactory } from "../services/serviceFactory";
const authService = ServiceFactory.get("auth");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: null,
    error: null,
    loading: false,
  },

  mutations: {
    setUser(state, payload) {
      console.log("state init");
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
    }
  },
  actions: {
    signUpUser({ commit }, payload) {
      commit("setLoading", true);
      authService.signUp(payload.email, payload.password)
        .then(response => {
          const user = response.user;
          const token = response.token;
          localStorage.setItem("user", JSON.stringify({ id: user.id, email: user.email, token: token }));
          commit("setUser", user);
          commit("setLoading", false);
        }).catch(error => {
          commit("setError", error.body);
        })
    },

    signInUser({ commit }, payload) {
      authService.signIn(payload.email, payload.password)
        .then(response => {
          const user = response.user;
          const token = response.token;
          localStorage.setItem("user", JSON.stringify({ id: user.id, email: user.email, token: token }));
          commit("setUser", user);
          //commit("setLoading", false);
        }).catch(error => {
          commit("setError", error.body);
        })
    },

    validateUser({ commit }) {
      commit("setLoading", true);
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        console.log("validating user");
        commit("setUser", user);
      }
    },

    logOutUser({ commit }) {
      localStorage.removeItem("user");
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    }
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
    }
  }
})
