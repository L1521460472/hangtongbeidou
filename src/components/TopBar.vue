<template>
  <div class="top-bar">
    <div class="logo">
      <img
        src="../image/航通北斗logo2020版-05.png"
        style="width:100%;height:100%"
      />
      <h1>充电桩后台管理系统</h1>
    </div>
    <div class="setting-btn">
      <el-popover ref="setting-btn-popover" placement="bottom" trigger="hover">
        <!-- <el-button type="text" class='setting-popover-item'>修改密码</el-button> -->
        <el-button type="text" class="setting-popover-item" @click="logout"
          >退出</el-button
        >
      </el-popover>
      <el-button type="text" v-popover:setting-btn-popover
        > {{ mes }} <i class="el-icon-arrow-down"
      /></el-button>
    </div>
  </div>
</template>

<script>
import Router from "../router";
import axios from "axios";
import {getCookie,removeCookie} from '../public'
export default {
  data(){
    return{
      mes:''
    }
  },
  methods: {
    logout() {
      axios({
        method: "post",
        url: "/rest/userapi/appLoginController/adminLogout",
        headers: {
          Authorization: document.cookie
        }
      }).then(result => {
        if (result.data.code === 0 && result.status === 200) {
          if(getCookie('HTuserName') && getCookie('HTpassWord')){
            removeCookie('HTuserName');
            removeCookie('HTpassWord');
          }
          Router.push({
            name: "UserLogin"
          });
        }else{
          if(getCookie('HTuserName') && getCookie('HTpassWord')){
            removeCookie('HTuserName');
            removeCookie('HTpassWord');
          }
          Router.push({
            name: "UserLogin"
          });
        }
      });
    }
  },
  mounted() {
    this.mes = getCookie("HTuserName");
  },
};
</script>

<style scoped>
.top-bar {
  width: 100%;
  min-width:1316px;
  height: 100%;
  height: 48px;
  background: #212121;
}
.top-bar .el-button {
  color: #e5e5e5 !important;
  border: 1px solid #212121 !important;
}
.logo {
  width: 220px;
  box-sizing: border-box;
  padding-left: 20px;
  height: 100%;
  float: left;
  font-size: 16px;
  color: #fbd198;
  display: flex;
  align-items: center;
}
.logo img {
  display: inline-block;
  width: 42px !important;
  height: 42px !important;
  margin-right: 10px;
}
.setting-btn {
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
}
.el-button {
  margin-right: 35px;
}
.el-button:hover {
  color: #fbd198 !important;
}
.el-popover {
  min-width: 100px;
  background: #212121 !important;
}
.setting-popover-item {
  display: block;
  border: 1px solid #212121 !important;
}
.el-popover .el-button--text {
  color: #e5e5e5 !important;
  opacity: 0.8;
  border: 1px solid #212121 !important;
}
.el-popover .el-button--text:hover {
  color: #fbd198 !important;
}
</style>
