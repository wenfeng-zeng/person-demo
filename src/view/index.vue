<template>
  <div class="index">
    <section>
      <div class="loading">
        <span style="--i:1"></span>
        <span style="--i:2"></span>
        <span style="--i:3"></span>
        <span style="--i:4"></span>
        <span style="--i:5"></span>
        <span style="--i:6"></span>
        <span style="--i:7"></span>
        <span style="--i:8"></span>
        <span style="--i:9"></span>
        <span style="--i:10"></span>
        <span style="--i:11"></span>
        <span style="--i:12"></span>
        <span style="--i:13"></span>
        <span style="--i:14"></span>
        <span style="--i:15"></span>
        <span style="--i:16"></span>
        <span style="--i:17"></span>
        <span style="--i:18"></span>
        <span style="--i:19"></span>
        <span style="--i:20"></span>
      </div>
    </section>
    <div class="btn">
      <span>{{seconds}}</span>秒
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seconds: 3,
      timer: null
    }
  },
  mounted () {
    let _this = this
    _this.seconds = 3
    this.timer = setInterval(() => {
      _this.seconds--
      if (_this.seconds === 0) {
        clearInterval(_this.timer)
      }
    }, 1000)
  }
}
</script>

<style scoped>
section {
  box-sizing: border-box;
  height: 100vh;
  max-height: 100vh;
  background-color: #000;
  position: relative;
  /* animation: bgcAnimation 1s linear infinite; */
}
/* @keyframes bgcAnimation {
  0%{

  }
} */
.loading {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -100px;
  /* background-color: #fff; */
}

.loading span {
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  transform: rotate(calc(18deg * var(--i)));
  animation: colorMove 10s linear infinite;
}

@keyframes colorMove {
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}

.loading span::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #68b0ab;
  transform: scale(calc(1 - var(--i) * 0.05));
  box-shadow: 0 0 10px #68b0ab, 0 0 20px #68b0ab, 0 0 40px #68b0ab,
    0 0 60px #68b0ab, 0 0 80px #68b0ab, 0 0 100px #68b0ab;
  animation: animationMove 2s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
.btn {
  background-color: #fff;
  position: absolute;
  bottom: 30vh;
  right: 30vw;
}
.btn span {
  color: aqua;
}
@keyframes animationMove {
  0% {
    transform: scale(1);
  }

  80%,
  100% {
    transform: scale(0);
  }
}
</style>
