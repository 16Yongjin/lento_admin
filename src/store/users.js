import Vue from 'vue'
import axios from './client'

export default {
  state: {
    userImages: []
  },
  mutations: {
    setUserImages (state, payload) {
      state.userImages = payload
    },
    updateUserImage (state, image) {
      const idx = state.userImages.findIndex(p => p._id === image._id)
      Vue.set(state.userImages, idx, image)
    },
    deleteUserImage (state, id) {
      const idx = state.userImages.findIndex(p => p._id === id)
      state.userImages.splice(idx, 1)
    },
    clearUserImages (state) {
      state.userImages = []
    }
  },
  actions: {
    loadUserImages ({ commit }) {
      axios.get('/users/images')
        .then(({ data }) => {
          // console.log(data)
          commit('setUserImages', data)
        })
    },
    saveUserImage ({ commit }, { _id, image, to }) {
      axios.post(`/users/images/${_id}`, { _id, image, to })
        .then(({ data }) => {
          data ? commit('updateUserImage', data)
               : commit('deleteUserImage', _id)
        })
        .then(() => {
          axios.get(`/foods/${to}`).then(({ data }) => {
            // console.log(data)
            commit('updateFood', data)
          })
        })
    },
    deleteUserImage ({ commit }, { _id, image }) {
      console.log('deleteUserImage', _id, image)
      axios.delete(`/users/images/${_id}`, { params: { image } })
        .then(({ data }) => {
          // console.log(data)
          data ? commit('updateUserImage', data)
               : commit('deleteUserImage', _id)
        })
    }
  },
  getters: {
    userImages ({ userImages }) {
      const res = []
      userImages.forEach(user => {
        const { _id, to, name, images } = user
        images.forEach(image => {
          res.push({ _id, to, name, image })
        })
      })
      return res
    }
  }
}
