<template>
  <div class="phoneHome">
    phoneHome
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/phoneHome/phonePrize" icon="home-o">
        简历
      </van-tabbar-item>
      <van-tabbar-item replace to="/phoneHome/phoneInfo" icon="search">
        标签
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
</style>