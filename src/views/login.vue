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
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { encrypt } from "@/utils/jsencrypt";
import { addLogin } from "@/api/marketing";
import { MessageBox, Message } from "@/utils/importFile";

export default {
  data() {
    return {
      name: "admin",
      ruleForm: {
        userName: "admin1",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    var abs = encrypt("admin123");
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var password = encrypt(this.ruleForm.password);
          addLogin({
            userName: this.ruleForm.userName,
            password: password,
          }).then((res) => {
            if (res.code == 200) {
              localStorage.setItem("token", res.token);
              localStorage.setItem(
                "userInfo",
                JSON.stringify({
                  userName: res.userName,
                  avatar: res.avatar,
                })
              );
              Message.success("登录成功~");
              this.$router.push("/");
            } else if (res.code == 500) {
              Message.error(res.msg);
            }
          });
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
            path: "/marketingManage",
          });
        }
      });
    },

    // encryptedData(data) {
    //   //私钥 和后端沟通写死了
    //   var publicKey =
    //     "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi/qESOZ9EQXAnCv/NKSuqgpIQ/liNNusXssoASF74pyoP3NqCdJusB7o1yCGfsFxb71NcLn03wXFbDiuhfd6GEp6s5Iy0hnMAsdfhsdzaetGxXg9xiHXeEhJ2ih0Eivmz6ZlhAdI+c3EODj6tpMRDkVHVx8Xb/vNFXKuQPYfNEQIDAQAB";
    //   // 新建JSEncrypt对象
    //   let encryptor = new JSEncrypt();
    //   console.log(JSEncrypt(), 8888);
    //   // 设置公钥
    //   encryptor.setPublicKey(publicKey);
    //   // 加密数据
    //   return encryptor.encrypt(data);
    // }
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
