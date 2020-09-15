<template>
  <div id="app">
    <router-view> <login /></router-view>
  </div>
</template>

<script>
import login from "./components/login.vue";

export default {
  name: "App",
  components: {
    login,

  }
};
</script>

<style lang="stylus">
</style>
