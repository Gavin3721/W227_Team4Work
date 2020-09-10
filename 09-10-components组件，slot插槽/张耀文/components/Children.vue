<template>
  <div>
    <header>子组件头部<slot name="slot1">如何父组件没传，就显示我哈哈哈</slot></header>
    <section>中间内容<slot name="slot2"></slot></section>
    <footer>尾部<slot name="slot3"></slot></footer>
  </div>
</template>
<script>
export default {
  name: "Children",
  data: function() {
      return {};
  }
};
</script>
<style scoped>

</style>