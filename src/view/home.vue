<template>
  <div class="home">
    <template v-if="!_isMobile">
      <el-container>
        <!-- <div class="aside">
          <Aside></Aside>
        </div> -->
        <el-main style="padding:0;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import Header from '@/components/herder.vue'
import Aside from '@/components/aside.vue'
// import Header from '@/components/herder.vue'
export default {
  components: {
    Header,
    Aside
  },
  data () {
    return {
      meneList: [],
      _isMobile: null
    }
  },
  created () {
    console.log(this.$utils._isMobile())
    this._isMobile = this.$utils._isMobile()
    if (this._isMobile) this.$router.push({
      path: '/phoneHome'
    })
  },
}
</script>

<style lang="less" scoped>
.home {
  // background-color: #464c5b;
}
.aside {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}
</style>