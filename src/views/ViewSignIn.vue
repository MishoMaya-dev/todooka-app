<template>
  <form class="signin" @submit.prevent="onSubmit">
    <div class="signin__header">
      <h1>Sign in</h1>
      <router-link to="/login">
        <i class="fal fa-times"  />
      </router-link>
    </div>
    <div class="signin__form">
      <Input
        label="Name"
        v-model.trim="name"
        :dirty="$v.name.$dirty"
        :invalid="$v.name.$invalid"
        :showed-valid="$v.$dirty"
      />
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
        class="signin__button"
        :class="{
          'signin__button--disabled': signInButtonDisabled,
        }"
        :disabled="signInButtonDisabled"
      >
        Sign in
      </button>
      <p>
        Already a todooist?
        <router-link to="/login">Log in account</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, minLength, required} from "vuelidate/lib/validators";
  import Input from "@/components/auth/Input";

  export default {
    name: "ViewSignIn",
    components: {Input},
    data: () => ({
      name: '',
      email: '',
      password: '',
    }),
    validations: {
      name: {
        required,
        minLength: minLength(4)
      },
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
      signInButtonDisabled() {
        return this.$v.$dirty && this.$v.$invalid
      },
    },
    methods: {
      onSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const { name, email, password } = this
        this.$store.dispatch('createUser', { name, email, password })
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .signin {
    height: 100%;
    padding: 25px 25px 30px;
    background: #FFFFFF;
    box-shadow: 0 10px 50px rgba(40, 44, 66, 0.1);
    border-radius: 10px;
    h1 {
      font-size: 25px;
      color: #393C46;
    }
    i {
      font-weight: 300;
      size: 25px;
      color: #B2B6C5;
    }
    p {
      font-size: 13px;
      text-align: center;
      color: #B3B6C5;
    }
    &__header {
      display: flex;
      justify-content: space-between;
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
        opacity: 1;
      }
    }
  }

  @media screen and (min-width: 1024px) and (orientation: landscape) {
    .signin {
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
      h1 {
        font-size: 40px;
      }
      i {
        font-size: 40px;
      }
      p {
        font-size: 20px;
      }
    }
  }

</style>
