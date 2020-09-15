<template>
  <div class="home">
    <div id="nav">
    <router-link to="/shouye">首页</router-link>
    <router-link to="/about">about</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "Home",
  components: {

  }
};
</script>


