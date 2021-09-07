// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// Vue.use(Router)
const routes = [
  {
    path: '/',
    name: '',
    redirect: '/login',
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('@/view/demo/test2.vue')
  },
  {
    path: '/cesium',
    name: 'cesium',
    component: () => import('@/view/cesium/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login.vue'),
  },
  {
    path: '/aoge/demo',
    name: 'augoDemo',
    component: () => import('@/view/aoge/demo.vue'),
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
            path: '/demo/fullScreenDemo',
            name: 'fullScreenDemo1',
            component: () => import('@/view/demo/fullScreenDemo.vue')
          },
          {
            path: '/demo/arcgis',
            name: 'arcgis',
            component: () => import('@/view/demo/arcgis.vue')
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
          {
            path: '/demo/webSocket',
            name: 'webSocket',
            component: () => import('@/view/demo/webSocket.vue')
          },
          {
            path: '/demo/roomCharts',
            name: 'roomCharts',
            component: () => import('@/view/demo/roomCharts.vue')
          },
          {
            path: '/demo/waterMarker',
            name: 'waterMarker',
            component: () => import('@/view/demo/waterMarker.vue')
          },
        ]
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/view/demo/test.vue')
      },
      {
        path: '/fullScreenDemo',
        name: 'fullScreenDemo',
        component: () => import('@/view/fullScreenDemo/fullScreenDemo2.vue'),
      },
      {
        path: '/fullScreenDemo/economy',
        name: 'economy',
        component: () => import('@/view/fullScreenDemo/child/economy.vue'),
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
export default routes
// export default new vueRouter({
//   // mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: '',
//       redirect: '/login',
//     },
//     {
//       path: '/test2',
//       name: 'test2',
//       component: () => import('@/view/demo/test2.vue')
//     },
//     {
//       path: '/cesium',
//       name: 'cesium',
//       component: () => import('@/view/cesium/index.vue')
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('@/view/login.vue'),
//     },
//     {
//       path: '/aoge/demo',
//       name: 'augoDemo',
//       component: () => import('@/view/aoge/demo.vue'),
//     },
//     {
//       path: '/home',
//       name: 'home',
//       component: () => import('@/view/home.vue'),
//       redirect: '/resume',
//       children: [
//         {
//           path: '/resume',
//           name: 'resume',
//           component: () => import('@/view/resume.vue')
//         },
//         {
//           path: '/demo',
//           name: 'demo',
//           component: () => import('@/view/project/demo.vue'),
//           redirect: '/demo/fontDemo',
//           children: [
//             {
//               path: '/demo/loading',
//               name: 'loading',
//               component: () => import('@/view/demo/index.vue')
//             },
//             {
//               path: '/demo/fontDemo',
//               name: 'fontDemo',
//               component: () => import('@/view/demo/fontDemo.vue')
//             },
//             {
//               path: '/demo/map',
//               name: 'map',
//               component: () => import('@/view/demo/map.vue')
//             },
//             {
//               path: '/demo/fullScreenDemo',
//               name: 'fullScreenDemo1',
//               component: () => import('@/view/demo/fullScreenDemo.vue')
//             },
//             {
//               path: '/demo/arcgis',
//               name: 'arcgis',
//               component: () => import('@/view/demo/arcgis.vue')
//             },
//             {
//               path: '/demo/lightDemo',
//               name: 'lightDemo',
//               component: () => import('@/view/demo/lightDemo.vue')
//             },
//             {
//               path: '/demo/snow',
//               name: 'snow',
//               component: () => import('@/view/demo/snow.vue')
//             },
//             {
//               path: '/demo/web-view',
//               name: 'web-view',
//               component: () => import('@/view/demo/web-view.vue')
//             },
//             {
//               path: '/demo/prize',
//               name: 'prize',
//               component: () => import('@/view/demo/prize.vue')
//             },
//             {
//               path: '/demo/echarts',
//               name: 'echarts',
//               component: () => import('@/view/demo/echartsList.vue')
//             },
//             {
//               path: '/demo/webSocket',
//               name: 'webSocket',
//               component: () => import('@/view/demo/webSocket.vue')
//             },
//             {
//               path: '/demo/roomCharts',
//               name: 'roomCharts',
//               component: () => import('@/view/demo/roomCharts.vue')
//             },
//             {
//               path: '/demo/waterMarker',
//               name: 'waterMarker',
//               component: () => import('@/view/demo/waterMarker.vue')
//             },
//           ]
//         },
//         {
//           path: '/test',
//           name: 'test',
//           component: () => import('@/view/demo/test.vue')
//         },
//         {
//           path: '/fullScreenDemo',
//           name: 'fullScreenDemo',
//           component: () => import('@/view/fullScreenDemo/fullScreenDemo2.vue'),
//         },
//         {
//           path: '/fullScreenDemo/economy',
//           name: 'economy',
//           component: () => import('@/view/fullScreenDemo/child/economy.vue'),
//         },
//         {
//           path: '/test1',
//           name: 'test1',
//           component: () => import('@/view/demo/test1.vue')
//         },
//         {
//           path: '/account',
//           name: 'account',
//           component: () => import('@/view/project/account.vue')
//         },
//         {
//           path: '/payment',
//           name: 'payment',
//           component: () => import('@/view/project/payment.vue')
//         },
//         {
//           path: '/phoneHome',
//           name: 'phoneHome',
//           component: () => import('@/view/phone/phoneHome.vue'),
//           children: [
//             {
//               path: '/phoneHome/phonePrize',
//               name: 'phonePrize',
//               component: () => import('@/view/phone/phonePrize.vue'),
//             },
//             {
//               path: '/phoneHome/phoneInfo',
//               name: 'phoneInfo',
//               component: () => import('@/view/phone/phoneInfo.vue'),
//             },
//           ]
//         }
//       ]
//     }
//   ]
// })
