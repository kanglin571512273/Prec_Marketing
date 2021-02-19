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
    };
  },
  methods: {
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
            path: "/marketingManage",
          });
        }
      });
    },
  },
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
      font-weight: 600;
      margin-bottom: 80px;
    }
    .login-input {
      width: 580px;
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
.right-login .ant-form-explain {
  text-align: left;
  margin-top: 5px;
}
.login-box {
  .ant-input {
    font-size: 24px;
    height: 62px;
    padding: 6px 50px !important;
  }
  .ant-input-clear-icon,
  .ant-input-password-icon,
  .anticon-lock,
  .anticon-user,
  .ant-checkbox-wrapper,
  .ant-form-explain {
    font-size: 24px;
  }
  .ant-checkbox-inner {
    width: 24px;
    height: 24px;
  }
  .ant-checkbox-inner::after {
    width: 12px;
    height: 12px;
  }
}
</style>
