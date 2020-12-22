<template>
  <div id="cdTimerDom">
    <!-- <span>{{day}}</span>
    <span>天</span>
    <span>{{hours}}</span>
    <span>：</span>
    <span>{{min | addZero}}</span>
    <span>：</span>
    <span>{{sec | addZero}}</span> -->
    <span v-for="value in obj" :class="typeof(value) === Number ? 'isNum':''">
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        day: 2,
        other: '天',
        hours: 0,
        other1: ':',
        min: 0,
        other2: ':',
        nowtime: 0
      }
    }
  },
  filters: {
    addZero: function (value) {
      if (value < 10) return '0' + value
      return value
    },
  },
  computed: {
    sec () {
      const that = this
      var nowtime = that.nowtime,  //获取当前时间毫秒数
        endtime = new Date("2020/12/17").getTime(), //定义结束时间毫秒数
        lefttime = endtime - this.nowtime //距离结束时间的毫秒数
      this.obj.day = Math.floor(lefttime / (1000 * 60 * 60 * 24)) //计算天数
      this.obj.hours = Math.floor(lefttime / (1000 * 60 * 60) % 24)  //计算小时数
      this.obj.min = Math.floor(lefttime / (1000 * 60) % 60)  //计算分钟数
      var lefts = Math.floor(that.nowtime / 1000 % 60);  //计算秒数
      return lefts
    }
  },
  created () {
    this.countDownNext()
  },
  methods: {
    countDownNext () {
      const that = this
      this.obj.nowtime = new Date().getTime()  //获取当前时间毫秒数
      setInterval(function () {
        that.obj.nowtime += 1000
        that.$Set(that.obj, 'nowtime', that.obj.nowtime + 1000)
      }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>
#cdTimerDom {
  margin-top: 100px;
  margin-left: 50px;
  display: flex;
}
</style>