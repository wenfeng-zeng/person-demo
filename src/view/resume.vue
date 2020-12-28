<template>
  <div class="resume" ref="resume">
    <div class="top_img" ref="top_img">
      <div class="bg"> </div>
      <div class="box">
        <h1>曾文烽</h1>
      </div>
    </div>
    <section class="main_resume" ref="viewBox">
      <div :class="['top_nav', isTop?'fixed':'']">
        <div class="nav_box">
          <ul>
            <li v-for="(item,index) in liData" :key="index" :class="navIndex === index ? 'active' : ''" @click="handerGo(index)">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="scoll_box" ref="scoll_box">
        <div ref="person_intro" class="person_intro">
          <div class="person_intro_box">
            <h2>About Me</h2>
            <img src="../assets/bg.jpg" alt="" srcset="">
            <div class="about">
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-icon-"> </i>姓名：
                  </span>
                  <span> {{userInfo.name}}</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-edu"> </i>学历：
                  </span>
                  <span> {{userInfo.education}}</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-canjiagongzuoshijian"> </i>毕业年月：
                  </span>
                  <span> {{userInfo.graduateDate}}</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-logo_school"> </i>学校：
                  </span>
                  <span> {{userInfo.school}}</span>
                </span>

              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-zhuanyezhuanyeke"> </i> 专业：
                  </span>
                  <span> {{userInfo.major}}</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-shouji"> </i>手机：
                  </span>
                  <span> {{userInfo.phone}}</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-youxiang1"> </i>邮箱：
                  </span>
                  <span> {{userInfo.email}}</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-youxiang1"> </i>求职状态：
                  </span>
                  <span> {{userInfo.status}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div ref="technology" class="technology">
          <h2>技术栈</h2>
          <div class="tec_box">
            <div class="info" v-for="(item,index) in tecList" :key="index">
              <el-progress type="circle" :percentage="item.percent" :color="customColorMethod"></el-progress>
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="tec_dec">
            <ul>
              <li> <i class="iconfont icon-fenlei1"></i>熟练使用Vue全家桶。</li>
              <li> <i class="iconfont icon-fenlei1"></i>熟练微信小程序开发，并且工作中有微信小程序，支付宝小程序，蜻蜓小程序demo开发经验。</li>
              <li> <i class="iconfont icon-fenlei1"></i>有扎实的JavaScript基础,对于ES6，ES7有一定理解。</li>
              <li> <i class="iconfont icon-fenlei1"></i>熟练使用git进行版本管理。</li>
              <li> <i class="iconfont icon-fenlei1"></i>熟练使用uni-app进行开发。</li>
              <li> <i class="iconfont icon-fenlei1"></i>熟练使用预处理器less，可使用less,scss快速书写css。</li>
              <li> <i class="iconfont icon-fenlei1"></i>了解node.js，Nginx。有自己服务器搭建经历。</li>
            </ul>
          </div>
        </div>
        <div ref="project" class="project">
          <h2>项目介绍</h2>
          <div class="project_box">
            <div class="project_list" @click="handerToProject('account')">
              <div class="project_list_bg">
                <img src="../assets/bussine1.jpg" alt="" srcset="">
              </div>
              <div class="project_list_info">
                <h3>共享经济综合服务平台</h3>
              </div>
            </div>
            <div class="project_list" @click="handerToProject('payment')">
              <div class="project_list_bg">
                <img src="../assets/bussine2.jpg" alt="" srcset="">
              </div>
              <div class="project_list_info">
                <h3>容易付</h3>
              </div>
            </div>
            <div class="project_list" @click="handerToProject('demo')">
              <div class="project_list_bg">
                <img src="../assets/bussine3.jpg" alt="" srcset="">
              </div>
              <div class="project_list_info">
                <h3>个人网站(小demo)</h3>
              </div>
            </div>
          </div>
        </div>
        <div ref="work" class="work">工作经历</div>
      </div>
    </section>
  </div>
  </div>
</template>

<script>
// import { login } from '../request/login_api'
import { statisticalForHome, getRequest } from '@/request/home'
export default {
  data () {
    return {
      isTop: false,
      userInfo: {},
      liData: [
        { name: '个人介绍', ref: 'person_intro' },
        { name: '技术栈', ref: 'technology' },
        { name: '项目介绍', ref: 'project' },
        { name: '工作经历', ref: 'work' }
      ],
      navIndex: 0,
      tecList: [
        { name: 'HTML', percent: 65 },
        { name: 'CSS', percent: 60 },
        { name: 'JS', percent: 75 },
        { name: 'VUE', percent: 80 }
      ]
    }
  },
  mounted () {
    this.getInfo()
    window.addEventListener('scroll', this.handerScoll, true)
  },
  methods: {
    handerScoll (e) {
      const top_img = this.$refs.top_img
      const scrollY = window.scrollY
      try {
        const offsetHeight = top_img.offsetHeight
        this.isTop = scrollY - offsetHeight >= 0 ? true : false
        const scollBox = this.$refs.scoll_box
        this.navIndex = Math.floor(scollBox.scrollTop / 700)
      } catch (err) {
        // console.log(err)
      }
    },
    handerGo (index) {
      const ref = this.liData[index].ref
      const domEle = this.$refs[ref]
      this.navIndex = index
      const scollBox = this.$refs.scoll_box
      const top_img = this.$refs.top_img
      scollBox.scrollTop = domEle.offsetTop - top_img.offsetHeight - 80
    },
    getInfo () {
      let url = '/getUserInfo'
      statisticalForHome(url, {}).then(res => {
        if (res.code === 200) {
          // console.log(res)
          this.userInfo = res.data
        } else {
          this.$message.error('服务器繁忙')
        }
      })
    },
    customColorMethod (percentage) {
      if (percentage < 65) {
        return '#d6723e';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else if (percentage < 76) {
        return '#5dd5c8';
      } else {
        return '#67c23a';
      }
    },
    handerToProject (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="less" scoped>
.resume {
  // margin-top: 61px;
  // background-color: #464c5b;
  // height: 100vh;
  position: relative;
  overflow: hidden;
  .top_img {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 700px;
    .bg {
      background: url("../assets/bg1.jpg") no-repeat center;
      background-size: cover;
      height: 700px;
      width: 100%;
      margin: 0 auto;
      animation: translate 5s infinite;
      -webkit-animation: translate 5s infinite;
      position: reaative;
      // display: flex;
      // justify-content: center;
      // align-items: center;
    }
    .box {
      position: absolute;
      // background-color: #fff;
      opacity: 0.5;
      width: 200px;
      height: 200px;
      z-index: 9999;
      top: 250px;
      left: 50%;
      transform: translate(-120px, 0);
      h1 {
        font-size: 40px;
      }
    }
    @keyframes translate {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.1);
      }
      100% {
        // opacity: 0;
        transform: scale(1);
      }
    }
  }
  section {
    height: 100vh;
    // overflow-y: auto;
    // padding-bottom: 80px;
    .top_nav {
      background-color: #2c3e50;
      width: 100%;
      height: 80px;
      // position: sticky;
      // top: 0;
      z-index: 999;
      // position: relative;
      .nav_box {
        width: 1170px;
        margin: 0 auto;
        height: 80px;
        // position: absolute;
        top: 0;
        ul {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 80px;

          li {
            // float: left;
            color: #fff;
            font-size: 22px;
            margin: 0 18px;
            cursor: pointer;
            &:hover {
              color: #e87e04;
            }
          }
          .active {
            color: #e87e04;
          }
        }
      }
    }
    .fixed {
      position: fixed !important;
      top: 0;
    }
    .scoll_box {
      height: calc(100vh - 80px);
      // height: 100vh;
      overflow-y: auto;
      // padding: 80px 0;
      padding-bottom: 80px;
      margin-bottom: 80px;
      .person_intro,
      .project,
      .technology,
      .work {
        width: 100%;
        // background-color: #0414ff;
        height: 700px;
      }
      .person_intro_box {
        width: 1300px;
        margin: 100px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 500px;
        justify-content: space-around;
        h2 {
          color: #999;
          font-size: 24px;
        }
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .about {
          display: flex;
          flex-wrap: wrap;
          .info {
            // flex: 1;
            width: 50%;
            text-align: center;
            line-height: 80px;
            height: 80px;
            // flex: 1;
            > span {
              display: inline-block;
              text-align: left;
              width: 40%;
              span {
                text-align: left;
                i {
                  font-size: 20px;
                  margin-right: 6px;
                  color: #4e8cee;
                }
              }
            }
          }
        }
      }
      .project {
        // background-color: #00500f;
        display: flex;
        align-items: center;
        position: relative;
        h2 {
          position: absolute;
          color: #999;
          font-size: 24px;
          top: 50px;
          left: 50%;
          transform: translate(-50%);
        }
        .project_box {
          display: flex;
          width: 1300px;
          margin: 0 auto;
          justify-content: space-around;
          align-items: center;
          .project_list {
            flex: 1;
            position: relative;
            cursor: pointer;
            .project_list_bg {
              width: 300px;
              height: 200px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .project_list_info {
              background-color: rgba(0, 0, 0, 0.5);
              width: 300px;
              height: 200px;
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              h3 {
                width: 100%;
                text-align: center;
                color: #fff;
              }
            }
            &:hover {
              overflow: hidden;
              transform: scale(1.1, 1.1);
              transition: all 0.3s linear;
              .project_list_info {
                // display: block;
                display: flex;
                align-items: center;
              }
              .project_list_bg {
                // transform: scale(1.3, 1.3);
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
      .technology {
        background-color: #ededed;
        position: relative;
        h2 {
          color: #999;
          font-size: 24px;
          padding-top: 60px;
          text-align: center;
        }
        .tec_box {
          width: 1300px;
          margin: 0 auto;
          height: 45%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: -40px;
          .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span {
              display: block;
              text-align: center;
              margin-top: 20px;
              width: 100%;
              color: #999;
            }
          }
        }
        .tec_dec {
          width: 850px;
          margin: 0 auto;
          ul {
            // text-align: center;
            margin-left: 140px;
            // width: 600px;

            li {
              line-height: 40px;
              height: 40px;
              i {
                color: #548cee;
                margin-right: 8px;
              }
            }
          }
        }
      }
      .work {
        background-color: #fff;
        height: 900px;
      }
    }
  }
}
</style>