<template>
  <div id="app">
    <Loader v-if="pending" class="absolute-center" />
    <component v-else :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import LayoutAuth from "./layouts/LayoutAuth";
  import LayoutMain from "./layouts/LayoutMain";
  import Loader from "@/components/loader";

  export default {
    name: 'app',
    components: {
      Loader,
      LayoutAuth,
      LayoutMain
    },
    computed: {
      layout() {
        return this.$route.meta.layout
      },
      pending() {
        return this.$store.state.pending
      }
    },
  }
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
