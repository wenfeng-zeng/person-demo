<template>
  <div class="box">
    <div class="fullScreenDemo" ref="fullScreenDemo" :style="style">
      <div class="title">
        <span>大屏demo</span>
      </div>
      <div class="top">
        <div class="num">
          <div class="num-title">
            <span>测试销售量数据</span>
            <span>元</span>
          </div>
          <div class="num-content">
            <div class="count" v-for="(item,index) in count.toString().split('')" :key="index">
              <span :class="isNaN(Number(item)) ? '':'isNum'">
                {{item}}
              </span>
            </div>
          </div>
        </div>
        <div class="center">
          <Echarts :id="'myChart3'" width="700px" :chartData="myChart3"></Echarts>
        </div>
        <div class="right" style=""></div>
      </div>
      <div class="bottom">
        <Echarts :id="'myChart'" :chartData="charts[0].options"></Echarts>
        <Echarts :id="'myChart1'" :chartData="charts[1].options"></Echarts>
        <Echarts :id="'myChart2'" :chartData="charts[2].options"></Echarts>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from '@/components/echarts.vue'
import { statisticalForHome, getFullScreenInfo } from '@/request/home'
export default {
  components: {
    Echarts
  },
  data() {
    return {
      width: 1920,
      height: 1080,
      innerHeight: 0,
      innerWidth: 0,
      scale: 1,
      count: 123134.01,
      style: {
        '--scale': 1
      },
      timer: null,
      charts: [
        {
          type: 'turnover',
          options: {
            title: {
              // text: '三网成交额统计',
              subtext: '三网成交额统计',
              left: 'center',
              subtextStyle: {
                color: '#fff'
              },
              show: true
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)',
              confine: true,
            },
            legend: {
              // orient: 'vertical',
              // top: 'middle',
              bottom: 10,
              left: 'center',
              data: ['电信', '联通', '移动'],
              textStyle: {
                color: "#FFF"
              }
            },
            color: ['#4978ab', '#588fc2', '#85b1de'],
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                hoverAnimation: false,
                label: {
                  formatter: '{b}:{c}',
                },
                data: [
                  { value: 135, name: '电信' },
                  { value: 205, name: '联通' },
                  { value: 310, name: '移动' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        },
        {
          type: 'order',
          options: {
            title: {
              // text: '三网成交额统计',
              subtext: '三网成交额统计',
              left: 'center',
              subtextStyle: {
                color: '#fff'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)',
              confine: true
            },
            legend: {
              // orient: 'vertical',
              // top: 'middle',
              bottom: 10,
              left: 'center',
              data: ['电信', '联通', '移动'],
              textStyle: {
                color: "#FFF"
              }
            },
            color: ['#4978ab', '#588fc2', '#85b1de'],
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                hoverAnimation: false,
                label: {
                  formatter: '{b}'
                },
                data: [
                  { value: 135, name: '电信' },
                  { value: 205, name: '联通' },
                  { value: 310, name: '移动' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        },
        {
          type: 'faceValue',
          options: {
            title: {
              // text: '三网成交额统计',
              subtext: '三网成交额统计',
              left: 'center',
              subtextStyle: {
                color: '#fff'
              },
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)',
              confine: true
            },
            legend: {
              // orient: 'vertical',
              // top: 'middle',
              bottom: 10,
              left: 'center',
              data: ['电信', '联通', '移动'],
              textStyle: {
                color: "#FFF"
              }
            },
            color: ['#4978ab', '#588fc2', '#85b1de'],
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                hoverAnimation: false,
                label: {
                  formatter: '{b}'
                },
                data: [
                  { value: 35, name: '电信' },
                  { value: 205, name: '联通' },
                  { value: 110, name: '移动' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        }
      ],
      myChart3: {
        title: {
          text: '大屏显示数据',
          textStyle: {
            color: "#Fff"
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
          data: [
            // { name: 'Forest', textStyle: { color: "#FFF" } },
            // { name: 'Steppe', textStyle: { color: "#FFF000" } },
            // { name: 'Desert', textStyle: { color: "#99000F" } },
            // { name: 'Wetland', textStyle: { color: "#990099" } },
          ],
          right: 20,
          textStyle: {
            color: "FFF000"
          }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          // {
          //   name: 'Forest',
          //   type: 'bar',
          //   barGap: 0,
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [320, 332, 301, 334, 390]
          // },
          // {
          //   name: 'Steppe',
          //   type: 'bar',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [220, 182, 191, 234, 290]
          // },
          // {
          //   name: 'Desert',
          //   type: 'bar',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [150, 232, 201, 154, 190]
          // },
          // {
          //   name: 'Wetland',
          //   type: 'bar',
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [98, 77, 101, 99, 40]
          // }
        ]
      }
    }
  },
  mounted() {
    this.getScale()
    window.addEventListener('resize', this.getScale)
    this.getInfo()
    this.getFullScreenInfo()
  },
  methods: {
    getScale() {
      const _this = this
      clearTimeout(_this.timer)
      _this.timer = setTimeout(() => {
        const width = window.innerWidth / _this.width
        const height = window.innerHeight / _this.height
        _this.innerHeight = height
        _this.innerWidth = width
        _this.scale = width > height ? width : height
        _this.style = {
          "--scale": _this.scale
        }
        // _this.$refs.fullScreenDemo.style.setProperty("--scale", _this.scale);
      }, 500);
    },
    getInfo() {
      let url = '/getEchartsInfo'
      let data = {}
      let charts = this.charts
      statisticalForHome(url, data).then(res => {
        charts.forEach((e, i) => {
          const data = []
          const seriesData = []
          if (res.data[e.type]) {
            res.data[e.type].data.forEach(item => {
              data.push(item.name)
              seriesData.push({ value: item.num, name: item.name })
            })
            charts[i].options.legend.data = data
            charts[i].options.title.subtext = res.data[e.type].title
            charts[i].options.series[0].data = seriesData
            this.charts[i] = { ...charts[i] }
          }
        });
      })
    },
    getFullScreenInfo() {
      let url = '/getFullScreenInfo'
      let data = {}
      statisticalForHome(url, data).then(res => {
        console.log(res);
        if (res.code === 200) {
          let chartsData = { ...this.myChart3 }
          let xData = []
          chartsData.legend.data = res.data.typeList.map(e => {
            return '大屏' + e
          })
          const allSeriesData = []
          res.data.data.forEach(e => {
            xData.push(e.years)
            allSeriesData.push(...e.data)
          })
          const temp = []
          allSeriesData.forEach((e, i) => {
            if (i === 0) {
              temp.push({
                name: '大屏' + e.type,
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [e.num]
              })
            } else {
              const index = temp.findIndex(item => { return item.name === '大屏' + e.type })
              if (index === -1) {
                temp.push({
                  name: '大屏' + e.type,
                  type: 'bar',
                  emphasis: {
                    focus: 'series'
                  },
                  data: [e.num]
                })
              } else {
                temp[index].data.push(e.num)
              }
            }
          })
          chartsData.xAxis[0].data = xData
          chartsData.series = temp
          this.myChart3 = chartsData
        }
      })

    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getScale)
  }
}
</script>

<style lang="less" scoped>
.box {
  // position: relative;
  background: url(../../assets/background-2.png) 0% 0% / 100%;
  margin: 0;
  padding: 0;
  .fullScreenDemo {
    transform: scale(var(--scale));
    position: relative;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    transition: 0.3s;
    z-index: 999;
    width: 1680px;
    margin: 0 auto;
    > .title {
      width: 100%;
      text-align: center;
      font-size: 60px;
      height: 110px;
      line-height: 110px;
      color: #fff;
      font-weight: 700;
    }
    .top {
      display: flex;
      justify-content: space-between;
      .num {
        color: #fff;
        max-width: 450px;
        min-width: 200px;
        // display: flex;
        // flex-direction: column;
        .num-title {
          display: flex;
          justify-content: space-between;
        }
        .num-content {
          display: flex;
          margin-top: 20px;
          width: 100%;
          .count {
            height: 82px;
            line-height: 82px;
            margin-right: 5px;
            font-size: 60px;
            color: #fff;
            text-align: center;
            span {
              width: 20px;
            }
            .isNum {
              width: 44px;
              background-color: #0f396b;
              display: block;
            }
          }
        }
      }
      .center {
        width: 700px;
      }
      .right {
        width: 450px;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>