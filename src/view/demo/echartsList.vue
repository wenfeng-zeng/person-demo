<template>
  <div class="echarts">
    <div class="pie">
      <Echarts :id="'myChart'" :chartData="charts[0].options"></Echarts>
      <Echarts :id="'myChart1'" :chartData="charts[1].options"></Echarts>
      <Echarts :id="'myChart2'" :chartData="charts[2].options"></Echarts>
    </div>
    <div class="area">
      <Echarts :id="'myChart3'" :width="'100%'" :chartData="charts[3].options"></Echarts>
    </div>
  </div>
</template>

<script>
import Echarts from '@/components/echarts.vue'
// import { getEchartsInfo } from "@/request/api";
import { statisticalForHome, getRequest } from '@/request/home'
export default {
  components: {
    Echarts
  },
  data () {
    return {
      charts: [
        {
          type: 'turnover',
          options: {
            title: {
              // text: '三网成交额统计',
              subtext: '三网成交额统计',
              left: 'center'
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
              data: ['电信', '联通', '移动']
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
              left: 'center'
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
              data: ['电信', '联通', '移动']
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
              left: 'center'
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
              data: ['电信', '联通', '移动']
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
        },
        {
          type: 'area',
          options: {
            title: {
              text: '分日订单量'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#0094ff'
                }
              }
            },
            legend: {
              data: ['电信', '移动', '联通']
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '电信',
                type: 'line',
                // stack: '总量',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '移动',
                type: 'line',
                // stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '联通',
                type: 'line',
                // stack: '总量',
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410]
              }
            ]

          }
        }
      ]
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
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
    }
  }
}
</script>
<style lang="less" scoped>
.echarts {
  // display: flex;
  background-color: #fff;
  .pie {
    display: flex;
  }
  .area {
    width: 100%;
  }
}
</style>