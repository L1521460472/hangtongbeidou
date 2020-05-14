<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <!-- <div class="header_nav_list"> -->
              <!-- <div class="header_select">
                <span>选择区域</span>
              <el-select v-model="value01" placeholder="请选择">
                <el-option
                  v-for="item in options01"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div> -->
            <div class="header_data">
              <span class="demonstration">开始时间</span>
              <el-date-picker
                v-model="value_start"
                type="date"
                placeholder="请选择开始时间"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
              <span id="demonstration" class="demonstration">至</span>
              <el-date-picker
                v-model="value_end"
                type="date"
                placeholder="请选择结束时间"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div class="header_select">
                <span>站点名称</span>
              <el-input
                v-model="input0"
                placeholder="请输入站点名称"
                clearable
              ></el-input>
            </div>
            <div class="header_select">
                <span>订单号</span>
              <el-input
                v-model="input"
                placeholder="请输入订单号"
                clearable
              ></el-input>
              </div>
            <!-- </div> -->
            <div class="header_button">
              <button @click="search_table">查询</button>
              <button @click="reset">重置</button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="footer">
      <el-row>
        <el-col :span="24">
          <div class="footer_nav">
              <div class="footer_informatian">
                <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="
                  dataList
                "
                style="width: 100%;height:100%"
              >
                <el-table-column
                  prop="order_no"
                  min-width="130"
                  label="订单号"
                ></el-table-column>
                <el-table-column
                  prop="service_no"
                  min-width="165"
                  label="服务单号"
                ></el-table-column>
                <el-table-column
                  prop="station_name"
                  min-width="130"
                  label="站点名称"
                ></el-table-column>
                <el-table-column
                  prop="device_sn"
                  min-width="135"
                  label="桩号"
                ></el-table-column>
                <el-table-column
                  prop="nozzle_no"
                  min-width="80"
                  label="枪号"
                ></el-table-column>
                <el-table-column
                  prop="start_time"
                  min-width="150"
                  label="充电开始时间"
                ></el-table-column>
                <el-table-column
                  prop="end_time"
                  min-width="150"
                  label="充电结束时间"
                ></el-table-column>
                <el-table-column
                  prop="timelen"
                  min-width="100"
                  label="充电时长/分钟"
                ></el-table-column>
                <el-table-column
                  prop="degree"
                  min-width="90"
                  label="充电电量/度"
                ></el-table-column>
                <el-table-column
                  prop="charge_money"
                  min-width="90"
                  label="充电电费/元"
                ></el-table-column>
                <el-table-column
                  prop="fee"
                  min-width="80"
                  label="服务费/元"
                ></el-table-column>
                <el-table-column
                  prop="pay_money"
                  min-width="80"
                  label="总费用/元"
                ></el-table-column>
                <el-table-column
                  prop="deduct"
                  min-width="90"
                  label="优惠金额/元"
                ></el-table-column>
                <el-table-column
                  prop="actual_pay"
                  min-width="90"
                  label="实付金额/元"
                ></el-table-column>
              </el-table>
              </div>

              <div class="footer_page">
                <el-pagination
                  @size-change="handleSizeChange($event,input0,value_start,value_end)"
                  @current-change="handleCurrentChange($event,input0,value_start,value_end)"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  :page-size="pagesize"
                  :pager-count="5"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                >
                </el-pagination>
              </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {getCookie,dateToString} from '../../public'
