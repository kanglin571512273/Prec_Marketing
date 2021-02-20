<template>
  <div class="analysisHistory">
    <div class="btnContainer">
      <div class="left"></div>
      <div class="right">
        <div
          v-for="item in customTypeBtn"
          :key="item.id"
          :class="{plainBtn:true, plainBtn_primary:customTypeId == item.id}"
          @click="customType(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
    <el-table
      ref="filterTable"
      border
      :data="tableData"
      style="width: 100%"
      :cell-style="changeCellStyle"
      height="400"
    >
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
      <el-table-column show-overflow-tooltip prop="name" label="分析时间"></el-table-column>
      <el-table-column show-overflow-tooltip label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-view"
            round
            size="mini"
            @click="edit(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import customTable from "../C/customTable";
export default {
  components: { customTable },
  data() {
    return {
      customTypeId: 1,
      customTypeBtn: [
        { id: 1, name: "所有客户" },
        { id: 2, name: "分配客户" },
        { id: 3, name: "私有客户" },
        { id: 4, name: "公有客户" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
        {
          date: "2016-05-04",
          name: "王小虎1",
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
    // 切换客户类型
    customType(ind) {
      this.customTypeId = ind;
    },
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
    },
    // 编辑
    edit(row) {
      console.log(row);
    },
    // 推荐产品的列的样式
    changeCellStyle(row, column, rowIndex, columnIndex) {
      // 分析结果
      if (row.column.label === "推荐产品") {
        let color = row.row.name == "王小虎1" ? "#FFA400" : "#18B979";
        return `color: ${color}`; // 修改的样式
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.analysisHistory {
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
    .right > div {
      margin-right: 10px;
    }
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