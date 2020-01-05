
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: null
  },
  mutations: {
    setUser(state, payload) {
      state.authUser = payload;
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
          console.log(user.id)
          commit('setUser', user);
        })
    }
  },
  getters: {
    getAuthUser(state) {
      return state.authUser;
    }
  }
})
