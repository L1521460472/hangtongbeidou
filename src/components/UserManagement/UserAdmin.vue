<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <div class="header_select">
              <span>平台类型</span>
              <el-select v-model="value01" placeholder="请选择">
                <el-option
                  v-for="item in options01"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="header_select">
                <span>用户账号</span>
                <el-input
                  v-model="input1"
                  placeholder="请输入用户账号"
                  clearable
                ></el-input>
            </div>
            <div class="header_data">
              <span class="demonstration">注册时间</span>
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
            <div class="header_button">
              <button @click="search">查询</button>
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
              style="width: 100%;height:100%;"
            >
              <el-table-column
                prop="number"
                min-width="80"
                label="序号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="realname"
                min-width="110"
                label="用户ID"
                align="center"
                :show-overflow-tooltip='true'
              ></el-table-column>
              <el-table-column
                prop="app_version"
                min-width="100"
                label="APP版本号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="phone"
                min-width="110"
                label="手机号码"
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
                min-width="100"
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
                prop="register_time"
                min-width="150"
                label="注册时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="total_order"
                min-width="100"
                label="历史订单/条"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="total_recharge"
                min-width="90"
                label="累计充值/元"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="total_fee"
                min-width="90"
                label="累计消费/元"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="balance"
                min-width="90"
                label="用户余额/元"
                align="center"
              ></el-table-column>
              <el-table-column min-width="160" label="操作" align="center">
                <template slot-scope="scope">
                  <span class="particulars"
                    @click="handleEdit(scope.$index, scope.row)"
                    >消费明细</span
                  >
                  <span class="message"
                    @click="handleDelete(scope.$index, scope.row)"
                    >车辆信息</span
                  >
                </template>
              </el-table-column>
            </el-table>
            </div>

            <div class="footer_page">
              <el-pagination
                @size-change="handleSizeChange($event,value01,value_start,value_end)"
                @current-change="handleCurrentChange($event,value01,value_start,value_end)"
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
import axios from 'axios'
import {getCookie,dateToString} from '../../public'
export default {
  name: "UserAdmin",
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
              time.getTime() < new Date(this.value_start).getTime() - 8.64e6
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      options01: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "新能源",
        },
        {
          value: "2",
          label: "深圳vms",
        },
        {
          value: "3",
          label: "南宁vms",
        },
        {
          value: "4",
          label: "个人用户",
        },
        {
          value: "5",
          label: "城配货主",
        },
        {
          value: "6",
          label: "城配车主",
        },
        {
          value: "7",
          label: "城配司机",
        },
      ],
      value01: "",
      input1: "",
      value_start: "",
      value_end: "",
      dataList: [],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      total:10,
    };
  },
  methods: {
    handleSizeChange(val,val01,start,end) {
      // console.log(`每页 ${val} 条`);
      axios({
      method:'post',
      url:'/rest/chargeapi/sysUserController/userList',
      headers:{
        Authorization:getCookie(1001)
      },
      data:{
        plat_type:val01,
        startDate: start,
        endDate: end,
        pageNum:1,
        pageSize:val
      }
    }).then((result)=>{
      // console.log(result.data)
      this.loading = false;
      this.dataList = result.data.data.userList;
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;
    }).catch((err)=>{
      this.loading = false;
      console.error(err)
    })
    },
    handleCurrentChange(val,val01,start,end) {
      // console.log(`当前页: ${val}`);
      axios({
      method:'post',
      url:'/rest/chargeapi/sysUserController/userList',
      headers:{
        Authorization:getCookie(1001)
      },
      data:{
        plat_type:val01,
        startDate: start,
        endDate: end,
        pageNum:val,
        pageSize:this.pagesize
      }
    }).then((result)=>{
      // console.log(result.data)
      this.loading = false;
      this.dataList = result.data.data.userList;
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;
    }).catch((err)=>{
      this.loading = false;
      console.error(err)
    })
    },
    handleEdit(index, row) {
        // console.log(index, row);
        this.$message({
          message: '功能建设中...',
          center: true,
          type: 'success'
        });
      },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$message({
          message: '功能建设中...',
          center: true,
          type: 'success'
        });
    },
    search(){
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
      url:'/rest/chargeapi/sysUserController/userList',
      headers:{
        Authorization:getCookie(1001)
      },
      data:{
        plat_type:this.value01,
        username: this.input1,
        startDate: this.value_start,
        endDate: this.value_end,
        pageNum:1,
        pageSize:10
      }
    }).then((result)=>{
      // console.log(result.data)
      this.loading = false;
      this.dataList = result.data.data.userList;
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;
    }).catch((err)=>{
      this.loading = false;
      console.error(err)
    })
    },
    getInit(){
      axios({
      method:'post',
      url:'/rest/chargeapi/sysUserController/userList',
      headers:{
        Authorization:getCookie(1001)
      },
      data:{
        pageNum:1,
        pageSize:10
      }
    }).then((result)=>{
      // console.log(result.data)
      this.loading = false;
      this.dataList = result.data.data.userList;
      this.total = result.data.data.totalNum;
      this.pagesize = result.data.data.pageSize;
      this.currentPage = result.data.data.pageNum;
      this.input1 = '';
      this.value01 = '';
      this.value_start = '';
      this.value_end = '';
    }).catch((err)=>{
      this.loading = false;
      console.error(err)
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
  background: #212121;
  border-radius: 6px;
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
.header_select {
  width: 22.5%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 2%;
  float: left;
}
.header_select span {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 4%;
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
.el-input {
  width: 160px;
}
.header_button {
  box-sizing: border-box;
  justify-content: space-around;
}
.el-table__header >>> .el-table tr {
  background: #212121 !important;
}
/* ------------ footer -------------- */
.footer {
  width: 100%;
  min-width:1116px;
  height: calc(100% - 112px);
  box-sizing: border-box;
  padding: 0 16px 16px 16px;
  background: #000;
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
.demonstration {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 2%;
}
#demonstration {
  margin-left: 2%;
}
.particulars{
  color: #FFAB3E;
  cursor: pointer;
  margin-right: 25px;
}
.message{
  color: #51D4FF;
  cursor: pointer;
}
</style>
