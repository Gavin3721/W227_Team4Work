<template>
  <div>
    <el-card class="box-card">
      <h1>四川大学附属中学管理平台</h1>
      <h3>登录</h3>
      <p><el-input v-model="user.username" placeholder="请输入用户名"/></p>
      <p><el-input v-model="user.pwd" placeholder="请输入密码"/></p>
      <p><el-button type="primary" @click="userLogin">登录</el-button></p>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: function () {
    return {
      user: {
        username: '',
        pwd: ''
      }
    }
  },
  methods:{
    userLogin() {
      if(this.user.username.length === 0){
        this.$message({
          showClose: true,
          message: '请输入用户名',
          type: 'warning'
        });
      }else if(this.user.pwd.length === 0){
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        });
      }else {
        //发起一个请求到服务器
        this.$axios.post("/api/userLogin",{UserName:this.user.username,Pwd:this.user.pwd})
            .then((data)=>{
              if(data.data.message === "登录成功"){
                //跳转到首页
                this.$router.push('home');
                //console.log(data.data)
              }else {
                this.$alert(data.data.message);
              }
            }).catch((err)=>{
          console.log(err);
          this.$message.error("请求出错，请联系管理员")
        })
      }
    }
  }
}
</script>
<style scoped>
.box-card {
  width: 480px;
  margin:100px auto;
}
</style>