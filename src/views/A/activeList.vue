<template>
  <div class="activeList">
    <div class="btnContainer">
      <div class="left">
        <div class="sureBtn">返回</div>
      </div>
      <div class="right">
        <el-input placeholder="请输入客户姓名" size="mini" v-model="keyWord" clearable></el-input>
        <div
          v-for="item in customTypeBtn"
          :key="item.id"
          :class="{plainBtn:true, plainBtn_primary:customTypeId == item.id}"
          @click="customType(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
    <el-table ref="filterTable" border :data="tableData" style="width: 100%" height="470">
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
      <el-table-column show-overflow-tooltip prop="name" label="客户类别"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="客户经理"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="状态" v-if="customTypeId !== 1"></el-table-column>
      <el-table-column label="操作" v-if="customTypeId !== 3">
        <template slot-scope="scope">
          <div v-show="customTypeId === 1" class="sureBtn" @click="followUp(scope.row)">跟进</div>
          <div v-show="[2,4].includes(customTypeId)" class="myBtn myBtn_warning">继续跟进</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customTypeId: 1,
      customTypeBtn: [
        { id: 1, name: "推荐列表" },
        { id: 2, name: "有意向" },
        { id: 3, name: "办理成功" },
        { id: 4, name: "已拒绝" },
      ],
      keyWord: "",
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
    customType(ind) {
      this.customTypeId = ind;
    },
    // 跟进
    followUp(row) {
      console.log(row);
    },
  },
};
</script>


<style lang="less" scoped>
.activeList {
  background: #ffffff;
  box-shadow: 0px 1px 2px 0px rgba(0, 96, 255, 0.05);
  border-radius: 5px;
  padding: 0 15px 15px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .btnContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .right {
      padding-top: 18px;
      box-sizing: border-box;
      display: flex;
      .el-input {
        width: 220px;
      }
      div {
        margin-right: 10px;
      }
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
<style lang="less">
.activeList .el-input__suffix {
  height: auto;
}
</style>