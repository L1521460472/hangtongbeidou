import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '../components/user'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user',
    component: user,
    children:[
      {
        path:'/account',
        name:'account',
        component:()=>import('../components/products.vue')
      },
      {
        path:'/home',
        name:'home',
        component:()=>import('../views/Home')
      },
      {
        path:'/vehicleMonitoring',
        name:'vehicleMonitoring',
        component:()=>import('../components/vehicleMonitoring')
      },
      {
        path:'/businessAdministration',
        name:'businessAdministration',
        component:()=>import('../components/businessAdministration')
      },
      {
        path:'/vehicleManagement',
        name:'vehicleManagement',
        component:()=>import('../components/vehicleManagement')
      },
      {
        path:'/fleetManagement',
        name:'fleetManagement',
        component:()=>import('../components/fleetManagement')
      },
      {
        path:'/driverManagement',
        name:'driverManagement',
        component:()=>import('../components/driverManagement')
      },
      {
        path:'/EnterpriseTypeManagement',
        name:'EnterpriseTypeManagement',
        component:()=>import('../components/EnterpriseTypeManagement')
      },
      {
        path:'/roleManagement',
        name:'roleManagement',
        component:()=>import('../components/roleManagement')
      },
      {
        path:'/userManagement',
        name:'userManagement',
        component:()=>import('../components/userManagement')
      },
      {
        path:'/OperatingReports',
        name:'OperatingReports',
        component:()=>import('../components/PlatformStatisticalAnalysis/OperatingReports')
      },
      {
        path:'/MileageReport',
        name:'MileageReport',
        component:()=>import('../components/PlatformStatisticalAnalysis/MileageReport')
      },
      {
        path:'/TrafficReports',
        name:'TrafficReports',
        component:()=>import('../components/PlatformStatisticalAnalysis/TrafficReports')
      },
      {
        path:'/locationDistribution',
        name:'locationDistribution',
        component:()=>import('../components/NewEnergyIconDisplay/locationDistribution')
      },
      {
        path:'/MileageStatistics',
        name:'MileageStatistics',
        component:()=>import('../components/NewEnergyIconDisplay/MileageStatistics')
      },
      {
        path:'/VehicleRunningDistribution',
        name:'VehicleRunningDistribution',
        component:()=>import('../components/NewEnergyIconDisplay/VehicleRunningDistribution')
      },
      {
        path:'/VelocityThermalDistribution',
        name:'VelocityThermalDistribution',
        component:()=>import('../components/NewEnergyIconDisplay/VelocityThermalDistribution')
      },
      {
        path:'/TrajectoryThermalDistribution',
        name:'TrajectoryThermalDistribution',
        component:()=>import('../components/NewEnergyIconDisplay/TrajectoryThermalDistribution')
      },
      {
        path:'/VehicleAccessStatistics',
        name:'VehicleAccessStatistics',
        component:()=>import('../components/NewEnergyIconDisplay/VehicleAccessStatistics')
      },
      {
        path:'/FaultAccessStatistics',
        name:'FaultAccessStatistics',
        component:()=>import('../components/NewEnergyIconDisplay/FaultAccessStatistics')
      },
      {
        path:'/CarbonEmissionStatistics',
        name:'CarbonEmissionStatistics',
        component:()=>import('../components/NewEnergyIconDisplay/CarbonEmissionStatistics')
      },
      {
        path:'/RegionalVehicleOperation',
        name:'RegionalVehicleOperation',
        component:()=>import('../components/NewEnergyIconDisplay/RegionalVehicleOperation')
      },
      {
        path:'/ChargingPeriodAnalysis',
        name:'ChargingPeriodAnalysis',
        component:()=>import('../components/NewEnergyIconDisplay/ChargingPeriodAnalysis')
      },
      {
        path:'/RentalVehicleAccessStatistics',
        name:'RentalVehicleAccessStatistics',
        component:()=>import('../components/NewEnergyIconDisplay/RentalVehicleAccessStatistics')
      },
      {
        path:'/VehicleRunningTimeAnalysis',
        name:'VehicleRunningTimeAnalysis',
        component:()=>import('../components/NewEnergyIconDisplay/VehicleRunningTimeAnalysis')
      },
      {
        path:'/VehicleChargingPeriodAnalysis-new',
        name:'VehicleChargingPeriodAnalysis-new',
        component:()=>import('../components/NewEnergyIconDisplay/VehicleChargingPeriodAnalysis-new')
      },
      {
        path:'/CycleCount',
        name:'CycleCount',
        component:()=>import('../components/NewEnergyCondition/CycleCount')
      },
      {
        path:'/ChargeDetail',
        name:'ChargeDetail',
        component:()=>import('../components/NewEnergyCondition/ChargeDetail')
      },
      {
        path:'/ExtremeDetail',
        name:'ExtremeDetail',
        component:()=>import('../components/NewEnergyCondition/ExtremeDetail')
      },
      {
        path:'/ExtremeInformation',
        name:'ExtremeInformation',
        component:()=>import('../components/NewEnergyCondition/ExtremeInformation')
      },
      {
        path:'/LifeTrajectory',
        name:'LifeTrajectory',
        component:()=>import('../components/NewEnergyCondition/LifeTrajectory')
      },
      {
        path:'/enduranceMileage',
        name:'enduranceMileage',
        component:()=>import('../components/NewEnergyCondition/enduranceMileage')
      },
      {
        path:'/vehicleDetails',
        name:'vehicleDetails',
        component:()=>import('../components/NewEnergyCondition/vehicleDetails')
      },
      {
        path:'/vehicleInformation',
        name:'vehicleInformation',
        component:()=>import('../components/NewEnergyCondition/vehicleInformation')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	beforeEnter:(to,from,next)=>{
		alert("你没有权限进入这里")
	}
  },
  {
	  path:'/products',
	  name:"products",
	  component:()=> import('../components/products.vue'),
  },
  // {
	//   path:'/user',
	//   name:'user',
	//   component:()=> import('../components/user.vue')
  // },
  
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
