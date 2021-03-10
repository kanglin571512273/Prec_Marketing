<template>
  <div class="customManage">
    <loading :loading="loading"></loading>
    <div class="btnContainer" v-show="checkAble == 1">
      <div class="left">
        <div class="plainBtn plainBtn_primary myBtn_primary" @click="dialogFormVisible = true">新增客户</div>
        <div class="plainBtn plainBtn_primary myBtn_primary" @click="checkAble = 2">客户分析</div>
        <!-- @click="$router.push('/customAnalysis')" -->
      </div>
      <div class="right">
        <el-input
          placeholder="请输入客户姓名"
          size="mini"
          v-model="keyWord"
          clearable
          @change="getList(true)"
          @clear="getList(true)"
        ></el-input>
        <div class="sureBtn" @click="getList(true)">搜索</div>
        <div
          v-for="item in customTypeBtn"
          :key="item.id"
          :class="{plainBtn:true, plainBtn_primary:customTypeId == item.id}"
          @click="customType(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="btnContainer" v-show="checkAble == 2">
      <div class="left"></div>
      <div class="right">
        <el-input
          placeholder="请输入客户姓名"
          size="mini"
          v-model="keyWord"
          clearable
          @change="getList(true)"
          @clear="getList(true)"
        ></el-input>
        <div class="sureBtn" @click="getList(null,true)">搜索</div>

        <div class="sureBtn" @click="toAnalysisResoult">确认</div>
        <div class="cancelBtn" @click="cancle">取消</div>
      </div>
    </div>
    <div class="btnContainer" v-show="checkAble == 3">
      <div class="left">
        <div class="sureBtn" @click="reback">返回</div>
      </div>
      <div class="right"></div>
    </div>
    <!--  table -->
    <customTable
      ref="fatherTable"
      :data="tableData"
      :checkAble="checkAble"
      :pages="pages"
      @edit="edit"
      @customDetail="customDetail"
      @handleSelectionChange="handleSelectionChange"
    ></customTable>
    <!-- 添加客户 -->
    <el-dialog class="bigDia" :visible.sync="dialogFormVisible" @close="resetForm">
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
import loading from "@/components/loading";
import dialogForm from "./dialogForm";
import { Message } from "@/utils/importFile";
import {
  getCustomList,
  getCustomDetail,
  getDictList,
  addCustom,
  editCustom,
  analysisCustomByIds,
  analysisCustom,
} from "@/api/customApi";
export default {
  components: { customTable, dialogForm, loading },
  data() {
    return {
      pages: {
        pageSize: 20,
        pageNum: 1,
        total: 0,
      },
      loading: false,
      checkAble: 1,
      multipleSelection: [], //多选结果
      tempMultipleSelection: [],
      addOrEdit: "add",
      keyWord: "",
      customTypeId: 999,
      customTypeBtn: [
        { id: 999, name: "所有客户" },
        { id: 0, name: "分配客户" },
        { id: 1, name: "私有客户" },
      ],
      options: {},
      tableData: [],
      dialogFormVisible: false,
      ruleForm: {},
    };
  },
  mounted() {
    this.getList();
    this.getDictList();
    // 分页加载
    this.$refs.fatherTable.loadMore("filterTable", () => {
      this.pages.pageNum++;
      this.getList();
    });
  },
  methods: {
    async getList(flag = false) {
      let type = this.customTypeId > 5 ? {} : { type: this.customTypeId };
      let param = this.keyWord ? { param: this.keyWord } : {};
      this.loading = true;
      try {
        const res = await getCustomList(
          Object.assign(type, param, {
            pageNum: this.pages.pageNum,
            pageSize: this.pages.pageSize,
          })
        );
        if (res.code !== 200) {
          this.loading = false;
          return Message.error(res.msg);
        }
        // 推荐列表 处理
        res.rows.map((item) => {
          let arr = [];
          const { custProductRecordList } = item;
          if (!custProductRecordList) return "";
          custProductRecordList.map((child) => {
            arr.push(child.productName);
          });
          item.custProductRecordList = arr.toString().replace(/\,/g, " / ");
          item.flag =
            new Date().getTime() - new Date(item.createTime).getTime() >
            86400000;
        });
        this.loading = false;
        if (flag) {
          this.tableData = res.rows;
        } else {
          this.tableData.push(...res.rows);
        }
        this.pages.total = res.total;
      } catch (error) {
        console.log(error);
      }
    },

    // 发起分析
    async analysisCustom() {
      this.loading = true;
      // 添加加载样式
      try {
        let multipleSelection =
          this.multipleSelection.toString() ||
          this.tempMultipleSelection.toString();
        console.log(multipleSelection);
        const res = await analysisCustom(multipleSelection);
        if (res.code !== 200) return Message.error(res.msg);
        this.analysisCustomByIds(multipleSelection);
        this.checkAble = 3;
        // this.loading = false;
        // Message.success(res.msg);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取分析历史
    async analysisCustomByIds(multipleSelection) {
      this.loading = true;
      try {
        const res = await analysisCustomByIds(multipleSelection);
        if (res.code !== 200) return Message.error(res.msg);
        res.data.map((item) => {
          let arr = [];
          const { custProductRecordList } = item;
          if (!custProductRecordList) return "";
          custProductRecordList.map((child) => {
            arr.push(child.productName);
          });
          item.custProductRecordList = arr.toString().replace(/\,/g, " / ");
          item.flag =
            new Date().getTime() - new Date(item.createTime).getTime() >
            86400000;
        });
        this.loading = false;
        this.tableData = res.data;
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

      let arr = [
        "sys_user_sex",
        "id_card_type",
        "edu_level",
        "housing_loan",
        "individual_loan",
        "credit_situation",
        "time_deposit",
        "marriage",
      ];
      let option = arr.toString();
      let res = await getDictList(option);
      if (res.code !== 200) return Message.error(res.msg);
      this.options = res.data;
    },
    // 新增  /  编辑 客户
    async addCustom() {
      try {
        const { isPrivate, custType } = this.ruleForm;
        if (this.addOrEdit == "add") {
          //添加
          this.ruleForm.custType = isPrivate;
          const res = await addCustom(this.ruleForm);
          if (res.code !== 200) return Message.error(res.msg);
          this.dialogFormVisible = false;
          Message.success("添加成功");
        } else {
          // 编辑
          if (isPrivate !== "1" && custType !== "1") {
            this.ruleForm.custType = custType;
          } else if (isPrivate !== "1" && custType == "1") {
            this.ruleForm.custType = "2";
          } else {
            this.ruleForm.custType = "1";
          }
          const res = await editCustom(this.ruleForm);
          if (res.code !== 200) return Message.error(res.msg);
          this.dialogFormVisible = false;
          Message.success("修改成功");
          if (this.checkAble === 3) {
            this.dialogFormVisible = false;
            this.ruleForm = {};
            this.analysisCustom();
            return false;
          }
        }
        this.ruleForm = {};
        this.getList(true);
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
        if (res.code !== 200) return Message.error(res.msg);
        res.data.isPrivate = res.data.custType == "1" ? "1" : "2";
        this.ruleForm = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => {
        return item.custNo;
      });
      if (this.multipleSelection.length) {
        this.tempMultipleSelection = this.multipleSelection;
      }
    },
    toAnalysisResoult() {
      if (!this.multipleSelection.length) {
        Message.error("请先选择要分析的客户");
        return false;
      }
      this.pages = {
        pageSize: 20,
        pageNum: 1,
      };
      this.tableData = [];
      // 发起分析
      this.analysisCustom();
      // this.analysisCustomByIds();
      // this.$router.push({
      //   path: "/analysisResoult",
      //   name: "analysisResoult",
      //   params: { nos: this.multipleSelection },
      // });
    },
    // 取消
    cancle() {
      this.$refs.fatherTable.cancle();
      this.checkAble = 1;
    },
    // 返回
    reback() {
      this.checkAble = 1;
      this.getList(true);
    },
    // 切换客户类型
    customType(ind) {
      this.tableData = [];
      this.customTypeId = ind;
      this.pages = {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      };
      this.getList();
    },
    // 点击客户姓名
    customDetail(row) {
      this.$router.push({
        name: "Panorama",
        params: {
          id: row.id,
          custNo: row.custNo,
        },
      });
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
  box-sizing: border-box;
  overflow: hidden;
  .btnContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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