import axios from './axios'
//  首页统计数据
export const statisticalForHome = (url, data) => {
  return axios.postFromDataRequest(url, data)
}
export const userMenuList = (url, data) => {
  return axios.postFromDataRequest(url, data)
}
export const getRequest = (url, data) => {
  return axios.getRequest(url, data)
}
// export const getRequest1 = (url, data) => {
//   return axios.getRequest1(url, data)
// }
// export const postRequest1 = (url, data) => {
//   return axios.postRequest1(url, data)
// }