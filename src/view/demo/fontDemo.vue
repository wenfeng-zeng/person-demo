<template>
  <div class="fontDemo">
    <h1>
      <span>a</span>
      <span>n</span>
      <span>i</span>
      <span>m</span>
      <span>a</span>
      <span>t</span>
      <span>i</span>
      <span>o</span>
      <span>n</span>
    </h1>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
}

h1 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-family: "Bad Script", cursive;
  color: #000;
  /* width: 100vw; */
  /* width: calc(100vw - 200px);
   */
}

h1 {
  /* transform: rotate(90deg); */
}

span {
  animation: fontAnimation 2.5s linear infinite;
  /* font-size: 10em; */
  font-size: 5.1em;
  display: table-cell;
}

span:nth-child(1) {
  animation-delay: 0s;
}

span:nth-child(2) {
  animation-delay: 0.25s;
}

span:nth-child(3) {
  animation-delay: 0.5s;
}

span:nth-child(4) {
  animation-delay: 0.75s;
}

span:nth-child(5) {
  animation-delay: 1s;
}

span:nth-child(6) {
  animation-delay: 1.25s;
}

span:nth-child(7) {
  animation-delay: 1.5s;
}
span:nth-child(8) {
  animation-delay: 1.75s;
}
span:nth-child(9) {
  animation-delay: 2s;
}

@keyframes fontAnimation {
  0%,
  100% {
    color: #fff;
    filter: blur(2px);
    text-shadow: 0 0 10px #00b3ff, 0 0 20px #00b3ff, 0 0 40px #00b3ff,
      0 0 80px #00b3ff, 0 0 120px #00b3ff, 0 0 200px #00b3ff, 0 0 300px #00b3ff;
  }

  5%,
  95% {
    color: #000;
    filter: blur(0px);
    text-shadow: none;
  }
}
</style>