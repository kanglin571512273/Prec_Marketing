<template>
  <div class="marketActive" ref="marketActive">
    <loading :loading="loading"></loading>
    <div class="activeItem" v-for="item in tableList" :key="item.id" @click="goOther(item.id)">
      <div :class="{activeName:true,grey:item.status == '1'}">{{item.actName}}</div>
      <div class="time">{{item.beginTime + ' - ' + item.endTime}}</div>
      <div class="progressBar">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="item.actRate"
          :format="format"
        ></el-progress>
        <span v-if="item.status == '1'">未开始</span>
      </div>
      <div class="mark" v-if="item.status == '3'">
        <!-- @click="over" -->
        <span>已结束</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "@/utils/importFile";
import loading from "@/components/loading";
import { getActiveList } from "@/api/customApi";
export default {
  components: { loading },
  data() {
    return {
      tableList: [],
      pages: {
        pageNum: 1,
        pageSize: 24,
        total: 0,
      },
      loading: false,
    };
  },
  mounted() {
    this.getList();
    this.loadMore("marketActive", () => {
      this.pages.pageNum++;
      this.getList();
    });
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        const res = await getActiveList({
          pageNum: this.pages.pageNum,
          pageSize: this.pages.pageSize,
        });
        if (res.code !== 200) {
          this.loading = false;
          return Message.error(res.msg);
        }
        res.rows.map((item) => {
          item.beginTime = item.beginTime.replace(/\-/g, ".");
          item.endTime = item.endTime.replace(/\-/g, ".");
          return item;
        });
        this.loading = false;
        this.tableList.push(...res.rows);
        this.pages.total = res.total;
      } catch (error) {
        // this.loading = false;
        // Message.error(error);
        console.log(error);
      }
    },
    // 下拉获取下一页数据
    loadMore(refName, callback) {
      let box = refName ? this.$refs[refName] : document.body; //获取监听元素
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
    goOther(id) {
      this.$router.push({
        path: "/activeList",
        name: "activeList",
        params: {
          id,
        },
      });
    },
    // 阻止默认行为
    over(e) {
      Message.error("活动已结束");
      e.stopPropagation();
    },
    // 进度条
    format(val) {
      if (val > 0) {
        return val;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.marketActive {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-starts;
  flex-wrap: wrap;
  .activeItem {
    background-color: #fff;
    width: 32%;
    height: 272px;
    border-radius: 5px;
    text-align: center;
    color: #999999;
    font-size: 15px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 17px;
    .mark {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000000;
      border-radius: 5px;
      opacity: 0.49;
      span {
        font-size: 45px;
        font-weight: 500;
        color: #ffffff;
        line-height: 272px;
      }
    }
    .progressBar {
      box-sizing: border-box;
      width: calc(100% - 20px);
      position: absolute;
      bottom: 10px;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 15px;
        font-weight: 700;
        color: #999;
      }
    }

    .activeName {
      margin-top: 85px;
      font-size: 25px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 700;
      line-height: 35px;
    }
    &:nth-child(3n + 1) {
      .activeName {
        color: #0060ff;
      }
    }
    &:nth-child(3n + 2) {
      .activeName {
        color: #ffa400;
      }
    }
    &:nth-child(3n) {
      margin: 0 17px;
      .activeName {
        color: #18b979;
      }
    }
    .grey {
      color: #999 !important;
    }
  }
}
</style>
<style lang="less">
.activeItem {
  .el-progress-bar__innerText {
    font-weight: 700;
    font-size: 15px;
  }
  &:nth-child(3n + 1) {
    .el-progress-bar__inner {
      background-image: linear-gradient(90deg, #009aff 0%, #0060ff 100%);
    }
  }
  &:nth-child(3n + 2) {
    .el-progress-bar__inner {
      background-image: linear-gradient(90deg, #ffd100 0%, #ffa400 100%);
    }
  }
  &:nth-child(3n) {
    .el-progress-bar__inner {
      background-image: linear-gradient(90deg, #18b979 0%, #00b14c 100%);
    }
  }
}
</style>