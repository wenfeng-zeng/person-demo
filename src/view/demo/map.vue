<template>
  <div class="map">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="btn">
          <el-button @click="searchNearBy(1,5)" type="primary">searchNearBy</el-button>
          <el-button @click="initScaleTools" type="primary">添加比例尺及缩放工具栏</el-button>
          <!-- <el-button @click="getLine" type="primary">获取交通路线</el-button> -->
          <el-input label="关键字搜索" placeholder="请输入搜索关键字" v-model="keyWord">
            <el-button slot="append" icon="el-icon-search" @click="searchNearBy(1,5,keyWord)"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="11" style="position: relative;">
        <div id="container"></div>
        <div id="panel"></div>
      </el-col>
      <el-col :span="9">
        <div class="info-box">
          <el-table border :data="tableData" style="width: 100%" v-if="showNearBy">
            <el-table-column prop="name" label="名字">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" plain @click="goto(scope.row,'bus')"> 公交前往</el-button>
                <el-button size="small" type="primary" plain @click="goto(scope.row,'warking')"> 步行前往</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination v-if="showNearBy" @size-change="handleSizeChange" :current-page="pageNum" :page-size="pageSize" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" background layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Amap from '@/components/mapComponent'
import { getCurrentPosition, addMarker, initScaleTools, transfer, walking, clearLine, showInfoWindow, searchNearBy, getAddressByLngLat } from "@/utils/map.js"
export default {
  // components: {
  //   Amap
  // }
  data() {
    return {
      map: null,
      center: [],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      showNearBy: false,
      keyWord: '',
      addressComponent: {},
      lineStrory: null
    }
  },
  mounted() {
    const _this = this
    _this.map = new AMap.Map('container', {
      zoom: 15
    });
    _this.map.on('click', this.clickHandler);
    getCurrentPosition(_this.map, (res) => {
      console.log(res);
      _this.addressComponent = res.addressComponent
      _this.center = [res.position.lng, res.position.lat]
      addMarker(_this.map, [{ lng: res.position.lng, lat: res.position.lat, otherProps: { title: '广州', draggable: true } }], this.markerClick)
    }, () => { }, {})
  },
  methods: {
    markerClick(eventName, handler, context) {
      // showInfoWindow(this.map, [eventName.lnglat.lng, eventName.lnglat.lat], '123123')
    },
    initScaleTools() {
      initScaleTools(this.map)
    },
    searchNearBy(pageNum, pageSize, keyWord, center) {
      if (!this.showNearBy) this.showNearBy = !this.showNearBy
      searchNearBy(this.map, center ? center : this.center, (status, result) => {
        if (result.info === 'OK') {
          this.total = result.poiList.count
          this.tableData = result.poiList.pois
        }
      }, { city: this.addressComponent.city, pageIndex: pageNum, pageSize }, keyWord, 50000)
    },
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.searchNearBy(this.pageNum, this.pageSize)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.searchNearBy(this.pageNum, this.pageSize)
    },
    callback(status, result, lineStrory) {
      this.lineStrory = lineStrory
    },
    clickHandler(e) {
      getAddressByLngLat([e.lnglat.getLng(), e.lnglat.getLat()], (status, res) => {
        if (res.info === 'OK') {
          const content = '<i style="color:red;font-size:28px;" class="el-icon-s-flag"></i>'
          addMarker(this.map, [{ lng: e.lnglat.getLng(), lat: e.lnglat.getLat(), otherProps: { title: res.regeocode.formattedAddress, content: content } }], (eventName, handler, context) => {
            if (!this.showNearBy) this.showNearBy = !this.showNearBy
            this.total = 1
            this.tableData = [
              {
                name: res.regeocode.formattedAddress,
                address: res.regeocode.formattedAddress,
                location: {
                  lng: e.lnglat.getLng(),
                  lat: e.lnglat.getLat()
                }
              }
            ]
          })
        }
      })
    },
    goto(item, type) {
      const { location } = item
      if (type === 'bus') {
        if (this.lineStrory) clearLine(this.lineStrory)
        transfer(this.map, this.center, [location.lng, location.lat], '', this.callback)
        // transfer(this.map, this.center, [113.45521, 23.166382], '', this.callback, '', false, '磨碟沙', '溢信科技')
      } else {
        if (this.lineStrory) clearLine(this.lineStrory)
        walking(this.map, this.center, [location.lng, location.lat], '', this.callback)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  // display: flex;
  // padding: 40px;
  // justify-content: center;
  .btn {
    // width: 400px;
    display: flex;
    flex-direction: column;
    > .el-button {
      margin: 10px;
    }
  }
  #container {
    width: 100%;
    height: 400px;
  }
  #panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }
  .info-box {
    padding: 0 20px;
  }
}
</style>