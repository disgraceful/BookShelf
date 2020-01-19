
import Vue from "vue"
import Vuex from "vuex"
import { ServiceFactory } from "../services/serviceFactory";
const authService = ServiceFactory.get("auth");
const userService = ServiceFactory.get("user");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: null,
    error: null,
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
    }
  },
  actions: {
    signUpUser({ commit }, payload) {
      authService.signUp(payload.email, payload.password)
        .then(user => {
          localStorage.setItem("user", JSON.stringify({ id: user.id, email: user.email }))
          commit("setUser", user);
        }).catch(error => {
          commit("setError", error.body);
        })
    },

    signInUser({ commit }, payload) {
      authService.signIn(payload.email, payload.password)
        .then(user => {
          localStorage.setItem("user", JSON.stringify({ id: user.id, email: user.email }))
          commit("setUser", user);
        }).catch(error => {
          commit("setError", error.body);
        })
    },

    validateUser({ commit }) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        userService.getUser(user.id).then(
          dbUser => {
            console.log(dbUser);
            commit("setUser", dbUser);
          }
        ).catch(error => {
          commit("setError", error.body);
        })
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
    }
  }
})
