<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>基础数据</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><router-link to="/deptManage">部门管理</router-link></el-menu-item>
              <el-menu-item index="1-2">职工管理</el-menu-item>
              <el-menu-item index="1-2">班级管理</el-menu-item>
              <el-menu-item index="1-2">学生管理</el-menu-item>
              <el-menu-item index="1-2">数据导出</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">照片墙</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-message"></i>
            <span slot="title">考勤管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-message"></i>
            <span slot="title">公告管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>