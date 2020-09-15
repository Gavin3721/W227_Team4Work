<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/deptManage' }">部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addDiv">
      <el-button align="left" type="primary" @click="addDept">新增部门</el-button>
    </div>
    <el-dialog :title="form.title" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.deptnm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="formLabelWidth">
          <el-input v-model="form.descript" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.deptno" label="状态" :label-width="formLabelWidth">
          <el-select placeholder="状态" v-model="form.status" style="width:100%">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDeptinfo">保 存</el-button>
      </div>
    </el-dialog>
    <!--列表-->
    <el-table :data="deptData" border :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="DeptNo" align="center" label="部门编号" sortable width="180"></el-table-column>
      <el-table-column prop="DeptName" align="center" label="部门名称" width="180" sortable></el-table-column>
      <el-table-column prop="DeptDescript" align="center" label="描述"></el-table-column>
      <el-table-column align="center" label="状态" sortable>
        <template v-slot="scope">
          <el-tag
            effect="dark"
            :type="scope.row.Status == '1' ? 'success' : 'danger'"
          >{{ scope.row.Status == "1" ? "有效" : "无效" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateDate"
        align="center"
        label="创建时间"
        :formatter="DateFormat"
        sortable
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" @click="updDept(scope.row.DeptNo)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delDept(scope.row.DeptNo)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DeptManage",
  props: {
    msg: String
  },
  data() {
    return {
      deptData: [],
      dialogFormVisible: false,
      form: {
        title: "",
        deptno: "",
        deptnm: "",
        descript: "",
        status: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    allDeptInfo: function() {
      this.$axios
      .post("/api/deptList", {})
      .then(response => {
          this.deptData = response.data.data;
      })
      .catch(err => {
          console.log(err);
          this.$message.error({
          message: "请求出错，请联系管理员",
          center: true,
          duration: 1000
          });
      });    
    },
    DateFormat: function(row, column) {
      console.log(row + "__" + column);
      return new Date(row.CreateDate).toLocaleDateString();
    },
    cleanForm: function() {
      this.form.title = "";
      this.form.deptno = "";
      this.form.deptnm = "";
      this.form.descript = "";
      this.form.status = "";
    },
    addDept: function() {
      this.cleanForm();
      this.form.title = "新增部门";
      this.dialogFormVisible = true;
    },
    saveDeptinfo: function() {
      let url = "";
      let param = {};
      if (this.form.deptnm.length == 0) {
        this.$message.error({
          message: "部门名称不能为空",
          center: true,
          duration: 1000
        });
      }else if(this.form.deptno){
        //修改
        url = "/api/updDept";
        param = { deptno: this.form.deptno,status: this.form.status,deptName: this.form.deptnm, deptDecript: this.form.descript };
      }else{
        //新增
        url = "/api/addDept";
        param = { deptName: this.form.deptnm, deptDecript: this.form.descript };
      }
      this.$axios
          .post(url, param)
          .then(response => {
            if (response.data.data.affectedRows == 1) {
              this.$message.success({
                message: "保存成功",
                center: true,
                duration: 1000
              });
              this.dialogFormVisible = false;
            }else{
              this.$message.error({
                message: "保存失败",
                center: true,
                duration: 1000
              });
            }
          })
          .catch(err => {
          console.log(err);
          this.$message.error({
            message: "请求出错，请联系管理员",
            center: true,
            duration: 1000
          });
      });
      this.allDeptInfo();
    },
    updDept: function(deptno) {
      this.cleanForm();
      this.form.title = "修改部门";
      this.form.deptno = deptno;
      this.$axios
      .post("/api/deptList", { deptNo: deptno })
      .then(response => {
        let result = response.data.data;
        this.form.deptnm = result[0].DeptName;
        this.form.descript = result[0].DeptDescript;
        this.form.status = result[0].Status+"";
      })
      .catch(err => {
        console.log(err);
      });
      this.dialogFormVisible = true;
    },
    delDept: function(deptno) {
        this.$confirm('确认注销该部门？')
        .then(() => {
            this.$axios
            .get("/api/delDept?deptno="+deptno+"", {})
            .then(response => {
              if (response.data.data.affectedRows == 1) {
                this.$message.success({
                  message: "注销成功",
                  center: true,
                  duration: 1000
                });
                this.allDeptInfo();
                this.dialogFormVisible = false;
              }else{
                this.$message.error({
                    message: "注销失败",
                    center: true,
                    duration: 1000
                });
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error({
                message: "请求出错，请联系管理员",
                center: true,
                duration: 1000
              });
            }); 
        })
        .catch(() => {});
    }
  },
  mounted: function() {
    this.allDeptInfo();
  }
};
</script>

<style scoped>
el-table {
  height: 500px;
  width: 100%;
  text-align: center;
}

.addDiv {
  text-align: left;
  margin: 10px;
}
</style>
