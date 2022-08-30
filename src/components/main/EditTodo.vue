<template>
  <div class="modal-backdrop" @click.self="$emit('closeModal')">
    <div
      class="modal"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <div class="modal__header">
        <h1 class="modal__name">{{ edit ? 'Edit task' : 'Create task' }}</h1>
        <button
          v-if="edit"
          class="modal__delete-todo"
          @click="deleteTodo"
        >
          Delete task
        </button>
      </div>
      <div class="modal__content">
        <div class="modal__choose">
          Choose color: {{ markerName }}
          <div class="modal__colors">
            <button
              class="modal__green"
              name="green"
              @click="chooseColor"
            >
              <img src="@/assets/markers/Green.svg" alt="Green">
            </button>
            <button
              class="modal__blue"
              name="blue"
              @click="chooseColor"
            >
              <img src="@/assets/markers/Blue.svg" alt="Blue">
            </button>
            <button
              class="modal__red"
              name="red"
              @click="chooseColor"
            >
              <img src="@/assets/markers/Red.svg" alt="Red">
            </button>
          </div>
        </div>
        <label class="modal__title">
          Task name
          <input
            class="modal__input-title"
            v-model="todo.title"
            type="text"
          >
        </label>
        <label class="modal__description">
          Task description
          <textarea
            class="modal__textarea-description"
            rows="6"
            resize="none"
            v-model="todo.description"
            type="text"
          />
        </label>
        <div class="modal__timer"
             v-if="todo.done === false"
        >
          <button
            class="modal__add-timer"
            @click="addTimer"
            v-if="!todo.timer"
          >
            Add timer
          </button>
          <div
            class="modal__timer"
            v-if="todo.timer"
          >
            <div class="modal__time">
              <input
                class="modal__hour"
                v-model="time.h"
                type="number"
                min="0"
                max="24"
              > :
              <input
                class="modal__min"
                v-model="time.m"
                type="number"
                min="0"
                max="59"
              > :
              <input
                class="modal__sec"
                v-model="time.s"
                type="number"
                min="0"
                max="59"
              >
            </div>
            <button
              class="modal__remove-timer"
              @click="removeTimer"
            >
              Remove timer
            </button>
          </div>
        </div>
        <div
          class="modal__task-done"
          v-else
        >
          <i class="fas fa-check" style="margin-right: 5px"/>
          Task is done
        </div>
      <div class="modal__footer">
        <button
          class="modal__create"
          :disabled="disableSave"
          @click="saveTodo"
        >
          {{ edit ? 'Update' : 'Create' }}
        </button>
        <button
          class="modal__close"
          @click="$emit('closeModal')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {Todo} from "../../store/todos";

  export default {
    name: 'EditTodo',
    props: {
      edit: {
        type: Boolean,
      },
      editableTodo: {
        type: Object,
        required: true,
      }
    },
    data: () => ({
      todo: new Todo(),
      time: { h: 0, m: 0, s: 0 },
    }),
    computed: {
      markerName() {
        return this.todo.marker.slice(0, -4)
      },
      disableSave() {
        return !this.todo.title || !this.todo.description;
      },
    },
    watch: {
      editableTodo(val) {
        this.todo = {...val}
        if (this.edit === true && (this.todo.time - Date.now() > 0 )) {
          const lastTime = this.todo.time - Date.now()
          const hou = Math.floor(lastTime / 36e5)
          const min = Math.floor((lastTime % 36e5) / 6e4)
          const sec = Math.floor((lastTime % 6e4) / 1000)
          this.time.h = hou
          this.time.m = min
          this.time.s = sec
        }
      }
    },
    created() {
      this.todo = {...this.editableTodo}
    },
    methods: {
      saveTodo() {
        const {h, m, s} = this.time
        let ms = s * 1000 + m * 6e4 + h * 36e5
        const formData = {
          ...this.todo,
          time: ms + Date.now(),
          id: this.edit ? this.todo.id : undefined
        }
        this.time = { h: 0, m: 0, s: 0 }
        this.$emit('saveTodo', formData)
      },
      deleteTodo() {
        this.$emit('deleteTodo', this.todo.id)
      },
      chooseColor(value) {
        this.todo.marker = value.target.alt + '.svg'
      },
      addTimer() {
        this.todo.timer = true
      },
      removeTimer() {
        this.todo.timer = false
        this.time = { h: 0, m: 0, s: 0 }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-backdrop {
    padding: 40px 20px 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .modal {
    width: 100%;
    padding: 25px 25px 30px;
    background: #FFFFFF;
    border-radius: 10px;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    &__name {
      color: #393C46;
    }
    &__title {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      color: #B3B6C5;
    }
    &__input-title {
      height: 50px;
      margin-top: 12px;
      padding: 17px 15px 15px;
      background: #F6F7FA;
      border-width: 0;
      border-radius: 5px;
      font-size: 15px;
      color: #393C46;
    }
    &__description {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      color: #B3B6C5;
    }
    &__textarea-description {
      width: 100%;
      margin-top: 12px;
      padding: 17px 15px 15px;
      background: #F6F7FA;
      border-width: 0;
      border-radius: 5px;
      font-size: 15px;
      color: #393C46;
      resize: none;
    }
    &__footer {
      display: flex;
      justify-content: flex-end;
    }
    &__create {
      width: 88px;
      height: 40px;
      margin-right: 20px;
      font-size: 15px;
      background: linear-gradient(90deg, #61DE6E 0%, #6DF77A 100%);
      color: #FFFFFF;
      border: 0;
      border-radius: 5px;
    }
    &__close {
      width: 88px;
      height: 40px;
      font-size: 15px;
      background: linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: #838BD8;
      border: 2px solid #EFF0F3;
      border-radius: 5px;
    }
    &__choose {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      color: #B3B6C5;
    }
    &__colors {
      margin-top: 10px;
    }
    &__green {
      padding: 0;
      margin-right: 10px;
      background-color: #FFFFFF;
      border-radius: 50%;
      border-width: 0;
    }
    &__blue {
      padding: 0;
      margin-right: 10px;
      background-color: #FFFFFF;
      border-radius: 50%;
      border-width: 0;
    }
    &__red {
      padding: 0;
      margin-right: 10px;
      background-color: #FFFFFF;
      border-radius: 50%;
      border-width: 0;
    }
    &__task-done {
      margin-bottom: 20px;
      color: #6DF77A;
      font-size: 20px;
    }
    &__timer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    &__add-timer {
      width: 100px;
      height: 40px;
      font-size: 15px;
      background: linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: #838BD8;
      border: 2px solid #EFF0F3;
      border-radius: 5px;
    }
    &__time {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__hour {
      width: 40px;
      height: 30px;
      margin-right: 5px;
      padding: 5px;
      background: #F6F7FA;
      border-width: 0;
      border-radius: 5px;
      font-size: 15px;
      color: #393C46;
    }
    &__min {
      width: 40px;
      height: 30px;
      margin-right: 5px;
      margin-left: 5px;
      padding: 5px;
      background: #F6F7FA;
      border-width: 0;
      border-radius: 5px;
      font-size: 15px;
      color: #393C46;
    }
    &__sec {
      width: 40px;
      height: 30px;
      margin-right: 12px;
      margin-left: 5px;
      padding: 5px;
      background: #F6F7FA;
      border-width: 0;
      border-radius: 5px;
      font-size: 15px;
      color: #393C46;
    }
    &__remove-timer {
      width: 100px;
      height: 40px;
      margin-right: 20px;
      font-size: 15px;
      line-height: 100%;
      background: linear-gradient(90deg, #ff3f3f 0%, #ff5858 100%);
      color: #FFFFFF;
      border: 0;
      border-radius: 5px;
    }
    &__delete-todo {
      width: 88px;
      height: 40px;
      font-size: 15px;
      line-height: 100%;
      background: linear-gradient(90deg, #ff3f3f 0%, #ff5858 100%);
      color: #FFFFFF;
      border: 0;
      border-radius: 5px;
    }
  }
  img {
    width: 30px;
    height: 30px;
  }

  @media screen and (min-width: 1024px) and (orientation: landscape) {
    .modal {
      width: 580px;
    }
  }

</style>