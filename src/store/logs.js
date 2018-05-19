import axios from './client'

export default {
  state: {
    logs: {}
  },
  mutations: {
    setLogs (state, payload) {
      state.logs = payload
    }
  },
  actions: {
    loadLogs ({ commit }) {
      axios.get('/users/logs')
        .then(({ data }) => {
          console.log(data)
          commit('setLogs', Object.entries(data))
        })
    }
  },
  getters: {
    logs ({ logs }) {
      return logs
    }
  }
}
