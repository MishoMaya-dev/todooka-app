<template>
 <div class="todos">
   <TodosHeader
       :is-tile="isTile"
       @createTodo="createTodo"
       @tileView="isTile = $event"
   />
   <Loader v-if="loading" class="absolute-center"/>
   <div v-else>
     <div
         v-if="isTile"
         class="todos__elements-tile"
     >
       <Tile
           v-for="todo in todos"
           :key="todo.id"
           :todo="todo"
           @changeValue="editDone"
           @editTodo="editTodo(todo)"
       />
     </div>
     <div
         v-else
         class="todos__elements-list"
     >
       <List
           v-for="todo in todos"
           :key="todo.id"
           :todo="todo"
           @changeValue="editDone"
           @editTodo="editTodo(todo)"
       />
     </div>
     <div v-if="!todos.length" class="h3">No todos</div>
   </div>
   <transition name="fade">
     <EditTodo
         v-show="isModalVisible"
         :edit="edit"
         :editableTodo="editableTodo"
         @closeModal="closeModal"
         @saveTodo="saveTodo"
         @deleteTodo="deleteTodo"
     />
   </transition>
 </div>
</template>

<script>
import Tile from "../components/main/Tile";
import List from "../components/main/List";
import TodosHeader from "@/components/main/TodosHeader";
import EditTodo from "../components/main/EditTodo";
import { Todo } from "../store/todos";
import Loader from "../components/loader";

export default {
  name: 'ViewsTodos',
  data: () => ({
    loading: false,
    edit: false,
    isTile: true,
    isModalVisible: false,
    editableTodo: new Todo(),
  }),
  components: {
    EditTodo,
    TodosHeader,
    Tile,
    List,
    Loader
  },
  computed: {
    todos() {
      return this.$store.getters.todos
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        this.loading = true
        await this.$store.dispatch('fetchTodos')
      } finally {
        this.loading = false
      }
    },
    createTodo() {
      this.isModalVisible = true
    },
    editTodo(todo) {
      this.edit = true
      this.editableTodo = todo
      this.isModalVisible = true
    },
    saveTodo(formData) {
      if (this.edit) {
        this.$store.dispatch('editTodo', formData)
      } else {
        this.$store.dispatch('createTodo', formData)
      }
      this.closeModal()
    },
    deleteTodo(id) {
      this.$store.dispatch('deleteTodo', id)
      this.closeModal()
    },
    closeModal() {
      this.isModalVisible = false
      setTimeout(() => {
        this.edit = false
        this.editableTodo = new Todo()
      }, 500)
    },
    tileView() {
      this.isTile = true
    },
    editDone(todoData) {
      this.$store.dispatch('editDone', todoData)
    }
  }
}
</script>

<style lang="scss" scoped>
.todos {
  &__view-type {
    font-size: 25px;
    color: #B3B6C5;
    margin-right: 20px;
  }
}
.h3 {
  display: flex;
  justify-content: center;
  font-size: 15px;
  color: #B3B6C5;
}

@media screen and (min-width: 1024px) and (orientation: landscape) {
  .todos {
    &__elements-tile {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(335px, 1fr));
      grid-gap: 40px;
    }
  }
  .h3 {
    font-size: 25px;
  }
}
</style>