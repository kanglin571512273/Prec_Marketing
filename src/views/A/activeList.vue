<template>
  <div class="activeList">
    <div class="btnContainer">
      <div class="left">
        <div class="sureBtn" @click="$router.back()">返回</div>
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
    <el-table ref="filterTable" border :data="tableData" style="width: 100%" height="470">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custNo" label="客户号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custName" label="客户姓名">
        <template slot-scope="scope">
          <div class="customName" @click="customDetail(scope.row)">
            <span>{{scope.row.custName}}</span>
            <img v-if="!scope.row.flag" src="@/assets/image/newPeople.png" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="telNo" label="联系电话"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custType" label="客户类别" width="70">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.custType == '0' ? '分配客户' : scope.row.custType == '1' ? '私有客户' : scope.row.custType == '2' ? '共有客户' :'所有客户' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="custManagerName" label="客户经理"></el-table-column>
      <el-table-column show-overflow-tooltip prop="status" label="状态" v-if="customTypeId !== 0">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.status == '1' ? '有意向' : scope.row.status == '2' ? '已拒绝' : scope.row.status == '3' ? '办理成功' :'未跟进' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="customTypeId !== 3">
        <template slot-scope="scope">
          <div v-show="customTypeId === 0" class="sureBtn" @click="followUp(scope.row)">跟进</div>
          <div
            v-show="[1,2].includes(customTypeId)"
            class="myBtn myBtn_warning"
            @click="continueFollowUp(scope.row)"
          >继续跟进</div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="smallDia" title="aaas" :visible.sync="dialogFormVisible" @close="resetForm">
      <div class="selectContainer">
        <div class="header">
          <div class="item">办理成功</div>
          <div class="item">有意向</div>
          <div class="item">已拒绝</div>
        </div>
        <div class="body">
          <div class="item">
            <i
              :class="{'el-icon-circle-check':true ,'check':true, 'activationcheck':status == 3}"
              @click="status = 3"
            ></i>
          </div>
          <div class="item">
            <i
              :class="{'el-icon-circle-check':true ,'check':true, 'activationcheck':status == 1}"
              @click="status = 1"
            ></i>
          </div>
          <div class="item">
            <i
              :class="{'el-icon-circle-check':true ,'check':true, 'activationcheck':status == 2}"
              @click="status = 2"
            ></i>
          </div>
        </div>
        <div class="footer">
          <div class="sureBtn" @click="submit">确定</div>
          <div class="cancelBtn" @click="resetForm">取消</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getActiveCusList, followUp, continueFollowUp } from "@/api/customApi";
import { Message, MessageBox } from "@/utils/importFile";
export default {
  data() {
    return {
      dialogFormVisible: false,
      customTypeId: 0,
      customTypeBtn: [
        { id: 0, name: "推荐列表" },
        { id: 1, name: "有意向" },
        { id: 3, name: "办理成功" },
        { id: 2, name: "已拒绝" },
      ],
      currentId: null,
      status: 0,
      keyWord: "",
      tableData: [],
    };
  },
  mounted() {
    let id = this.$route.params.id;
    if (!id) {
      this.$router.replace("/marketActive");
    }
    this.getList(id);
  },
  methods: {
    async getList(id) {
      try {
        const res = await getActiveCusList({
          actId: id || this.$route.params.id,
          status: this.customTypeId,
          custName: this.keyWord,
        });
        if (res.code !== 200) return Message.error(res.msg);
        res.data.map((item) => {
          item.flag =
            new Date().getTime() - new Date(item.createTime).getTime() >
            86400000;
        });
        this.tableData = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    customType(ind) {
      this.customTypeId = ind;
      // console.log(ind);
      this.getList();
    },
    // 跟进
    followUp(row) {
      this.currentId = row.id;
      this.dialogFormVisible = true;
    },
    // 继续跟进
    async continueFollowUp(row) {
      this.currentId = row.id;
      this.status = this.customTypeId;
      this.dialogFormVisible = true;
    },
    async submit() {
      try {
        const res = await continueFollowUp({
          id: this.currentId,
          status: this.status,
        });
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("跟进成功！");
        this.dialogFormVisible = false;
        console.log(res);
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },

    // 关闭dialog
    resetForm() {
      this.status = 0;
      this.currentId = null;
      this.dialogFormVisible = false;
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
  .check {
    font-size: 35px;
  }
  .activationcheck {
    color: #0060ff;
  }
  .selectContainer {
    border-top: 1px solid #ccc;
    .body,
    .header {
      border-left: 1px solid #ccc;
      display: flex;
      justify-content: space-around;
    }
    .item {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .footer {
      padding-top: 30px;
    }
  }
}
</style>
<style lang="less">
.activeList .el-input__suffix {
  height: auto;
}
</style>