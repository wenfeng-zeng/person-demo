<template>
  <div class="demo">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="字体动画" name="fontDemo"></el-tab-pane>
      <el-tab-pane label="抽奖" name="prize"></el-tab-pane>
      <el-tab-pane label="鼠标聚光灯" name="lightDemo"></el-tab-pane>
      <el-tab-pane label="echarts" name="echarts"></el-tab-pane>
      <el-tab-pane label="地图" name="map"></el-tab-pane>
      <el-tab-pane label="waterMarker" name="waterMarker"></el-tab-pane>
      <!-- <el-tab-pane label="arcgis" name="arcgis"></el-tab-pane> -->
      <el-tab-pane label="webSocket" name="webSocket"></el-tab-pane>
      <!-- <el-tab-pane label="roomCharts" name="roomCharts"></el-tab-pane> -->
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 0
    };
  },
  mounted() {
    Array.from(document.getElementsByClassName("demo"))[0].scrollIntoView();
  },
  methods: {
    handleClick(el) {
      this.$router.push("/demo/" + el.name);
    }
  }
};
</script>

<style lang="less" scoped></style>
