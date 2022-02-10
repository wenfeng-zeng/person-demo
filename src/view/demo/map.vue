<template>
  <div class="map">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="btn">
          <el-input label="定位附近搜索" placeholder="请输入定位附近搜索关键字" v-model="searchNearByKey">
            <el-button slot="append" icon="el-icon-search" @click="searchNearBy(1,5,searchNearByKey)" type="primary">searchNearBy</el-button>
          </el-input>
          <el-input label="关键字搜索" placeholder="请输入搜索关键字" v-model="keyWord">
            <el-button slot="append" icon="el-icon-search" @click="searchByKeyword(1,5)"></el-button>
          </el-input>
          <el-button @click="initScaleTools" type="primary">添加比例尺及缩放工具栏</el-button>
          <el-button @click="removeMarker" type="primary">removeMarker</el-button>
        </div>
      </el-col>
      <el-col :span="10" style="position: relative;">
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
    <div class="tip">
      <div class="tip-box">
        <h3>已实现功能</h3>
        <div class="tip-detail">
          <p>1、定位</p>
          <p>2、添加比例尺缩放工具</p>
          <p>3、点标记点击功能</p>
          <p>4、定位中心搜索</p>
          <p>5、全局关键字搜索</p>
          <p>6、公交导航</p>
          <p>7、步行导航</p>
          <p>8、地图选点功能</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Amap from '@/components/mapComponent'
