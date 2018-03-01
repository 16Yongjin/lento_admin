import Vue from 'vue'
import axios from './client'

export default {
  state: {
    foods: [],
    editFood: null,
    editDialog: false,
    addDialog: false
  },
  mutations: {
    setEditDialog (state, payload) {
      state.editDialog = payload
    },
    setEditFood (state, food) {
      state.editFood = food
    },
    setAddDialog (state, payload) {
      state.addDialog = payload
    },
    loadFoods (state, foods) {
      state.foods = foods
    },
    updateFood (state, food) {
      const idx = state.foods.findIndex(f => f._id === food._id)
      Vue.set(state.foods, idx, food)
    },
    addFood (state, food) {
      state.foods.push(food)
    },
    deleteFood (state, food) {
      const idx = state.foods.findIndex(f => f._id === food._id)
      state.foods.splice(idx, 1)
    },
    clearFoods (state) {
      state.foods = []
    }
  },
  actions: {
    loadFoods ({ commit, getters }) {
      console.log('loadFood!')
      axios.get('/foods')
        .then(({data}) => commit('loadFoods', data))
        .catch(err => {
          console.log(err)
        })
    },
    openEditDialog ({ commit }, food) {
      commit('setEditDialog', true)
      commit('setEditFood', food)
    },
    editWithKey ({ commit }, { id, key, data }) {
      axios.post(`/foods/${id}`, { data: { [key]: data } })
        .then(({ data }) => {
          commit('updateFood', data)
        })
    },
    closeEditDialog ({ commit, getters }, food) {
      if (!food) {
        return commit('setEditDialog', false)
      }
      const editFood = getters.editFood
      const keys = ['name', 'type', 'time', 'menu', 'lat', 'lng']
      const data = keys.reduce((acc, key) =>
        editFood[key] !== food[key] ? Object.assign(acc, { [key]: food[key] }) : acc
      , {})

      if (data.lat && (isNaN(+data.lat) || isNaN(+data.lng))) {
        return alert('정확한 위도 / 경도를 입력해주세요')
      }
      console.log(data)
      axios.post(`/foods/${editFood._id}`, { data })
        .then(({data}) => {
          commit('setEditDialog', false)
          commit('updateFood', data)
        })
        .catch(err => console.log(err))
    },
    deleteFood ({ commit }, id) {
      axios.delete(`/foods/${id}`)
        .then(({ data }) => {
          commit('deleteFood', data)
          commit('setEditDialog', false)
          commit('setEditFood', null)
        })
    },
    openAddDialog ({ commit }) { commit('setAddDialog', true) },
    closeAddDialog ({ commit, getters }, data) {
      if (!data) return commit('setAddDialog', false)

      if (data.lat && (isNaN(+data.lat) || isNaN(+data.lng))) {
        return alert('정확한 위도 / 경도를 입력해주세요')
      }

      axios.post('/', { data })
        .then(({ data }) => {
          commit('setAddDialog', false)
          commit('addFood', data)
        })
        .catch(err => console.log(err))
    },
    saveImages ({ commit }, { files, id }) {
      const formData = new FormData()
      for (let i = 0, len = files.length; i < len; i++) {
        formData.append('image', files[i])
      }
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      axios.post(`/foods/images/${id}`, formData, config)
        .then(({ data }) => {
          commit('updateFood', data)
          commit('setEditFood', data)
        })
    },
    deleteImage ({ commit }, { image, id }) {
      axios.delete(`/foods/images/${id}`, { params: { image } })
        .then(({ data }) => {
          commit('updateFood', data)
          commit('setEditFood', data)
        })
    }
  },
  getters: {
    foods: ({ foods }) => foods,
    editDialog: ({ editDialog }) => editDialog,
    addDialog: ({ addDialog }) => addDialog,
    editFood: ({ editFood }) => editFood
  }
}
