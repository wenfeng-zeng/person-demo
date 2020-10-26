import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/view/index.vue')
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
          path: '/fontDemo',
          name: 'fontDemo',
          component: () => import('@/view/demo/fontDemo.vue')
        },
        {
          path: '/lightDemo',
          name: 'lightDemo',
          component: () => import('@/view/demo/lightDemo.vue')
        },
      ]
    },
  ]
})