// import AMapLoader from '@amap/amap-jsapi-loader';
import auth from '@/assets/auth.png'
import { init, getCurrentPosition, addMarker, initScaleTools, removeMarker, showInfoWindow, transfer, walking, clearLine, searchByKeyword, searchNearBy, getAddressByLngLat } from "@/utils/map.js"
// import mapJS from "@/utils/map.js"
// const icon = new AMap.Icon({
//   image: auth,
//   size: new AMap.Size(60, 60),
//   imageSize: new AMap.Size(30, 30)
// })
export default {
  data () {
    return {
      map: null,
      center: [],
      searchNearByKey: '',
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      showNearBy: false,
      keyWord: '',
      addressComponent: {},
      lineStrory: null,
      type: 'searchNearBy',
      markerList: [],
      icon: ''
    }
  },
  mounted () {
    const _this = this
    this.initMap()
    // _this.map = new AMap.Map('container', {
    //   zoom: 15
    // });
    // _this.map.on('click', this.clickHandler);
    // getCurrentPosition(_this.map, (res) => {
    //   _this.addressComponent = res.addressComponent
    //   _this.center = [res.position.lng, res.position.lat]
    //   addMarker(_this.map, [{ lng: res.position.lng, lat: res.position.lat, otherProps: { title: '广州', icon, draggable: true } }], this.markerClick)
    // }, () => { }, {})
  },
  methods: {
    async initMap () {
      const _this = this
      // AMapLoader.load({
      //   "key": "0bea50b4d93ba7cbb1325e705f2010da",
      //   "version": "1.4.15",
      //   "plugins": [],
      //   "AMapUI": {
      //     "version": '1.1',
      //     "plugins": [],
      //   },
      //   "Loca": {
      //     "version": '1.3.2'
      //   },
      // }).then((AMap) => {
      //   console.log(AMap);
      //   _this.map = new AMap.Map('container');
      //   _this.map.on('click', this.clickHandler);
      //   _this.icon = new AMap.Icon({
      //     image: auth,
      //     size: new AMap.Size(60, 60),
      //     imageSize: new AMap.Size(30, 30)
      //   })
      //   getCurrentPosition(_this.map, (res) => {
      //     _this.addressComponent = res.addressComponent
      //     _this.center = [res.position.lng, res.position.lat]
      //     addMarker(_this.map, [{ lng: res.position.lng, lat: res.position.lat, otherProps: { title: '广州' } }], this.markerClick)
      //   }, () => { }, {})
      // }).catch(e => {
      //   console.log(e);
      // })
      const props = {
        zoom: 15
      }
      init('container', props).then(AMap => {
        _this.map = AMap
        _this.map.on('click', this.clickHandler);
        // _this.icon = new AMap.Icon({
        //   // image: auth,
        //   size: new AMap.Size(60, 60),
        //   imageSize: new AMap.Size(30, 30)
        // })
        getCurrentPosition(_this.map, (res) => {
          console.log(res);
          _this.addressComponent = res.addressComponent
          _this.center = [res.position.lng, res.position.lat]
          addMarker(_this.map, [{ lng: res.position.lng, lat: res.position.lat, otherProps: { title: '广州' } }], this.markerClick)
        }, (err) => {
          console.log(err, '--err');
        }, {})
      }).catch(err => {
        this.$message.error(err);
      })
    },
    markerClick (eventName, handler, context) {
      showInfoWindow(this.map, [eventName.lnglat.lng, eventName.lnglat.lat], '123123')
      // this.$message.success(eventName.lnglat.lng + ',' + eventName.lnglat.lat)
    },
    initScaleTools () {
      initScaleTools(this.map)
    },
    searchNearBy (pageNum, pageSize, keyWord, center) {
      if (!this.showNearBy) this.showNearBy = !this.showNearBy
      this.type = 'searchNearBy'
      searchNearBy(this.map, center ? center : this.center, (status, result) => {
        if (result.info === 'OK') {
          this.total = result.poiList.count
          this.tableData = result.poiList.pois
        }
      }, { city: this.addressComponent.city, keyWord, pageIndex: pageNum, pageSize }, keyWord, 50000)
      addMarker(this.map, [{ lng: this.center[0], lat: this.center[1], otherProps: { title: '广州', icon: this.icon, draggable: true } }], this.markerClick)

    },
    searchByKeyword (pageNum, pageSize) {
      if (!this.showNearBy) this.showNearBy = !this.showNearBy
      this.type = 'searchByKeyword'
      searchByKeyword(this.map, (status, result) => {
        if (result.info === 'OK') {
          this.total = result.poiList.count
          this.tableData = result.poiList.pois
        }
      }, { city: this.addressComponent.city, pageIndex: pageNum, pageSize }, this.keyWord)
      addMarker(this.map, [{ lng: this.center[0], lat: this.center[1], otherProps: { title: '广州', icon: this.icon, draggable: true } }], this.markerClick)

    },
    handleSizeChange (val) {
      this.pageNum = 1
      this.pageSize = val
      this.type === 'searchByKeyword' ? this.searchByKeyword(this.pageNum, this.pageSize) : this.searchNearBy(this.pageNum, this.pageSize)
    },
    handleCurrentChange (val) {
      this.pageNum = val
      // this.searchByKeyword(this.pageNum, this.pageSize)
      this.type === 'searchByKeyword' ? this.searchByKeyword(this.pageNum, this.pageSize) : this.searchNearBy(this.pageNum, this.pageSize)

    },
    callback (status, result, lineStrory) {
      console.log(status, result, lineStrory);
      if (status === 'complete') {
        this.lineStrory = lineStrory
      } else {
        this.$message.error(result)
      }
    },
    clickHandler (e) {
      // this.$message.success(e.lnglat.getLng() + ',' + e.lnglat.getLat())

      getAddressByLngLat([e.lnglat.getLng(), e.lnglat.getLat()], (status, res) => {
        if (res.info === 'OK') {
          const content = '<i style="color:red;font-size:28px;" class="el-icon-s-flag"></i>'
          this.markerList.push(...addMarker(this.map, [{ lng: e.lnglat.getLng(), lat: e.lnglat.getLat(), otherProps: { title: res.regeocode.formattedAddress, content: content } }], (eventName, handler, context) => {
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
          }))
        }
      })
    },
    goto (item, type) {
      const { location } = item
      console.log(location, item, this.center, [location.lng, location.lat]);
      if (type === 'bus') {
        if (this.lineStrory) clearLine(this.lineStrory)
        transfer(this.map, this.center, [location.lng, location.lat], item.cityname, this.callback)
        // transfer(this.map, this.center, [113.45521, 23.166382], '', this.callback, '', false, '磨碟沙', '溢信科技')
      } else {
        if (this.lineStrory) clearLine(this.lineStrory)
        walking(this.map, this.center, [location.lng, location.lat], '', this.callback)
      }
    },
    removeMarker () {
      removeMarker(this.map, this.markerList)
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
    > .el-button,
    .el-input {
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
    /deep/.el-table__header {
      tr {
        th {
          background-color: #f4f9ff;
        }
      }
    }
  }
  .tip {
    .tip-box {
      width: 600px;
      background-color: #f8d291;
      margin-left: 40px;
      margin-top: 40px;
      border-radius: 20px;
      padding: 20px;
      h3 {
        font-weight: 500;
        padding-bottom: 5px;
        // font-size: 14px;
      }
      p {
        font-size: 14px;
      }
    }
  }
}
</style>