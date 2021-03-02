<template>
  <div class="marketActive">
    <div class="left">
      <div class="headBt">
        <a
          class="fatBtn"
          @click="botactive(index)"
          :class="{ fatBtn_primary: active == index }"
          v-for="(item, index) in barr"
          :key="index"
          >{{ item }}</a
        >
      </div>
    </div>
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
          <div ref="container" id="container"></div>
        </div>
        <div class="card">
          <div class="card-title">意向产品分布</div>
          <div ref="productscharts" id="productscharts"></div>
        </div>
      </div>
      <div class="teable-box">
        <div class="teable-conter">
          <div class="teable-font">客户列表</div>

          <div class="right" v-show="!isCusAnalysis">
            <el-input
              placeholder="请输入内容"
              size="mini"
              v-model="username"
              clearable
            >
            </el-input>
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
            height="290"
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
            <el-table-column show-overflow-tooltip prop="address" label="操作">
              <template slot-scope="scope">
                <div
                  v-show="customTypeId === 1"
                  class="sureBtn"
                  @click="followUp(scope.row)"
                >
                  跟进
                </div>
                <div
                  v-show="[2, 4].includes(customTypeId)"
                  class="myBtn myBtn_warning"
                >
                  继续跟进
                </div> </template
              >a</el-table-column
            >
          </el-table>
        </div>
        <el-dialog class="bigDia" :visible.sync="dialogFormVisible">
          <div class="close" @click="close"></div>
          <Panorama :datas="name"></Panorama>
          <!-- <dialogForm :data="ruleForm" ref="childRef" @closeDia="dialogFormVisible = false"></dialogForm> -->
        </el-dialog>
        <el-dialog class="bigDia" :visible.sync="dialogFormVisible1">
          <div class="close" @click="close1"></div>
          <followUpFeedback
            @closeModel="dialogFormVisible1 = false"
          ></followUpFeedback>
          <!-- <dialogForm :data="ruleForm" ref="childRef" @closeDia="dialogFormVisible = false"></dialogForm> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
  PieChart
]);
import Panorama from "@/components/Panorama.vue";
import followUpFeedback from "@/components/followUpFeedback.vue";
export default {
  components: {
    Panorama,
    followUpFeedback
  },
  data() {
    return {
      isCusAnalysis: false,
      customTypeId: 1,
      currentBtn: 0,
      active: 0,
      username: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      name: { id: 1 },
      customers: { total: 300, new: 100, followed: 120 },
      customers1: { total: 300, new: 100, followed: 120 },
      customers2: { total: 600, new: 200, followed: 302 },
      barr: ["信用卡", "贷款", "理财"],
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
        }
      ]
    };
  },
  mounted() {
    this.overviewCharts();
    this.productsCharts();
  },
  methods: {
    overviewCharts() {
      var myChart = echarts.init(this.$refs.container);
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   x:"center",
        //   y:'%',
        //   data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        // },
        grid: {
          top: "4%",
          left: "0%",
          right: "3%",
          bottom: "20%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 8 //更改坐标轴文字大小
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 8 //更改坐标轴文字大小
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      });
    },
    productsCharts() {
      var myChart = echarts.init(this.$refs.productscharts);
      myChart.setOption({
        tooltip: {
          trigger: "item"
        },

        legend: {
          // orient: "vertical",
          // left: "2%", //图例距离左的距离
          // x: "center", //图例上下居中
          data: ["搜索引擎", "直接访问", "邮件营销", "联盟广告", "视频广告"],
          itemWidth: 10, // 设置大小
          itemHeight: 10,
          itemGap: 10, // 设置间距,
          right: "right"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "80%"],
            center: ["33%", "42%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" }
            ]
          }
        ]
      });
    },
    botactive(index) {
      this.active = index;
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        default:
      }
    },
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
      this.dialogFormVisible = true;
      console.log(row);
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    close() {
      this.dialogFormVisible = false;
    },
    close1() {
      this.dialogFormVisible1 = false;
    },
    followUp(row) {
      console.log(row);
      this.dialogFormVisible1 = true;
    }
  }
};
</script>

<style lang="less" scoped>
.marketActive {
  width: 100%;
  display: flex;
  .left {
    width: 9%;
  }
  .right {
    flex: 1;
  }
}
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
      margin-top: 10px;
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
  padding: 0 10px;
  height: 410px;
}
.round {
  display: block;
  width: 6px;
  height: 6px;
  background: #0052ff;
  border-radius: 50%;
  margin-right: 5px;
}
.card-li {
  display: flex;
  justify-content: space-between;
}
.card-ul {
  margin-top: 20px;
}
.card-font {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
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
  margin: 20px 0 15px 0;
}
.teable-conter {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .teable-font {
    font-size: 12px;
    font-weight: bold;
    color: #666;
  }
  .right {
    height: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-input {
      width: 20%;
    }
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
.plainBtn {
  margin-left: 20px;
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
.headBt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .fatBtn {
    margin: 0px 15px 15px 0;
  }
}
#container {
  height: 100%;
  width: 100%;
}
#productscharts {
  height: 100%;
  width: 100%;
}
.close {
  width: 25px;
  height: 25px;
  background: url(../../assets/image/close.png) no-repeat 100% 100%;
  background-size: 100%;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

<style>
/* .el-tooltip {
} */
.el-button > span {
  font-weight: bold;
}
</style>
