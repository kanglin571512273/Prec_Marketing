<template>
  <div class="login-box">
    <div class="bg-class">
      <div class="bg-font">Welcome</div>
      <div class="bg-font">Back</div>
    </div>
    <div class="login">
      <div class="right-login">
        <div class="login-font">登录</div>
        <div class="login-input">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { labelData, customData } from "../utils/data";
// import Vue from "vue";
// import { Form, Input, Icon, Button, Checkbox } from "ant-design-vue";
// Vue.use(Form);
// Vue.use(Input);
// Vue.use(Icon);
// Vue.use(Button);
// Vue.use(Checkbox);
export default {
  data() {
    return {
      name: "admin",
      ruleForm: {
        name: "admin",
        pass: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          // 存token
          localStorage.setItem("token", true);
          // 存客户详情数据
          let custom = customData();
          localStorage.setItem("customData", JSON.stringify(custom));
          // 存lable数据
          let label = labelData();
          localStorage.setItem("labelData", JSON.stringify(label));

          this.$router.push({
            path: "/marketingManage"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
}
.bg-class {
  width: 40%;
  height: 100%;
  background: url("../assets/image/background.png") no-repeat;
  background-size: cover;
}
.bg-font {
  font-weight: 600;
  color: #ffffff;
  line-height: 125px;
  font-size: 90px;
  text-align: right;
  margin-right: 40px;
}
.login {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  .right-login {
    width: 580px;
    .login-font {
      font-size: 36px;
      color: #333333;
      line-height: 50px;
      font-weight: 900;
      margin-bottom: 40px;
    }
    .login-input {
      width: 460px;
      height: 350px;
      margin-left: 20px;
    }
  }
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
  max-height: 88px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.ant-checkbox-wrapper {
  float: left;
}
.ant-btn-primary {
  font-size: 26px;
  margin-top: 80px;
  background: #0060ff;
  border-radius: 31px;
  height: 62px;
}
.ant-form-item {
  margin-top: 40px;
}
</style>

<style lang="less">
.login-input {
  .el-form-item {
    margin-bottom: 40px;
  }
  .el-form-item__label {
    font-size: 16px;
  }
  .el-button {
    width: 160px;
  }
}
</style>
