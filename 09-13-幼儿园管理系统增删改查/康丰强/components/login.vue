<template>
  <div>
    <el-card class="box-card">
      <h1>这是标题</h1>
      <h4>登录</h4>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.pwd"></el-input>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
 export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          username: '',
          pwd: '',
        }
      };
    },
    methods: {
         submitForm() {
         if(this.formLabelAlign.username.length ===0){
                this.$message({
                      showClose: true,
                      message: '请输入用户名',
                      type: 'warning'
                    });
         }else if(this.formLabelAlign.username.length ===0){
                this.$message({
                      showClose: true,
                      message: '请输入密码',
                      type: 'warning'
                    });
         }else{
           //发起请求
           this.$axios.post("/api/userLogin",{UserName:this.formLabelAlign.username, Pwd:this.formLabelAlign.pwd})
           .then((data)=>{
                 if(data.data.message === "登录成功"){
                   this.$router.push("home")
                  }else{
                    this.$alert(data.data.message)
                  }
           })
           .catch((err)=>{
           console.log(err)
              this.$message({
                                 showClose: true,
                                 message: '请求出错，请联系管理员',
                                 type: 'warning'
                               });
               })
           }
         }
    }
  }
</script>
<style scoped>

 .box-card{
   width: 480px;
   margin: auto;
   text-align: center;
 }
</style>