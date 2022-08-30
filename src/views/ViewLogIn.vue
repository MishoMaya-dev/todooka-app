<template>
  <form
    class="login"
    @submit.prevent="onSubmit"
  >
    <div class="login__header">
      <h1>Log in</h1>
    </div>
    <div class="login__form">
      <Input
        label="E-mail"
        v-model.trim="email"
        :dirty="$v.email.$dirty"
        :invalid="$v.email.$invalid"
        :showed-valid="$v.$dirty"
      />
      <Input
        label="Password"
        v-model.trim="password"
        password
        :dirty="$v.password.$dirty"
        :invalid="$v.password.$invalid"
        :showed-valid="$v.$dirty"
      />
      <button
          type="submit"
          class="login__button"
          :class="{
            'login__button--disabled': logInButtonDisabled,
          }"
          :disabled="logInButtonDisabled"
      >
        Log in
      </button>
      <p>
        Not a todooist?
        <router-link to="/signin">Create an account</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { email, required, minLength } from 'vuelidate/lib/validators'
  import Input from "@/components/auth/Input";
  export default {
    name: 'ViewLogIn',
    components: {Input},
    data: () => ({
      email: '',
      password: ''
    }),
    validations: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    computed: {
      logInButtonDisabled() {
        return this.$v.$dirty && this.$v.$invalid
      },
    },
    methods: {
      onSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const { email, password } = this
        this.$store.dispatch('loginUser', { email, password })
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
.invalid {
  span {
    color: #EF4444;
  }
  input {
    background-color: #FAF6F6;
  }
}

.login {
  width: 100%;
  max-width: 580px;
  padding: 25px 25px 30px;
  background: #FFFFFF;
  box-shadow: 0 10px 50px rgba(40, 44, 66, 0.1);
  border-radius: 10px;
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;
  }
  &__button {
    margin: 10px 0 35px;
    height: 50px;
    width: 100%;
    background: linear-gradient(90deg, #61DE6E 0%, #6DF77A 100%);
    opacity: 1;
    border-width: 0;
    border-radius: 5px;
    font-size: 17px;
    color: #FFFFFF;
    &--disabled {
      opacity: 0.5;
    }
  }
}
.fa-times {
  size: 25px;
  color: #B2B6C5;
}
h1 {
  font-size: 25px;
  color: #393C46;
}
p {
  font-size: 13px;
  text-align: center;
  color: #B3B6C5;
}

@media screen and (min-width: 1024px) and (orientation: landscape) {
  .login {
    max-width: 580px;
    width: 100%;
    padding: 40px 50px 50px;
    &__header {
      margin-bottom: 75px;
    }
    &__button {
      margin: 20px 0 65px;
      height: 75px;
      font-size: 25px;
    }
  }
  .fa-times {
    font-size: 40px;
  }
  h1 {
    font-size: 40px;
  }
  p {
    font-size: 20px;
  }
}
</style>