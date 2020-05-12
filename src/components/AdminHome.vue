<template>
    <div id="bg">
        <el-container>
            <el-header>
                <top-bar></top-bar>
            </el-header>
            <el-container style="height: calc(100% - 48px);">
                <el-aside style="width:200px;min-height:705px;">
                    <menu-nav></menu-nav>
                </el-aside>
                <el-main style="width:calc(100% - 200px);background: #000;min-height:705px;">
                    <keep-alive>
                      <router-view />
                    </keep-alive>                   
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import TopBar from './TopBar';
import MenuNav from './MenuNav';
export default {
    name:'AdminHome',
    data() {
      return {
        
      }
    },
    mounted() {
      this.$router.push('/HomeIndex')
    },
    components:{
        TopBar,
        MenuNav,
    }
}
</script>
<style>
#bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.root-container {
  position: relative;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  height: 48px !important;
  padding: 0 !important;
}
.el-aside {
  height: 100%;
}
.el-main {
  height: 100%;
  padding: 0 !important;
}
.content-body {
  height: 100%;
}
</style>