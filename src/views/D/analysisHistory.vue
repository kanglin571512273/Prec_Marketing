<template>
  <div class="analysisHistory">
    <loading :loading="loading"></loading>
    <div class="btnContainer">
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
        <div class="sureBtn" @click="getList(true)">搜索</div>
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
      <el-table-column prop="custName" label="客户姓名">
        <template slot-scope="scope">
          <div class="customName" @click="customDetail(scope.row)">
            <span>{{scope.row.custName}}</span>
            <img v-if="!scope.row.flag" src="@/assets/image/newPeople.png" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="telNo" label="联系电话"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custProductRecordList" label="推荐产品" width="200"></el-table-column>
      <el-table-column show-overflow-tooltip prop="custType" label="客户类别"  width="70">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.custType == '0' ? '分配客户' : scope.row.custType == '1' ? '私有客户' : scope.row.custType == '2' ? '共有客户' :'' }}</span>
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
import loading from "@/components/loading";
import { Message } from "@/utils/importFile";
import {
  getCustomList,
  getOneAnalyHistory,
} from "@/api/customApi";
export default {
  components: { customTable, loading },
  data() {
    return {
      pages: {
        pageSize: 20,
        pageNum: 1,
        total: 0,
      },
      keyWord: "",
      customTypeId: 999,
      customTypeBtn: [
        { id: 999, name: "所有客户" },
        { id: 0, name: "分配客户" },
        { id: 1, name: "私有客户" },
        { id: 2, name: "共有客户" },
      ],
      tableData: [],
      dialogFormVisible: false,
      analysisList: [],
      loading: false,
    };
  },
  mounted() {
    // this.isUpdata();
    this.getList();
    this.loadMore("filterTable", () => {
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
    // 下拉获取下一页数据
    loadMore(refName, callback) {
      let box = refName ? this.$refs[refName].bodyWrapper : document.body; //获取监听元素
      box.addEventListener("scroll", () => {
        // 监听滑动
        const scrollTop = box.scrollTop; // 滑动距离
        const scrollHeight = box.scrollHeight; // 滑动高度
        const clientHeight = box.offsetHeight; // 元素视口高度
        if (
          scrollTop + clientHeight >= scrollHeight - 20 &&
          this.pages.pageNum < Math.ceil(this.pages.total / this.pages.pageSize)
        ) {
          callback && callback();
        }
      });
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
        line-height: 30px;
        font-size: 14px;
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
