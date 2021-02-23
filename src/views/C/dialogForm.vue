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
            <el-form-item label="客户姓名:" prop="name">
              <el-input v-model.trim="data.name" size="mini" placeholder="请输入客户姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择性别">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
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
            <el-form-item label="证件类型:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择证件类型">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码:" prop="name">
              <el-input v-model.trim="data.name" size="mini" placeholder="请输入证件号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:" prop="tel">
              <el-input v-model.number.trim="data.tel" size="mini" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="婚姻状况:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择婚姻状况">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="教育情况:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择教育情况">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否私有客户:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择是否私有客户">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系地址:" prop="name">
              <el-input v-model="data.sex" size="mini" type="textarea" placeholder="请输入联系地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司单位:" prop="name">
              <el-input v-model="data.sex" size="mini" type="textarea" placeholder="请输入公司单位"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="title">经济情况</div>
      <div class="formContainer">
        <el-row>
          <el-col :span="8">
            <el-form-item label="住房贷款:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择住房贷款">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="个人贷款:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择个人贷款">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="信用情况:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择信用情况">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="定期存款:" prop="name">
              <el-select v-model="data.sex" size="mini" placeholder="请选择定期存款">
                <el-option label="女" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <div class="sureBtn">确认</div>
      <div class="cancelBtn" @click="resetForm">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: () => {} },
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
      if (!reg.test(value)) {
        callback(new Error("电子邮箱格式不正确"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
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