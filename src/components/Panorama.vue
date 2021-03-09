<template>
  <div class="background-box">
    <el-dialog class="bigDia" :visible.sync="dialogFormVisible">
      <div class="close" @click="close"></div>
      <div class="background">
        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
      </div>
      <div class="Panorama-box">
        <div class="Panorama-left">
          <div>
            <el-drawer
              :visible.sync="visible"
              :direction="direction"
              :before-close="handleClose"
              custom-class="drawerclass"
              size="43%"
              :modal="false"
            >
              <div class="outer-box">
                <div class="outer">
                  <div class="inner">
                    <div class="inerss">
                      <ul
                        class="labelbox"
                        v-for="(item, index) in labelData"
                        :key="index"
                        v-show="item.tagResVoList != null"
                      >
                        <div class="typeName">{{ item.typeName }}：</div>
                        <div class="labelson_box">
                          <li
                            class="labelson"
                            v-for="(i, index) in item.tagResVoList"
                            :key="i.id"
                            @click="active(i, index)"
                            :class="{
                              'labelson-active': labelDatas.indexOf(i.id) > -1
                            }"
                          >
                            {{ i.tagName }}
                          </li>
                        </div>
                      </ul>
                    </div>
                    <div class="button-box">
                      <div class="button-item" @click="onClose">确定</div>
                      <div class="button-item" @click="onClose1">取消</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-drawer>
            <div class="tags-box">
              <div class="tag" v-for="(item, index) in getlabels" :key="index">
                <div class="big">
                  <div class="medium">
                    <div class="small">
                      <span>
                        {{ item.tagName }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="label" @click="showDrawer">增加标签</div>
          </div>
        </div>
        <div class="Panorama-right">
          <div class="label-cont">
            <ul>
              <li
                class="bot-label"
                @click="num = 0"
                :class="{ 'bot-label-active': num == 0 }"
              >
                推荐产品
              </li>
              <li
                class="bot-label"
                @click="num = 1"
                :class="{ 'bot-label-active': num == 1 }"
              >
                客户资料
              </li>
              <li
                class="bot-label"
                @click="num = 2"
                :class="{ 'bot-label-active': num == 2 }"
              >
                本行业务办理
              </li>
              <li
                class="bot-label"
                @click="num = 3"
                :class="{ 'bot-label-active': num == 3 }"
              >
                跟进结果
              </li>
            </ul>
          </div>
          <div class="contentarea" v-show="num == 0">
            <el-table
              ref="filterTable"
              border
              v-loading="loading"
              :data="tableData"
              :row-style="{ height: '10px' }"
              :cell-style="{ padding: '10px 0' }"
              :style="{ width: '100%' }"
              height="290"
            >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="productType"
                label="产品类型"
                :formatter="statusFormat"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="productName"
                label="产品名称"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="updateTime"
                label="最近跟进时间"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="status"
                label="跟进结果"
                :formatter="statusCust"
              ></el-table-column>
            </el-table>
          </div>
          <div class="contentarea" v-show="num == 1">
            <div class="table-box">
              <table class="gridtablse">
                <tr>
                  <th>客户姓名：</th>
                  <td>{{ detail.custName }}</td>
                </tr>
                <tr>
                  <th>教育程度：</th>
                  <td>{{ edu_level }}</td>
                </tr>
                <tr>
                  <th>住房贷款：</th>
                  <td>{{ housing_loan }}</td>
                </tr>
                <tr>
                  <th>账户余额：</th>
                  <td>599</td>
                </tr>
              </table>

              <table class="gridtablse">
                <tr>
                  <th>性别：</th>
                  <td>{{ sex }}</td>
                </tr>
                <tr>
                  <th>婚姻状况:</th>
                  <td>{{ marriage }}</td>
                </tr>
                <tr>
                  <th>个人贷款：</th>
                  <td>{{ individual_loan }}</td>
                </tr>
                <tr>
                  <th>信用情况：</th>
                  <td>{{ credit_situation }}</td>
                </tr>
              </table>

              <table class="gridtablse">
                <tr>
                  <th>身份证号：</th>
                  <td>{{ detail.idCard }}</td>
                </tr>
                <tr>
                  <th>工作单位：</th>
                  <td>{{ detail.workUnit }}</td>
                </tr>
                <tr>
                  <th>定期存款：</th>
                  <td>{{ time_deposit }}</td>
                </tr>
              </table>
            </div>
            <div class="pone-label">
              <span class="pone-span">个人标签：</span>
              <div class="label-box">
                <span
                  class="label-info"
                  v-for="(item, index) in this.getlabel"
                  :key="index"
                  >{{ item.tagName }}</span
                >
              </div>
            </div>
          </div>
          <div class="contentarea" v-show="num == 2">
            <el-table
              ref="filterTable"
              border
              :data="business"
              :row-style="{ height: '10px' }"
              :cell-style="{ padding: '10px 0' }"
              :style="{ width: '100%' }"
              :header-cell-style="{ background: '#E8E8E8', opacity: 0.5 }"
              height="400"
            >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="productName"
                label="产品名称"
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="isHandled"
                label="是否办理"
                :formatter="statusisHandled"
              ></el-table-column>
            </el-table>
          </div>
          <div class="contentarea" v-show="num == 3">
            <div class="time-cont">
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.createTime"
                >
                  {{ activity.status }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox, Message } from "@/utils/importFile";
import {
  getCustomDetail,
  getDictList,
  getAnalysisDetail,
  getOurBankBuss,
  getCustomStatusHistory,
  tagList,
  setCustTags,
  getTagRecord
} from "@/api/marketing";
export default {
  data() {
    return {
      num: 0,
      id: "",
      custNo: "",
      fitstData: [],
      visible: false,
      isShow: 0,
      loading: true,
      detail: {},
      getlabel: {},
      getlabels: {},
      addlabel: [],
      labelData: [],
      labelDatas: [],
      dictionary: [],
      direction: "ltr",
      dialogFormVisible: true,
      reverse: true,
      activities: [],
      tableData: [],
      business: [],
      key: 1,
      sex: "",
      edu_level: "",
      marriage: "",
      housing_loan: "",
      individual_loan: "",
      time_deposit: "",
      credit_situation: "",
      cust_purpose_status: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.custNo = this.$route.params.custNo;
    this.getDictList();
  },
  methods: {
    // 查询字典
    async getDictList() {
      try {
        const res = await getDictList(
          "product_type,cust_purpose_status,yes_no,sys_user_sex,edu_level,marriage,housing_loan,individual_loan,time_deposit,credit_situation"
        );
        if (res.code == 200) {
          this.status = res.data;
          this.getDetail();
          this.getOurBankBuss();
          this.getCustomStatusHistory();
          this.getCustomDetail();
          this.getTagRecord();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 岗位状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.status.product_type, row.productType);
    },
    statusCust(row, column) {
      return this.selectDictLabel(this.status.cust_purpose_status, row.status);
    },
    statusisHandled(row, column) {
      return this.selectDictLabel(this.status.yes_no, row.isHandled);
    },
    // 推荐产品
    async getDetail() {
      try {
        const res = await getAnalysisDetail(this.custNo);
        if (res.code == 200) {
          this.loading = false;
          this.tableData = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 本行业务办理
    async getOurBankBuss() {
      try {
        const res = await getOurBankBuss(this.custNo);
        if (res.code == 200) {
          this.business = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 跟进结果
    async getCustomStatusHistory() {
      try {
        const res = await getCustomStatusHistory({
          id: this.id
        });
        if (res.code == 200) {
          var newArray = res.data.map(function(item, i) {
            return item;
          });
          for (var i = 0; i < newArray.length; i++) {
            var aaa = this.selectDictLabel(
              this.status.cust_purpose_status,
              newArray[i].status
            );
            newArray[i].status = aaa;
          }
          this.activities = newArray;

          console.log(newArray);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取标签
    async getTagRecord() {
      try {
        const res = await getTagRecord(this.custNo);
        if (res.code == 200) {
          this.getlabel = res.data;
          this.getlabels = res.data.slice(0, 5);

          console.log();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 客户详情
    async getCustomDetail() {
      try {
        const res = await getCustomDetail(this.id);
        if (res.code == 200) {
          this.detail = res.data;
          this.sex = this.selectDictLabel(
            this.status.sys_user_sex,
            this.detail.sex
          );
          this.edu_level = this.selectDictLabel(
            this.status.edu_level,
            this.detail.eduLevel
          );
          this.marriage = this.selectDictLabel(
            this.status.marriage,
            this.detail.marriage
          );
          this.housing_loan = this.selectDictLabel(
            this.status.housing_loan,
            this.detail.housingLoan
          );
          this.individual_loan = this.selectDictLabel(
            this.status.individual_loan,
            this.detail.individualLoan
          );
          this.time_deposit = this.selectDictLabel(
            this.status.time_deposit,
            this.detail.timeDeposit
          );
          this.credit_situation = this.selectDictLabel(
            this.status.credit_situation,
            this.detail.creditSituation
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    // 增加标签
    showDrawer() {
      this.visible = true;
      this.tagList();
    },
    // 查询标签
    async tagList() {
      try {
        const res = await tagList();
        if (res.code == 200) {
          console.log(res);
          this.labelData = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 添加标签
    async setCustTags() {
      try {
        const res = await setCustTags({
          custNo: this.custNo,
          tags: this.labelDatas
        });
        if (res.code == 200) {
          this.getTagRecord();
          Message.success(res.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
    onClose() {
      this.visible = false;
      this.setCustTags();
      // this.key = !this.key;
      // console.log(this.key);
      // if (this.key == true) {
      //   this.fitstData = [];
      //   this.fitstData.push(
      //     {
      //       key: "1",
      //       productType: "理财",
      //       productName: "'安心得利'理财",
      //       updateTime: "2020/11/30 13:20",
      //       resoult: "有意向"
      //     },
      //     {
      //       key: "2",
      //       productType: "信用卡",
      //       productName: "网易云音乐联名卡",
      //       updateTime: "2020/10/15 12:20",
      //       resoult: "有意向"
      //     }
      //   );
      // } else {
      //   this.fitstData = [];
      //   this.fitstData.push(
      //     {
      //       key: "3",
      //       productType: "理财",
      //       productName: "'安心得利'理财",
      //       updateTime: "2020/11/30 13:20",
      //       resoult: "有意向"
      //     },
      //     {
      //       key: "4",
      //       productType: "信用卡",
      //       productName: "音乐联名卡",
      //       updateTime: "2020/10/15 13:20",
      //       resoult: "有意向"
      //     },
      //     {
      //       key: "5",
      //       productType: "贷款",
      //       productName: "个人汽车贷款",
      //       updateTime: "2020/11/12  8:20:00",
      //       resoult: "无意向"
      //     }
      //   );
      // }
    },
    onClose1() {
      this.visible = false;
    },
    active(item, index) {
      this.addlabel.map(key => {
        if (key.tagTypeId == item.tagTypeId) {
          this.addlabel.splice(
            this.addlabel.findIndex(item => item.id === key.id),
            1
          );
          this.labelDatas.splice(
            this.labelDatas.findIndex(item => item === key.id),
            1
          );
        }
      });
      let arrIndex = this.labelDatas.indexOf(item.id);
      if (arrIndex > -1) {
        this.labelDatas.splice(arrIndex, 1);
      } else {
        this.labelDatas.push(item.id);
        this.addlabel.push(item);
      }
      // console.log(item.tagTypeId);
      console.log(this.labelDatas);
      // console.log(this.addlabel);
      // this.isShow = index;
    },
    handleClose(done) {
      done();
    },
    close() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.Panorama-box {
  position: relative;
  width: 100%;
  display: flex;
  .Panorama-left {
    width: 40%;
    height: 620px;
    border-right: 2px solid #e8edf3;
  }
  .label {
    width: 98px;
    height: 21px;
    line-height: 21px;
    background: #0060ff;
    border-radius: 15px;
    color: #fff;
    margin: 0 auto;
  }
}
.label-info {
  display: block;
  padding: 0 10px;
  height: 25px;
  line-height: 25px;
  border-radius: 20px;
  background: rgba(34, 101, 255, 0.04);
  margin-left: 10px;
  margin-bottom: 10px;
}
.bot-label {
  width: 98px;
  height: 21px;
  border-radius: 15px;
  border: 1px solid #ced0d7;
  color: #999;
  font-size: 15px;
  margin-left: 20px;
}
.bot-label-active {
  width: 98px;
  height: 21px;
  border-radius: 15px;
  border: 1px solid #0060ff;
  color: #0060ff;
  font-size: 15px;
  margin-left: 20px;
}
.contentarea {
  margin: 10px 0 0 11px;
  opacity: 0.8;
}
.label-cont {
  margin-top: 20px;
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.Panorama-right {
  width: 60%;
  margin-left: 30px;
}
.time-cont {
  padding-left: 10%;
  width: 28%;
  height: 200px;
  margin-top: 40px;
}
.table-box {
  display: flex;
  justify-content: space-between;
}
.gridtablse {
  font-size: 14px;
}
.gridtablse tr td {
  width: 140px;
  text-align: left;
  padding-left: 10px;
}
.gridtablse tr {
  height: 30px;
}
.pone-label {
  font-size: 14px;
  display: flex;
  align-items: center;
  .pone-span {
    width: 90px;
  }
}
.close {
  width: 25px;
  height: 25px;
  background: url(../assets/image/close.png) no-repeat 100% 100%;
  background-size: 100%;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 22;
}
.label-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
// .label-info:nth-child(2){
//   position: absolute;
//   top: 80px;
// }

.ant-timeline-item-content {
  p {
    text-align: left;
  }
}

.outer {
  height: 560px;
  width: 510px;
  margin: auto 0;
  z-index: 1;
}
.outer:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  filter: blur(90px);
  background: url(../assets/image/Snipaste.png) no-repeat 50% 50%;
  background-size: 50%;
}
.inner {
  height: 100%;
  width: 550px;
  position: relative;
}
.outer-box {
  height: 680px;
  width: 550px;
  position: relative;
}
.inerss {
  height: 500px;
  overflow: auto;
}
.labelson_box {
  display: flex;
  flex-wrap: wrap;
}
.labelbox {
  position: relative;
  z-index: 22;
  width: 100%;
  display: flex;
  flex-direction: column;
  .typeName {
    text-align: left;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
    line-height: 35px;
  }
  .labelson {
    width: 85px;
    height: 25px;
    line-height: 25px;
    border-radius: 13px;
    border: 1px solid #ced0d7;
    background: #ffffff;
    margin: 10px;
  }
  .labelson-active {
    border: 1px solid #0060ff;
  }
}
.button-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 30%;
  .button-item {
    width: 66px;
    height: 25px;
    line-height: 25px;
    background: #0060ff;
    border-radius: 15px;
    color: #fff;
    font-size: 15px;
  }
  .button-item:nth-child(2) {
    width: 64px;
    height: 23px;
    line-height: 25px;
    background: rgba(8, 0, 0, 0);
    border: 1px solid #ced0d7;
    margin-left: 30px;
    color: #999999;
  }
}
.ant-timeline-item-content {
  p {
    font-size: 24px;
  }
}
.tags-box {
  width: 100%;
  height: 600px;
  position: relative;
  .tag {
    .big {
      width: 107px;
      height: 107px;
      background: rgba(0, 96, 255, 0.2);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .medium {
        width: 94px;
        height: 94px;
        background: rgba(0, 96, 255, 0.5);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .small {
          width: 79px;
          height: 79px;
          background: #0060ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            color: #fff;
            font-size: 15px;
          }
        }
      }
    }
  }
}
.background-box {
  width: 100%;
  height: 88%;
  position: relative;
}
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
// 背景气泡

.bubble {
  position: absolute;
  bottom: 0;
  background: rgba(0, 96, 255, 0.2);
  border-radius: 50%;
  opacity: 0.5;
  animation: flying 10s infinite ease-in;
}

.bubble:nth-child(7) {
  width: 40px;
  height: 40px;
  left: 35%;
  animation-duration: 10s;
  animation-delay: 8s;
}

.bubble:nth-child(2) {
  width: 20px;
  height: 20px;
  left: 20%;
  animation-duration: 13s;
  animation-delay: 9s;
}
.bubble:nth-child(3) {
  width: 50px;
  height: 50px;
  left: 0%;
  animation-duration: 15s;
  animation-delay: 2s;
}

.bubble:nth-child(4) {
  width: 60px;
  height: 60px;
  left: 40%;
  animation-duration: 14s;
  animation-delay: 6s;
}

.bubble:nth-child(5) {
  width: 35px;
  height: 35px;
  left: 55%;
  animation-duration: 17s;
  animation-delay: 7s;
}

.bubble:nth-child(6) {
  width: 80px;
  height: 80px;
  left: 65%;
  animation-duration: 8s;
  animation-delay: 3s;
}

.bubble:nth-child(1) {
  width: 80px;
  height: 80px;
  left: 5%;
  animation-duration: 12s;
  animation-delay: 5s;
}

.bubble:nth-child(8) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 8s;
}

.bubble:nth-child(9) {
  width: 15px;
  height: 15px;
  left: 70%;
  animation-duration: 9s;
  animation-delay: 0s;
}

.bubble:nth-child(10) {
  width: 50px;
  height: 50px;
  left: 95%;
  animation-duration: 9s;
  animation-delay: 3s;
}

@keyframes flying {
  0% {
    bottom: -100px;
    transform: translateX(0);
  }

  50% {
    transform: translateX(100px);
  }

  100% {
    bottom: 1080px;
    transform: translateX(-200px);
  }
}
@keyframes floating {
  50% {
    transform: translateY(-10px);
  }
}
.tag:nth-child(1) {
  animation: floating 3s infinite ease-in-out;
  position: absolute;
  top: 50px;
  left: 50px;
}
.tag:nth-child(2) {
  animation: floating 3s infinite ease-in-out;
  position: absolute;
  top: 100px;
  left: 260px;
}
.tag:nth-child(3) {
  animation: floating 3s infinite ease-in-out;
  position: absolute;
  top: 240px;
  left: 60px;
}
.tag:nth-child(4) {
  animation: floating 3s infinite ease-in-out;
  position: absolute;
  top: 300px;
  left: 300px;
}
.tag:nth-child(5) {
  animation: floating 3s infinite ease-in-out;
  position: absolute;
  top: 410px;
  left: 150px;
}
</style>
<style>
.ant-modal-body {
  padding-left: 0;
}
.ant-drawer-content {
  box-shadow: 0px 2px 10px 0px rgba(0, 74, 196, 0.07);
  border-radius: 10px;
}
.drawerclass {
  height: 95% !important;
  margin: 10px 0 0 32px;
  border-radius: 5px;
}
</style>
