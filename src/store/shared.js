import axios from './client'

export default {
  state: {
    auth: null,
    loading: false,
    error: null
  },
  mutations: {
    setAuth (state, payload) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload
      state.auth = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    login ({ commit, dispatch }, { username, password, go }) {
      return axios.post(`/auth/login`, { username, password })
        .then(res => {
          commit('setAuth', res.data.token)
          commit('setError', null)
        })
        .then(() => {
          dispatch('loadFoods')
          dispatch('loadUserImages')
          go()
        })
        .catch(err => {
          console.log(err)
          commit('setError', err.message)
        })
    },
    logout ({ commit }) {
      commit('clearFoods')
      commit('clearUserImages')
      commit('setAuth', null)
    },
    loadingOn ({ commit }) { commit('setLoading', true) },
    loadingOff ({ commit }) { commit('setLoading', false) },
    refresh ({ dispatch }) {
      dispatch('loadFoods')
      dispatch('loadUserImages')
    }
  },
  getters: {
    loading: ({ loading }) => loading,
    auth: ({ auth }) => auth,
    error: ({ error }) => error
  }
}
