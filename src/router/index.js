import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/home.vue'),
      redirect: '/resume',
      children: [
        {
          path: '/loading',
          name: 'loading',
          component: () => import('@/view/demo/index.vue')
        },
        {
          path: '/resume',
          name: 'resume',
          component: () => import('@/view/resume.vue')
        },
        {
          path: '/fontDemo',
          name: 'fontDemo',
          component: () => import('@/view/demo/fontDemo.vue')
        },
        {
          path: '/lightDemo',
          name: 'lightDemo',
          component: () => import('@/view/demo/lightDemo.vue')
        },
        {
          path: '/snow',
          name: 'snow',
          component: () => import('@/view/demo/snow.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/view/demo/test.vue')
        },
        {
          path: '/prize',
          name: 'prize',
          component: () => import('@/view/demo/prize.vue')
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
      ]
    },
  ]
})
