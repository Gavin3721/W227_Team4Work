<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="20">
            <div class="grid-content bg-purple">四川省爱贝幼儿园--信息管理系统</div>
          </el-col>
          <el-col :span="4">
            <div id="loginInfo" class="grid-content bg-purple-light">zhangsan</div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">2020 © 四川省爱贝幼儿园</div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    LeftMenu: () => import("../components/LeftMenu.vue")
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #1879bd;
  color: white;
  line-height: 60px;
}

.el-header {
  font-size: 30px;
  font-weight: bold;
  text-align: left;
}

.el-footer {
  font-size: 18px;
  text-align: center;
}

#loginInfo {
  font-size: 20px;
  font-weight: mormal;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  min-height: 500px;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 30px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
