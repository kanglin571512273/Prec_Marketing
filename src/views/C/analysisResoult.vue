<template>
  <div class="customAnalysis">
    <div class="btnContainer">
      <div class="left">
        <div class="sureBtn" @click="reBack">返回</div>
      </div>
      <div class="right"></div>
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
      tableData: [],
    };
  },
  mounted() {
    this.analysisCustom();
  },
  methods: {
    async analysisCustom() {
      // console.log(this.$route.params.nos.toString());
      try {
        const res = await analysisCustom(this.$route.params.nos.toString());
        if (res.code !== 200) return Message.error(res.msg);
        res.data.map((item) => {
          let arr = [];
          const { custProductRecordList } = item;
          if (!custProductRecordList) return "";
          custProductRecordList.map((child) => {
            arr.push(child.productName);
          });
          item.custProductRecordList = arr.toString().replace(/\,/g, " / ");
        });
        this.tableData = res.data;

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