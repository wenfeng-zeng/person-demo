import initMap from './initMap.js'

export const init = (container, props) => {
  const config = {
    key: '0bea50b4d93ba7cbb1325e705f2010da'
    // key: ''
  }
  // const AMap = await initMap(config)
  // if (AMap !== String) return new AMap.Map(container)
  // return AMap
  return new Promise((resolve, reject) => {
    initMap(config).then(AMap => {
      //   zoom: 15
      resolve(new AMap.Map(container, { ...props }))
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 
 * @method {*} getCurrentPosition 定位
 * @param {*} map 地图实例
 * @param {Function} success 定位成功的回调
 * @param {Function} fail 定位失败的回调
 * @param {Object} otherProps 其他参数，如有需要的话 具体api见https://lbs.amap.com/api/javascript-api/reference/location#m_AMap.Geolocation
 */
export const getCurrentPosition = (map, success, fail, otherProps) => {
  AMap.plugin('AMap.Geolocation', function() {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: false,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      maximumAge: 0,           //定位结果缓存0毫秒，默认：0
      convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true,        //显示定位按钮，默认：true
      buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: false,     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      ...otherProps
    })
    console.log(otherProps);
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
 * @param {Array} marker 需要定位的点经纬度集合，结构如 [{ lng: 116.39, lat: 39.9 ，otherProps:{title:'广州'}}]
 * @param {Function} callback 点标记点击事件回调
 * @param {Object} otherProps 定位其他属性，止于marker对象数组里面 具体api见https://lbs.amap.com/api/javascript-api/reference/overlay#marker
 * @returns 点标记集合markers
 */
export const addMarker = (map, marker, callback) => {
  var markers = marker.map(e => {
    var mark = new AMap.Marker({
      position: [e.lng, e.lat],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      ...e.otherProps
    });
    if (callback) mark.on('click', callback);
    return mark
  })
  map.add(markers);
  return markers
}
/**
 * @method {*} addMarker 移除点标记
 * @param {*} map 地图实例
 * @param {Array} marker 由addMarker返回的点标记集合
 */
export const removeMarker = (map, marker) => {
  map.remove(marker);
}
/**
 * @param {*} map 地图实例
 * @param {Boolean} noScale 不需要比例尺  true表示不需要
 * @param {Boolean} noToolBar 不需要工具栏 true表示不需要
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
 * @param {Array} center 经纬度
 * @param {String} content 信息窗体内容
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
 * @param {Array} center 经纬度
 * @param {Number} radius 取值范围：0-50000 范围
 * @param {Object} otherProps  city 页码等其他参数
 * @param {Function} callback 回调
 * @param {String} keyword 搜索关键字
 * https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearch
 */
export const searchNearBy = (map, center, callback, otherProps, keyword, radius) => {
  map.clearMap()
  AMap.plugin(['AMap.PlaceSearch'], function() {
    var placeSearch = new AMap.PlaceSearch({
      map: map,
      ...otherProps
    })
    placeSearch.searchNearBy(keyword || '', center, radius || 1000, callback)
  })
}

/**
 * method
 * @param {*} map 地图实例
 * @param {Function} callback 回调函数
 * @param {Object} otherProps 其他属性
 * @param {String} keyword 关键字
 * @author 曾文烽 2021-07-09 289515197@qq.com
 */
export const searchByKeyword = (map, callback, otherProps, keyword) => {
  map.clearMap()
  AMap.plugin(['AMap.PlaceSearch'], function() {
    var placeSearch = new AMap.PlaceSearch({
      map: map,
      ...otherProps,
    })
    placeSearch.search(keyword, callback)
  })
}
/**
 * 
 * @param {*} map 地图实例
 * @param {Number} startLngLat  起点经纬度
 * @param {Number} endLngLat 终点经纬度
 * @param {String} city 城市名 默认广州
 * @param {Function} callback 回调函数
 * @param {String} panel 容器id
 * @param {Boolean} isLngLat 是否经纬度查询，如传false 则为名称查询
 * @param {String} startName 起点名称 
 * @param {String} endName 终点名称 
 * @param {Object}  otherProps 构造函数其他参数，详见https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
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
/**
 * 
 * @param {*} map 地图实例
 * @param {Number} startLngLat 起点经纬度
 * @param {Number} endLngLat 终点经纬度
 * @param {String} city 城市
 * @param {Function} callback 回调函数
 * @param {String} panel 容器id
 * @param {Number} isLngLat 是否经纬度查询 默认是
 * @param {String} startName 当isLngLat传false时，为起点名称
 * @param {String} endName 当isLngLat传false时，为终点名称
 * @param {Object} otherProps 其他属性
 */
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
// 清除线路图
/**
 * 
 * @param {*} lineStrory AMap.Walking/transfer 创建的实例对象
 */
export const clearLine = (lineStrory) => {
  lineStrory.clear()
}
// 经纬度获取地址
/**
 * 
 * @param {String} LngLat 经纬度
 * @param {Function} callback 回调函数
 * @param {Object} otherProps 其他参数
 */
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
const mapJS = {
  init,
  getCurrentPosition,
  addMarker,
  addMarker,
  initScaleTools,
  showInfoWindow,
  searchNearBy,
  searchByKeyword,
  transfer,
  walking,
  clearLine,
  getAddressByLngLat
}
export default mapJS