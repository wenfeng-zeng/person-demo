<template>
  <div class="web_view">
    <h3>小程序web-view demo</h3>
    <div class="web_view_box">
      <span>请输入appid:</span>
      <el-input placeholder="请输入小程序appid" v-model="appid">
      </el-input>
    </div>
    <div class="nav_btn">
      <el-button type="success" @click="navigateBack">navigateBack</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      appid: ''
    }
  },
  created () {
    console.log(wx)
  },
  methods: {
    navigateBack () {
      wx.miniProgram.navigateBack()
    }
  }
}
</script>

<style lang="less" scoped>
.web_view {
  .web_view_box {
    width: 400px;
    margin: 0 auto;
    // background-color: #e9e9e9;
    display: flex;
    // margin-top: 20px;
    // padding: 20px;
    @media screen and (max-width: 800px) {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
    }
    span {
      margin-right: 5px;
      width: 150px;
      display: block;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
    }
    /deep/.el-input {
      display: inline-block;
    }
  }
}
</style>