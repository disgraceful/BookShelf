
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: JSON.parse(localStorage.getItem('user')) || null,
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
      Vue.http.post('http://localhost:4200/auth/register', {
        email: payload.email,
        password: payload.password
      })
        .then(response => {
          const user = response.body;
          localStorage.setItem('user', JSON.stringify(user));
          commit('setUser', user);
        })
        .catch(error => {
          commit('setError', error.body);
        })
    },
    signInUser({ commit }, payload) {
      Vue.http.post('http://localhost:4200/auth/login', {
        email: payload.email,
        password: payload.password
      }).then(response => {
        const user = response.body;
        localStorage.setItem('user', JSON.stringify(user));
        commit('setUser', user);
      }).catch(error => {
        commit('setError', error.body);
      })
    },
    clearError({ commit }) {
      commit('clearError');
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
