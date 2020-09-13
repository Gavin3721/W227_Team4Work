<template>
  <div>
    <el-card class="box-card">
      <h1>四川省爱贝幼儿园--登录</h1>
      <div style="margin: 50px;"></div>
      <el-form label-width="80px" :model="userForm">
        <el-input v-model="userForm.username" placeholder="用户名"></el-input><br/><br/>
        <el-input type="password" v-model="userForm.pwd" placeholder="密  码"></el-input><br/><br/>
        <el-button type="primary" @click="userLogin('userForm')">登录</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userForm: {
        username: "",
        pwd: ""
      }
    };
  },
  methods: {
    userLogin(formName) {
      if(this[formName].username.length == 0||this[formName].pwd.length == 0) {
        this.$message.error({ message: "用户名及密码不能为空", center: true, duration: 1000});
      }else{
        this.$axios.post("/api/userLogin",{ userName: this[formName].username,loginPwd: this[formName].pwd })
        .then((data) => {
          if(data.data.message == "登录成功"){
            this.$router.push("home");
          }else{
            this.$message.error({ message: data.data.message, center: true, duration: 2000});
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error({ message: "请求出错，请联系管理员", center: true, duration: 2000});
        });
      }
    },
    resetForm(formName) {
      this[formName].username = "";
      this[formName].pwd = "";
    }
  }
};
</script>

<style>
.box-card {
  width: 480px;
  height: 350px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
