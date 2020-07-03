<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <div class="header_navTop">
              <div class="header_select">
              <div class="sub-title">用户账号</div>
              <el-input
                v-model="input1"
                placeholder="请输入用户账号"
                clearable
              ></el-input>
            </div>
            <div class="header_select">
              <div class="sub-title">订单状态</div>
              <el-select v-model="value03" placeholder="请选择">
                <el-option
                  v-for="item in options03"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="header_select">
              <div class="sub-title">站点名称</div>
              <el-input
                v-model="input0"
                placeholder="请输入站点名称"
                clearable
              ></el-input>
            </div>
            <div class="header_select">
              <div class="sub-title">订单号</div>
              <el-input
                v-model="input"
                placeholder="请输入订单号"
                clearable
              ></el-input>
            </div>
            </div>
            <div class="header_navButtom">
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
                :data="dataList"
                style="width: 100%; height: 100%;"
              >
                <el-table-column
                  prop="number"
                  min-width="80"
                  label="序号"
                  align="center"
                ></el-table-column>
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
                  label="充电时间"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="degree"
                  min-width="90"
                  label="已充电量/度"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="deduct_our"
                  min-width="90"
                  label="折扣优惠/元"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="pay_money"
                  min-width="80"
                  label="总费用/元"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="order_status"
                  class="order_status"
                  min-width="80"
                  label="订单状态"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.order_status == 0" class="stated"
                      >预订单</span
                    >
                    <span v-if="scope.row.order_status == 1" class="stated0"
                      >启动异常</span
                    >
                    <span v-if="scope.row.order_status == 2" class="stated1"
                      >充电中</span
                    >
                    <span v-if="scope.row.order_status == 3" class="stated2"
                      >已完成</span
                    >
                    <span v-if="scope.row.order_status == 4" class="stated"
                      >停止异常</span
                    >
                  </template>
                </el-table-column>
                <el-table-column min-width="80" label="支付状态" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">未支付</span>
                    <span v-if="scope.row.status == 2">-</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="footer_page">
              <el-pagination
                @size-change="handleSizeChange($event,value03,input0)"
                @current-change="handleCurrentChange($event,value03,input0)"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size.sync="pagesize"
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
import axios from "axios";
import { getCookie } from "../../public";
export default {
  name: "OrderManagement",
  data() {
    return {
      options03: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "启动异常",
        },
        {
          value: "2",
          label: "充电中",
        },
        {
          value: "3",
          label: "已完成",
        },
        {
          value: "4",
          label: "停止异常",
        },
      ],
      value03: "",
      input0: "",
      input1: "",
      input: "",
      dataList: [],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      total: 10,
    };
  },
  mounted() {
    this.getInit();
  },
  methods: {
    handleSizeChange(val,s,q) {
      // console.log(`每页 ${val} 条`);
      this.loading = true;
      axios({
        method: "post",
        url: "/rest/chargeapi/sysOrderController/orderList",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          order_status: s,
          station_name: q,
          pageNum: 1,
          pageSize: val,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.orderList;
          this.total = result.data.data.totalNum;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNum;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    handleCurrentChange(val,s,q) {
      // console.log(`当前页: ${val}`);
      axios({
        method: "post",
        url: "/rest/chargeapi/sysOrderController/orderList",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          order_status: s,
          station_name: q,
          pageNum: val,
          pageSize: this.pagesize,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.orderList;
          this.total = result.data.data.totalNum;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNum;
          // this.dataList = result.data;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    search_table() {
      //查询
      axios({
        method: "post",
        url: "/rest/chargeapi/sysOrderController/orderList",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          username:this.input1,
          order_status: this.value03,
          station_name: this.input0,
          order_no: this.input,
          pageNum: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.orderList;
          this.total = result.data.data.totalNum;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNum;

        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    getInit(){
      axios({
      method: "post",
      url: "/rest/chargeapi/sysOrderController/orderList",
      headers: {
        Authorization: getCookie(1001),
      },
      data: {
        pageNum: 1,
        pageSize: 10,
      },
    })
      .then((result) => {
        // console.log(result.data)
        this.loading = false;
        this.dataList = result.data.data.orderList;
        this.total = result.data.data.totalNum;
        this.pagesize = result.data.data.pageSize;
        this.currentPage = result.data.data.pageNum;

        this.value03 = '';
        this.input = '';
        this.input0 = '';
        this.input1 = '';
      })
      .catch((err) => {
        this.loading = false;
        console.error(err);
      });
    },
    reset(){
      this.getInit();
    }
  },
  watch: {
    // pagesize:function(){
    //   var _this = this;
    //   _this.$nextTick(function(){
    //     _this.handleSizeChange();
    //   })
    // }
  },
};
</script>
<style scoped>
#header {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  min-width: 1116px;
  height: 150px;
  box-sizing: border-box;
  background: #000;
  padding: 16px;
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
#span {
  opacity: 0;
}
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
  padding-left: 40px;
}
.header_navButtom button {
  width: 80px;
  height: 34px;
  background: #c79659;
  border-radius: 6px;
  border: 1px solid #c79659;
  font-size: 14px;
  color: #212121;
  cursor: pointer;
  margin-right: 10px;
}
.sub-title {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 6%;
}
.header_select {
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 4%;
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
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 4%;
  float: left;
}
.el-table__header >>> .el-table tr {
  background: #212121 !important;
}
.footer {
  width: 100%;
  min-width: 1116px;
  height: calc(100% - 150px);
  background: #000;
  box-sizing: border-box;
  padding: 16px;
  padding-top: 0;
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
.el-pagination {
  font-weight: 400;
}
.el-input {
  width: 160px;
}
/* el-table__body-wrapper is-scrolling-left */
.el-table >>> .el-table__body-wrapper {
  width: 100%;
  height: calc(100% - 48px);
  overflow-y: auto;
}

/* 启动停止异常字体颜色 */
.stated0 {
  color: #ff5959;
}
/* 充电中字体颜色 */
.stated1 {
  color: #3bffb3;
}
/* 已完成字体颜色 */
.stated2 {
  color: #ff9b59;
}
</style>
