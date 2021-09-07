<template>
  <div id="viewDiv">
    <div>
      <span>原图:</span>
      <img
        src="../../assets/test.png"
        alt=""
        srcset=""
        style="width:400px;"
      /><br />
    </div>
    <div>
      <span>文字水印后:</span>
      <img :src="imgUrl" alt="" srcset="" style="width:400px;" /><br />
    </div>
    <div>
      <span>文字水印+ 图片水印:</span>
      <img :src="newImage" alt="" srcset="" /><br />
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: "",
      newImage: ""
    };
  },
  mounted() {
    this.init();
    this.loadText();
  },
  methods: {
    async init() {
      const img = await this.loadImage(require("../../assets/canvas.png"));
      const img2 = await this.loadImage(require("../../assets/test.png"));
      const canvas = document.createElement("canvas");
      const imgRatio = img2.naturalWidth / img2.naturalHeight;
      const ctxWidth = 400;
      const ctxHeight = ctxWidth / imgRatio;
      canvas.width = ctxWidth;
      canvas.height = ctxHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img2, 0, 0, ctxWidth, ctxHeight);
      for (var i = 0; i < 5; i++) {
        this.addImageWatermark(ctx, img, 40 * (i + 1) + 5, 80, 40, 40);
      }
      await this.watermark(canvas, "这是文字水印");
      ctx.drawImage(img2, 0, 0, ctxWidth, ctxHeight);
      this.newImage = canvas.toDataURL("image/jpg", 1);
    },
    /**
     * @param{ctx} canvas创建的画布环境
     * @param{img} loadImage方法返回的图片
     * @param{x} 水印绘画的x轴位置
     * @param{y} 水印绘画的y轴位置
     * @param{width} 水印宽度
     * @param{height} 水印高度
     */
    async addImageWatermark(ctx, img, x, y, width, height) {
      ctx.drawImage(img, x, y, width, height);
      let imgData = ctx.getImageData(x, y, width, height);
      for (var i = 0, len = imgData.data.length; i < len; i += 4) {
        imgData.data[i + 3] = imgData.data[i + 3] * 0.1;
      }
      ctx.putImageData(imgData, x, y);
    },
    async loadText() {
      const img = await this.loadImage(require("../../assets/test.png"));
      const canvas = document.createElement("canvas");
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const ctxWidth = 400;
      const ctxHeight = ctxWidth / imgRatio;
      canvas.width = ctxWidth;
      canvas.height = ctxHeight;
      // 绘制图片
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, ctxWidth, ctxHeight);
      this.imgUrl = await this.watermark(canvas, "wf_cs");
    },
    // async init() {
    //   let imgUrl =
    //     "http://qysmjczto.hn-bkt.clouddn.com/37c1ed77-f934-4bd9-bc50-c7160decab5c.png";
    //   const img = await this.loadImage(imgUrl);
    //   const canvas = document.createElement("canvas");
    //   const imgRatio = img.naturalWidth / img.naturalHeight;
    //   const ctxWidth = 400;
    //   const ctxHeight = ctxWidth / imgRatio;
    //   canvas.width = ctxWidth;
    //   canvas.height = ctxHeight;
    //   // 绘制图片
    //   const ctx = canvas.getContext("2d");
    //   ctx.drawImage(img, 0, 0, ctxWidth, ctxHeight);
    //   var imgData = ctx.getImageData(10, 10, ctxWidth, ctxHeight);
    //   for (var i = 0, len = imgData.data.length; i < len; i += 4) {
    //     imgData.data[i + 3] = imgData.data[i + 3] * 0.4;
    //   }
    //   ctx.putImageData(imgData, 10, 10);
    //   const res = await this.watermark(canvas, "wf_cs");
    //   this.imgUrl = res;
    //   var newImg = new Image();
    //   newImg.src = require("../../assets/canvas.png");
    //   const _this = this;
    //   newImg.onload = function() {
    //     ctx.drawImage(newImg, 10, 10, 100, 100);
    //     _this.newImage = canvas.toDataURL("image/jpg", 1);
    //   };
    // },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        if (src.indexOf(src) === 0) {
          img.crossOrigin = "*";
        }
        img.src = src;
        img.onload = () => {
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error("图片解析失败"));
        };
      });
    },
    watermark(canvas, text) {
      return new Promise((resolve, reject) => {
        let ctx = canvas.getContext("2d");
        ctx.font = "24px 宋体";
        ctx.fillStyle = "blue";
        ctx.textAlign = "right";
        ctx.fillText(text, canvas.width - 20, canvas.height - 35);
        ctx.font = "14px 宋体";
        ctx.fillStyle = "red";
        ctx.textAlign = "right";
        let date = new Date().getTime();
        ctx.fillText(date, canvas.width - 20, canvas.height - 20);
        resolve(canvas.toDataURL("image/png", 1));
      });
    }
  }
};
</script>

<style lang="less" scoped>
#viewDiv {
  padding: 0;
  margin: 0;
  // height: 500px;
  // width: 500px;
  padding-left: 50px;
  > div {
    display: flex;
    span {
      display: block;
      width: 220px;
      margin: 10px;
      font-size: 22px;
    }
  }
  img {
    // width: 300px;
    // height: 300px;
  }
}
</style>
