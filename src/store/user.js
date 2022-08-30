import * as firebase from "firebase/app"
import "firebase/auth"

class User {
  constructor(id = null) {
    this.id = id
  }
}

export default {
  state: {
    users: null
  },

  mutations: {
    setUser(state, payload) {
      state.users = payload
    }
  },

  actions: {
    async createUser({ commit }, payload) {
      try {
        commit('setLoading', true)
        const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        commit('setUser', new User(user.uid))
      } catch (e) {
        throw e
      } finally {
        commit('setLoading', false)
      }
    },
    async loginUser({ commit }, { email, password }) {
      try {
        commit('setLoading', true)
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
      } catch (e) {
        throw e
      } finally {
        commit('setLoading', false)
      }
    },
    onAuthUser({ commit }, user) {
      commit('setUser', new User(user.uid))
    },
    async logoutUser({ commit }) {
      commit('setLoading', true)
      await firebase.auth().signOut();
      commit('setUser', null);
      commit('clearTodos');
      commit('setLoading', false)
    }
  },

  getters: {
    users(state) {
      return state.users;
    },
    isUserLoggedIn(state) {
      return state.users !== null;
    }
  }
}
