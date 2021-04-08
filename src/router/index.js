import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "*",
      component: () => import("@/views/404not_found")
    },
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: 'home' */ "@/views/home"),
      redirect: "marketActive",
      children: [
        {
          path: "marketActive",
          name: "marketActive",
          meta: {
            name: "营销活动"
          },
          component: () =>
            import(
              /* webpackChunkName: 'marketActive' */ "@/views/A/marketActive"
            )
        },
        {
          path: "activeList",
          name: "activeList",
          meta: {
            name: "营销活动"
          },
          component: () =>
            import(/* webpackChunkName: 'activeList' */ "@/views/A/activeList")
        },
        {
          path: "marketManage",
          name: "marketManage",
          meta: {
            name: "营销管理"
          },
          component: () =>
            import(
              /* webpackChunkName: 'marketManage' */ "@/views/B/marketManage"
            )
        },
        {
          path: "customManage",
          name: "customManage",
          meta: {
            name: "客户管理"
          },
          component: () =>
            import(
              /* webpackChunkName: 'customManage' */ "@/views/C/customManage"
            )
        },
        // {
        //   path: "customAnalysis",
        //   name: "customAnalysis",
        //   meta: {
        //     name: "客户管理" //客户分析
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: 'customAnalysis' */ "@/views/C/customAnalysis"
        //     )
        // },
        // {
        //   path: "analysisResoult",
        //   name: "analysisResoult",
        //   meta: {
        //     name: "客户管理" //客户分析结果
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: 'analysisResoult' */ "@/views/C/analysisResoult"
        //     )
        // },
        {
          path: "analysisHistory",
          name: "analysisHistory",
          meta: {
            name: "分析历史"
          },
          component: () =>
            import(
              /* webpackChunkName: 'analysisHistory' */ "@/views/D/analysisHistory"
            )
        },
        {
          path: "a",
          name: "a",
          meta: {
            name: "a"
          },
          component: () =>
            import(
              /* webpackChunkName: 'analysisHistory' */ "@/components/HelloWorld"
            )
        },
        {
          path: "Panorama",
          name: "Panorama",
          meta: {
            name: "Panorama"
          },
          component: () =>
            import(
              /* webpackChunkName: 'analysisHistory' */ "@/components/Panorama"
            )
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import(/* webpackChunkName: 'login' */ "@/views/login")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.name == "Login") {
//     next();
//   } else if (localStorage.getItem("token")) {
//     next();
//   } else {
//     console.log("token 失效");
//     next("/login");
//   }
// });

export default router;
