<template>
  <div class="list-item" @click="toggleAdditions">
    <div v-if="showedAdditions || !isMobile" class="list-item__container">
      <div class="list-item__title">
        <img :src="require('@/assets/markers/' + todo.marker)">
        <h1 class="list-item__name">{{ todo.title }}</h1>
      </div>
      <div class="list-item__description">
        <span>{{ todo.description }}</span>
      </div>
    </div>
    <div v-if="!showedAdditions || !isMobile" class="list-item__attributes">
      <div>
        <div
          class="list-item__timer"
          v-if="todo.timer"
        >
          <div
            v-if="!isTimeOver"
          >
            <i
              class="fas fa-clock"
            /> {{ formattedTime }}
          </div>
          <div
            v-else
            class="list-item__time-over"
          >
            Time is over
          </div>
        </div>
        <div
          v-else-if="todo.done"
          class="list-item__task-done"
        >
          <i class="fas fa-check" style="margin-right: 5px"/>
          Task is done
        </div>
      </div>
      <div class="list-item__control">
        <button
          class="list-item__edit"
          @click.stop="$emit('editTodo')"
        >
          <i class="fas fa-pen"></i>
        </button>
        <button
          class="list-item__check"
          @click.stop="todoDone"
        >
          <i
            class="fas fa-check"
            :class="{ 'done' : todo.done }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'List',
    props: {
      todo: {
        type: Object,
        required: true
      },
    },
    data: () => ({
      isTimeOver: false,
      time: { h: 0, m: 0, s:0 },
      showedAdditions: true,
    }),
    computed: {
      formattedTime() {
        const {h, m, s} = this.time
        const form = (num) => ('' + num).padStart(2, "0")
        return `${form(h)}:${form(m)}:${form(s)}`
      },
      isMobile() {
        return mobileCheck()
      },
    },
    watch: {
      'todo.time': function () {
        this.clearTimer()
        this.startTimer()
      },
    },
    created() {
      this.startTimer()
    },
    beforeDestroy() {
      this.clearTimer()
    },
    methods: {
      toggleAdditions() {
        this.showedAdditions = !this.showedAdditions
      },
      startTimer() {
        if (this.todo.time - Date.now() < 0) {
          this.isTimeOver = true
          return
        }
        this.isTimeOver = false
        const lastTime = this.todo.time - Date.now()
        const hou = Math.floor(lastTime / 36e5)
        const min = Math.floor((lastTime % 36e5) / 6e4)
        const sec = Math.floor((lastTime % 6e4) / 1000)
        this.time.h = hou
        this.time.m = min
        this.time.s = sec
        this.timeOutId = setTimeout(this.startTimer, 1000)
      },
      clearTimer() {
        if (this.timeOutId) {
          clearTimeout(this.timeOutId)
          this.timeOutId = null
        }
      },
      todoDone() {
        const todoData = {
          id: this.todo.id,
          done: !this.todo.done,
          timer: false,
          time: 0
        }
        this.$emit('changeValue', todoData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-item {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 20px;
    margin-bottom: 20px;
    background: #FFFFFF;
    box-shadow: 0 25px 50px rgba(57, 59, 70, 0.05);
    border-radius: 10px;
    &__container {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
    }
    &__title {
      margin-right: 25px;
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      & img {
        margin-right: 15px;
      }
    }
    &__name {
      font-size: 20px;
      color: #333333;
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__description {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #A4ABC0;
    }
    &__attributes {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__timer {
      width: 96px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #F3F5F8;
      box-sizing: border-box;
      border-radius: 50px;
      font-size: 14px;
      color: #BABECB;
    }
    &__edit {
      margin-right: 10px;
    }
    &__time-over {
      color: #ff3f3f;
    }
    &__task-done {
      color: #6DF77A
    }
  }
  .fa-clock {
    margin-right: 10px;
  }
  .done {
    background: -webkit-linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: initial;
  }
  button {
    width: 40px;
    height: 40px;
    border: 2px solid #F3F5F8;
    box-sizing: border-box;
    border-radius: 50px;
    background: #FFFFFF;
    font-size: 12px;
    color: #B3B6C5;
  }

  @media screen and (min-width: 1024px) and (orientation: landscape) {
    .list-item {
      &__container {
        width: auto;
      }
      &__name {
        max-width: 250px;
      }
      &__description {
        max-width: 300px;
        margin-right: 25px;
      }
      &__attributes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }
  }

</style>