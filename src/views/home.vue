<template>
  <div class="home">
    <div class="header">
      <div class="avatar">
        <div class="block">
          <el-avatar
            :size="25"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </div>
        <span class="userInfo-font">工号：567898768576890</span>
      </div>
      <div class="title">{{ $route.meta.name }}</div>
      <div class="logout">
        <a @click="logout">
          退出
          <span class="iconfont icontuichu"></span>
        </a>
      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer">
      <div v-for="item in navMenu" :key="item.id" class="menuItem">
        <router-link class="menu_item" :to="item.path">
          <span :class="['iconfont',item.icon ]"></span>
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navMenu: [
        {
          id: 1,
          icon: "iconyingxiaoguanli",
          path: "/marketActive",
          name: "营销活动",
        },
        {
          id: 2,
          icon: "iconkehuguanli",
          path: "/marketManage",
          name: "营销管理",
        },
        {
          id: 3,
          icon: "iconkehuguanli1",
          path: "/customManage",
          name: "客户管理",
        },
        {
          id: 4,
          icon: "iconbiaoqianguanli",
          path: "/analysisHistory",
          name: "分析历史",
        },
      ],
    };
  },
  methods: {
    logout() {
      console.log("退出");
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 0 49px 0;

  .header {
    height: 50px;
    width: 100%;
    position: fixed;
    top: 0;
    background: rgba(238, 240, 255, 0.3);
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #333;
    border-bottom: 1px solid #e8edf3;
    .avatar {
      width: 300px;
      display: flex;
      align-items: center;
      .block {
        margin: 5px 10px 0 20px;
      }
    }
    .title {
      flex: 1;
      font-size: 15px;
      font-weight: 700;
      text-align: center;
    }
    .logout {
      width: 300px;
      text-align: right;
      padding: 0 20px;
      .icontuichu {
        color: #0060ff;
      }
    }
  }
  .main {
    background: rgba(238, 240, 255, 0.3);
    width: 100%;
    height: 100%;
    padding: 15px 20px 30px;
    box-sizing: border-box;
  }
  .footer {
    height: 49px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    box-shadow: 0px -2px 8px 0px rgba(0, 96, 255, 0.05);
    border-radius: 25px 25px 0px 0px;
    display: flex;
    .menuItem {
      flex: 1;
      text-align: center;
      font-size: 15px;
      .menu_item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #999;
        text-decoration: none;
        &.router-link-active {
          color: #0060ff;
        }
        span:nth-child(1) {
          font-size: 22px;
        }
        span:nth-child(2) {
          font-size: 15px;
        }
      }
    }
  }
}
</style>