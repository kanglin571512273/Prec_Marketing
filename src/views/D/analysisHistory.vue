<template>
  <div class="analysisHistory">
    <div class="btnContainer">
      <div class="left"></div>
      <div class="right">
        <el-input
          placeholder="请输入客户姓名"
          size="mini"
          v-model="keyWord"
          clearable
        ></el-input>
        <div
          v-for="item in customTypeBtn"
          :key="item.id"
          :class="{ plainBtn: true, plainBtn_primary: customTypeId == item.id }"
          @click="customType(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <el-table
      ref="filterTable"
      border
      :data="tableData"
      style="width: 100%"
      :cell-style="changeCellStyle"
      height="470"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custNo" label="客户号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custName" label="客户姓名">
        <template slot-scope="scope">
          <div class="customName" @click="customDetail(scope.row)">
            <span>{{scope.row.custName}}</span>
            <img v-if="scope.row.followUpTimes" src="@/assets/image/newPeople.png" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="telNo" label="联系电话"></el-table-column>
      <el-table-column prop="custProductRecordList" label="推荐产品" width="200"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custType" label="客户类别">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.custType == '0' ? '分配客户' : scope.row.custType == '1' ? '私有客户' : scope.row.custType == '2' ? '共有客户' :'所有客户' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="recordTime" label="分析时间"></el-table-column>
      <el-table-column show-overflow-tooltip label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-view"
            round
            size="mini"
            @click="edit(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" @close="analysisList = [] ">
      <div class="dialogContainer">
        <img src="@/assets/image/close.png" alt @click="dialogFormVisible = false " />
        <div class="analysisItem" v-for="item in analysisList" :key="item">
          <div class="time">
            <div class="label">分析时间：</div>
            <span>{{item.analysisTime}}</span>
          </div>
          <div class="time">
            <div class="label">分析结果：</div>
            <span>网易云联名卡/付费卡/爱奇艺信用卡</span>
          </div>
          <div class="time">
            <div class="label">客户标签：</div>
            <span>
              <el-tag size>标签二</el-tag>
              <el-tag size>标签二</el-tag>
            </span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import customTable from "../C/customTable";
import { Message } from "@/utils/importFile";
import {
  getAnalyList,
  getCustomList,
  getOneAnalyHistory,
} from "@/api/customApi";
export default {
  components: { customTable },
  data() {
    return {
      keyWord: "",
      customTypeId: 999,
      customTypeBtn: [
        { id: 999, name: "所有客户" },
        { id: 0, name: "分配客户" },
        { id: 1, name: "私有客户" },
        { id: 2, name: "公有客户" },
      ],
      tableData: [],
      dialogFormVisible: false,
      analysisList: [],
    };
  },
  mounted() {
    this.getList();
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
    // async getList() {
    //   let type = this.customTypeId > 5 ? {} : { type: this.customTypeId };
    //   let param = this.keyWord ? { param: this.keyWord } : {};
    //   try {
    //     const res = await getAnalyList(Object.assign(type, param));
    //     if (res.code !== 200) Message.error(res.msg);
    //     res.rows.map((item) => {
    //       let arr = [];
    //       const { custProductRecordList } = item;
    //       if (!custProductRecordList) return "";
    //       custProductRecordList.map((child) => {
    //         arr.push(child.productName);
    //       });
    //       item.custProductRecordList = arr.toString().replace(/\,/g, " / ");
    //     });
    //     this.tableData = res.rows;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // 切换客户类型
    customType(ind) {
      this.customTypeId = ind;
      this.getList();
    },
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
    },
    // 编辑
    async edit(row) {
      this.dialogFormVisible = true;
      try {
        const res = await getOneAnalyHistory(row.custNo);
        if (res.code !== 200) return Message.error(res.msg);
        this.analysisList = res.rows;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
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
    }
  }
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
  box-sizing: border-box;
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
  .dialogContainer {
    height: 100%;
    overflow: auto;
    // position: relative;
    img {
      width: 25px;
      height: 25px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .analysisItem {
      border-bottom: 1px solid #979797;
      padding: 10px 0;
      .time {
        text-align: left;
        line-height: 40px;
        font-size: 23px;
        color: #666666;
        .label {
          display: inline-block;
        }
        .el-tag {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.analysisHistory .el-input__suffix {
  height: auto;
}
</style>
