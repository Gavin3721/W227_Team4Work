<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <h3>成都托儿所国际幼儿园管理平台</h3>
          </el-col>
          <el-col :span="12">
          </el-col>
          <el-col :span="6">
            <p>xiaotong</p>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <p>2020 * 成都托儿所国际幼儿园管理平台</p>
    </el-footer>
  </div>
</template>

<script>
import LeftMenu from "./../components/LeftMenu.vue";
export default {
  name: "Home",
  components: {
    LeftMenu
  }
};
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.el-header, .el-footer {
  background-color: #0f4E74;
  color: white;
  height: 60px;
}

.el-header .el-col {
  height: 60px;
  line-height: 60px;
}
.el-header .el-col p{
text-align: right;
}
.el-footer{
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  min-height: 600px;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
