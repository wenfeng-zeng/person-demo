<template>
  <div class="economy">
    <PrivinceMap />
    <div class="content">
      <div class="left">
        <div class="structure">
          <!-- <div class="title">
            <span>产业结构</span>
            <span>Industrial Structure</span>
          </div> -->
          <div class="structure-content">
            <div class="ring"></div>
            <div class="text">

            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>

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

    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import "../index.less";
</style>