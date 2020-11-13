<template>
  <div class="test">
    <h2 @click="getRequest">向服务器发送get请求---- + {{get}}</h2>
    <h2 @click="statisticalForHome">向服务器发送post请求---- + {{post}}</h2>
  </div>
</template>

<script>
import { statisticalForHome, getRequest } from '@/request/home'
export default {
  data () {
    return {
      get: 'get',
      post: 'post'
    }
  },
  methods: {
    getRequest () {
      getRequest('/getIndex', {}).then(res => {
        this.get = res
      }).catch(err => {
        console.log(err)
      })
    },
    statisticalForHome () {
      statisticalForHome('/postIndex', {}).then(res => {
        this.post = res
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style>
</style>