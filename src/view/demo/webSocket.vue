<template>
  <div class="webSocket">
    <div class="charts_box">
      <div v-for="(item,index) in list" :key="index" :class="['list',item.isOwn?'isOwn':'']">
        <span>
          <img :src="item.img" srcset="" v-if="!item.isOwn">
          <span>
            {{item.label}}
          </span>
          <img :src="item.img" srcset="" v-if="item.isOwn">
        </span>
      </div>
    </div>
    <!-- <SearchInput :formStyle="formStyle" :keyWord="keyWord" @handerSubmit="onSearch" /> -->
    <el-input placeholder="请输入内容" v-model="keyWord" class="input" @keyup.enter.native="onSearch">
      <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
    </el-input>
  </div>
</template>
<script>
import io from 'socket.io-client';
import auth from '@/assets/auth.png'
export default {
  data() {
    return {
      list: [],
      socket: null,
      keyWord: '',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const _this = this
      this.socket = io('ws://127.0.0.1:8899')
      this.socket.on('connection', function(socket) {
      });
      this.socket.on('chat message', function(msg) {
        console.log(msg);
        _this.list.push({ label: msg, isOwn: false, img: auth })
        // socket.emit('chat message', '回复' + msg);
      });
    },
    onSearch() {
      // this.keyWord = value
      this.list.push({ label: this.keyWord, isOwn: true, img: auth })
      this.socket.emit('chat message', this.keyWord);
    },
  }
}
</script>

<style lang="less" scoped>
.webSocket {
  padding: 20px;
}
/deep/.input {
  width: 390px;
}
.charts_box {
  width: 350px;
  height: 400px;
  // margin: 20px;
  padding: 20px;
  overflow-y: scroll;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .list {
    // max-width: 350px;
    // background-color: #fff;
    // display: inline-block;
    // text-align: left;
    display: flex;
    justify-content: flex-start;
  }
  span {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    span {
      padding: 8px;
      border-radius: 3px;
      background-color: #fff;
      word-break: normal;
      width: auto;
      display: block;
      margin: 10px;
      // white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
    }
  }
  .isOwn {
    text-align: right;
    justify-content: flex-end;
    > span {
      display: flex;
      align-items: center;
      span {
        display: block;
        background-color: #9eea6a;
      }
    }
  }
}
</style>