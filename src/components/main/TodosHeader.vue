<template>
  <div class="todos-header">
    <div class="todos-header__project">
      <p>Project: <u>Develop new app</u></p>
    </div>
    <div class="todos-header__additions">
      <div class="todos-header__title">
        <h1>Connection and Setup</h1>
      </div>
      <div class="todos-header__customization">
        <button
            class="todos-header__add-todo"
            @click="$emit('createTodo')"
        >
          <i class="fal fa-plus"/>
        </button>
        <button
            class="todos-header__tile"
            @click="$emit('tileView', true)"
        >
          <i
              class="fal fa-th"
              :class="{ active: isTile }"
          />
        </button>
        <button
            class="todos-header__list"
            @click="$emit('tileView', false)"
        >
          <i
              class="far fa-list"
              :class="{ active: !isTile }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodosHeader",
  props: {
    isTile: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.todos-header {
  &__project {
   margin-bottom: 25px;
   font-size: 15px;
   color: #B3B6C5;
   }
  &__additions {
     padding-bottom: 40px;
     margin-bottom: 40px;
     border-bottom: #E6E9F0 solid 2px;
   }
  &__title {
     margin-bottom: 40px;
   }
  &__add-todo {
     width: 50px;
     height: 50px;
     margin-right: 20px;
     background: linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
     border-radius: 50px;
     border-width: 0;
     color: #FFFFFF;
   }
  &__customization {
     display: flex;
     align-items: center;
   }
  &__tile {
     color: #B3B6C5;
     width: 50px;
     height: 50px;
     margin-right: 5px;
     font-size: 25px;
     background: #FAFBFC;
     border-width: 0;
   }
  &__list {
     color: #B3B6C5;
     width: 50px;
     height: 50px;
     font-size: 25px;
     background: #FAFBFC;
     border-width: 0;
   }
}
.active {
  background: -webkit-linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: initial;
}
h1 {
  font-size: 40px;
  line-height: 110%;
  color: #3F50E7;
}

@media screen and (min-width: 1024px) and (orientation: landscape) {
  .todos-header {
    &__project {
      margin-bottom: 30px;
      font-size: 20px;
    }
    &__additions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 75px;
    }
    &__title {
      margin-bottom: 0;
    }
    &__add-todo {
      order: 2;
      margin-left: 40px;
    }
  }
  h1 {
    font-size: 60px;
  }
}
</style>