export default {
  name: "RechargeRecord",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      input0:"",
      input: "",
      value_start: "",
      value_end: "",
      dataList: [],
      result_data:[],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      total:10
    };
  },
  methods: {
    handleSizeChange(val,s,q,m) {
      // console.log(`每页 ${val} 条`);
      axios({
      method:'post',
      url:'/rest/chargeapi/sysOrderController/chargeList',
      headers:{
        Authorization:getCookie(1001),
      },
      data:{
        station_name: s,
        startDate: q,
        endDate: m,
        pageNum:1,
        pageSize:val
      }
    })
    .then((result)=>{
      // console.log(result.data)
      this.loading = false;
      this.dataList = result.data.data.chargeList;
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;
    })
    .catch((err)=>{
      this.loading = false;
      console.error(err);
    })
    },
    handleCurrentChange(val,s,q,m) {
      // console.log(`当前页: ${val}`);
      axios({
      method:'post',
      url:'/rest/chargeapi/sysOrderController/chargeList',
      headers:{
        Authorization:getCookie(1001),
      },
      data:{
        station_name: s,
        startDate: q,
        endDate: m,
        pageNum:val,
        pageSize:10
      }
    })
    .then((result)=>{
      // console.log(result.data)
      this.loading = false;
      this.dataList = result.data.data.chargeList;
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;

      
    })
    .catch((err)=>{
      this.loading = false;
      console.error(err);
    })
    },
    search_table(){
      //判断是否输入日期
      if(this.value_start == '' || this.value_start == null){
        this.value_start = ''
      }else{
        if(this.value_start.length == 10){
          this.value_start = this.value_start;
        }else{
          this.value_start = dateToString(this.value_start);
        }
      }
      if(this.value_end == '' || this.value_end == null){
        this.value_end = ''
      }else{
        if(this.value_end.length == 10){
          this.value_end = this.value_end;
        }else{
          this.value_end = dateToString(this.value_end);
        }
      } 
      //发送请求
      axios({
        method:'post',
        url:'/rest/chargeapi/sysOrderController/chargeList',
        headers:{
          Authorization:getCookie(1001),
        },
        data:{
          // city_id: '',
          station_name: this.input0,
          order_no: this.input,
          startDate: this.value_start,
          endDate: this.value_end,
          pageNum:1,
          pageSize:10
        }
      })
      .then((result)=>{
        // console.log(result.data)
        this.loading = false;
        this.dataList = result.data.data.chargeList;
        this.total = result.data.data.totalNum;
        this.pagesize = result.data.data.pageSize;
        this.currentPage = result.data.data.pageNum;
      })
      .catch((err)=>{
        this.loading = false;
        console.error(err);
      })
    },
    getInit(){
      axios({
      method:'post',
      url:'/rest/chargeapi/sysOrderController/chargeList',
      headers:{
        Authorization:getCookie(1001),
      },
      data:{
        pageNum:1,
        pageSize:10
      }
    })
    .then((result)=>{
      // console.log(typeof result.data.data.chargeList[0].start_time)
      this.loading = false;
      this.dataList = result.data.data.chargeList
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;

      this.input = '';
      this.input0 = '';
      this.value_start = '';
      this.value_end = '';
    })
    .catch((err)=>{
      this.loading = false;
      console.error(err);
    })
    },
    reset(){
      this.getInit();
    }
  },
  mounted() {
    this.getInit();
  }
};
</script>
<style scoped>
#header {
  width: 100%;
  height: 100%;
}
/* .header {
  width: 100%;
  min-width:1116px;
  height: 182px;
  box-sizing: border-box;
  padding: 16px;
  background: #000;
} */
.header {
  width: 100%;
  min-width:1116px;
  height: 112px;
  box-sizing: border-box;
  padding: 16px;
  background: #000;
}
.el-row {
  width: 100%;
  height: 100%;
}
.el-col {
  width: 100%;
  height: 100%;
}
.header_nav {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 30px 20px; */
  background: #212121;
  border-radius: 6px;
}
.header_nav_list{
  width: 90%;
  height: 100%;
  float: left;
}
.header_data {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 2%;
  float: left;
}
#demonstration {
  margin-left: 2%;
}
.demonstration {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 2%;
}
.sub-title {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 4%;
  margin-top: 2%;
}
#span {
  opacity: 0;
}
/*  //两行 */
/* .header_select {
  width: 25%;
  height: 45px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  float: left;
} */
/*  //一行 */
.header_select {
  width: 22.5%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  float: left;
  padding-left: 2%;
}
.header_select span{
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 4%;
}
.el-input {
  width: 160px;
}
.header_button {
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  float: right;
  /* margin-top: 25px; */
}
.el-table__header >>> .el-table tr {
  background: #212121 !important;
}

/* ------------ footer -------------- */
/* .footer {
  width: 100%;
  min-width:1116px;
  height: calc(100% - 182px);
  box-sizing: border-box;
  background: #000;
  padding: 0 16px 16px 16px;
} */
.footer {
  width: 100%;
  min-width:1116px;
  height: calc(100% - 112px);
  box-sizing: border-box;
  background: #000;
  padding: 0 16px 16px 16px;
}
.footer_nav {
  width: 100%;
  height: 100%;
  background: #212121;
  border-radius: 6px;
  overflow-y: auto;
}
.footer_informatian {
  width: 100%;
  height: 85%;
  overflow-y: auto;
}
.footer_page {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.el-table >>> .el-table__body-wrapper{
  width: 100%;
  height: calc(100% - 48px);
  overflow-y: auto;
}
</style>
