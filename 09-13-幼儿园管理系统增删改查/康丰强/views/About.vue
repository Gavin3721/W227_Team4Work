<template>
  <div class="about">
        <div class="left">about的left</div>
        <div class="right">about的right</div>
  </div>
</template>

export default {
  name: "About",
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

