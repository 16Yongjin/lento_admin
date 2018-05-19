import Vue from 'vue'
import Vuex from 'vuex'

import foods from './foods'
import shared from './shared'
import users from './users'
import logs from './logs'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    foods,
    users,
    shared,
    logs
  }
})
