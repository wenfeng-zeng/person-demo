import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/view/home.vue'),
      redirect: '/resume',
      children: [
        {
          path: '/resume',
          name: 'resume',
          component: () => import('@/view/resume.vue')
        },
        {
          path: '/demo',
          name: 'demo',
          component: () => import('@/view/project/demo.vue'),
          redirect: '/demo/fontDemo',
          children: [
            {
              path: '/demo/loading',
              name: 'loading',
              component: () => import('@/view/demo/index.vue')
            },
            {
              path: '/demo/fontDemo',
              name: 'fontDemo',
              component: () => import('@/view/demo/fontDemo.vue')
            },
            {
              path: '/demo/map',
              name: 'map',
              component: () => import('@/view/demo/map.vue')
            },
            {
              path: '/demo/lightDemo',
              name: 'lightDemo',
              component: () => import('@/view/demo/lightDemo.vue')
            },
            {
              path: '/demo/snow',
              name: 'snow',
              component: () => import('@/view/demo/snow.vue')
            },
            {
              path: '/demo/web-view',
              name: 'web-view',
              component: () => import('@/view/demo/web-view.vue')
            },
            {
              path: '/demo/prize',
              name: 'prize',
              component: () => import('@/view/demo/prize.vue')
            },
            {
              path: '/demo/echarts',
              name: 'echarts',
              component: () => import('@/view/demo/echartsList.vue')
            },
          ]
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/view/demo/test.vue')
        },
        {
          path: '/test1',
          name: 'test1',
          component: () => import('@/view/demo/test1.vue')
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('@/view/project/account.vue')
        },
        {
          path: '/payment',
          name: 'payment',
          component: () => import('@/view/project/payment.vue')
        },
        {
          path: '/phoneHome',
          name: 'phoneHome',
          component: () => import('@/view/phone/phoneHome.vue'),
          children: [
            {
              path: '/phoneHome/phonePrize',
              name: 'phonePrize',
              component: () => import('@/view/phone/phonePrize.vue'),
            },
            {
              path: '/phoneHome/phoneInfo',
              name: 'phoneInfo',
              component: () => import('@/view/phone/phoneInfo.vue'),
            },
          ]
        }
      ]
    }
  ]
})
