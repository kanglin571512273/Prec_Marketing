<template>
  <div class="marketActive">
    <div class="activeItem" v-for="item in 8" :key="item" @click="goOther(item)">
      <div class="activeName">办理信用卡业务</div>
      <div class="time">2021.1.30-2021.5.09</div>
      <div class="progressBar">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
      </div>
      <div class="mark" v-if="false">
        <span>已结束</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goOther(id) {
      this.$router.push({
        path: "/activeList",
        name: "activeList",
        params: {
          id,
        },
      });
      console.log(id);
    },
  },
};
</script>

<style lang="less" scoped>
.marketActive {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-starts;
  flex-wrap: wrap;
  .activeItem {
    background-color: #fff;
    width: 32%;
    height: 272px;
    border-radius: 5px;
    text-align: center;
    color: #999999;
    font-size: 15px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 17px;
    .mark {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000000;
      border-radius: 5px;
      opacity: 0.49;
      span {
        font-size: 45px;
        font-weight: 500;
        color: #ffffff;
        line-height: 272px;
      }
    }
    .progressBar {
      box-sizing: border-box;
      width: calc(100% - 20px);
      position: absolute;
      bottom: 10px;
    }
    .activeName {
      margin-top: 85px;
      font-size: 25px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 700;
      line-height: 35px;
    }
    &:nth-child(3n + 1) {
      .activeName {
        color: #0060ff;
      }
    }
    &:nth-child(3n + 2) {
      margin: 0 17px;
      .activeName {
        color: #ffa400;
      }
    }
    &:nth-child(3n) {
      .activeName {
        color: #18b979;
      }
    }
  }
}
</style>
<style lang="less">
.activeItem {
  .el-progress-bar__innerText {
    font-weight: 700;
    font-size: 15px;
  }
  &:nth-child(3n + 1) {
    .el-progress-bar__inner {
      background-image: linear-gradient(90deg, #009aff 0%, #0060ff 100%);
    }
  }
  &:nth-child(3n + 2) {
    .el-progress-bar__inner {
      background-image: linear-gradient(90deg, #ffd100 0%, #ffa400 100%);
    }
  }
  &:nth-child(3n) {
    .el-progress-bar__inner {
      background-image: linear-gradient(90deg, #18b979 0%, #00b14c 100%);
    }
  }
}
</style>