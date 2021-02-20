<template>
  <el-table
    ref="filterTable"
    border
    :data="data"
    style="width: 100%"
    :cell-style="changeCellStyle"
    height="400"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="$route.name == 'customAnalysis'" type="selection" width="35"></el-table-column>
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
    <el-table-column show-overflow-tooltip label="操作">
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