import AMapLoader from '@amap/amap-jsapi-loader';
const initMap = async (config) => {
  return new Promise((resolve, reject) => {
    AMapLoader.load({
      "key": config.key,
      "version": "1.4.15",
      "plugins": [
        'AMap.PolygonEditor'
      ],
      "AMapUI": {
        "version": '1.1',
        "plugins": [],
      },
      "Loca": {
        "version": '1.3.2'
      },
    }).then((AMap) => {
      resolve(AMap)
    }).catch(err => {
      reject(err)
    })
  })
  // try {
  //   const mapInit = await AMapLoader.load({
  //     "key": config.key,
  //     "version": "1.4.15",
  //     "plugins": [],
  //     "AMapUI": {
  //       "version": '1.1',
  //       "plugins": [],
  //     },
  //     "Loca": {
  //       "version": '1.3.2'
  //     }
  //   })
  //   return mapInit
  // } catch (err) {
  //   return err
  // }
}
export default initMap