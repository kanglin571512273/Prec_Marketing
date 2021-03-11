<template>
  <div class="activeList">
    <loading :loading="loading"></loading>
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
          @change="getList(null,true)"
          @clear="getList(null,true)"
        ></el-input>
        <div class="sureBtn" @click="getList(null,true)">搜索</div>
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
      <el-table-column prop="custName" label="客户姓名">
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
            <span>{{scope.row.custType == '0' ? '分配客户' : scope.row.custType == '1' ? '私有客户' : scope.row.custType == '2' ? '公有客户' :'' }}</span>
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
    <el-dialog
      class="smallDia"
      :title="diaTitle"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
    >
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
import { getActiveCusList, continueFollowUp } from "@/api/customApi";
import loading from "@/components/loading";
import { Message } from "@/utils/importFile";
export default {
  components: { loading },
  data() {
    return {
      diaTitle: null,
      pages: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
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
      ribaoScroll: false,
      loading: false,
    };
  },
  mounted() {
    let id = this.$route.params.id;
    if (!id) {
      this.$router.replace("/marketActive");
    }
    this.getList(id);
    this.loadMore("filterTable", () => {
      this.pages.pageNum++;
      this.getList();
    });
  },
  methods: {
    async getList(id, flag = false) {
      this.loading = true;
      try {
        const res = await getActiveCusList({
          actId: id || this.$route.params.id,
          status: this.customTypeId,
          pageNum: this.pages.pageNum,
          pageSize: this.pages.pageSize,
          custName: this.keyWord,
        });
        if (res.code !== 200) {
          this.loading = false;
          return Message.error(res.msg);
        }
        res.rows.map((item) => {
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
        // this.loading = false;
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
    // 点击表格上面的按钮
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
    // 跟进
    followUp(row) {
      this.currentId = row.id;
      this.dialogFormVisible = true;
      this.diaTitle = row.custName;
    },
    // 继续跟进
    async continueFollowUp(row) {
      this.currentId = row.id;
      this.status = this.customTypeId;
      this.dialogFormVisible = true;
      this.diaTitle = row.custName;
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
        // console.log(res);
        this.pages.pageNum = 1;
        this.getList(null, true);
      } catch (error) {
        console.log(error);
      }
    },
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
      this.$router.push({
        name: "Panorama",
        params: {
          id: row.custId,
          custNo: row.custNo,
        },
      });
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