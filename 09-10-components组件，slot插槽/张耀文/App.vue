<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="这是我的第一个Vue程序" />
    <span class="total">总计数：{{ totalcount }}</span>
    <FirstComponents btnstyle="btn1" btnstr="点我" @mEvent="addTotalCount" />
    <br />
    <FirstComponents btnstyle="btn2" btnstr="再点" @mEvent="addTotalCount" />
    <br />
    <Children>
      <span class="chacao" slot="slot1">不用slot插槽我是不会显示的</span>
      <span class="chacao" slot="slot2">我也是</span>
      <span class="chacao" slot="slot3">我们都是耶</span>
    </Children>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import FirstComponents from "./components/FirstComponents.vue";
import Children from "./components/Children.vue";

export default {
  name: "App",
  data: function() {
    return { totalcount: 0 };
  },
  components: {
    HelloWorld,
    FirstComponents,
    Children
  },
  methods: {
    addTotalCount(msg) {
      this.totalcount++;
      console.log("emit触发mEvent返回的参数：" + msg);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.total {
  font-size: 30px;
  font-weight: bold;
  color: rgb(16, 88, 28);
}

.chacao {
  color: red;
  font-weight: bold;
}
</style>