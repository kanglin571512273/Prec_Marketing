<template>
  <div class="diaContainer">
    <el-form
      :model="data"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="right"
    >
      <div class="title">个人信息</div>
      <div class="formContainer">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户姓名:" prop="custName">
              <el-input v-model.trim="data.custName" size="mini" placeholder="请输入客户姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别:" prop="sex">
              <el-select v-model="data.sex" size="mini" placeholder="请选择性别">
                <el-option
                  v-for="item in options.sys_user_sex"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱地址:" prop="email">
              <el-input v-model.trim="data.email" size="mini" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型:" prop="idCardType">
              <el-select v-model="data.idCardType" size="mini" placeholder="请选择证件类型">
                <el-option
                  v-for="item in options.id_card_type"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码:" prop="idCard">
              <el-input v-model.trim="data.idCard" size="mini" placeholder="请输入证件号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:" prop="telNo">
              <el-input v-model.number.trim="data.telNo" size="mini" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="婚姻状况:" prop="marriage">
              <el-select v-model="data.marriage" size="mini" placeholder="请选择婚姻状况">
                <el-option
                  v-for="item in options.marriage"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="教育情况:" prop="eduLevel">
              <el-select v-model="data.eduLevel" size="mini" placeholder="请选择教育情况">
                <el-option
                  v-for="item in options.edu_level"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否私有客户:" prop="isPrivate">
              <el-select v-model="data.isPrivate" size="mini" placeholder="请选择是否私有客户">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系地址:" prop="address">
              <el-input
                v-model="data.address"
                size="mini"
                type="textarea"
                :maxlength="120"
                placeholder="请输入联系地址"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司单位:" prop="workUnit">
              <el-input
                v-model="data.workUnit"
                size="mini"
                type="textarea"
                :maxlength="120"
                placeholder="请输入公司单位"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="title">经济情况</div>
      <div class="formContainer">
        <el-row>
          <el-col :span="8">
            <el-form-item label="住房贷款:" prop="housingLoan">
              <el-select v-model="data.housingLoan" size="mini" placeholder="请选择住房贷款">
                <el-option
                  v-for="item in options.housing_loan"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="个人贷款:" prop="individualLoan">
              <el-select v-model="data.individualLoan" size="mini" placeholder="请选择个人贷款">
                <el-option
                  v-for="item in options.individual_loan"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="信用情况:" prop="creditSituation">
              <el-select v-model="data.creditSituation" size="mini" placeholder="请选择信用情况">
                <el-option
                  v-for="item in options.credit_situation"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="定期存款:" prop="timeDeposit">
              <el-select v-model="data.timeDeposit" size="mini" placeholder="请选择定期存款">
                <el-option
                  v-for="item in options.time_deposit"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :key="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <div class="sureBtn" @click="submit">确认</div>
      <div class="cancelBtn" @click="resetForm">取消</div>
    </div>
  </div>
</template>

<script>
import { Message } from "@/utils/importFile";
export default {
  props: {
    data: { type: Object, default: () => {} },
    options: { type: Object, default: () => {} },
  },

  data() {
    var checkTel = (rule, value, callback) => {
      var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
      if (!reg.test(value)) {
        callback(new Error("手机号码格式不正确"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!value) {
        callback();
      } else if (!reg.test(value)) {
        callback(new Error("电子邮箱格式不正确"));
      } else {
        callback();
      }
    };
    var checkIdCard = (rule, value, callback) => {
      const { idCardType, idCard } = this.data;
      var reg;
      var message;
      if (this.data.idCardType && this.data.idCardType == 2) {
        reg = /^([a-zA-z]|[0-9]){5,17}$/;
        message = "护照号码填写不正确，请输入类似于‘’";
      } else if (this.data.idCardType && this.data.idCardType == 3) {
        reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
        message = "字符类似于 '兰字第000000号'";
      } else {
        reg = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
        message = "身份证号码填写不正确";
      }
      if (!reg.test(value)) {
        callback(new Error(message));
      } else {
        callback();
      }
    };
    return {
      rules: {
        custName: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择客户性别", trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        idCardType: [
          { required: true, message: "请证件类型", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          { validator: checkIdCard, trigger: "blur" },
        ],
        telNo: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        // marriage: [
        //   { required: true, message: "请选择婚姻状况", trigger: "blur" },
        // ],
        // eduLevel: [
        //   { required: true, message: "请选择教育情况", trigger: "blur" },
        // ],
        // isPrivate: [
        //   { required: true, message: "客户是否为私有客户", trigger: "blur" },
        // ],
        // address: [
        //   { required: true, message: "请输入联系地址", trigger: "blur" },
        //   { min: 1, max: 120, message: "字符长度不得超过120", trigger: "blur" },
        // ],
        // workUnit: [
        //   { required: true, message: "请输入公司单位", trigger: "blur" },
        //   { min: 1, max: 120, message: "字符长度不得超过120", trigger: "blur" },
        // ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("addCustom");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.$emit("closeDia");
    },
  },
};
</script>

<style lang="less" scoped>
//  dialog表单
.diaContainer {
  .title {
    text-align: left;
  }
  .formContainer {
    border-radius: 5px;
    box-shadow: 0px 0px 4px 2px rgba(0, 74, 196, 0.07);
    margin: 10px 0;
    padding: 15px 8px 8px;
  }
  .el-select {
    width: 100%;
  }
}
.dialog-footer {
  text-align: center;
  padding-top: 15px;
}
</style>