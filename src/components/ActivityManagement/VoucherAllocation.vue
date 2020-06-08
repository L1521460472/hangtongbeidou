<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <div class="header_navTop">
              <div class="header_select">
                <div class="sub-title">类型</div>
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
              <div class="header_data">
                <span class="demonstration">创建时间</span>
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
            </div>
            <div class="header_navButtom">
              <button @click="search">查询</button>
              <button @click="reset">重置</button>
              <button @click="creation">创建</button>
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
                <el-table-column prop="id" min-width="80" label="序号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0"
                      >{{ scope.$index + (currentPage - 1) * pagesize + 1 }}
                    </span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;"
                      >{{ scope.$index + (currentPage - 1) * pagesize + 1 }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  min-width="110"
                  label="名称"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{
                      scope.row.name
                    }}</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;">{{
                      scope.row.name
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" min-width="80" label="类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type == 1 && scope.row.status == 0"
                      >代金券</span
                    >
                    <span
                      v-if="scope.row.type == 1 && scope.row.status == 1"
                      style="opacity: 0.4;"
                      >代金券</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="denomination"
                  min-width="80"
                  label="面额/元"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{
                      scope.row.denomination
                    }}</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;">{{
                      scope.row.denomination
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="useThreshold"
                  min-width="80"
                  label="使用门槛"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{
                      scope.row.useThreshold
                    }}</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;">{{
                      scope.row.useThreshold
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="status" min-width="80" label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">启用</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;"
                      >禁用</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="expireTime"
                  min-width="140"
                  label="有效期"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{
                      scope.row.expireTime
                    }}</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;">{{
                      scope.row.expireTime
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="number" min-width="80" label="数量/张">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{
                      scope.row.number
                    }}</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;">{{
                      scope.row.number
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="description"
                  min-width="120"
                  :show-overflow-tooltip="true"
                  label="描述"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{
                      scope.row.description
                    }}</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;">{{
                      scope.row.description
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  min-width="140"
                  label="创建时间"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">{{
                      scope.row.createTime
                    }}</span>
                    <span v-if="scope.row.status == 1" style="opacity: 0.4;">{{
                      scope.row.createTime
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column min-width="80" label="操作">
                  <template slot-scope="scope">
                    <span
                      class="disparticulars"
                      v-if="scope.row.status == 0"
                      @click="handleDisable(scope.$index, scope.row)"
                    >
                      禁用
                    </span>
                    <span
                      class="isparticulars"
                      v-if="scope.row.status == 1"
                      @click="handleDisable(scope.$index, scope.row)"
                    >
                      启用
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="footer_page">
              <el-pagination
                @size-change="handleSizeChange($event, value02, value_start, value_end)"
                @current-change="
                  handleCurrentChange($event, value02, value_start, value_end)
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
  name: "VoucherAllocation",
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
          label: "代金券",
        },
      ],
      options02: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "0",
          label: "启用",
        },
        {
          value: "1",
          label: "禁用",
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
      if (this.value_start == "" || this.value_start == null) {
        this.value_start = "";
      } else {
        if (this.value_start.length == 10) {
          this.value_start = this.value_start;
        } else {
          this.value_start = dateToString(this.value_start);
        }
      }
      if (this.value_end == "" || this.value_end == null) {
        this.value_end = "";
      } else {
        if (this.value_end.length == 10) {
          this.value_end = this.value_end;
        } else {
          this.value_end = dateToString(this.value_end);
        }
      }
      //发送请求
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherSetController/list",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          status: this.value02,
          startTime:
            this.value_start == "" ? "" : this.value_start + " 00:00:00",
          endTime: this.value_end == "" ? "" : this.value_end + " 23:59:59",
          pageNo: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.loading = false;
          this.dataList = result.data.data.recordList;
          this.total = result.data.data.totalCount;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNo;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    reset() {
      this.getData();
    },
    creation() {
      this.$router.push("CreateVoucher");
    },
    handleDisable(index, row) {
      // var _this = this;
      // console.log(index, row);
      if (row.status == 0) {
        this.$confirm("确定要禁用当前产品？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            axios({
              method: "post",
              url: "/rest/chargeapi/voucherSetController/enableOrdisable",
              headers: {
                Authorization: getCookie(1001),
              },
              data: {
                id: index + 1,
                // status: 1,
              },
            })
              .then((result) => {
                // console.log(result.data)
                row.status = result.data.data.status;
                this.$message({
                  type: "success",
                  message: "禁用成功!",
                  center: true,
                });
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消禁用",
              center: true,
            });
          });
      } else {
        this.$confirm("确定要启用当前产品？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            axios({
              method: "post",
              url: "/rest/chargeapi/voucherSetController/enableOrdisable",
              headers: {
                Authorization: getCookie(1001),
              },
              data: {
                id: index + 1,
                // status: 0,
              },
            })
              .then((result) => {
                // console.log(result.data)
                row.status = result.data.data.status;
                this.$message({
                  type: "success",
                  message: "启用成功!",
                  center: true,
                });
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消启用",
              center: true,
            });
          });
      }
    },
    getData() {
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherSetController/list",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          pageNo: 1,
          pageSize: 10,
        },
      })
        .then((result) => {
          // console.log(result.data);
          this.loading = false;
          this.dataList = result.data.data.recordList;
          this.total = result.data.data.totalCount;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNo;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    handleSizeChange(val, status,start, end) {
      // console.log(`每页 ${val} 条`);
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherSetController/list",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          status:status,
          startTime: start,
          endTime: end,
          pageNo: 1,
          pageSize: val,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.recordList;
          this.total = result.data.data.totalCount;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNo;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    handleCurrentChange(val,status, start, end) {
      // console.log(`当前页: ${val}`);
      axios({
        method: "post",
        url: "/rest/chargeapi/voucherSetController/list",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          status:status,
          startTime: start,
          endTime: end,
          pageNo: val,
          pageSize: this.pagesize,
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.dataList = result.data.data.recordList;
          this.total = result.data.data.totalCount;
          this.pagesize = result.data.data.pageSize;
          this.currentPage = result.data.data.pageNo;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
  },
  mounted() {
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
  margin-right: 2%;
}
#demonstration {
  margin-left: 2%;
}
.isparticulars {
  color: #db9d4f;
  cursor: pointer;
  margin-right: 25px;
}
.disparticulars {
  color: #ff4141;
  cursor: pointer;
  margin-right: 25px;
}
.message {
  color: #51d4ff;
  cursor: pointer;
}
</style>
