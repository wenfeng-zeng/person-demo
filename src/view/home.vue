<template>
  <div class="home">
    <!-- <wx-open-launch-weapp id="launch-btn" username="gh_06c4b7ded342" path="pages/home/index/index.html"> -->
    <!-- <script type="text/wxtag-template">
                <div class="btn">跳转小程序</div>
        <script> -->
    <!-- </wx-open-launch-weapp> -->
    <!-- <wx-open-launch-weapp id="launch-btn" username="gh_06c4b7ded342" path="pages/home/index/index.html" @error="handleErrorFn" @launch="handleLaunchFn">
      <script type="text/wxtag-template">
        <style>.btn { display: flex;align-items: center; }</style>                              
            <div> <button class="wx-btn">跳转小程序</button>   </div>            
        </script>
    </wx-open-launch-weapp> -->
  </div>
</template>
<script>
// import wx from 
// import wx from 'weixin-js-sdk'
export default {
  created () {
    wx.miniProgram.navigateTo({
      appId: 'wx840e58a464440e10',
      url: 'pages/home/index/index?id=xxx',
      success: function () {
        console.log('success')
      },
      fail: function () {
        console.log('fail');
      },
      complete: function () {
        console.log('complete');
      }
    })
    // console.log(wx)
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    //   appId: 'wx840e58a464440e10	', // 必填，公众号的唯一标识
    //   timestamp: '1414587457', // 必填，生成签名的时间戳
    //   nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
    //   signature: 'Wm3WZYTPz0wzccnW',// 必填，签名
    //   jsApiList: [], // 必填，需要使用的JS接口列表
    //   openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
    // })
    // })
    // wx.ready(function () {
    //   wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    //     appId: 'wx840e58a464440e10	', // 必填，公众号的唯一标识
    //     timestamp: '1414587457', // 必填，生成签名的时间戳
    //     nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
    //     signature: 'Wm3WZYTPz0wzccnW',// 必填，签名
    //     jsApiList: [], // 必填，需要使用的JS接口列表
    //     openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
    //   })
    // })
  },
  methods: {
    handleErrorFn (e) {
      console.log('fail', e.detail);
    },
    handleLaunchFn (e) {
      console.log('success');
    }
  }
}
</script>

<style>
</style>