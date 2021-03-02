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
          @change="getList()"
          @clear="getList()"
        ></el-input>
        <div
          v-for="item in customTypeBtn"
          :key="item.id"
          :class="{ plainBtn: true, plainBtn_primary: customTypeId == item.id }"
          @click="customType(item.id)"
        >{{ item.name }}</div>
      </div>
    </div>
    <el-table
      ref="filterTable"
      border
      :data="tableData"
      style="width: 100%"
      height="470"
      :cell-style="changeCellStyle"
    >
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
      <el-table-column show-overflow-tooltip prop="custProductRecordList" label="推荐产品" width="200"></el-table-column>
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
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="bigDia" :visible.sync="dialogFormVisible" @close="analysisList = [] ">
      <div class="dialogContainer">
        <img src="@/assets/image/close.png" alt @click="dialogFormVisible = false " />
        <div class="container" v-if="analysisList.length">
          <div class="analysisItem" v-for="(item,index) in analysisList" :key="index">
            <div class="time">
              <div class="label">分析时间：</div>
              <span>{{item.analysisTime}}</span>
            </div>
            <div class="time">
              <div class="label">分析结果：</div>
              <span>{{item.analysisContent}}</span>
            </div>
            <div class="time">
              <div class="label">客户标签：</div>
              <span>
                <el-tag size v-for="(child,ind) in item.analysisTagList" :key="ind">{{child}}</el-tag>
              </span>
            </div>
          </div>
        </div>
        <div v-else class="container empty">暂无</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import customTable from "../C/customTable";
import { Message, MessageBox } from "@/utils/importFile";
import {
  getCustomList,
  getOneAnalyHistory,
  isUpdata,
  getNewHisList,
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
    // this.isUpdata();
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
          item.flag =
            new Date().getTime() - new Date(item.createTime).getTime() >
            86400000;
        });
        this.tableData = res.rows;
      } catch (error) {
        console.log(error);
      }
    },
    // 判断是否更新
    // async isUpdata() {
    //   try {
    //     const res = await isUpdata();
    //     if (res.code !== 200) return Message.error(res.msg);
    //     console.log(res);
    //     if (res.data > 0) {
    //       // 弹框
    //       MessageBox.confirm("列表已更新，是否刷新列表", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning",
    //       })
    //         .then(() => {
    //           // Message.success("刷新成功");
    //           this.getNewHisList();
    //         })
    //         .catch(() => {
    //           Message.info("已取消刷新");
    //         });
    //     }
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // // 客户点了更新之后调用的接口
    // async getNewHisList() {
    //   try {
    //     const res = await getNewHisList();
    //     if (res.code !== 200) return Message.error(res.msg);
    //     this.getList();
    //     // console.log(res);
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
        let color = row.row.recordStatus == "1" ? "#FFA400" : "#18B979"; //橙 绿
        return `color: ${color}`; // 修改的样式
      } else {
        return "";
      }
    },
  },
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
  .empty {
    margin-top: 130px;
  }
}
</style>
<style lang="less">
.analysisHistory .el-input__suffix {
  height: auto;
}
</style>
