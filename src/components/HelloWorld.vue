<template>
  <div class="hello">
    <div class="plainBtn">分配客户</div>
    <div class="plainBtn plainBtn_primary">分配客户</div>
    <div class="plainBtn plainBtn_primary myBtn_primary">分配客户</div>
    <div class="myBtn myBtn_primary">跟进</div>
    <div class="myBtn myBtn_warning">继续跟进</div>
    <div class="fatBtn">信用卡</div>
    <div class="fatBtn fatBtn_primary">理财</div>
    <div class="sureBtn">确认</div>
    <div class="cancelBtn">取消</div>
    <el-button type="warning" icon="el-icon-edit" round size="mini">编辑</el-button>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="(item,index ) in count" :key="index" class="infinite-list-item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: [1, 2, 3, 4, 5, 6, 7],
    };
  },
  mounted() {},
  methods: {
    load() {
      this.count.push(...[8, 9, 10, 11, 12]);
    },
  },
};
</script>

<style scoped>
.infinite-list {
  height: 100px;
  overflow: auto;
}
</style>
