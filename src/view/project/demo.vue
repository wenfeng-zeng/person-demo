<template>
  <div class="demo">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="字体动画" name="fontDemo"></el-tab-pane>
      <el-tab-pane label="抽奖" name="prize"></el-tab-pane>
      <el-tab-pane label="鼠标聚光灯" name="lightDemo"></el-tab-pane>
      <el-tab-pane label="web-view" name="web-view"></el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 0
    }
  },
  methods: {
    handleClick (el) {
      console.log(el.index, el)
      this.$router.push({ path: '/demo/' + el.name })
    }
  }
}
</script>

<style lang="less" scoped>
</style>