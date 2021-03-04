<template>
  <div class="loading" v-show="loading">
    <div class="container">
      <i class="el-icon-loading"></i>
      <br />
      <span>加载中，请稍后...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;
  .container {
    width: 200px;
    height: 150px;
    margin: 250px auto;
    background-color: rgba(255, 255, 255);
    padding: 10px;
    border-radius: 5px;
  }
  .el-icon-loading,
  span {
    color: #409eff;
    font-size: 20px;
  }
}
</style>