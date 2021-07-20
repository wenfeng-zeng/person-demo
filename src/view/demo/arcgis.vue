<template>
  <div id="viewDiv"></div>
</template>
<script src="https://js.arcgis.com/4.20/"></script>
<script>


// import Map from "esri/Map";
// import MapView from "esri/views/MapView";
// import { loadModules } from "esri-loader";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import * as intl from "@arcgis/core/intl";
// import esriConfig from "@arcgis/core/config";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";


// window.dojoConfig = {
//   packages: [
//     {
//       name: "vue",
//       location: "https://unpkg.com/vue/dist/",
//       main: "vue"
//     }
//   ]
// };

export default {
  mounted() {
    // this.init()
    // loadModules(['esri/views/MapView', 'esri/WebMap'])
    //   .then(([MapView, WebMap]) => {
    //     var webmap = new WebMap({

    //     });
    //     var view = new MapView({
    //       map: webmap,
    //       container: 'viewDiv',
    //       center: [113.45521, 23.166382],
    //       zoom: 13,
    //     });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    // const map = new Map({
    //   basemap: "hybrid",
    //   ground: "world-elevation"
    // });

    // const view = new SceneView({
    //   container: "viewDiv",
    //   map: map,
    //   camera: {
    //     position: [7.654, 45.919, 5184],
    //     tilt: 80
    //   }
    // });
  },
  methods: {
    async init() {
      const [Map, MapView] = await loadModules([
        "esri/Map",
        "esri/views/MapView"
      ], function(esriConfig, Map, MapView) {
        console.log(esriConfig);
        esriConfig.apiKey = "AAPKefd0741d2f3c47ca8e9c0cd0acc5e2287jP33y-SD7kVHpILiHj2AdjyooHLtBTsCZhZWoWJdnIJ-dWyyJI-i1im65zP6l1h";
      }
      );
      const map = new Map({
        basemap: "arcgis-topographic"
      });
      const view = new MapView({
        map: map,
        center: [-118.805, 34.027],
        zoom: 13,
        container: "viewDiv"
      })
    }
  }
}
</script>

<style lang="less" scoped>
#viewDiv {
  padding: 0;
  margin: 0;
  height: 30vh;
  width: 30vw;
}
</style>