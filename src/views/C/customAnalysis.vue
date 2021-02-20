<template>
  <div class="customAnalysis">
    <div class="btnContainer">
      <div class="left"></div>
      <div class="right">
        <div class="sureBtn" @click="toAnalysisResoult">确认</div>
        <div class="cancelBtn" @click="$router.back()">取消</div>
      </div>
    </div>
    <customTable :data="tableData" @edit="edit" @handleSelectionChange="handleSelectionChange"></customTable>
  </div>
</template>

<script>
import { Message } from "@/utils/importFile";
import customTable from "./customTable";
export default {
  components: {
    customTable,
  },
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
      multipleSelection: [], //多选结果
    };
  },
  methods: {
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
    },
    // 编辑
    edit(row) {
      console.log(row);
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toAnalysisResoult() {
      if (!this.multipleSelection.length) {
        Message.error("请先选择要分析的客户");
        return false;
      }
      this.$router.push({
        path: "/analysisResoult",
      });
    },
    // 推荐产品的列的样式
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === "推荐产品") {
        return "color: #18B979"; // 修改的样式
      } else {
        return "";
      }
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
.customAnalysis {
  background: #ffffff;
  box-shadow: 0px 1px 2px 0px rgba(0, 96, 255, 0.05);
  border-radius: 5px;
  padding: 0 15px 15px;
  height: 100%;
  overflow: hidden;
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