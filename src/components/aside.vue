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
          <i class="el-icon-user"></i>
          <span slot="title">项目简介</span>
        </template>
        <el-menu-item index="/account"><span>薪元共享经济综合服务平台</span></el-menu-item>
        <el-menu-item index="/payment"><span>容易付钱包</span></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-ice-drink"></i>
          <span slot="title">demo</span>
        </template>
        <el-menu-item index="/fontDemo">font-demo</el-menu-item>
        <el-menu-item index="/lightDemo">light-demo</el-menu-item>
        <el-menu-item index="/loading">loading-demo</el-menu-item>
        <el-menu-item index="/test">test-demo</el-menu-item>
        <el-menu-item index="/prize">prize-demo</el-menu-item>
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
@deep: ~">>>";
.aside {
  width: 200px;
  @{deep}.el-menu {
    // /deep/.el-menu-item {
    overflow: hidden;
    .el-menu-item {
      overflow: hidden;
      position: relative;
      padding-left: 0 !important;
      margin-left: 40px;
      > span {
        // transform: translate();
        display: inline-block;
        white-space: nowrap;
        &:hover {
          animation: move 1.5s infinite alternate linear;
        }
      }
    }
  }
}
@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(calc(-100% + 150px), 0);
  }
}
</style>