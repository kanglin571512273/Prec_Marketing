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
        <el-input
          placeholder="请输入客户姓名"
          size="mini"
          v-model="keyWord"
          clearable
          @change="getList()"
          @clear="getList()"
        ></el-input>
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
      <dialogForm
        :data="ruleForm"
        ref="childRef"
        :options="options"
        @closeDia="dialogFormVisible = false"
        @addCustom="addCustom"
      ></dialogForm>
    </el-dialog>
  </div>
</template>

<script>
import customTable from "./customTable";
import dialogForm from "./dialogForm";
import { Message } from "@/utils/importFile";
import {
  getCustomList,
  getCustomDetail,
  getDictList,
  addCustom,
  editCustom,
} from "@/api/customApi";
export default {
  components: { customTable, dialogForm },
  data() {
    return {
      addOrEdit: "add",
      keyWord: "",
      customTypeId: 999,
      customTypeBtn: [
        { id: 999, name: "所有客户" },
        { id: 0, name: "分配客户" },
        { id: 1, name: "私有客户" },
      ],
      options: {
        sys_user_sex: [],
        id_card_type: [],
        edu_level: [],
        housing_loan: [],
        individual_loan: [],
        credit_situation: [],
        time_deposit: [],
        marriage: [],
      },
      tableData: [],
      dialogFormVisible: false,
      ruleForm: {},
    };
  },
  mounted() {
    this.getList();
    this.getDictList();
  },
  methods: {
    async getList() {
      let type = this.customTypeId > 5 ? {} : { type: this.customTypeId };
      let param = this.keyWord ? { param: this.keyWord } : {};
      try {
        const res = await getCustomList(Object.assign(type, param));
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
    // 获取字典类型
    async getDictList() {
      /* 
      性别：sys_user_sex           X
      证件类型： id_card_type
      婚姻状况： marriage           X
      教育情况： edu_level
      是否私有客户： cust_type
      住房贷款： housing_loan
      个人贷款： individual_loan
      信用情况： credit_situation
      定期存款： time_deposit
      */
      let optionKeys = Object.keys(this.options);
      for (let i = 0; i < optionKeys.length; i++) {
        let res = await getDictList(optionKeys[i]);
        if (res.code !== 200) return Message.error(res.msg);
        this.options[optionKeys[i]] = res.data.map((item) => {
          return { dictLabel: item.dictLabel, dictValue: item.dictValue };
        });
      }
    },
    // 新增  /  编辑 客户
    async addCustom() {
      try {
        if (this.addOrEdit == "add") {
          const res = await addCustom(this.ruleForm);
          if (res.code !== 200) Message.error(res.msg);
          Message.success("添加成功");
        } else {
          const res = await editCustom(this.ruleForm);
          if (res.code !== 200) Message.error(res.msg);
          Message.success("修改成功");
        }
        this.dialogFormVisible = false;
        this.ruleForm = {};
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 编辑 获取用户详情
    async edit(row) {
      this.addOrEdit = "edit";
      this.dialogFormVisible = true;
      try {
        const res = await getCustomDetail(row.id);
        if (res.code !== 200) Message.error(res.msg);
        this.ruleForm = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 搜索
    search() {
      this.getList();
    },
    // 切换客户类型
    customType(ind) {
      this.customTypeId = ind;
      this.getList();
    },
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
    },
    resetForm() {
      this.$refs.childRef.resetForm();
      this.addOrEdit = "add";
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
    .left {
      // padding-top: 13px;
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
}
</style>
<style lang="less">
.customManage .el-input__suffix {
  height: auto;
}
</style>