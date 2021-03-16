<template>
  <el-table
    border
    ref="filterTable"
    :data="data"
    style="width: 100%"
    :cell-style="changeCellStyle"
    empty-text="暂无"
    height="470"
    @selection-change="handleSelectionChange"
    :fit="true"
  >
    <!-- [2].includes(checkAble) -->
    <!-- <el-table-column v-if="$route.name == 'customAnalysis'" type="selection" width="35"></el-table-column> -->
    <el-table-column v-if="checkAble == 2" type="selection" width="35"></el-table-column>
    <el-table-column type="index" label="序号"></el-table-column>
    <el-table-column show-overflow-tooltip prop="custNo" label="客户号"></el-table-column>
    <el-table-column prop="custName" label="客户姓名" width="90">
      <template slot-scope="scope">
        <div class="customName" @click="customDetail(scope.row)">
          <span>{{scope.row.custName}}</span>
          <img v-if="!scope.row.flag" src="@/assets/image/newPeople.png" alt />
        </div>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="telNo" label="联系电话" width="90"></el-table-column>
    <el-table-column show-overflow-tooltip prop="custProductRecordList" label="推荐产品" width="250"></el-table-column>
    <el-table-column show-overflow-tooltip prop="custType" label="客户类别" width="70">
      <template slot-scope="scope">
        <div>
          <span>{{scope.row.custType == '0' ? '分配客户' : scope.row.custType == '1' ? '私有客户' : scope.row.custType == '2' ? '公有客户' :'' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="custManagerNo" label="客户经理"></el-table-column>
    <el-table-column v-if="checkAble == 3" show-overflow-tooltip prop="analysisTime" label="分析时间"></el-table-column>
    <el-table-column label="操作" v-if="checkAble !== 3">
      <!-- v-if="checkAble !== 3" -->
      <!-- v-if="[1,2].includes(checkAble)" -->
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
    checkAble: { type: Number, default: 1 },
    pages: { type: Object, default: () => {} },
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
      this.$emit("customDetail", row);
    },
    //多选
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 推荐产品的列的样式
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (this.checkAble == 3) {
        // 分析结果
        if (row.column.label === "推荐产品") {
          let color = row.row.recordStatus == "1" ? "#FFA400" : "#18B979"; //橙 绿
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
    // 下拉获取下一页数据
    loadMore(refName, callback) {
      let box = refName ? this.$refs[refName].bodyWrapper : document.body; //获取监听元素
      box.addEventListener("scroll", () => {
        // 监听滑动
        const scrollTop = box.scrollTop; // 滑动距离
        const scrollHeight = box.scrollHeight; // 滑动高度
        const clientHeight = box.offsetHeight; // 元素视口高度
        if (
          scrollTop + clientHeight >= scrollHeight - 20 &&
          this.pages.pageNum < Math.ceil(this.pages.total / this.pages.pageSize)
        ) {
          callback && callback();
        }
      });
    },
    // 取消
    cancle() {
      this.$refs.filterTable.clearSelection();
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