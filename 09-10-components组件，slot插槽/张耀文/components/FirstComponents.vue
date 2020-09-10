<template>
  <div>
    <span>计数：{{ count }}</span>
    <button :class="btnstyle" @click="add">{{ btnstr }}</button>
  </div>
</template>

<script>
export default {
  name: "FirstComponents",
  data: function() {
    return { count: 0 };
  },
  props: {
    btnstr: { type: String, default: "按钮", required: true },
    btnstyle: String
  },
  methods: {
    add() {
      this.count++;
      //需要触发添加mEvent事件，来实现调用父组件的方法，向父组件传值
      this.$emit("mEvent", "这是个子组件"); //触发当前实例上的事件。附加参数都会传给监听器回调。
    }
  }
};
</script>

<style scoped>
.btn1 {
  color: blue;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}

.btn2 {
  color: pink;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}

.firstclass {
  width: 200px;
  margin: 0 auto;
  color: green;
  font-size: 30px;
  border: 1px solid black;
}
</style>