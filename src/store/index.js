import Vue from "vue";
import Vuex from "vuex";
import { ServiceFactory } from "../services/serviceFactory";
const authService = ServiceFactory.get("auth");

Vue.use(Vuex);

const saveUser = function(response) {
  const body = response.body;
  const user = { id: body.id, email: body.email, token: body.token };
  localStorage.setItem(
    "user",
    JSON.stringify({ id: user.id, email: user.email, token: user.token })
  );
  return user;
};

export default new Vuex.Store({
  state: {
    authUser: null,
    error: null,
    loading: false,
    loginProvider: null,
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

    setProvider(state, payload) {
      state.loginProvider = payload;
    },
  },

  actions: {
    signUpUser({ commit }, payload) {
      commit("setLoading", true);
      commit("setProvider", "email");
      authService
        .signUp(payload.email, payload.password)
        .then((response) => {
          const user = saveUser(response);

          commit("setUser", {
            id: user.id,
            email: user.email,
            token: user.token,
          });
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error.body);
          commit("setLoading", false);
        });
    },

    signInUser({ commit }, payload) {
      commit("setLoading", true);
      commit("setProvider", "email");
      authService
        .signIn(payload.email, payload.password)
        .then((response) => {
          const user = saveUser(response);
          commit("setUser", {
            id: user.id,
            email: user.email,
            token: user.token,
          });
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error.body);
          commit("setLoading", false);
        });
    },

    signInUserGoogle({ commit }, payload) {
      commit("setLoading", true);
      commit("setProvider", "google");
      authService
        .signInGoogle(payload.token)
        .then((response) => {
          console.log(response);
          const user = saveUser(response);
          commit("setUser", {
            id: user.id,
            email: user.email,
            token: user.token,
          });
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error.body);
          commit("setLoading", false);
        });
    },

    signInUserTwitter({ commit }, payload) {
      commit("setLoading", true);
      commit("setProvider", "twitter");
      authService
        .signInTwitter(payload.token, payload.verifier)
        .then((response) => {
          const user = saveUser(response);
          commit("setUser", {
            id: user.id,
            email: user.email,
            token: user.token,
          });
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error.body);
          commit("setLoading", false);
        });
    },

    getSavedUser({ commit }) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        commit("setUser", user);
      }
    },

    logOutUser({ commit }) {
      localStorage.removeItem("user");
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

    getProvider(state) {
      return state.loginProvider;
    },
  },
});
