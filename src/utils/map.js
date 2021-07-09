
/**
 * 
 * @method {*} getCurrentPosition 定位
 * @param {*} map 地图实例
 * @param {*} success 定位成功的回调
 * @param {*} fail 定位失败的回调
 * @param {*} otherProps 其他参数，如有需要的话 具体api见https://lbs.amap.com/api/javascript-api/reference/location#m_AMap.Geolocation
 */
export const getCurrentPosition = (map, success, fail, otherProps) => {
  AMap.plugin('AMap.Geolocation', function() {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      maximumAge: 0,           //定位结果缓存0毫秒，默认：0
      convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true,        //显示定位按钮，默认：true
      buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: true,     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      ...otherProps
    })
    map.addControl(geolocation);
    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', onComplete)
    AMap.event.addListener(geolocation, 'error', onError)
    function onComplete(data) {
      // data是具体的定位信息
      success(data)
    }
    function onError(err) {
      // 定位出错
      fail(err)
    }
  })
}

/**
 * @method {*} addMarker 添加点标记
 * @param {*} map 地图实例
 * @param {*} marker 需要定位的点经纬度集合，结构如 [{ lng: 116.39, lat: 39.9 ，otherProps:{title:'广州'}}]
 * @param {*} callback 点标记点击事件回调
 * @param {*} otherProps 定位其他属性，止于marker对象数组里面 具体api见https://lbs.amap.com/api/javascript-api/reference/overlay#marker
 */
export const addMarker = (map, marker, callback) => {
  var markers = marker.map(e => {
    var mark = new AMap.Marker({
      position: [e.lng, e.lat],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      ...e.otherProps
    });
    mark.on('click', callback);
    return mark
  })
  map.add(markers);
}
/**
 * @method {*} addMarker 移除点标记
 * @param {*} map 地图实例
 * @param {*} marker 需要定位的点经纬度集合，结构如 [{ lng: 116.39, lat: 39.9 ，otherProps:{title:'广州'}}]
 * @param {*} otherProps 定位其他属性，止于marker对象数组里面 具体api见https://lbs.amap.com/api/javascript-api/reference/overlay#marker
 */
export const removeMarker = (map, marker) => {
  var markers = marker.map(e => {
    return new AMap.Marker({
      position: [e.lng, e.lat],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    });
  })
  map.remove(markers);
}
/**
 * @param {*} map 地图实例
 * @param {*} noScale 不需要比例尺  true表示不需要
 * @param {*} noToolBar 不需要工具栏 true表示不需要
 */
export const initScaleTools = (map, noScale, noToolBar) => {
  if (!noScale) {
    map.plugin(["AMap.Scale"], function() {
      var scale = new AMap.Scale();
      map.addControl(scale);
    });
  }
  if (!noToolBar) {
    map.plugin(["AMap.ToolBar"], function() {
      //加载工具条
      var tool = new AMap.ToolBar();
      map.addControl(tool);
    });
  }
}
/**
 * 信息窗体
 * @param {*} map 地图实例
 * @param {*} center 经纬度
 * @param {*} content 信息窗体内容
 */
export const showInfoWindow = (map, center, content) => {
  var infoWindow = new AMap.InfoWindow({
    content: content
  });
  infoWindow.open(map, center);
}
/**
 * 
 * @param {*} map 地图实例
 * @param {*} center 经纬度
 * @param {*} radius 取值范围：0-50000 范围
 * @param {*} otherProps  city 页码等其他参数
 * @param {*} callback 回调
 * @param {*} keyword 搜索关键字
 * https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearch
 */
export const searchNearBy = (map, center, callback, otherProps, keyword, radius) => {
  AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
    var placeSearch = new AMap.PlaceSearch({
      map: map,
      ...otherProps
    })
    placeSearch.searchNearBy(keyword || '', center, radius || 1000, callback)
  })
}
/**
 * 
 * @param {*} map 地图实例
 * @param {*} startLngLat  起点经纬度
 * @param {*} endLngLat 终点经纬度
 * @param {*} city 城市名 默认广州
 * @param {*} callback 回调函数
 * @param {*} panel 容器id
 * @param {*} isLngLat 是否经纬度查询，如传false 则为名称查询
 * @param {*} startName 起点名称 
 * @param {*} endName 终点名称 
 * @param {*} endName otherProps 构造函数其他参数，详见https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
 */
export const transfer = (map, startLngLat, endLngLat, city, callback, panel, isLngLat = true, startName, endName, otherProps) => {
  AMap.plugin('AMap.Transfer', function() {
    var transOptions = {
      map,
      city: city || '广州市',
      panel: panel || 'panel',
      policy: AMap.TransferPolicy.LEAST_TIME,
      ...otherProps
    };
    var transfer = new AMap.Transfer(transOptions);
    if (isLngLat) {
      transfer.search(startLngLat, endLngLat, function(status, result) {
        callback && callback(status, result, transfer)
      })
    } else {
      transfer.search([{ keyword: startName }, { keyword: endName }], function(status, result) {
        callback && callback(status, result, transfer)
      })
    }
  })
}

export const walking = (map, startLngLat, endLngLat, city, callback, panel, isLngLat = true, startName, endName, otherProps) => {
  AMap.plugin('AMap.Walking', function() {
    var transOptions = {
      map,
      city: city || '广州市',
      panel: panel || 'panel',
      ...otherProps
    };
    var warking = new AMap.Walking(transOptions);
    if (isLngLat) {
      warking.search(startLngLat, endLngLat, function(status, result) {
        callback && callback(status, result, warking)
      })
    } else {
      warking.search([{ keyword: startName }, { keyword: endName }], function(status, result) {
        callback && callback(status, result, warking)
      })
    }
  })
}

export const clearLine = (lineStrory) => {
  lineStrory.clear()
}
export const getAddressByLngLat = (LngLat, callback, otherProps) => {
  AMap.plugin('AMap.Geocoder', function() {
    var geocoder = new AMap.Geocoder({
      ...otherProps
    })

    geocoder.getAddress(LngLat, function(status, result) {
      callback(status, result)
    })
  })
}