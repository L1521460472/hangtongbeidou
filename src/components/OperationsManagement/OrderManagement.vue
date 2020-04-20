<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <div class="header_select">
              <div class="sub-title">选择区域</div>
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
              <div class="sub-title">站点名称</div>
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
              <el-input
                v-model="input"
                placeholder="输入订单号/车牌号"
                clearable
              ></el-input>
            </div>
            <div class="header_button">
              <button @click="search_table">查询</button>
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
                  dataList.slice(
                    (currentPage - 1) * pagesize,
                    currentPage * pagesize
                  )
                "
                style="width: 100%;height: 570px"
                max-height="590"
              >
                <el-table-column
                  prop="order_number"
                  min-width="120"
                  label="订单号"
                ></el-table-column>
                <el-table-column
                  prop="licence_plate"
                  min-width="110"
                  label="服务单号"
                ></el-table-column>
                <el-table-column
                  prop="site_name"
                  min-width="130"
                  label="站点名称"
                ></el-table-column>
                <el-table-column
                  prop="stake_mark"
                  min-width="90"
                  label="桩号"
                ></el-table-column>
                <el-table-column
                  prop="device_type"
                  min-width="80"
                  label="设备类型"
                ></el-table-column>
                <el-table-column
                  prop="gun_numble"
                  min-width="80"
                  label="枪号"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  min-width="160"
                  label="充电时间"
                ></el-table-column>
                <el-table-column
                  prop="electric_quantity"
                  min-width="90"
                  label="已充电量/度"
                ></el-table-column>
                <el-table-column
                  prop="electric_charge"
                  min-width="80"
                  label="总费用/元"
                ></el-table-column>
                <el-table-column
                  prop="order_status"
                  class="order_status"
                  min-width="80"
                  label="订单状态"
                ></el-table-column>
              </el-table>
              <div class="footer_page">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  :page-size="pagesize"
                  :pager-count="5"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="dataList.length"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "OrderManagement",
  data() {
    return {
      options01: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value01: "",
      options02: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value02: "",
      input: "",
      dataList: [],
      result_data:[],
      currentPage: 1,
      pagesize: 10,
      loading: true,
    };
  },
  mounted() {
    axios
      .get("/rest/OrderManagement")
      .then(result => {
        // console.log(result.data)
        this.loading = false;
        this.dataList = result.data;
      })
      .catch(err => {
        this.loading = false;
        console.error(err);
      });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    search_table() {
      if (this.input == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      axios
        .get("/rest/OrderManagement")
        .then(result => {
          // console.log(result.data)
          this.loading = false;
          this.result_data = result.data;
          this.dataList = []; //每次手动将数据置空
          this.result_data.forEach((value, index) => {
            console.log(value.order_number);
            if (value.order_number == this.input) {
              this.dataList.push(value); //添加数据进去显示出来
            }
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
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
  height: 12%;
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
  box-sizing: border-box;
  background: #212121;
  border-radius: 6px;
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
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 4%;
  float: left;
}

.footer {
  width: 100%;
  height: 88%;
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
}
.footer_informatian {
  width: 100%;
  height: 100%;
}
.el-table__header >>> .el-table tr {
  background: #212121 !important;
}
.footer_page {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
}
.el-pagination {
  margin-left: 25%;
  font-weight: 400;
}
.header_select >>> .el-input {
  width: 193px !important;
}
</style>
