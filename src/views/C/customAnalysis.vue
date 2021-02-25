<template>
  <div class="customAnalysis">
    <div class="btnContainer">
      <div class="left"></div>
      <div class="right">
        <el-input placeholder="请输入客户姓名" size="mini" v-model="keyWord" clearable></el-input>
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
import {
  getCustomList,
  getCustomDetail,
  getDictList,
  addCustom,
  editCustom,
} from "@/api/customApi";
export default {
  components: {
    customTable,
  },
  data() {
    return {
      keyWord: "",
      tableData: [],
      multipleSelection: [], //多选结果
    };
  },
  mounted() {
    this.getList();
    // this.getDictList();
  },
  methods: {
    async getList() {
      let param = this.keyWord ? { param: this.keyWord } : {};
      try {
        const res = await getCustomList(param);
        if (res.code !== 200) return Message.error(res.msg);
        res.rows.map((item) => {
          let arr = [];
          const { custProductRecordList } = item;
          if (!custProductRecordList) return "";
          custProductRecordList.map((child) => {
            arr.push(child.productName);
          });
          item.custProductRecordList = arr.toString().replace(/\,/g, " / ");
        });
        this.tableData = res.rows;
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
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => {
        return item.id;
      });
    },
    toAnalysisResoult() {
      if (!this.multipleSelection.length) {
        Message.error("请先选择要分析的客户");
        return false;
      }
      this.$router.push({
        path: "/analysisResoult",
        name: "analysisResoult",
        params: { nos: this.multipleSelection },
      });
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