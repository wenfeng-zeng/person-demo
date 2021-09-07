<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
// import {
//   Viewer,
//   Ion,
//   createWorldTerrain,
//   Cartesian3,
//   createOsmBuildings,
//   Cesium3DTileStyle,
//   PrimitiveCollection
// } from "cesium/Cesium";
// import * as Cesium from "cesium";
import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjQ5YzExZC1lMDlmLTRiYTktODRkYi1hYTJmOWIyYTdkYjIiLCJpZCI6NjQ2NTMsImlhdCI6MTYyOTM2NDQ0M30.N0y27WwFgWLPnn7BcrKgGwoNi7jCXli7DH4epnKf6dY";
      // let viewer = new Viewer("cesiumContainer");
      const viewer = new Cesium.Viewer("cesiumContainer", {
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   url: Cesium.IonResource.fromAssetId(1)
        // }),
        // terrainProvider: Cesium.createWorldTerrain(),
        animation: false,
        scene3DOnly: true, // 每个几何实例将仅以 3D 方式渲染以节省 GPU 内存。
        // selectionIndicator: false,
        // homeButton: false, //
        // infoBox: false,
        // sceneModePicker: false,
        baseLayerPicker: false, // 图层选择按钮
        // vrButton: true, // VR按钮
        geocoder: false, // 搜索组件
        timeline: false, // 底部时间轴
        navigationHelpButton: false // 帮助按钮
      });
      viewer.scene.globe.depthTestAgainstTerrain = true;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(113.45521, 23.166382, 400)
      });
      // console.log(viewer.scene.globe.ellipsoid);
      var canvas = viewer.scene.canvas;
      var center = new Cesium.Cartesian2(
        canvas.clientWidth / 2.0,
        canvas.clientHeight / 2.0
      );
      // const lnglat = Cesium.Cartesian2.fromElements(113.45521, 23.166382);
      const lnglat = Cesium.Cartesian3.fromDegrees(113.45521, 23.166382);
      const lnglatPoint = viewer.camera.pickEllipsoid(
        lnglat,
        viewer.scene.globe.ellipsoid
      );
      console.log(lnglat, viewer.scene.globe.ellipsoid);
      drawPoint(lnglatPoint);
      // const lineArr = [
      //   [113.45521, 23.166382],
      //   [113.45521, 23.1663]
      // ];
      // const lineLnglatPointArr = lineArr.map(e => {
      //   var lineLnglatPoint = viewer.camera.pickEllipsoid(
      //     Cesium.Cartesian2.fromElements(e[0], e[1]),
      //     viewer.scene.globe.ellipsoid
      //   );
      //   console.log(
      //     lineLnglatPoint,
      //     Cesium.Cartesian2.fromElements(e[0], e[1])
      //   );
      //   return lineLnglatPoint;
      // });
      // console.log(lineLnglatPointArr);
      // drawPolyline(lineLnglatPointArr);
      // viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.IonImageryProvider({ assetId: 3 })
      // );
      // var tileset = viewer.scene.primitives.add(
      //   new Cesium.Cesium3DTileset({
      //     url: Cesium.IonResource.fromAssetId(96188)
      //   })
      // );
      // var tileset = viewer.scene.primitives.add(
      //   new Cesium.Cesium3DTileset({
      //     url: Cesium.IonResource.fromAssetId(549934)
      //   })
      // );
      // 画点
      function drawPoint(position) {
        // console.log(position);
        var pointGeometry = viewer.entities.add({
          name: "info窗体显示的内容",
          position: position,
          point: {
            color: Cesium.Color.AQUAMARINE,
            pixelSize: 10,
            outlineColor: Cesium.Color.YELLOW
          }
        });
        return pointGeometry;
      }
      // 画线
      function drawPolyline(positions) {
        var polylineGeometry = viewer.entities.add({
          name: "线几何对象",
          polyline: {
            positions: positions,
            width: 3,
            material: new Cesium.PolylineGlowMaterialProperty({
              color: Cesium.Color.GOLD
            }),
            depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
              color: Cesium.Color.GOLD
            })
          }
        });
        return polylineGeometry;
      }
      // 点击事件
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function(movement) {},
      Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(function(movement) {
        console.log(movement.position);
        const position = viewer.camera.pickEllipsoid(
          movement.position,
          viewer.scene.globe.ellipsoid
        );
        let point = drawPoint(position);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function() {
        handler.destroy(); //关闭事件句柄
        handler = null;
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      handler.setInputAction(function() {
        handler.destroy(); //关闭事件句柄
        handler = null;
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
}
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
