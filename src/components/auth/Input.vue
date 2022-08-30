<template>
  <label
      class="custom-input"
      :class="{
        invalid: dirty && invalid,
      }"
  >
    <span>{{ label }}</span>
    <input
        :type="password ? 'password': 'text'"
        :value="value"
        @input="$emit('input', $event.target.value)"
    >
    <span v-if="showedValid" class="custom-input__valid">
      <i v-if="!invalid" class="far fa-check-circle custom-input__valid--accept"></i>
      <i v-else class="fal fa-exclamation-circle custom-input__valid--cancel"></i>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: String,
    value: String,
    password: Boolean,
    dirty: Boolean,
    invalid: Boolean,
    showedValid: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.custom-input {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 15px;
    color: #B3B6C5;
    span,
    input {
      transition: all 0.3s;
    }
    input {
      height: 50px;
      margin-top: 12px;
      padding: 17px 15px 15px;
      background: #F6F7FA;
      border-width: 0;
      border-radius: 5px;
      font-size: 15px;
      color: #393C46;
    }
    &__valid {
      position: absolute;
      right: 10px;
      bottom: 15px;
      height: 20px;
      width: 20px;
      font-size: 20px;
      line-height: 20px;
      &--accept {
        background: -webkit-linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &--cancel {
        background: -webkit-linear-gradient(90deg, #FF6D6D 0%, #EF4444 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
}
.invalid {
  span {
    color: #EF4444;
  }
  input {
    background-color: #FAF6F6;
  }
}
@media screen and (min-width: 1024px) and (orientation: landscape) {
  .custom-input {
    margin-bottom: 30px;
    font-size: 20px;

    input {
      height: 75px;
      margin-top: 20px;
      font-size: 25px;
    }

    &__valid {
      right: 15px;
      bottom: 24px;
      height: 30px;
      width: 30px;
      font-size: 30px;
      line-height: 30px;
    }
  }
}
</style>