<template>
  <div class="home">
    <el-container>
      <!-- <el-header>
        <Header></Header>
      </el-header> -->
      <el-aside style="width:200px;">
        <Aside class="aside" :asideMune="meneList"></Aside>
        <!-- <Aside class="aside"></Aside> -->
      </el-aside>
      <!-- 内容区 -->
      <el-main style="padding:0;">
        <router-view></router-view>
      </el-main>
    </el-container>
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
      meneList: []
    }
  }
}
</script>

<style>
</style>