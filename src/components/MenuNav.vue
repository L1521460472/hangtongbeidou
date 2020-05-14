<template>
    <div id="menu">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
             <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/HomeIndex">首页</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-claim"></i>
            <span slot="title">运营管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/OrderManagement">订单管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/RechargeRecord">充电记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">供应商</span>
          </template>
          <!-- <el-menu-item-group>
            <el-menu-item index="/bdcx">bdcx</el-menu-item>
          </el-menu-item-group> -->
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span slot="title">报表管理</span>
          </template>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/UserAdmin">用户信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/ShoppingProduct">产品充值</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
</template>
<script>
export default {
    name:'MenuNav',
    data() {
        return {
            isCollapse: false,
        }
    },
    methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },

}
</script>
<style>
#menu{
    height: 100%;
}
.el-menu{
  background: #212121 !important;
  border-right: 0 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
  float: left;
  background: #212121;
}
.el-menu-vertical-demo {
  float: left;
}
.el-submenu__title{
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 20px !important;
  color: #fff !important;
  font-size:16px !important;
  font-family:Microsoft YaHei;
  font-weight:400;
  opacity: 0.8;
}
.el-submenu__title:hover {
  background-color: #212121 !important;
  color: #FBD198 !important;
}
.el-menu-item-group__title{
  padding: 0 !important;
}
.el-submenu .el-menu-item{
   height: 32px !important;
  line-height: 32px !important;
}
.el-menu-item{
  height: 32px !important;
  line-height: 32px !important;
  background: #212121;
  color: rgba(255,255,255,.4) !important;
  /* opacity: 0.4; */
}

.el-menu-item-group{
  height: 32px !important;
  line-height: 32px !important;
  background: #212121 !important;
  color: rgba(255,255,255,.8) !important;
  /* opacity: 0.8; */
}
.el-menu-item.is-active{
  background-color: #212121 !important;
  color: #FBD198 !important;
  /* opacity: 0.8; */
}
.el-menu-item:hover{
  background-color: #212121 !important;
  color: #FBD198 !important;
}
</style>