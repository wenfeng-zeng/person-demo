<template>
  <div class="webSocket">
    <!-- <video autoplay="autoplay" muted loop="loop" src="artc://artcpull.yukong.live/yukong/23302_OPUS-RTS?auth_key=1628589897-0-0-0ce5a3150cf83895a5e2ed5f9e6ddd99"></video> -->
    <div class="charts_box" ref="charts_box">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="[
          'list',
          item.isOwn ? 'isOwn' : '',
          index === list.length - 1 ? 'style' : ''
        ]"
      >
        <span>
          <img :src="item.img" srcset="" v-if="!item.isOwn" />
          <span>
            {{ item.label }}
          </span>
          <img :src="item.img" srcset="" v-if="item.isOwn" />
        </span>
      </div>
    </div>
    <!-- <SearchInput :formStyle="formStyle" :keyWord="keyWord" @handerSubmit="onSearch" /> -->
    <el-input
      placeholder="请输入内容"
      v-model="keyWord"
      class="input"
      @keyup.enter.native="onSearch"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="onSearch"
      ></el-button>
    </el-input>
  </div>
</template>
<script>
import io from "socket.io-client";
import auth from "@/assets/auth.png";
export default {
  data() {
    return {
      list: [],
      socket: null,
      keyWord: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const _this = this;
      // let urls = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:8010' : 'wss://wfz-person.cn'
      // let urls =
      //   process.env.NODE_ENV === "development"
      //     ? "wss://wfz-person.cn"
      //     : "ws://127.0.0.1:8010";
      let urls =
        process.env.NODE_ENV === "development"
          ? "ws://127.0.0.1:8010"
          : "ws://49.234.212.42:8010";
      this.socket = io(urls);
      this.socket.on("connection", function(socket) {});
      this.socket.on("chat message", async function(msg) {
        await _this.list.push({ label: msg.reply, isOwn: false, img: auth });
        Array.from(
          document.getElementsByClassName("style")
        )[0].scrollIntoView();
      });
    },
    async onSearch() {
      this.list.push({ label: this.keyWord, isOwn: true, img: auth });
      await this.socket.emit("chat message", this.keyWord);
      this.keyWord = "";
      Array.from(document.getElementsByClassName("style"))[0].scrollIntoView();
    }
  },
  beforeDestroy() {
    this.socket.close();
  }
};
</script>

<style lang="less" scoped>
.webSocket {
  padding: 20px;
}
video {
  width: 500px;
  height: 500px;
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
