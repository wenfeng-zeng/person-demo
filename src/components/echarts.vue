<template>
  <div class="echarts_components">
    <div class="echarts_canvas" :id="id" :style="{ height: '350px', width:width }"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
// Vue.prototype.$echarts = echarts;
export default {
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    width: {
      type: String,
      default: '500px'
    },
    id: {
      type: String,
      default: 'myChart'
    }
  },
  watch: {
    //观察option的变化
    chartData: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        // var myChart = this.$echarts.init(document.getElementById(this.id));
        var myChart = echarts.init(document.getElementById(this.id));
        myChart.setOption(newVal);
      },
      deep: true
    }
  },
  data() {
    // var myChart = this.$echarts.init(document.getElementById(this.id));
    return {

    };
  },
  mounted() {
    this.draw(); //执行下面的函数
  },
  methods: {
    draw() {
      // var myChart = this.$echarts.init(document.getElementById(this.id));
      var myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption(this.chartData);
    }
  },
};
</script>
<style lang="less">
.echarts_components {
  .echarts_canvas {
    // width: 500px;
  }
}
</style>