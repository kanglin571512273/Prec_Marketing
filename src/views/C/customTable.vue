<template>
  <el-table
    border
    ref="filterTable"
    :data="data"
    style="width: 100%"
    :cell-style="changeCellStyle"
    empty-text="暂无"
    height="400"
    @selection-change="handleSelectionChange"
    :fit="true"
  >
    <el-table-column v-if="$route.name == 'customAnalysis'" type="selection" width="35"></el-table-column>
    <el-table-column type="index" label="序号"></el-table-column>
    <el-table-column show-overflow-tooltip prop="custNo" label="客户号"></el-table-column>
    <el-table-column show-overflow-tooltip prop="custName" label="客户姓名">
      <template slot-scope="scope">
        <div class="customName" @click="customDetail(scope.row)">
          <span>{{scope.row.custName}}</span>
          <img v-if="scope.row.followUpTimes" src="@/assets/image/newPeople.png" alt />
        </div>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="telNo" label="联系电话"></el-table-column>
    <el-table-column show-overflow-tooltip prop="custProductRecordList" label="推荐产品" width="200"></el-table-column>
    <el-table-column show-overflow-tooltip prop="custType" label="客户类别">
      <template slot-scope="scope">
        <div>
          <span>{{scope.row.custType == '0' ? '分配客户' : scope.row.custType == '1' ? '私有客户' : scope.row.custType == '2' ? '共有客户' :'所有客户' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="custManagerName" label="客户经理"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="warning" icon="el-icon-edit" round size="mini" @click="edit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    data: { type: Array, default: () => {} },
  },
  data() {
    return {};
  },
  methods: {
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
      this.$emit("customDetail", row);
    },
    //多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 推荐产品的列的样式
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (this.$route.name == "analysisResoult") {
        // 分析结果
        if (row.column.label === "推荐产品") {
          let color = row.row.name == "王小虎1" ? "#FFA400" : "#18B979";
          return `color: ${color}`; // 修改的样式
        } else {
          return "";
        }
      }
      if (row.column.label === "推荐产品") {
        return "color: #18B979"; // 修改的样式
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>