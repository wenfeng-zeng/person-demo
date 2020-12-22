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
            <!-- <li class=""  @click="handerGo('person_intro')">个人介绍 </li>
            <li class="" @click="handerGo('technology')">技术栈</li>
            <li class="" @click="handerGo('project')">项目介绍</li>
            <li class="" @click="handerGo('work')">工作经历</li> -->
            <!-- <li>个人介绍</li> -->
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
                  <span> 曾文烽</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-edu"> </i>学历：
                  </span>
                  <span> 本科</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-canjiagongzuoshijian"> </i>毕业年月：
                  </span>
                  <span> 2015-06</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-logo_school"> </i>学校：
                  </span>
                  <span> 仲恺农业工程学院</span>
                </span>

              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-zhuanyezhuanyeke"> </i> 专业：
                  </span>
                  <span> 通信工程</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-shouji"> </i>手机：
                  </span>
                  <span> 15915886273</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-youxiang1"> </i>邮箱：
                  </span>
                  <span> 289515197@qq.com</span>
                </span>
              </div>
              <div class="info">
                <span>
                  <span>
                    <i class="iconfont icon-youxiang1"> </i>求职状态：
                  </span>
                  <span> 在职（一月内到岗）</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div ref="technology" class="technology">技术栈</div>
        <div ref="project" class="project">项目介绍</div>
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
      liData: [
        { name: '个人介绍', ref: 'person_intro' },
        { name: '技术栈', ref: 'technology' },
        { name: '项目介绍', ref: 'project' },
        { name: '工作经历', ref: 'work' }
      ],
      navIndex: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handerScoll, true)
  },
  methods: {
    handerScoll (e) {
      const top_img = this.$refs.top_img
      const scrollY = window.scrollY
      const offsetHeight = top_img.offsetHeight
      this.isTop = scrollY - offsetHeight >= 0 ? true : false
      const scollBox = this.$refs.scoll_box
      this.navIndex = Math.floor(scollBox.scrollTop / 700)
    },
    handerGo (index) {
      const ref = this.liData[index].ref
      const domEle = this.$refs[ref]
      this.navIndex = index
      const scollBox = this.$refs.scoll_box
      const top_img = this.$refs.top_img
      scollBox.scrollTop = this.isTop ? domEle.offsetTop - top_img.offsetHeight : domEle.offsetTop - 80 - top_img.offsetHeight
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
      overflow-y: auto;
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
        background-color: #00500f;
      }
      .technology {
        background-color: #009400;
      }
      .work {
        background-color: #080077;
      }
    }
  }
}
</style>