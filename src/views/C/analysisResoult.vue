<template>
  <div class="customAnalysis">
    <div class="btnContainer">
      <div class="left">
        <div class="sureBtn" @click="reBack">返回</div>
      </div>
      <div class="right">
        <el-input placeholder="请输入客户姓名" size="mini" v-model="keyWord" clearable></el-input>
      </div>
    </div>
    <customTable :data="tableData" @edit="edit" @customDetail="customDetail"></customTable>
  </div>
</template>

<script>
import customTable from "./customTable";
import { analysisCustom } from "@/api/customApi";
export default {
  components: { customTable },
  data() {
    return {
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
  mounted() {
    this.analysisCustom();
  },
  methods: {
    async analysisCustom() {
      console.log(this.$route.params.nos.toString());
      try {
        const res = await analysisCustom(this.$route.params.nos.toString());
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
    },
    // 编辑
    edit(row) {
      console.log(row);
    },
    // 返回
    reBack() {
      this.$router.push("/customManage");
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
  box-sizing: border-box;
  overflow: hidden;
  .btnContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .right {
    padding-top: 18px;
    display: flex;
    box-sizing: border-box;
    .el-input {
      width: 220px;
    }
    div {
      margin-right: 10px;
    }
  }
}
</style>
<style lang="less">
.customAnalysis .el-input__suffix {
  height: auto;
}
</style>