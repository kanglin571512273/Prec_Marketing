<template>
  <div class="marketActive">
    <div class="left"></div>
    <div class="right">
      <div class="card-box">
        <div class="card">
          <div class="card-title">今日情况</div>
          <ul class="card-ul">
            <li class="card-li">
              <div class="card-font">
                <span class="round"></span>
                <span>总客户数</span>
              </div>
              <span class="card-bot">{{ customers.total }}</span>
            </li>
            <li class="card-li">
              <div class="card-font">
                <span class="round color-1"></span>
                <span>新增客户</span>
              </div>
              <span class="card-bot">{{ customers.new }}</span>
            </li>
            <li class="card-li">
              <div class="card-font">
                <span class="round color-2"></span>
                <span>待跟进</span>
              </div>
              <span class="color-bot">{{ customers.followed }}</span>
            </li>
          </ul>
        </div>
        <div class="card card-item">
          <div class="card-title">每日概览</div>
          <div id="container"></div>
        </div>
        <div class="card">
          <div class="card-title">意向产品分布</div>
          <div id="charts"></div>
        </div>
      </div>
      <div class="teable-box">
        <div class="teable-conter">
          <div class="teable-font">客户列表</div>
          <div class="right" v-show="!isCusAnalysis">
            <div
              class="plainBtn"
              v-for="(item, index) in btnArr"
              :key="index"
              :class="currentBtn == index ? 'activeBtn' : ''"
              @click="filterDataBtn(index)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="labelManage">
          <el-table
            ref="filterTable"
            border
            :data="tableData"
            style="width: 100%"
          >
            <!-- <el-table-column type="selection" width="30"></el-table-column> -->
            <el-table-column
              type="index"
              label="序号"
              width="70"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name"
              label="客户号"
            ></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="客户姓名">
              <template slot-scope="scope">
                <div class="customName" @click="customDetail(scope.row)">
                  <span>{{ scope.row.name }}</span>
                  <img src="@/assets/image/newPeople.png" alt />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name"
              label="联系电话"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name"
              label="推荐产品"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name"
              label="客户类别"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="address"
              label="操作"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCusAnalysis: false,
      currentBtn: 0,
      customers: { total: 300, new: 100, followed: 120 },
      customers1: { total: 300, new: 100, followed: 120 },
      customers2: { total: 600, new: 200, followed: 302 },
      btnArr: ["所有客户", "分配客户", "私有客户"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        
        
      ]
    };
  },
  methods: {
    // 按钮切换
    filterDataBtn(index) {
      this.currentBtn = index;
      // let data = JSON.parse(localStorage.getItem("customData"));
      // if (index) {
      //   this.resdata = data.filter(item => {
      //     return item.customerType == index;
      //   });
      //   return;
      // }
      // this.resdata = data;
    },
    // 点击客户姓名
    customDetail(row) {
      console.log(row);
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    }
  }
};
</script>

<style lang="less" scoped>
.card-box {
  display: flex;
  margin-bottom: 20px;
  .card {
    width: 300px;
    height: 165px;
    background: #fff;
    border-radius: 10px;
    padding: 0 15px;
    .card-title {
      font-weight: 700;
      color: #666666;
      line-height: 15px;
      font-size: 12px;
      text-align: left;
      margin-top: 5px;
    }
  }
  .card-item {
    flex: 1;
    margin: 0 15px;
  }
}
.teable-box {
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 96, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
}
.round {
  display: block;
  width: 12px;
  height: 12px;
  background: #0052ff;
  border-radius: 50%;
  margin-right: 5px;
}
.card-li {
  display: flex;
  justify-content: space-between;
}
.card-ul {
  margin-top: 27px;
}
.card-font {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #666666;
}
.card-bot {
  font-size: 14px;
  font-weight: bold;
  color: #666666;
}
.color-1 {
  background: #73deb3;
}
.color-2 {
  background: #ff6d3f;
}
.color-bot {
  font-size: 30px;
  font-weight: bold;
  color: #ffa400;
  line-height: 35px;
}
.card-li:nth-child(2) {
  margin: 12px 0 7px 0;
}
.teable-conter {
  height: 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .teable-font {
    font-size: 12px;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.teabox {
  width: 100px;
  height: 43px;
  line-height: 43px;
  border-radius: 30px;
  border: 1px solid #ccc;
  font-size: 22px;
}
.plainBtn:nth-child(2) {
  margin: 0 20px;
}
.activeBtn {
  border: 1px solid #0060ff;
  color: #0060ff;
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
</style>
