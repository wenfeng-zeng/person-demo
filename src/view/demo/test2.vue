<template>
  <div class="map">
    <el-row :gutter="20">
      <el-col :span="15" style="position: relative;">
        <div id="container"></div>
        <div id="panel"></div>
      </el-col>
      <el-col :span="8" style="position: relative;">
        <div>
          <span v-for="(item ,index) in list" :key="index">
            [ {{item.lng + ','+ item.lat}} ],
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { init, addMarker, initScaleTools, removeMarker, transfer, walking, clearLine, searchByKeyword, searchNearBy, getAddressByLngLat } from "@/utils/map.js"
export default {
  data() {
    return {
      map: null,
      center: [113.481749, 23.196402],
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
      icon: '',
      beginPoints: [],
      beginMarks: [],
      clickListener: null,
      beginNum: 0,
      polyEditor: null,
      list: []
    }
  },
  mounted() {
    const _this = this
    this.initMap()
  },
  methods: {
    async initMap() {
      const _this = this
      const props = {
        zoom: 10,
        mapStyle: 'amap://styles/darkblue',
        center: this.center
      }
      init('container', props).then(AMap => {
        _this.map = AMap
        _this.map.on('click', this.clickHandler);
        // _this.polyEditor = new AMap.PolygonEditor(_this.map);
      }).catch(err => {
        this.$message.error(err);
      })
    },
    markerClick(eventName, handler, context) {
      // showInfoWindow(this.map, [eventName.lnglat.lng, eventName.lnglat.lat], '123123')
    },
    initScaleTools() {
      initScaleTools(this.map)
    },
    clickHandler(e) {
      // this.$message.success(e.lnglat.getLng() + ',' + e.lnglat.getLat())
      const _this = this
      // this.beginMarks.push(addMarker(e.lnglat));
      this.beginMarks.push(addMarker(this.map, [{ lng: e.lnglat.getLng(), lat: e.lnglat.getLat(), otherProps: { content: '' } }]))
      this.beginPoints.push(e.lnglat);
      this.beginNum++;
      if (this.beginNum >= 3) {
        this.map.clearMap();
        var polygon = this.createPolygon(this.beginPoints)
        this.list = polygon.getPath()
        this.map.plugin(["AMap.PolyEditor"], function() {
          _this.polyEditor = new AMap.PolyEditor(_this.map, polygon);
          // _this.polyEditor.addAdsorbPolygons(_this.beginPoints)
          _this.polyEditor.open();
          _this.polyEditor.on('adjust', function(event) {
            // console.log('触发事件： adjust', event)
            _this.list = [...polygon.getPath()]
          })
        });

      }
    },
    createPolygon(arr) {
      const _this = this
      var polygon = new AMap.Polygon({
        map: _this.map,
        path: arr,
        strokeColor: "#0000ff",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#f5deb3",
        fillOpacity: 0.35
      });
      return polygon;
    },
    //创建一个多边形对象的编辑类对象
    createEditor(polygon) {
      var polygonEditor = new AMap.PolyEditor(this.map, polygon);
      polygonEditor.open();
      AMap.event.addListener(polygonEditor, 'end', polygonEnd);
      return polygonEditor;
    },
    //编辑结束事件
    polygonEnd(res) {
      // resPolygon.push(res.target);
      // alert(resPolygon[resNum].contains([116.386328, 39.913818]));
      // appendHideHtml(resNum, res.target.getPath());

      // resNum++;
      // init();
    },
    //将多边形路径保存到html隐藏域里
    // appendHideHtml(index, arr) {
    //   var strify = JSON.stringify(arr);
    //   var html = '<input type="hidden" id="index' + index + '" name="paths[]" value="' + strify + '">';
    //   $('body').append(html);
    //   console.log(html);
    // },

    //清除前面的3个点标记
    clearMarks() {
      this.map.remove(this.beginMarks);
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
    height: 700px;
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