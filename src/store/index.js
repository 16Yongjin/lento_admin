import Vue from 'vue'
import Vuex from 'vuex'

import foods from './foods'
import shared from './shared'
import users from './users'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    foods,
    users,
    shared
  }
})
