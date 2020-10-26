<template>
  <div class="lightDemo" @mousemove="handerMove">
    <h3>searchingLight</h3>
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      doc: null
    }
  },
  created () {
    this.doc = document.documentElement
  },
  methods: {
    handerMove (e) {
      // const doc = document.documentElement
      this.doc.style.setProperty('--x', e.clientX - 220 + 'px')
      this.doc.style.setProperty('--y', e.clientY + 'px')
    }
  }
}
</script>

  <style scoped>
.lightDemo {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
}

h3 {
  font-family: "Bad Script", cursive;
  font-size: 100px;
  position: relative;
  z-index: 1;
  color: #111;
  /* clip-path: circle(20px at center center); */
}

.circle {
  width: 100%;
  height: 100%;
  clip-path: circle(50px at var(--x) var(--y));
  position: absolute;
  background: #0094ff;
  cursor: default;
}

h3:hover ~ .circle {
  clip-path: circle(100px at var(--x) var(--y));
  background: #9400ff;
  cursor: default;
}
</style>
