<template>
  <div class="layout-main">
    <div class="layout-main__header">
      <div class="layout-main__logo">
        <span class="layout-main__target">
          <img src="../assets/target.svg">
        </span>
        <h2>Tacoloco</h2>
        <p class="layout-main__team">team</p>
      </div>
      <button
        @click="logoutUser"
        class="layout-main__logout"
      >
        Log out
      </button>
    </div>
    <div class="layout-main__body">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Tile from "../components/main/Tile";
  import List from "../components/main/List";
  export default {
    name: 'LayoutMain',
    data: () => ({
      isTile: true,
      isList: false,
      isModalVisible: false,
    }),
    components: {
      Tile,
      List
    },
    methods: {
      logoutUser() {
        this.$store.dispatch('logoutUser')
        this.$router.push('/login')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .layout-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fafbfc;
    &__header {
      z-index: 10;
      display: flex;
      flex: 0 0 auto;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #FFFFFF;
      box-shadow: 0 15px 25px rgba(154, 160, 189, 0.1);
    }
    &__logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__target {
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      box-shadow: 0 5px 20px rgba(57, 59, 70, 0.15);
      border-radius: 50%;
    }
    &__team {
      width: 35px;
      height: 17px;
      font-size: 10px;
      text-align: center;
      color: #5C5F70;
      background: #EFF0F3;
      border-radius: 2px;
    }
    &__logout {
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
    &__body {
      flex: 1 1 auto;
      overflow: auto;
      padding: 40px 20px 0;
    }
  }
  h2 {
    margin-right: 10px;
    font-size: 20px;
    color: #393C46;
  }

  @media screen and (min-width: 1024px) and (orientation: landscape) {
    .layout-main {
      &__header {
        padding: 26px 24px 24px 31px;
      }
      &__target {
        width: 40px;
        height: 40px;
      }
      &__team {
        font-size: 12px;
      }
      &__logout {
        width: 110px;
        height: 50px;
        font-size: 20px;
      }
      &__body {
        padding: 75px 90px 0;
      }
    }
    h2 {
      margin-right: 12px;
      font-size: 30px;
    }
  }

</style>