<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <div class="header_select">
              <div style="width:100%;height:50%">
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
              </div>
              <div style="width:100%;height:40%">
                <span>开始时间</span>
              <el-date-picker
                v-model="value_start"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
              </div>
            </div>
            <div class="header_select">
              <div style="width:100%;height:40%">
                <span>站点名称</span>
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
              <div style="width:100%;height:40%">
                <span>结束时间</span>
              <el-date-picker
                v-model="value_end"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
              </div>
            </div>
            <div class="header_select">
              <!-- <div style="width:100%;height:40%">
                <span>订单类型</span>
              <el-select v-model="value03" placeholder="请选择">
                <el-option
                  v-for="item in options03"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              </div> -->
              <div style="width:100%;height:40%">
                <span id="span">开始时间</span>
              <el-input
                v-model="input"
                placeholder="输入订单号/车牌号"
                clearable
              ></el-input>
              </div>
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
                  prop="order_number"
                  min-width="120"
                  label="订单号"
                ></el-table-column>
                <el-table-column
                  prop="service_number"
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
                  prop="time_start"
                  min-width="160"
                  label="充电开始时间"
                ></el-table-column>
                <el-table-column
                  prop="time_end"
                  min-width="160"
                  label="充电结束时间"
                ></el-table-column>
                <el-table-column
                  prop="charging_time"
                  min-width="100"
                  label="充电时长/分钟"
                ></el-table-column>
                <el-table-column
                  prop="charging_amount"
                  min-width="80"
                  label="充电量/度"
                ></el-table-column>
                <el-table-column
                  prop="electricity"
                  min-width="90"
                  label="充电电费/元"
                ></el-table-column>
                <el-table-column
                  prop="service"
                  min-width="80"
                  label="服务费/元"
                ></el-table-column>
                <el-table-column
                  prop="tatol"
                  min-width="80"
                  label="总费用/元"
                ></el-table-column>
                <el-table-column
                  prop="preferential"
                  min-width="90"
                  label="优惠金额/元"
                ></el-table-column>
                <el-table-column
                  prop="payment"
                  min-width="90"
                  label="实付金额/元"
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
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
      value_start: "",
      value_end: "",
      dataList: [],
      result_data:[],
      currentPage: 1,
      pagesize: 10,
      loading: true,
    };
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
    search_table(){
      if(this.input == '' && this.value_end == '' && this.value_start == '' && this.value02 == '' && this.value01 == ''){
        this.$message.warning('查询条件不能为空');
        return;
      }
      axios.post("/rest/RechargeRecord",{
        //{}给后台传的参数写在这
      })
      .then((result)=>{
        console.log(result)
        if(result.status === 200){
          this.loading = false;
          this.result_data = result.data;
          this.dataList = [];
          this.result_data.forEach(value => {
            if(value.order_number == this.input){
              this.dataList.push(value)
            }
          // else if(this.dateToString(this.value_start) == value.time_start.substring(0,10) && this.dateToString(this.value_end) == value.time_end.substring(0,10)){
          //   this.dataList.push(value)
          // }
        });
        this.value01 = '';
        this.value02 = '';
        this.value_start = '';
        this.value_end = '';
        this.input = '';
        }else{
          this.$message.warning('暂无数据');
        }
      })
      .catch((err)=>{
        this.loading = false;
        console.error(err)
      })
    },
      dateToString(date) {
      //日期转字符串
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString();
      var day = date.getDate().toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var dateTime = year + "-" + month + "-" + day;
      return dateTime;
    },
  },
  mounted() {
    axios.post('/rest/RechargeRecord')
    .then((result)=>{
      this.loading = false;
      this.dataList = result.data;
    })
    .catch((err)=>{
      this.loading = false;
      console.error(err);
    })
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
.header_select span{
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 4%;
  margin-top: 2%; 
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
.footer_informatian{
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
</style>
