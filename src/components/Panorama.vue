<template>
  <div class="Panorama-box">
    <div class="Panorama-left">
      <div>
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
          :data="tableData"
          :row-style="{ height: '10px' }"
          :cell-style="{ padding: '10px 0' }"
          :style="{ width: '100%' }"
          height="400"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="产品类型"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="产品名称"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="最近跟进时间"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="跟进结果"
          ></el-table-column>
        </el-table>
      </div>
      <div class="contentarea" v-show="num == 1">
        <div class="table-box">
          <table class="gridtablse">
            <tr>
              <th>客户姓名：</th>
              <td>{{ datas.customerName }}</td>
            </tr>
            <tr>
              <th>教育程度：</th>
              <td>本科</td>
            </tr>
            <tr>
              <th>住房贷款：</th>
              <td>5151</td>
            </tr>
            <tr>
              <th>账户余额：</th>
              <td>599</td>
            </tr>
          </table>

          <table class="gridtablse">
            <tr>
              <th>性别：</th>
              <td>男</td>
            </tr>
            <tr>
              <th>婚姻状况:</th>
              <td>1500万</td>
            </tr>
            <tr>
              <th>个人贷款：</th>
              <td>599</td>
            </tr>
            <tr>
              <th>信用情况：</th>
              <td>599</td>
            </tr>
          </table>

          <table class="gridtablse">
            <tr>
              <th>身份证号：</th>
              <td>{{ datas.identifyNum }}</td>
            </tr>
            <tr>
              <th>工作单位：</th>
              <td>{{ datas.addr }}</td>
            </tr>
            <tr>
              <th>定期存款：</th>
              <td>否</td>
            </tr>
          </table>
        </div>
        <div class="pone-label">
          <span>个人标签：</span>
          <div class="label-box">
            <span class="label-info">爱旅游</span>
            <span class="label-info">浙江杭州</span>
            <span class="label-info">高收入</span>
            <span class="label-info">年龄：25</span>
          </div>
        </div>
      </div>
      <div class="contentarea" v-show="num == 2">
        <el-table
          ref="filterTable"
          border
          :data="tableData"
          :row-style="{ height: '10px' }"
          :cell-style="{ padding: '10px 0' }"
          :style="{ width: '100%' }"
          :header-cell-style="{ background: '#E8E8E8', opacity: 0.5 }"
          height="400"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="产品名称"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="是否办理"
          ></el-table-column>
        </el-table>
      </div>
      <div class="contentarea" v-show="num == 3">
        <div class="time-cont">
          <el-steps direction="vertical" :active="1">
            <el-step
              title="步骤 1"
              description="这是一段很长很长很长的描述性文字"
            ></el-step>
            <el-step
              title="步骤 2"
              description="这是一段很长很长很长的描述性文字"
            ></el-step>
            <el-step
              title="步骤 3"
              description="这是一段很长很长很长的描述性文字"
            ></el-step>
          </el-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datas: Object
  },
  data() {
    return {
      num: 0,
      fitstData: [],
      visible: false,
      isShow: 0,
      labelData: [],
      labelDatas: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎1",
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
        }
      ],
      key: 1
    };
  },
  mounted() {
    this.labelData = JSON.parse(localStorage.getItem("labelData"));
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
      this.key = !this.key;
      console.log(this.key);
      if (this.key == true) {
        this.fitstData = [];
        this.fitstData.push(
          {
            key: "1",
            productType: "理财",
            productName: "'安心得利'理财",
            updateTime: "2020/11/30 13:20",
            resoult: "有意向"
          },
          {
            key: "2",
            productType: "信用卡",
            productName: "网易云音乐联名卡",
            updateTime: "2020/10/15 12:20",
            resoult: "有意向"
          }
        );
      } else {
        this.fitstData = [];
        this.fitstData.push(
          {
            key: "3",
            productType: "理财",
            productName: "'安心得利'理财",
            updateTime: "2020/11/30 13:20",
            resoult: "有意向"
          },
          {
            key: "4",
            productType: "信用卡",
            productName: "音乐联名卡",
            updateTime: "2020/10/15 13:20",
            resoult: "有意向"
          },
          {
            key: "5",
            productType: "贷款",
            productName: "个人汽车贷款",
            updateTime: "2020/11/12  8:20:00",
            resoult: "无意向"
          }
        );
      }

      console.log(this.fitstData, 2222);
    },
    onClose1() {
      this.visible = false;
    },
    active(index) {
      let arrIndex = this.labelDatas.indexOf(index);
      console.log(arrIndex);

      if (arrIndex > -1) {
        this.labelDatas.splice(arrIndex, 1);
      } else {
        this.labelDatas.push(index);
      }
      console.log(this.labelDatas, 2222);
      // this.isShow = index;
      // console.log(index,2222)
    }
  }
};
</script>

<style lang="less" scoped>
.Panorama-box {
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
  width: 80px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  background: rgba(34, 101, 255, 0.04);
  margin-left: 20px;
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
  width: 50%;
  height: 200px;
  margin-top: 60px;
}
.table-box {
  display: flex;
  justify-content: space-between;
}
.gridtablse {
  font-size: 14px;
}
.gridtablse tr td {
  width: 75px;
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
}
.label-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  width: 555px;
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
  z-index: -1;
}
.inner {
  height: 100%;
  width: 600px;
  padding-top: 40px;
  .inner-font {
    font-size: 33px;
    font-weight: 600;
    color: #333333;
    line-height: 50px;
    text-align: left;
  }
}
.outer-box {
  height: 950px;
  width: 555px;
  position: relative;
}
.labelbox {
  width: 100%;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  .labelson {
    width: 118px;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    border-radius: 25px;
    border: 2px dashed #ced0d7;
    margin: 10px 30px 31px 0;
  }
  .labelson-active {
    border: 2px solid #0060ff;
  }
}
.button-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  .button-item {
    width: 112px;
    height: 43px;
    line-height: 43px;
    background: #0060ff;
    border-radius: 30px;
    color: #fff;
    font-size: 22px;
  }
  .button-item:nth-child(2) {
    background: rgba(8, 0, 0, 0);
    border: 2px solid #ced0d7;
    margin-left: 30px;
    color: #999999;
  }
}
.ant-timeline-item-content {
  p {
    font-size: 24px;
  }
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
</style>
