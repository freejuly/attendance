import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存切换暗黑模式
    darkTheme: ""
  },
  getters: {
    dark: state => state.darkTheme
  },
  mutations: {
    changeThemeMutations(state, payload) {
      state.darkTheme = payload
    }
  },
  actions: {
// 使用commit触发mutations里面的方法
    chengeThemeActions(context, params) {
      context.commit('changeThemeMutations', params)
    }
  },
  modules: {
  }
})
