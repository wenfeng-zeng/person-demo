<template>
  <div class="aside">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu :default-active="onroutes" class="el-menu-vertical-demo" unique-opened router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">简历</span>
        </template>
        <el-menu-item index="/resume">简历</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-ice-drink"></i>
          <span slot="title">demo</span>
        </template>
        <el-menu-item index="/fontDemo">fontDemo</el-menu-item>
        <el-menu-item index="/lightDemo">lightDemo</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    onroutes () {
      return '/' + this.$route.path.split('/')[1]
    }
  },
  methods: {
    handleOpen () { },
    handleClose () { }
  }
}
</script>

<style lang="less" scoped>
.aside {
  width: 200px;
}
</style>