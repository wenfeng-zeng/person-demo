<template>
  <div class="privinceMap">
    <div id="container"></div>
  </div>
</template>

<script>
import { init, getCurrentPosition } from "@/utils/map.js";
export default {
  data() {
    return {
      map: null,
      center: [],
      addressComponent: {},
      colors: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const _this = this;
      const props = {
        mapStyle: "amap://styles/darkblue",
        zoom: 13,
        zooms: [5, 18]
        // center: [113.40227, 24.206497]
      };
      init("container", props)
        .then(AMap => {
          _this.map = AMap;
          getCurrentPosition(_this.map, res => {
            _this.addressComponent = res.addressComponent;
            _this.center = [res.position.lng, res.position.lat];
            AMap.plugin(["AMap.DistrictLayer"], function() {
              //异步同时加载多个插件
              _this.initProvince(res.addressComponent.adcode, 2);
              // _this.initProvince("441881", 2);
            });
          });
          //   err => {
          //     console.log(err, "--err");
          //   },
          //   { zoomToAccuracy: false }
          // );
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    initProvince(code, dep) {
      var disProvince;
      dep = typeof dep == "undefined" ? 2 : dep;
      disProvince && disProvince.setMap(null);
      disProvince = new AMap.DistrictLayer.Province({
        zIndex: 10,
        adcode: [code],
        // adcode: ["441881"],
        depth: dep,
        styles: {
          fill: function(properties) {
            // properties为可用于做样式映射的字段，包含
            // NAME_CHN:中文名称
            // adcode_pro
            // adcode_cit
            // adcode
            return "#404d6d";
          }
          // 'province-stroke': 'cornflowerblue',
          // 'city-stroke': 'white', // 中国地级市边界
          // 'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
        }
      });
      disProvince.setMap(this.map);
    }
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100vw;
  height: 100vh;
}
.amap-logo {
  display: none !important;
}
.amap-copyright {
  display: none !important;
}
</style>
