<template>
  <div class="loginpage">
    <div class="login">
      <div></div>
      <div id="particles"></div>
      <div class="login_top">
        <div class="login-container">
          <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm">
            <h3 class="container-title">账号登录</h3>
            <el-form-item prop="userName">
              <div class="userData">
                <i class="icon"> </i>
                <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="请输入登录账号" class="inoutt" @keyup.enter.native="handleSubmit" />
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="userData">
                <i class="icon"> </i>
                <!-- eslint-disable-next-line vue/valid-v-on -->
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" show-password placeholder="请输入密码" class="inoutt" @keyup.enter.native="handleSubmit">
                </el-input>
              </div>
            </el-form-item>
            <!-- <span class="tips">忘记密码请联系管理员</span> -->
            <el-form-item style="width:100%;">
              <el-button type="warning" style="width:100%;margin-top:25px;" @click.native.prevent="handleSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// import { login } from '../request/login_api'
import { statisticalForHome, getRequest } from '@/request/home'
export default {
  data () {
    return {
      ruleForm2: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { pattern: /^[^\s]*$/, message: '不能包含空格', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账户密码', trigger: 'blur' }
        ]
      },
    }
  },
  mounted () {
    let urls = process.env.NODE_ENV === 'development' ? 'node/getParticlesJson' : './static/particles.json'
    particlesJS.load('particles', urls, function () {
      console.log('callback - particles-js config loaded');
    });
  },
  methods: {
    handleSubmit () {
      this.$refs.ruleForm2.validate(v => {
        if (!v) {
          this.$message.error('请输入正确的账户密码')
          return false
        }
        let url = '/login'
        statisticalForHome(url, this.ruleForm2).then(res => {
          if (res.code === 200) {
            let token = res.token
            this.$store.dispatch('set_token', token)
            this.$message.success('登录成功，稍后自动跳转')
            this.$router.push({
              path: '/home'
            })
          } else {
            this.$message({
              message: res.msg,
              offset: 100,
              type: 'error'
            })
          }
        })
      })
    },
  }
}
</script>

<style lang="less" scoped>
.loginpage {
  background-color: #464c5b;
  .login {
    height: 100vh;
    position: relative;
    #particles {
      height: 100vh;
    }
    .login_top {
      position: absolute;
      // top: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // left: 0;
      // bottom: 0;
      // right: 0;
      width: 304px;
      height: 304px;
      background: #fff;
      box-sizing: border-box;
      border-radius: 12px;
      padding: 36px;
      // padding-bottom: 10px;
      .container-title {
        text-align: center;
        font-size: 17px;
        color: #333;
        margin-bottom: 16px;
      }
    }
  }
}
</style>