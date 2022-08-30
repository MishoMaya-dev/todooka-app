import * as firebase from "firebase/app"
import "firebase/database"

export class Todo {
  constructor(marker = 'Green.svg', title, description, timer = false, time = 0, userId, id = null, done = false) {
    this.marker = marker
    this.title = title
    this.description = description
    this.timer = timer
    this.time = time
    this.userId = userId
    this.id = id
    this.done = done
  }
}

export default {
  state: {
    todos: []
  },

  mutations: {
    editDone(state, { id, done, timer, time }) {
      const todo = state.todos.find(t => t.id === id)
      todo.timer = timer
      todo.time = time
      todo.done = done
    },
    createTodo(state, todo) {
      state.todos.push(todo)
    },
    loadTodos(state, todosArr) {
      state.todos = todosArr
    },
    clearTodos(state) {
      state.todos = [];
    },
    updateTodo(state, { marker, title, description, timer, time, id }) {
      const todo = state.todos.find(t => {
       return t.id === id
      })
      todo.marker = marker
      todo.title = title
      todo.description = description
      todo.timer = timer
      todo.time = time
    },
    deleteTodo(state, id) {
      const todoArr = state.todos.filter(t => t.id !==id)
      state.todos = todoArr
    }
  },

  actions: {
    async editDone({commit}, { id, done, timer, time }) {
      try {
        await firebase.database().ref('todos').child(id).update({
          done,
          timer,
          time
        })
        commit('editDone', { id, done, timer, time })
      } catch (e) {
        throw e
      }
    },
    async createTodo({ commit, getters }, payload) {
      try {
        const newTodo = new Todo(
          payload.marker,
          payload.title,
          payload.description,
          payload.timer,
          payload.time,
          getters.users.id,
        )
        const todo = await firebase.database().ref('todos').push(newTodo)
        commit('createTodo', {
            ...newTodo,
            id: todo.key
          })
      } catch (e) {
        throw e
      }
    },
    async fetchTodos({ commit }) {
      const todoArr = []
      try {
        const fbVal = await firebase.database().ref('todos').once('value')
        const todos = fbVal.val()
        Object.keys(todos).forEach(key => {
          const todo = todos[key]
          todoArr.push(
            new Todo(
              todo.marker,
              todo.title,
              todo.description,
              todo.timer,
              todo.time,
              todo.userId,
              key,
              todo.done
            )
          )
        })
        commit('loadTodos', todoArr)
      } catch (e) {
        throw e
      }
    },
    async editTodo({ commit }, { marker, title, description, timer, time, id }) {
      try {
        await firebase.database().ref('todos').child(id).update({
          marker,
          title,
          description,
          timer,
          time
        })
        commit('updateTodo', { marker, title, description, timer, time, id })
      } catch (e) {
        throw e
      }
    },
    async deleteTodo({ commit }, id) {
      try {
        await firebase.database().ref('todos').child(id).remove()
        commit('deleteTodo', id)
      } catch (e) {
        throw e
      }
    }
  },

  getters: {
    todos(state, getters) {
      return getters.users && state.todos.filter(t => t.userId === getters.users.id)
    }
  }
}