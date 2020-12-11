<template>
  <div class="aside">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="简历" name="resume"></el-tab-pane>
      <el-tab-pane label="项目简介" name="account"></el-tab-pane>
      <el-tab-pane label="fontDemo" name="fontDemo"></el-tab-pane>
      <el-tab-pane label="lightDemo" name="lightDemo"></el-tab-pane>
      <el-tab-pane label="loading" name="loading"></el-tab-pane>
      <el-tab-pane label="prize" name="prize"></el-tab-pane>
      <el-tab-pane label="test" name="test"></el-tab-pane>
    </el-tabs> -->
    <el-menu :default-active="onroutes" class="el-menu-vertical-demo" mode="horizontal" unique-opened router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
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
        <el-menu-item index="/snow">snow-demo</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      activeName: 'resume'
    }
  },
  computed: {
    onroutes () {
      return '/' + this.$route.path.split('/')[1]
    }
  },
  methods: {
    handleOpen () { },
    handleClose () { },
    handleClick () {
      if (this.$route.path === '/' + this.activeName) return
      this.$router.push({ path: '/' + this.activeName })
    }
  }
}
</script>

<style lang="less" scoped>
@deep: ~">>>";
.aside {
  // width: 200px;
  // position: relative;
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