<template>
  <div>
<!--    面包屑-->
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">部门管理</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
<!--    操作-->
    <div>
      <el-card>
        <el-button type="primary" @click="dialogFormVisible=true">添加部门</el-button>
      </el-card>
    </div>
    <div>
      <el-button type="primary" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
      <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
        <el-form :model="edutform">
          <el-form-item label="部门名称">
            <el-input v-model="edutform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门描述">
            <el-input v-model="edutform.descript" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="editform.status" autocomplete="off">
            <el-option label="有效" value="1">
            </el-option>
            <el-option label="无效" value="0">
            </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDept = false">添加</el-button>
        </div>
      </el-dialog>
    </div>
<!--    列表-->
    <el-table
        :data="deptData"
        height="550"
        border
        style="width: 100%">
      <el-table-column
          type="selection"
          width="50">
      </el-table-column>
      <el-table-column
          prop="DeptNo"
          label="部门编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="DeptName"
          label="部门名称">
      </el-table-column>
      <el-table-column
          prop="DeptDescript"
          label="描述">
      </el-table-column>
      <el-table-column
          label="状态">
        <template slot-scope="scope">
          <span></span>
          <span>{{scope.row.Status===1?'statusActive':'statusDel'}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="CreateDate"
          :formatter="DateHandler"
          label="创建时间">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.DeptNo)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DeptManage",
  data(){
    return {
      deptData: [],
      dialogFormVisible: false,
      dialogFormEdiVisible:false,
      form: {
        name:'',
        descript:''
      },
      editform: {
        name:'',
        descript:'',
        status:0
      }
    }
  },
  created:function () {
    this.getDeptList()
  },
  methods: {
    DateHandler: function (row,column) {
      return new Date(row.CreateDate).toLocaleString()
    },
    addDept: function () {
      //1.获取数据到服务器，进行添加 接受服务器响应
      this.$axiod('/api/addDept',{ deptName: this.form.name,deptDescript: this.form.descript })
      .then( (response)=> {
        var result = response.data
        if (result.code==200){
          this.$alert(result.message)
          if (result.message ==='添加成功') {
            this.getDeptList()
          }
          //2.添加对话框取消
          dialogFormVisible: false
        }else {
          this.$alert(result.message)
        }
      }).catch(()=>{
        this.$alert('请求出错')
      })
    },
    getDeptList: function () {
      //发后端服务器去请求数据
      this.$axios.post('/api/deptList').then((response)=> {
        var result =response.data;
        if (result.code===200){
          this.deptData =result.data
        }else{
          this.$alert(result.message);
        }
      }).catch(() => {})
    },
    del:function (deptNo) {
      //发起一个请求到服务器，让服务器删除这条数据
      this.$axios.get('/api/delDept',{
        params: {
          deptNo:deptNo
        }
      }).then((response) => {
          var result =response.data;
          if (result.message==="删除成功"){
            this.getDeptList()
          }else {
            this.$alert(result.message)
          }
      }).eatch((err) => {
        console.log(err)
        this.$alert('请求出错请检查')
      })

    },
    edit: function (obj){
      this.dialogFormEdiVisible = true
      this.editform.name = obj.DeptDescript
      this.editform=status = obj.Status
    }
  }
}
</script>

<style scoped>
  .dept .el-card{
    margin: 20px 0;
    text-align: left;
  }
 .statusActive{
   padding: 5px 10px ;
   color: white;
   background-color: green;
 }
</style>