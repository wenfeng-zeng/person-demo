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
    <div class="history">
      <el-table border :data="tableData">
        <el-table-column align="center" prop="id" label="抽奖号"> </el-table-column>
        <el-table-column align="center" prop="date" label="日期"> </el-table-column>
        <el-table-column align="center" prop="name" label="奖品"> </el-table-column>
        <!-- <el-table-column align="center" prop="count" label="数量"> </el-table-column> -->
      </el-table>
      <div class="pagination">
        <page :currentPage="currentPage" :pageSize="pageSize" :total="total" @sizeChange="handleSizeChange" @pageChange="handleCurrentChange"></page>
      </div>
    </div>
  </div>
</template>

<script>
import { statisticalForHome, getRequest } from '@/request/home'
import page from '@/components/page'
export default {
  components: {
    page
  },
  data () {
    return {
      prizeList: [],
      isPrize: 0,
      timer: null,
      timeSpeed: 40,
      scollNum: 0,
      index: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      pageOptions: ['5', '10', '30', '50'],
      total: 0
    }
  },
  created () {
    this.getList()
    this.getHistory(this.currentPage, this.pageSize)
  },
  methods: {
    getHistory (pageNum, pageSize) {
      let params = {
        pageNum,
        pageSize
      }
      getRequest('/getPrizeHistory', params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.total = res.count['count(*)']
          this.tableData.forEach(e => {
            e.date = this.getTime(e.date)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getList () {
      statisticalForHome('/prizeList', {}).then(res => {
        // this.post = res
        this.prizeList = res.data
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
        if (res.code === 200) {
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
        if (_this.index === index && _this.scollNum >= 18 * count) {
          _this.isPrize = 0
          _this.timeSpeed = 40
          _this.scollNum = 0
          clearTimeout(_this.timer)
          _this.getHistory(_this.currentPage, _this.pageSize)
          _this.$alert(`${_this.prizeList[index].name}`, '提醒', {
            confirmButtonText: '确定'
          });
        } else {
          if (_this.scollNum >= 17 * count) {
            _this.timeSpeed += 30
          } else if (_this.scollNum >= 16 * count) {
            _this.timeSpeed += 10
          } else if (_this.scollNum >= 13 * count) {
            _this.timeSpeed += 5
          }
          _this.startScoll(index)
        }
      }, _this.timeSpeed)
    },
    getTime (time) {
      let newDay = new Date(Number(time))
      let y = newDay.getFullYear()
      let m = newDay.getMonth() + 1
      let d = newDay.getDate()
      let h = newDay.getHours()
      let mm = newDay.getMinutes()
      let ss = newDay.getSeconds()
      if (m < 10) m = '0' + m
      if (d < 10) d = '0' + d
      if (h < 10) h = '0' + h
      if (mm < 10) mm = '0' + mm
      if (ss < 10) ss = '0' + ss
      return `${y}-${m}-${d} ${h}:${mm}:${ss}`
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getHistory(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getHistory(this.currentPage, this.pageSize)
    }
  }
}
</script>

<style lang="less" scoped>
.rem (@name,@px) {
  //   @{name} : unit(@px  /  75, rem);
  @{name}: unit(@px / 16, rem);
}
/**最大媒体宽度**/
.prize {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
  @media screen and (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
    margin-right: 0px;
  }
  .box {
    width: 396px;
    // width: 600px;
    margin-left: 100px;
    @media screen and (max-width: 500px) {
      margin-left: 0;
    }
    background: url("../../assets/findTreasureRecord_bounced.png") no-repeat;
    height: 500px;
    // position: relative;
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
      position: relative;
      top: -120px;
      left: 31%;
      width: 132px;
      height: 120px;
      img {
        width: 100%;
        text-align: center;
      }
    }
  }
  .history {
    margin: 20px 20px 20px 20px;
    // border: 1px solid #ebeef5; /*no*/
    /deep/.el-table {
      width: 800px;
      .el-table__header {
        th {
          background-color: #f4f9ff !important;
        }
      }
    }
    @media screen and (max-width: 500px) {
      width: 100%;
      /deep/.el-table {
        width: 100%;
      }
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      background-color: #f4f9ff;
      padding-bottom: 10px;
      @media screen and (max-width: 500px) {
        width: 100%;
      }
    }
  }
}
</style>