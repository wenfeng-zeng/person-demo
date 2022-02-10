<template>
  <div class="box">
    <div class="bottom">
      <div
        v-for="(item, index) in list"
        :key="index"
        :style="{ '--i': item.translateY }"
        @mouseenter="handerEnter(index, $event)"
        @mouseleave="handerLeave(index, $event)"
      >
        <div :class="['item_box', active === index ? 'active' : '']">
          <div class="img">
            <img :src="item.img" alt="" srcset="" />
          </div>
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/assets/auth.png";
export default {
  data() {
    return {
      list: [
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 10
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 20
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 30
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 40
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 50
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 60
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 70
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 60
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 50
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 40
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 30
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 20
        },
        {
          name: "党建引领",
          url: "/demo/waterMarker",
          img: auth,
          translateY: 10
        }
      ],
      active: 0
    };
  },
  methods: {
    handerEnter(index, $event) {
      this.active = index;
      console.log(index, "--handerEnter");
    },
    handerLeave(index, $event) {
      // console.log(index, "--handerLeave");
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  // height: 200px;
  // min-height: 0.1458333rem;
  z-index: 99;
  .bottom {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    > div {
      display: flex;
      transform: translateY(calc(var(--i) * -1px));
      position: relative;
      // flex-direction: column;
      // align-items: center;
      .item_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #0094ff;
        border-radius: 20px;
        width: 100px;
        position: absolute;
        top: -50px;
        left: 0;
        transition: all 1s;
        .img {
          width: 10px;
          img {
            width: 100%;
          }
        }

        .name {
        }
      }
      .active {
        top: -55px;
        background-color: pink;
      }
    }
  }
}
</style>
