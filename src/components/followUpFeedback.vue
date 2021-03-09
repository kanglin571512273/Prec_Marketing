<template>
  <div class="followUpFeedback">
    <div class="filtertable">
      <el-table ref="filterTable" border :data="data">
        <el-table-column
          prop="RecomProducts"
          label="推荐产品"
          width="370"
        ></el-table-column>
        <el-table-column show-overflow-tooltip prop="intention" label="有意向">
          <template slot-scope="scope">
            <div class="customName" @click="edit(scope.row, 1)">
              <!-- <i class="el-icon-circle-check check "></i> -->
              <i
                class="el-icon-circle-check check"
                :class="scope.row.intention ? 'activationcheck' : ''"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="noIntention"
          label="无意向"
        >
          <template slot-scope="scope">
            <div class="customName" @click="edit(scope.row, 1)">
              <i
                class="el-icon-circle-check check"
                :class="scope.row.noIntention ? 'activationcheck' : ''"
              ></i>
            </div>
          </template>
        </el-table-column>
        <!-- 编辑框 -->
        <!-- <i
        :class="{
          iconfont: true,
          'iconCheck-circle1': true,
          'active-iconCheck-circle1': row.intention
        }"
        slot="intention"
        slot-scope="row"
        @click="edit(row, 1)"
      ></i>
      <i
        :class="{
          iconfont: true,
          'iconCheck-circle1': true,
          'active-iconCheck-circle1': row.noIntention
        }"
        slot="noIntention"
        slot-scope="row"
        @click="edit(row, 2)"
      ></i> -->
      </el-table>
    </div>
    <div class="btnContainer">
      <div class=" sureBtn" @click="makeSure">确定</div>
      <div class=" cancelBtn" @click="cancle">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    reset() {
      this.data = [
        {
          key: 1,
          RecomProducts: "'安心得利'理财",
          intention: false,
          noIntention: false
        },
        {
          key: 2,
          RecomProducts: "网易云联名卡",
          intention: false,
          noIntention: false
        },
        {
          key: 3,
          RecomProducts: "个人汽车贷款",
          intention: false,
          noIntention: false
        }
      ];
    },
    edit(row, index) {
      console.log(row, index);
      // console.log(row);
      if (index == 1) {
        let flag = !row.intention;
        row.intention = flag;
        row.noIntention = !flag;
      } else {
        let flag = !row.noIntention;
        row.noIntention = flag;
        row.intention = !flag;
      }
    },
    makeSure() {
      this.$emit("hiddenModel", this.data);
      this.reset();
    },
    cancle() {
      // this.data = data;
      // console.log(data, this.data);
      this.$emit("closeModel");
      this.reset();
    }
  }
};
</script>

<style lang="less" scoped>
.filtertable {
  height: 540px;
}
.followUpFeedback {
  padding: 20px;
  .iconCheck-circle1 {
    color: #e8e8e8;
    font-size: 35px;
  }
  .active-iconCheck-circle1 {
    color: #0060ff;
  }
  .btnContainer {
    text-align: center;
    .mybtn {
      padding: 3px 34px;
      background-color: #fff;
      border: none;
      border-radius: 50px;
      font-size: 22px;
      outline: none;
    }
    .cancleBtn {
      color: #999999;
      border: 1px solid#CED0D7;
    }
  }
}
.check {
  font-size: 35px;
}
.activationcheck {
  color: #0060ff;
}
</style>
