<template>
  <div>
    <div class="header">
      {{ mes }}
    </div>
    <div>
      <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/account">首页</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">位置服务</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/vehicleMonitoring">车辆监控</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home">轨迹回放</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/businessAdministration">企业管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/vehicleManagement">车辆管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/fleetManagement">车队管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/driverManagement">司机管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/EnterpriseTypeManagement">企业类型管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/roleManagement">角色管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/userManagement">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">平台统计分析</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/OperatingReports">运营监管报表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/MileageReport">里程报表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/TrafficReports">行车报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">新能源图标展示</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/locationDistribution">车辆充电位置分布</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/MileageStatistics">行驶里程数据统计</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/VehicleRunningDistribution">车辆实时运行分布</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/VelocityThermalDistribution">行驶速度热力分布</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/TrajectoryThermalDistribution">车辆轨迹热力分布</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/VehicleAccessStatistics">车企车辆接入统计</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/FaultAccessStatistics">车辆故障接入统计</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/CarbonEmissionStatistics">降低碳排放量数据统计</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/RegionalVehicleOperation">区域车辆运行分析</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/ChargingPeriodAnalysis">车辆充电时段分析</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/RentalVehicleAccessStatistics">租凭商车辆接入统计</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/VehicleRunningTimeAnalysis">车辆运行时段分析</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/VehicleChargingPeriodAnalysis-new">车辆充电时段分析-new</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">新能源工况信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/CycleCount">充电次数统计</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/ChargeDetail">充电明细</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/ExtremeDetail">极值明细</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/ExtremeInformation">极值信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/LifeTrajectory">续航轨迹明细</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/enduranceMileage">续航里程</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/vehicleDetails">整车明细</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/vehicleInformation">整车信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main">
      <el-main>
      <router-view />
    </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      mes: new Date().toLocaleString(),
      isCollapse: false
    };
  },
  mounted() {
    this._tid = setInterval(() => {
      this.mes = new Date().toLocaleString();
    }, 1000);
  },
  computed: {},
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
  },
  beforeDestroy() {
    clearInterval(this._tid);
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  border: 5px solid yellow;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  float: left;
}
.el-menu-vertical-demo {
  float: left;
}
/* .main{
  padding: 20px;
  width: 85%;
  float: left;
} */
</style>
