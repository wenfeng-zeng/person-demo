import axios from 'axios'
import qs from 'qs'
import { MessageBox } from 'element-ui'
// import store from '../store/store.js'
axios.defaults.timeout = 60000
let urls = '/api'
// if (process.env.NODE_ENV === 'development') {
//   urls = '/api'
// } else {
//   urls = ''
// }
// var urlData
// let needRequestCount = 0
axios.interceptors.request.use(function (config) {
  // let token = store.state.token
  // let urlList = ['account-admin-web/login', 'account-admin-web/updateUserPassWord', 'account-admin-web/checkVerificationCode', 'account-admin-web/sendSmsCode ', 'account-admin-web/checkUser']
  // let isLogin = true
  // urlList.forEach(e => {
  //   if (config.url.includes(e)) isLogin = false
  // })
  // if (token && isLogin) {
  //   config.headers['Authorization'] = token
  // }
  // needRequestCount++
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // needRequestCount--
  // if (response.data.code === 401) {
  //   needRequestCount++
  //   MessageBox.confirm('已在其他客户端登录，请重新登录', '登录超时', {
  //     confirmButtonText: '确定',
  //     type: 'warning'
  //   }).then(() => {
  //     window.location.href = '/'
  //   }).catch(() => {
  //     needRequestCount--
  //   })
  // } else if (response.data.code === 402) {
  //   needRequestCount++
  //   MessageBox.confirm('密码已被修改，请重新登录', '登录超时', {
  //     confirmButtonText: '确定',
  //     type: 'warning'
  //   }).then(() => {
  //     window.location.href = '/'
  //   }).catch(() => {
  //     needRequestCount--
  //   })
  // }
  return response
}, function (error) {
  // needRequestCount--
  // if (needRequestCount === 0) {
  //   if (error.response && error.response.status === 403) {
  //     MessageBox.confirm('登录过期，请重新登录!', '登录超时', {
  //       confirmButtonText: '确定',
  //       type: 'warning'
  //     }).then(() => {
  //       window.location.href = '/'
  //     })
  //   }
  //   if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
  //     MessageBox.alert('连接超时!', '提示', {
  //       confirmButtonText: '确定',
  //       type: 'error'
  //     })
  //   }
  // }
  return Promise.reject(error)
})
export default {
  getRequest (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: urls + url,
        params: data
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  postRequest (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: urls + url,
        data,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  postImg (url, data, config) {
    var data1 = qs.stringify(data) || {}
    return new Promise((resolve, reject) => {
      axios.post(urls + url, data1, config).then((res) => {
        resolve(res.data)
      }).catch(err => {
        console.dir(err)
        reject(err)
      })
    })
  },
  downloadGetReqeust (url, params) {
    // var data = qs.stringify(data1) || {}
    // var data = data || {}
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: urls + url,
        params,
        responseType: 'arraybuffer',
        headers:
          { 'Content-Type': 'application/json;charset=UTF-8' }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        console.dir(err)
        reject(err)
      })
    })
  },
  exportGetReqeust (url, params) {
    // var data = qs.stringify(data1) || {}
    // var data = data || {}
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: urls + url,
        params,
        responseType: 'blob',
        headers:
          // { 'Content-Type': 'application/json;charset=UTF-8' }
          { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.dir(err)
        reject(err)
      })
    })
  },
  fileImportRequest (url, data) {
    // var data = qs.stringify(data1) || {}
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: urls + url,
        data,
        headers:
          { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  downloadFormReqeust (url, data1) {
    let data = qs.stringify(data1)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: urls + url,
        data,
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  postFromDataRequest (url, data1) {
    var data = qs.stringify(data1)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: urls + url,
        data,
        headers:
          // { 'Content-Type': 'application/json;charset=UTF-8' }
          // { 'Content-Type': 'multipart/form-data' }
          { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  multiPostFromDataRequest (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: urls + url,
        data,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
