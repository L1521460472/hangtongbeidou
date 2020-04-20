<template>
  <div id='user-login'>
    <div id="user_header">
      <div id='title'>
        <img src="../image/航通北斗logo2020版-05.png" alt="">
        <h1>充电桩后台管理系统</h1>
      </div>
      <div id='loginPnl'>
          <el-form :model="loginDTO" :rules="loginRules" ref="loginForm">
            <el-form-item prop="uid">
              <el-input v-model="loginDTO.uid" tabindex="1" :autofocus="true">
                <template slot="prepend">账户：</template>
              </el-input>
            </el-form-item >
            <el-form-item prop="pwd">
              <el-input type="password" v-model="loginDTO.pwd" tabindex="2">
                <template slot="prepend">密码：</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" id='loginBtn' @click="login" tabindex="3">登录</el-button>
            </el-form-item>
            <el-checkbox v-model="checked">下次自动登录</el-checkbox>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/api/Account";
import { Message } from "element-ui";
import Router from "../router";

export default {
  data() {
    return {
      loginDTO: {
        uid: "admin",
        pwd: "admin"
      },
      loginRules: {
        uid: [{ required: true, message: "请输入账户名称" }],
        pwd: [{ required: true, message: "请输入密码" }]
      },
      checked:false,
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        if (!valid) {
          console.log(1)
          Message.error("登录信息不完整");
          return;
        }
        Account.login(this.loginDTO)
          .then(rsp => {
            console.log(rsp)
            Router.push({
              name:'AdminHome'
            })
          })
          .catch(rsp => {
            Message.error("未知错误请重试");
          });
      });
    }
  }
};
</script>

<style scoped>
#user-login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../image/loginLogo.png');
}
#user_header{
  width: 360px;
  height: 320px;
  box-sizing: border-box;
  padding: 10px 20px;
  background:#000;
  background-color: rgba(0, 0, 0, 0.5);
}
#loginPnl {
  width: 20rem;
  margin: 0 auto;
}
#loginBtn {
  width: 100% !important;
}
#title {
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 1;
}
#title h1{
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(251,209,152,1);
}
.el-button--primary{
  background: #C79659;
  border: 1px solid #C79659;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(33,33,33,1);
}
.el-form-item:nth-child(3){
  margin-bottom:0;
}
.el-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #fff !important;
    border-color: #fff !important;
}
.el-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner::after{
  border: 1px solid #B1936B !important;
  border-left: 0 !important;
  border-top: 0 !important;
}
.el-checkbox >>> .el-checkbox__label{
  font-size: 12px !important;
  color: rgba(255, 255, 255, 0.8);
}
</style>
