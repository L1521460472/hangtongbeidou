<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <div class="header_select">
              <div style="width:100%;height:40%">
                <span>手机号码</span>
                <el-input
                  v-model="input1"
                  placeholder="输入手机号"
                ></el-input>
              </div>
              <div style="width:100%;height:40%">
                <span id="span">开始时间</span>
                <el-input
                  v-model="input2"
                  placeholder="输入订单号/车牌号"
                ></el-input>
              </div>
            </div>
            <div class="header_data">
              <span class="demonstration">注册时间</span>
              <el-date-picker
                v-model="value_start"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
              <span id="demonstration" class="demonstration">至</span>
              <el-date-picker
                v-model="value_end"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <div class="header_button">
              <button>查询</button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="footer">
      <el-row>
        <el-col :span="24">
          <div class="footer_nav">
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
              style="width: 100%;height:570px"
              max-height="590"
            >
              <el-table-column
                prop="number"
                min-width="80"
                label="序号"
              ></el-table-column>
              <el-table-column
                prop="userId"
                min-width="110"
                label="用户ID"
              ></el-table-column>
              <el-table-column
                prop="versions"
                min-width="100"
                label="APP版本号"
              ></el-table-column>
              <el-table-column
                prop="phone"
                min-width="110"
                label="手机号码"
              ></el-table-column>
              <el-table-column
                prop="username"
                min-width="100"
                label="用户账号"
              ></el-table-column>
              <el-table-column
                prop="user_balance"
                min-width="80"
                label="用户余额"
              ></el-table-column>
              <el-table-column
                prop="time"
                min-width="160"
                label="注册时间"
              ></el-table-column>
              <el-table-column
                prop="order_history"
                min-width="100"
                label="历史订单数量"
              ></el-table-column>
              <el-table-column
                prop="recharge_tatol"
                min-width="100"
                label="总充值金额"
              ></el-table-column>
              <el-table-column
                prop="consumption_tatol"
                min-width="100"
                label="总消费金额"
              ></el-table-column>
              <el-table-column min-width="250" label="操作">
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "RechargeRecord",
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
      input1: "",
      input2: "",
      value_start: "",
      value_end: "",
      dataList: [
        {
          number: "1",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },
                {
          number: "2",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "3",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "4",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "5",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "6",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "7",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "8",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "9",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "10",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "11",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "12",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },

        {
          number: "13",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },
        {
          number: "14",
          userId: "201908125478",
          versions: "1.0.0",
          phone: "13100000000",
          username: "李先生",
          user_balance: "0",
          time: "2019-07-08  14:23:56",
          order_history: "9",
          recharge_tatol: "99",
          consumption_tatol: "90",
        },
      ],
      currentPage: 1,
      pagesize: 10,
      loading: true,
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleEdit(index, row) {
        console.log(index, row);
        this.$message({
          message: '功能建设中...',
          center: true,
          type: 'success'
        });
      },
    handleDelete(index, row) {
      console.log(index, row);
      this.$message({
          message: '功能建设中...',
          center: true,
          type: 'success'
        });
    }
  },
  mounted() {
    this.loading = false;
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
  height: 20%;
  box-sizing: border-box;
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
.header_select {
  width: 30%;
  height: 100%;
  padding: 2.5% 0;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
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
  margin-top: 2%;
}
.header_data {
  width: 60%;
  height: 100%;
  padding: 2.5% 0;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  box-sizing: border-box;
  padding-left: 4%;
  float: left;
}
.el-input {
  width: 193px;
}
.header_button {
  align-items: flex-end !important;
  box-sizing: border-box;
  padding-bottom: 3%;
}

/* ------------ footer -------------- */
.footer {
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding: 0 16px 16px 16px;
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
.demonstration {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 2%;
  margin-top: 0.8%;
}
#demonstration {
  margin-left: 15%;
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
