<template>
  <div class="customManage">
    <div class="btnContainer">
      <div class="left">
        <div class="plainBtn plainBtn_primary myBtn_primary" @click="dialogFormVisible = true">新增客户</div>
        <div
          class="plainBtn plainBtn_primary myBtn_primary"
          @click="$router.push('/customAnalysis')"
        >客户分析</div>
      </div>
      <div class="right">
        <div
          v-for="item in customTypeBtn"
          :key="item.id"
          :class="{plainBtn:true, plainBtn_primary:customTypeId == item.id}"
          @click="customType(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
    <!--  table -->
    <customTable :data="tableData" @edit="edit" @customDetail="customDetail"></customTable>
    <!-- 添加客户 -->
    <el-dialog :visible.sync="dialogFormVisible" @close="resetForm">
      <dialogForm :data="ruleForm" ref="childRef" @closeDia="dialogFormVisible = false"></dialogForm>
    </el-dialog>
  </div>
</template>

<script>
import customTable from "./customTable";
import dialogForm from "./dialogForm";
export default {
  components: { customTable, dialogForm },
  data() {
    return {
      customTypeId: 1,
      customTypeBtn: [
        { id: 1, name: "所有客户" },
        { id: 2, name: "分配客户" },
        { id: 3, name: "私有客户" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
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
      dialogFormVisible: false,
      ruleForm: {},
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
      this.dialogFormVisible = true;
      console.log(row);
    },
    resetForm() {
      this.$refs.childRef.resetForm();
    },
  },
};
</script>

<style lang="less" scoped>
.customManage {
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
}
</style>