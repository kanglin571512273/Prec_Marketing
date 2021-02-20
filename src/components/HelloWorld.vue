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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司",
        },
      ],
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      // console.log(row);
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>

<style scoped>
</style>
