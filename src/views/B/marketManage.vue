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
              <span class="card-bot">{{ customers.allCount }}</span>
            </li>
            <li class="card-li">
              <div class="card-font">
                <span class="round color-1"></span>
                <span>新增客户</span>
              </div>
              <span class="card-bot">{{ customers.addCount }}</span>
            </li>
            <li class="card-li">
              <div class="card-font">
                <span class="round color-2"></span>
                <span>待跟进</span>
              </div>
              <span class="color-bot">{{ customers.followupCount }}</span>
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
              prop="custNo"
              label="客户号"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="custName"
              label="客户姓名"
            >
              <template slot-scope="scope">
                <div class="customName" @click="customDetail(scope.row)">
                  <span>{{ scope.row.custName }}</span>
                  <img src="@/assets/image/newPeople.png" alt />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="telNo"
              label="联系电话"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="custProductRecordList"
              label="推荐产品"
            ></el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="custType"
              label="客户类别"
            >
              <template slot-scope="scope">
                <div>
                  <span>{{
                    scope.row.custType == "0"
                      ? "分配客户"
                      : scope.row.custType == "1"
                      ? "私有客户"
                      : scope.row.custType == "2"
                      ? "共有客户"
                      : "所有客户"
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="address" label="操作">
              <template slot-scope="scope">
                <!-- <div
                  :class="
                    row.followUpStatus === '已跟进' ? 'orangeBtn' : 'blueBtn'
                  "
                  shape="round"
                  @click="followUp(row)"
                  size="large"
                >
                  {{ row.followUpStatus === "已跟进" ? "继续跟进" : "跟进" }}
                </div> -->
                <div class="sureBtn" @click="followUp(scope.row)">
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
        <el-dialog :visible.sync="dialogFormVisible">
          <div class="close" @click="close"></div>
          <Panorama :datas="name"></Panorama>
          <!-- <dialogForm :data="ruleForm" ref="childRef" @closeDia="dialogFormVisible = false"></dialogForm> -->
        </el-dialog>
        <el-dialog :visible.sync="dialogFormVisible1">
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
import {
  getDictList,
  getCustomList,
  getTodayHappen,
  getDailyOverview,
  getProductDistribution
} from "@/api/marketing";
export default {
  components: {
    Panorama,
    followUpFeedback
  },
  data() {
    return {
      isCusAnalysis: false,
      loading: true,
      productType: 1,
      customTypeId: 0,
      currentBtn: 0,
      active: 0,
      username: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      name: { id: 1245 },
      customers: {},
      barr: ["信用卡", "贷款", "理财"],
      btnArr: ["所有客户", "分配客户", "私有客户"],
      tableData: [],
      overview: {}
    };
  },
  mounted() {
    this.getList();
    // this.getDictList();
    this.getTodayHappen(this.productType);
    this.getDailyOverview(this.productType);
    this.getProductDistribution(this.productType);
  },
  methods: {
    async getList() {
      let type = this.customTypeId === 0 ? {} : { type: this.customTypeId };
      let param = this.username ? { param: this.username } : {};
      console.log(Object.assign(type, param));
      try {
        const res = await getCustomList(Object.assign(type, param));
        if (res.code !== 200) return Message.error(res.msg);
        res.rows.map(item => {
          let arr = [];
          const { custProductRecordList } = item;
          if (!custProductRecordList) return "";
          custProductRecordList.map(child => {
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
      let optionKeys = Object.keys(this.options);
      for (let i = 0; i < optionKeys.length; i++) {
        let res = await getDictList(optionKeys[i]);
        if (res.code !== 200) return Message.error(res.msg);
        this.options[optionKeys[i]] = res.data.map(item => {
          return { dictLabel: item.dictLabel, dictValue: item.dictValue };
        });
      }
    },
    // 获取今日情况
    async getTodayHappen(productType) {
      try {
        const res = await getTodayHappen({ productType: productType });
        if (res.code == 200) {
          this.customers = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取每日概况
    async getDailyOverview(productType) {
      try {
        const res = await getDailyOverview({ productType: productType });
        if (res.code == 200) {
          console.log(res);
          this.overview = res.data;
          this.overviewCharts(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取查看意向产品分布
    async getProductDistribution(productType) {
      try {
        const res = await getProductDistribution({ productType: productType });
        if (res.code == 200) {
          this.productsCharts(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    overviewCharts(overview) {
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
          data: overview.name,
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
            name: "总客户数",
            type: "line",
            stack: "人",
            data: overview.allValue
          },
          {
            name: "新增客户数",
            type: "line",
            stack: "人",
            data: overview.addValue
          }
        ]
      });
    },
    productsCharts(distribution) {
      var myChart = echarts.init(this.$refs.productscharts);
      var newArray = distribution.map(function(i) {
        return i.name;
      });
      console.log(newArray);
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
            data: distribution
          }
        ]
      });
    },
    botactive(index) {
      this.active = index;
      switch (index) {
        case 0:
          this.getTodayHappen(1);
          this.getDailyOverview(1);
          this.getProductDistribution(1);
          break;
        case 1:
          this.getTodayHappen(2);
          this.getDailyOverview(1);
          this.getProductDistribution(1);
          break;
        default:
          this.getTodayHappen(3);
          this.getDailyOverview(3);
          this.getProductDistribution(3);
      }
    },
    // 按钮切换
    filterDataBtn(index) {
      this.currentBtn = index;
      this.customTypeId = index;
      this.getList();
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
