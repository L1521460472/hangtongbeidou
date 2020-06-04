import Vue from 'vue'
import Router from 'vue-router'
import AdminHome from '../components/AdminHome'
import {getCookie} from '../public'

Vue.use(Router);
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	beforeEnter:(to,from,next)=>{
		alert("你没有权限进入这里")
	}
  },
  {
	  path:'/',
	  name:"UserLogin",
	  component:()=> import('../components/UserLogin.vue'),
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    component: AdminHome,
    children:[
      {
        path:'/HomeIndex',
        name:'HomeIndex',
        component:()=>import('../components/HomeIndex.vue'),
        beforeEnter:(to,from,next)=>{
          if(getCookie(1001)){
            next()
          }else{
            alert('您还没有登录，请先登录');
            next('/')
          }
        }
      }, 
      {
        path:'/OrderManagement',
        name:'OrderManagement',
        component:()=>import('../components/OperationsManagement/OrderManagement')
      },
      {
        path:'/RechargeRecord',
        name:'RechargeRecord',
        component:()=>import('../components/OperationsManagement/RechargeRecord')
      },
      {
        path:'/UserAdmin',
        name:'UserAdmin',
        component:()=>import('../components/UserManagement/UserAdmin')
      },
      {
        path:'/ShoppingProduct',
        name:'ShoppingProduct',
        component:()=>import('../components/ActivityManagement/ShoppingProduct')
      },
      {
        path:'/DiscountConfiguration',
        name:'DiscountConfiguration',
        component:()=>import('../components/ActivityManagement/DiscountConfiguration')
      },
      {
        path:'/VoucherAllocation',
        name:'VoucherAllocation',
        component:()=>import('../components/ActivityManagement/VoucherAllocation')
      },
      {
        path:'/VoucherManagement',
        name:'VoucherManagement',
        component:()=>import('../components/ActivityManagement/VoucherManagement')
      },
      {
        path:'/CreateVoucher',
        name:'CreateVoucher',
        component:()=>import('../components/ActivityManagement/CreateVoucher')
      },
    ]
  },
]



const router = new Router({
  // mode: 'history', // 打包的时候有这句的删掉，没有就不用管
  base: process.env.BASE_URL,
  routes
})


export default router
