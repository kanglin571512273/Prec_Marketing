import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: 'home' */ "@/views/home"),
      redirect: 'marketActive',
      children: [
        {
          path: 'marketActive',
          name: 'marketActive',
          meta: {
            name: '营销活动'
          },
          component: () => import(/* webpackChunkName: 'marketActive' */ "@/views/A/marketActive"),
        },
        {
          path: 'marketManage',
          name: 'marketManage',
          meta: {
            name: '营销管理'
          },
          component: () => import(/* webpackChunkName: 'marketManage' */ "@/views/B/marketManage"),
        },
        {
          path: 'customManage',
          name: 'customManage',
          meta: {
            name: '客户管理'
          },
          component: () => import(/* webpackChunkName: 'customManage' */ "@/views/C/customManage"),
        },
        {
          path: 'customAnalysis',
          name: 'customAnalysis',
          meta: {
            name: '客户管理'//客户分析
          },
          component: () => import(/* webpackChunkName: 'customAnalysis' */ "@/views/C/customAnalysis"),
        },
        {
          path: 'analysisResoult',
          name: 'analysisResoult',
          meta: {
            name: '客户管理'//客户分析结果
          },
          component: () => import(/* webpackChunkName: 'analysisResoult' */ "@/views/C/analysisResoult"),
        },
        {
          path: 'analysisHistory',
          name: 'analysisHistory',
          meta: {
            name: '分析历史'
          },
          component: () => import(/* webpackChunkName: 'analysisHistory' */ "@/views/D/analysisHistory"),
        },
        {
          path: 'a',
          name: 'a',
          meta: {
            name: 'a'
          },
          component: () => import(/* webpackChunkName: 'analysisHistory' */ "@/components/HelloWorld"),
        },
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import(/* webpackChunkName: 'login' */ "@/views/login")
    }
  ]
})
