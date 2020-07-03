<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <div class="header_navTop">
              <div class="header_select">
                <span>用户账号</span>
              <el-input
                v-model="input1"
                placeholder="请输入用户账号"
                clearable
              ></el-input>
              </div>
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
                :picker-options="pickerOptionEnd"
              >
              </el-date-picker>
            </div>
            <div class="header_select input0">
                <span>站点名称</span>
              <el-input
                v-model="input0"
                placeholder="请输入站点名称"
                clearable
              ></el-input>
            </div>
            </div>
            <div class="header_navButtom">
              <div class="header_select">
                <span> <i style="opacity: 0;">空</i>订单号</span>
              <el-input
                v-model="input"
                placeholder="请输入订单号"
                clearable
              ></el-input>
              </div>
              <div class="header_button">
              <button @click="exportExcel">导出</button>
              <button @click="search_table">查询</button>
              <button @click="reset">重置</button>
            </div>
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
                id="exportTable"
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
                  prop="number"
                  min-width="80"
                  label="序号"
                  align="center"
                >
                <!-- <template slot-scope="scope">
                    <span
                      >{{ scope.$index + (currentPage - 1) * pagesize + 1 }}
                    </span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  prop="user_id"
                  min-width="110"
                  label="用户ID"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="username"
                  min-width="100"
                  label="用户账号"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="plat_type"
                  min-width="80"
                  label="平台类型"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.plat_type == 1">新能源</span>
                    <span v-if="scope.row.plat_type == 2">深圳vms</span>
                    <span v-if="scope.row.plat_type == 3">南宁vms</span>
                    <span v-if="scope.row.plat_type == 4">个人用户</span>
                    <span v-if="scope.row.plat_type == 5">城配货主</span>
                    <span v-if="scope.row.plat_type == 6">城配车主</span>
                    <span v-if="scope.row.plat_type == 7">城配司机</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="order_no"
                  min-width="130"
                  label="订单号"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="service_no"
                  min-width="165"
                  label="服务单号"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="station_name"
                  min-width="130"
                  label="站点名称"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="device_sn"
                  min-width="135"
                  label="桩号"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="nozzle_no"
                  min-width="80"
                  label="枪号"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="start_time"
                  min-width="150"
                  label="充电开始时间"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="end_time"
                  min-width="150"
                  label="充电结束时间"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="timelen"
                  min-width="100"
                  label="充电时长/分钟"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="degree"
                  min-width="90"
                  label="充电电量/度"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="charge_money"
                  min-width="90"
                  label="充电电费/元"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="fee"
                  min-width="80"
                  label="服务费/元"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="pay_money"
                  min-width="80"
                  label="总费用/元"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="coupon_amount"
                  min-width="100"
                  label="优惠券抵扣/元"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="deduct_our"
                  min-width="90"
                  label="折扣优惠/元"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="actual_pay"
                  min-width="90"
                  label="实付金额/元"
                  align="center"
                ></el-table-column>
              </el-table>
              </div>

              <div class="footer_page">
                <el-pagination
                  @size-change="handleSizeChange($event,input0,input1,value_start,value_end)"
                  @current-change="handleCurrentChange($event,input0,input1,value_start,value_end)"
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
import {getCookie,dateToString} from '../../public';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  name: "RechargeRecord",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      pickerOptionEnd:{
          disabledDate: time => {
          if (this.value_start) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(this.value_start).getTime()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      input0:"",
      input1:"",
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
    handleSizeChange(val,s,id,q,m) {
      // console.log(`每页 ${val} 条`);
      axios({
      method:'post',
      url:'/rest/chargeapi/sysOrderController/chargeList',
      headers:{
        Authorization:getCookie(1001),
      },
      data:{
        username:id,
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
    handleCurrentChange(val,s,id,q,m) {
      // console.log(`当前页: ${val}`);
      axios({
      method:'post',
      url:'/rest/chargeapi/sysOrderController/chargeList',
      headers:{
        Authorization:getCookie(1001),
      },
      data:{
        username:id,
        station_name: s,
        startDate: q,
        endDate: m,
        pageNum:val,
        pageSize:this.pagesize
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
    exportExcel(){//导出
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
      axios({
        method:'get',
        url:'/rest/chargeapi/sysOrderController/chargeExcelDownload?' + 'username=' + this.input1 + '&&station_name=' + this.input0 + '&&order_no=' + this.input + '&&startDate=' + this.value_start + '&&endDate=' + this.value_end,
        headers:{
          Authorization:getCookie(1001),
        },
        responseType: 'blob'
      })
      .then((result)=>{
        // console.log(result.data);
        if (result.data.type === "application/json") {
            this.$message({
              type: "error",
              message: "下载失败，文件不存在或权限不足"
            });
          } else {
            let blob = new Blob([result.data]);
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob,);//blob,file.fileName
            } else {
              let link = document.createElement("a");
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("click", false, false);
              link.href = URL.createObjectURL(blob); 
              link.download = "充电记录.xls";
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          }
      })
      .catch((err)=>{
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
          username: this.input1,
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
      // console.log(result.data)
      this.loading = false;
      this.dataList = result.data.data.chargeList;
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;

      this.input = '';
      this.input0 = '';
      this.input1 = '';
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
    },
    btnChange(){
      if(this.value_start > this.value_end){
        alert('111');
        return
      }
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
  min-width: 1116px;
  height: 150px;
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
  width: 100%;
  height: 100%;
  float: left;
}
.header_data {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 4%;
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
.header_navTop {
  width: 100%;
  height: 50%;
}
.header_navButtom {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.header_select {
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  float: left;
  padding-left: 4%;
}
.input0{
  padding-left: 0;
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
  width: 75%;
  height: 100%;
  justify-content: flex-end;
  box-sizing: border-box;
  padding-right: 50px;
  /* margin-top: 25px; */
}
.header_button button:nth-child(1){
  margin-right: 10px;
}
.header_button button:nth-child(2){
  margin-right: 10px;
}
.el-table__header >>> .el-table tr {
  background: #212121 !important;
}

/* ------------ footer -------------- */
.footer {
  width: 100%;
  min-width:1116px;
  height: calc(100% - 150px);
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
