<template>
  <div id="user-login">
    <div id="user_header">
      <div id="title">
        <img src="../image/航通北斗logo2020版-05.png" alt="" />
        <h1>充电桩后台管理系统</h1>
      </div>
      <div id="loginPnl">
        <el-form :model="loginDTO" :rules="loginRules" ref="loginForm">
          <el-form-item prop="userName">
            <el-input
              v-model="loginDTO.userName"
              tabindex="1"
              :autofocus="true"
              placeholder="请输入账号"
              autocomplete="new-userName"
            >
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input type="password" v-model="loginDTO.userPassword" placeholder="请输入密码" autocomplete="new-password" tabindex="2">
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" id="loginBtn" @click="login" tabindex="3"
              >登录</el-button
            >
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
import Axios from "axios";

export default {
  data() {
    return {
      loginDTO: {
        userName: "",
        userPassword: ""
      },
      loginRules: {
        userName: [{ required: true, message: "请输入账户名称" }],
        userPassword: [{ required: true, message: "请输入密码" }]
      },
      checked: false,
      // cookie:''
    };
  },
  methods: {
    login() {
      if(this.checked == true){
        this.setCookie('HTuserName',this.loginDTO.userName,30);
        this.setCookie('HTpassWord',this.loginDTO.userPassword,30);
        this.setCookie(1002,this.loginDTO.userPassword,30);
      }else{
        this.removeCookie('HTuserName');
        this.removeCookie('HTpassWord');
      }
      this.$refs["loginForm"].validate(valid => {
        if (!valid) {
          Message.error("登录信息不完整");
          return;
        }
        Axios.post("/rest/userapi/appLoginController/adminLogin", this.loginDTO)
          .then(result => {
            // console.log(result);
            this.setCookie(1001,result.data.data.token,1);
            this.setCookie('HTuserName',this.loginDTO.userName,30);
            if (result.data.code === 0 && result.status === 200) {
              Router.push({
                name: "AdminHome"
              });
            } else {
              this.$message({
                showClose: true,
                offset: 260,//距离顶部高度
                message: result.data.msg,
                type: "error",
                center: true
              });
              return;
            }
          })
          .catch(err => {
            console.error(err);
          });
        // Account.login(this.loginDTO)
        //   .then(rsp => {
        //     console.log(rsp)
        //     Router.push({
        //       name:'AdminHome'
        //     })
        //   })
        //   .catch(rsp => {
        //     Message.error("未知错误请重试");
        //   });
      });
    },
    setCookie(key,value,iDay){//设置cookie
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + iDay);//设置过期时间
      document.cookie = key + '=' + value + ';expires=' + oDate.toString();
    },
    getCookie(key){//获取指定的key的cookie值
      var arr = document.cookie.split(';');//获取当前域名的所有cookie，以;分割成数组。
      for(var i = 0;i<arr.length;i++){
        var brr = arr[i].split('=');
        if(brr[0].trim() == key){
          return brr[1];
        }
      }
      return ''; //没有找到返回值
    },
    removeCookie(key){//移除cookie
      this.setCookie(key,1,-1)
    },
    keyDown(e){
      if(e.keyCode == 13){//enter回车键 == 13
        this.login();
      }
    }
  },
  mounted() {
    if(this.getCookie('HTuserName') && this.getCookie('HTpassWord')){
      this.checked = true;
      this.loginDTO.userName = this.getCookie('HTuserName');
      this.loginDTO.userPassword = this.getCookie('HTpassWord');
      if(this.getCookie(1002)){
        this.login();
      }
    }

    window.addEventListener('keydown',this.keyDown);//绑定监听事件
  },
  destroyed() {
    window.removeEventListener('keydown',this.keyDown,false);//移除监听事件
  },
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
  background: url("../image/loginLogo.png");
}
#user_header {
  width: 360px;
  height: 320px;
  box-sizing: border-box;
  padding: 10px 20px;
  background: #000;
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
#title h1 {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(251, 209, 152, 1);
}
.el-button--primary {
  background: #c79659;
  border: 1px solid #c79659;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(33, 33, 33, 1);
}
.el-form-item:nth-child(3) {
  margin-bottom: 0;
}
.el-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #fff !important;
  border-color: #fff !important;
}
.el-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner::after {
  border: 1px solid #b1936b !important;
  border-left: 0 !important;
  border-top: 0 !important;
}
.el-checkbox >>> .el-checkbox__label {
  font-size: 12px !important;
  color: rgba(255, 255, 255, 0.8);
}
</style>
