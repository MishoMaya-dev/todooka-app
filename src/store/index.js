import Vue from 'vue'
import Vuex from 'vuex'
import todos from './todos'
import user from '@/store/user'
import service from "./service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    todos,
    user,
    service
  }
})
