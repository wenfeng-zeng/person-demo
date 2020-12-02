<template>
  <div class="prize">
    <div class="box">
      <div class="list">
        <ul>
          <li v-for="(item,index1 ) in prizeList" :key="item.id" :class="index === index1 ? 'active':''">
            <img src="../../assets/siChouCar.png" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="btn" @click="getPrize">
        <img src="../../assets/indiana_one.png" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<script>
import { statisticalForHome, getRequest } from '@/request/home'
export default {
  data () {
    return {
      prizeList: [],
      isPrize: 0,
      timer: null,
      timeSpeed: 40,
      scollNum: 0,
      index: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      statisticalForHome('/prizeList', {}).then(res => {
        // this.post = res
        this.prizeList = res.data.list
      }).catch(err => {
        console.log(err)
      })
    },
    getPrize () {
      if (this.isPrize !== 0) {
        this.$message.warning('正在抽奖中')
        return false
      }
      statisticalForHome('/getPrize', {}).then(res => {
        console.log(res.data.name)
        if (res.code === 0) {
          this.isPrize += 1
          let result = res.data
          let index = this.prizeList.findIndex(e => {
            return e.id === result.id
          })
          this.startScoll(index)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    startScoll (index) {
      let _this = this
      _this.timer = setTimeout(() => {
        _this.scollNum++
        let count = _this.prizeList.length
        _this.index++
        if (_this.index > count - 1) {
          _this.index = 0
        }
        if (_this.scollNum >= 20 * count && _this.index === index) {
          _this.isPrize = 0
          _this.timeSpeed = 40
          _this.scollNum = 0
          clearInterval(_this.timer)
        } else {
          if (_this.scollNum >= 19 * count) {
            _this.timeSpeed += 20
          } else if (_this.scollNum >= 15 * count) {
            _this.timeSpeed += 4
          }
          _this.startScoll(index)
        }
      }, _this.timeSpeed)
    }
  }
}
</script>

<style lang="less" scoped>
.prize {
  margin: 0;
  padding: 0;
  width: 600px;
  margin: 0 auto;
  .box {
    width: 396px;
    background: url("../../assets/findTreasureRecord_bounced.png") no-repeat;
    height: 500px;
    position: relative;
    background-size: 100%;
    .list {
      ul {
        top: 100px;
        position: relative;
        height: 360px;
        padding: 0;
        li {
          list-style-type: none;
          width: 33%;
          position: absolute;
          background: url("../../assets/squareBj_small.png") no-repeat;
          height: 120px;
          text-align: center;
          img {
            width: 60%;
          }
          p {
            margin: 0;
            color: #fff;
          }
          &:nth-child(1) {
            top: 0;
            left: 0;
          }
          &:nth-child(2) {
            top: 0;
            left: 33%;
          }
          &:nth-child(3) {
            top: 0;
            right: 1%;
          }
          &:nth-child(4) {
            top: 120px;
            right: 1%;
          }
          &:nth-child(5) {
            top: 240px;
            right: 1%;
          }
          &:nth-child(6) {
            top: 240px;
            left: 33%;
          }
          &:nth-child(7) {
            top: 240px;
            left: 0;
          }
          &:nth-child(8) {
            top: 120px;
            left: 0;
          }
        }
        .active {
          background: url("../../assets/squareBj_small_big.png") no-repeat;
        }
      }
    }
    .btn {
      position: absolute;
      top: 250px;
      left: 31%;
      width: 132px;
      height: 120px;
      img {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>