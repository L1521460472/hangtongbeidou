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
                <div class="sub-title">平台类型</div>
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
                <div class="sub-title">状态</div>
                <el-select v-model="value02" placeholder="请选择">
                  <el-option
                    v-for="item in options02"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="header_select">
                <div class="sub-title">使用时间</div>
                <el-date-picker
                  v-model="value_start"
                  type="date"
                  placeholder="请选择使用时间"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="header_navButtom">
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
                :data="dataList"
                style="width: 100%; height: 100%;"
              >
                <el-table-column
                  prop="id"
                  min-width="80"
                  label="序号"
                ></el-table-column>
                <el-table-column
                  prop="user_id"
                  min-width="80"
                  label="用户ID"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column
                  prop="username"
                  min-width="100"
                  label="用户账号"
                ></el-table-column>
                <el-table-column
                  prop="plat_type"
                  min-width="80"
                  label="平台类型"
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
                <el-table-column prop="type" min-width="80" label="类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type == 1">代金券</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="denomination"
                  min-width="80"
                  label="总面值/元"
                ></el-table-column>
                <el-table-column prop="status" min-width="80" label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">未使用</span>
                    <span v-if="scope.row.status == 1">已使用</span>
                    <span v-if="scope.row.status == 2">已过期</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="is_enabled"
                  min-width="80"
                  label="是否禁用"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.is_enabled == 0">启用</span>
                    <span v-if="scope.row.is_enabled == 1">禁用</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="get_time"
                  min-width="130"
                  label="领取时间"
                ></el-table-column>
                <el-table-column
                  prop="use_time"
                  min-width="130"
                  label="使用时间"
                ></el-table-column>
              </el-table>
            </div>
            <div class="footer_page">
              <el-pagination
                @size-change="
                  handleSizeChange(
                    $event,
                    input1,
                    value01,
                    value02,
                    value_start
                  )
                "
                @current-change="
                  handleCurrentChange(
                    $event,
                    input1,
                    value01,
                    value02,
                    value_start
                  )
                "
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
import axios from "axios";
import { getCookie, dateToString } from "../../public";
export default {
  name: "VoucherManagement",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      pickerOptionEnd: {
        disabledDate: (time) => {
          if (this.value_start) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(this.value_start).getTime() - 8.64e6
            );
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
      value01: "",
      value02: "",
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
      options02: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "未使用",
        },
        {
          value: "1",
          label: "已使用",
        },
        {
          value: "2",
          label: "已过期",
        },
      ],
      input1: "",
      value_start: "",
      value_end: "",
      dataList: [],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      total: 10,
    };
  },
  methods: {
    search() {
      //判断是否输入日期
      if (this.value_start == "" || this.value_start == null) {
        this.value_start = "";
      } else {
        if (this.value_start.length == 10) {
          this.value_start = this.value_start;
        } else {
          this.value_start = dateToString(this.value_start);
        }
      }
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherController/list",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          username: this.input1,
          type: this.value01,
          status: this.value02,
          use_date: this.value_start,
          pageNum: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.list;
          this.total = result.data.data.totalNum;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNum;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    reset() {
      this.getData();
    },
    getData() {
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherController/list",
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
          this.dataList = result.data.data.list;
          this.total = result.data.data.totalNum;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNum;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    handleSizeChange(val, id, type, status, time) {
      // console.log(`每页 ${val} 条`);
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherController/list",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          username: id,
          type: type,
          status: status,
          use_date: time,
          pageNum: 1,
          pageSize: val,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.list;
          this.total = result.data.data.totalNum;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNum;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    handleCurrentChange(val, id, type, status, time) {
      // console.log(`当前页: ${val}`);
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherController/list",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          username: id,
          type: type,
          status: status,
          use_date: time,
          pageNum: val,
          pageSize: this.pagesize,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.list;
          this.total = result.data.data.totalNum;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNum;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
  },
  mounted() {
    this.loading = false;
    this.getData();
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
  padding-left: 2.5%;
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
  min-width: 1116px;
  height: calc(100% - 150px);
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
.el-table >>> .el-table__body-wrapper {
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
  margin-right: 6%;
}
#demonstration {
  margin-left: 2%;
}
.particulars {
  color: #ffab3e;
  cursor: pointer;
  margin-right: 25px;
}
.message {
  color: #51d4ff;
  cursor: pointer;
}
</style>
