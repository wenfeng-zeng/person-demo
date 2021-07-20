<template>
  <div class="fullScreenDemo">
    <PrivinceMap />
    <div class="content">
      <div :class="'item'" v-for="(item,index) in list" :key="index">
        <div :class="'item'+ index" @click="handerGoTo(item)">
          <span>
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrivinceMap from '@/components/privinceMap.vue'
import countTo from 'vue-count-to'
export default {
  components: {
    PrivinceMap,
    countTo
  },
  data() {
    return {
      list: [
        { url: '', name: '党建引领' },
        { url: '', name: '房屋征迁' },
        { url: '/fullScreenDemo/economy', name: '经济发展' },
        { url: '', name: '城市更新' },
        { url: '', name: '社会治理' },
        { url: '', name: '村镇建设' },
        { url: '', name: '民生服务' },
        { url: '', name: '环境保护' },
        { url: '', name: '督查督办' },
        { url: '', name: '农业农村' },
        { url: '', name: '应急管理' },
        { url: '', name: '森林防火' }
      ]
    }
  },
  mounted() {
  },
  methods: {
    handerGoTo(item) {
      if (!item.url) {
        this.$message.warn('暂未开通')
        return false
      }
      console.log(item.url);
      this.$router.push(item.url)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>