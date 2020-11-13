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