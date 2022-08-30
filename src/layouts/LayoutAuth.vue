<template>
    <div class="layout-auth">
      <div class="layout-auth__waves mobile">
        <img src="../assets/waves_mobile/wave2.svg">
        <img src="../assets/waves_mobile/wave1.svg">
      </div>
      <div class="layout-auth__waves desktop">
        <img src="../assets/waves_desktop/wave4.svg">
        <img src="../assets/waves_desktop/wave3.svg">
        <img src="../assets/waves_desktop/wave2.svg">
        <img src="../assets/waves_desktop/wave1.svg">
      </div>
      <div class="layout-auth__header">
        <div class="layout-auth__title">
          <img class="layout-auth__logo" src="../assets/logo.svg" alt="logo">
          <h1>Todooka</h1>
        </div>
        <button
          @click="toLogin"
        >
          Log in
        </button>
      </div>
      <div class="layout-auth__container">
        <router-view />
      </div>
    </div>
</template>

<script>
  import LogIn from "../views/ViewLogIn";
  import SignIn from "../views/ViewSignIn";

  export default {
    name: 'LayoutAuth',
    components: {
      LogIn,
      SignIn
    },
    methods: {
      toLogin() {
        this.$router.push('/login')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layout-auth {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px 20px 15px;
    &__logo {
      padding-right: 12px;
    }
    &__header {
      display: flex;
      flex: 0 0 auto;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    &__title {
      display: flex;
      align-items: center;
    }
    &__waves {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      display: none;
      width: 100%;
      height: 100%;

      & img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      &.mobile {
        display: block;
      }

      &.desktop {
        display: none;
      }
    }
    &__container {
      display: flex;
      flex: 1 1 auto;
      justify-content: center;
      align-items: center;
    }
  }
  h1 {
    font-size: 20px;
    color: #393C46;
  }
  button {
    width: 88px;
    height: 40px;
    background: linear-gradient(90deg, #838BD8 0%, #283BEC 100%);
    border-radius: 5px;
    border-width: 0;

    font-size: 15px;
    color: #FFFFFF;
  }

  @media screen and (min-width: 1024px) and (orientation: landscape) {
   .layout-auth {
     padding: 25px 25px 0 30px;
     &__logo {
       height: 40px;
     }
     &__waves {
       &.mobile {
         display: none;
       }

       &.desktop {
         display: block;
       }
     }
     &__container {
       display: flex;
       justify-content: center;
     }
   }
    h1 {
      font-size: 30px;
    }
    button {
      width: 110px;
      height: 50px;
      font-size: 20px;
    }
  }

</style>