<template>
  <div class="fullScreenDemo2">
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
        { url: 'fullScreenDemo/economy', name: '经济发展' },
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

  }
}
</script>

<style lang="less" scoped>
.fullScreenDemo2 {
  position: relative;
  .content {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    z-index: 9999;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    justify-content: space-between;
    width: 100vw;
    .item {
      width: 47%;
      color: #fff;
      cursor: pointer;
      // padding: 20px;
      &:nth-child(odd) {
        display: flex;
        justify-content: flex-start;
        > div {
          // justify-content: flex-start;
          span {
            display: block;
            text-align: right;
            padding-right: 100px;
          }
        }
      }
      &:nth-child(even) {
        display: flex;
        justify-content: flex-end;
        > div {
          // justify-content: flex-end;
          > span {
            // padding-right: 200px;
            padding-left: 100px;
          }
        }
      }
      // > div {
      //   display: flex;
      //   &:nth-child(odd) {
      //     justify-content: flex-start;
      //   }
      //   &:nth-child(even) {
      //     justify-content: flex-end;
      //   }
      // }
    }
    .item0 {
      // position: absolute;
      // left: 0;
      // top: 0;
      // height: 480px;
      // width: 110px;
      // background: url("~@/assets/index-leftbg1.png") no-repeat center;
      // background-size: 100% 100%;
      width: 388px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/left-item1-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/left-item1.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item2 {
      width: 406px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/left-item2-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/left-item2.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item4 {
      width: 412px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/left-item3-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/left-item3.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item6 {
      width: 412px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/left-item4-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/left-item4.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item8 {
      width: 406px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/left-item5-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/left-item5.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item10 {
      width: 388px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/left-item6-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/left-item6.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item1 {
      width: 388px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/right-item1-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/right-item1.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item3 {
      width: 406px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/right-item2-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/right-item2.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item5 {
      width: 412px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/right-item3-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/right-item3.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item7 {
      width: 412px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/right-item4-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/right-item4.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item9 {
      width: 406px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/right-item5-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/right-item5.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .item11 {
      width: 388px;
      height: 78px;
      line-height: 78px;
      background: url("~@/assets/right-item6-n.png") no-repeat center;
      background-size: 100% 100%;
      font-size: 26px;
      font-weight: 500;
      &:hover {
        background: url("~@/assets/right-item6.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}
#container {
  width: 100vw;
  height: 100vh;
}
</style>