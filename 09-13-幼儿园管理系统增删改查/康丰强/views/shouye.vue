<template>
  <div class="about">
        <div class="left">
        <p><router-link to="/cidan1">菜单1</router-link></p>
        <p><router-link to="/cidan1">菜单2</router-link></p>
        </div>
        <div class="right">
        <router-view></router-view>
        </div>
  </div>
</template>

export default {
  name: "shoye",
  components: {

  }
};
<style scoped>
 .left{
   width:200px;
   height:500px;
   border:1px solid red;
    float:left;
 }
  .right{
  margin-left:200px;
  height:500px;
  border:1px solid blue;
  }
</style>

