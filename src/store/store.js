import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = () => {
  return {
    token: '',
    userInfo: {},
    aside: []
  }
}
const mutations = {
  SET_TOKEN (state, val) {
    state.token = val
  },
  SET_USERINFO (state, val) {
    state.userInfo = val
  },
  SET_ASIDE (state, val) {
    state.aside = val
  }
}
const actions = {
  set_token ({ commit }, val) {
    commit('SET_TOKEN', val)
  },
  set_userInfo ({ commit }, val) {
    commit('SET_USERINFO', val)
  },
  set_aside ({ commit }, val) {
    commit('SET_ASIDE', val)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
