<template>
  <div class="customManage">
    <div class="btnContainer">
      <div class="left">
        <div class="plainBtn plainBtn_primary myBtn_primary">新增客户</div>
      </div>
      <div class="right">
        <div class="plainBtn plainBtn_primary">所有客户</div>
        <div class="plainBtn">分配客户</div>
        <div class="plainBtn">私有客户</div>
        <div class="plainBtn">公有客户</div>
      </div>
    </div>
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button> -->
    <!-- <el-button @click="clearFilter">清除所有过滤器</el-button> -->
    <el-table ref="filterTable" border :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="客户号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="客户姓名">
        <template slot-scope="scope">
          <div class="customName" @click="customDetail(scope.row)">
            <span>{{scope.row.name}}</span>
            <img src="@/assets/image/newPeople.png" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="联系电话"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="推荐产品"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="客户类别"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="客户经理"></el-table-column>
      <el-table-column show-overflow-tooltip prop="address" label="操作"></el-table-column>
    </el-table>
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
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
  },
};
</script>

<style lang="less" scoped>
.customManage {
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 96, 255, 0.05);
  border-radius: 10px;
  padding: 0 15px 15px;
  height: 100%;
  .btnContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .customName {
    span {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 700;
      color: #0060ff;
    }
    img {
      position: absolute;
      top: 0;
      right: 0;
      width: 22px;
      height: 25px;
    }
  }
}
</style>