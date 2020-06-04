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
              :data="
                dataList
              "
              style="width: 100%;height:100%;"
            >
              <el-table-column
                prop="number"
                min-width="80"
                label="序号"
              ></el-table-column>
              <el-table-column
                prop="realname"
                min-width="110"
                label="名称"
                :show-overflow-tooltip='true'
              ></el-table-column>
              <el-table-column
                prop="app_version"
                min-width="100"
                label="类型"
              ></el-table-column>
              <el-table-column
                prop="phone"
                min-width="110"
                label="面额/元"
              ></el-table-column>
              <el-table-column
                prop="username"
                min-width="100"
                label="使用门槛"
              ></el-table-column>
              <el-table-column
                prop="balance"
                min-width="90"
                label="状态"
              ></el-table-column>
              <el-table-column
                prop="register_time"
                min-width="150"
                label="有效期"
              ></el-table-column>
              <el-table-column
                prop="total_order"
                min-width="100"
                label="数量/张"
              ></el-table-column>
              <el-table-column
                prop="total_recharge"
                min-width="90"
                label="描述"
              ></el-table-column>
              <el-table-column
                prop="total_fee"
                min-width="90"
                label="创建时间"
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
            </div>

            <div class="footer_page">
              <el-pagination
                @size-change="handleSizeChange($event,value_start,value_end)"
                @current-change="handleCurrentChange($event,value_start,value_end)"
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
export default {
    name:'VoucherAllocation',
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
      value01:'',
      value02:'',
      options01:[
          {
          value: "",
          label: "全部",
        },
      ],
      options02:[
          {
          value: "",
          label: "全部",
        },
      ],
      input1: "",
      value_start: "",
      value_end: "",
      dataList: [],
      currentPage: 1,
      pagesize: 10,
      loading: true,
      total:10,
        }
    },
    methods: {
        search(){

        },
        reset(){

        },
        creation(){

        },
    },
    mounted() {
        this.loading = false;
    },
}
</script>
<style scoped>
#header {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  min-width:1116px;
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
.header_navTop{
  width: 100%;
  height: 50%;
}
.header_navButtom{
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 40px;
}
.header_navButtom button{
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
  min-width:1116px;
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