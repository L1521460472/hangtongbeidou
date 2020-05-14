<template>
  <div id="header">
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="header_nav">
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="dataList"
              style="width: 100%;"
            >
              <el-table-column
                prop="name"
                label="充值产品"
              >
                <!-- <template slot-scope="scope">
                  <span
                    v-if="scope.row.status == 0"
                    style="opacity:0.8;"
                    >{{ scope.row.name }}</span
                  >
                  <span
                    v-if="scope.row.status == 1"
                    style="opacity:0.2;"
                    >{{ scope.row.name }}</span
                  >
                </template> -->
              </el-table-column>
              <el-table-column
                prop="money"
                min-width="100"
                label="设定金额/元"
              >
                <!-- <template slot-scope="scope">
                  <span
                    v-if="scope.row.status == 0"
                    style="opacity:0.8;"
                    >{{ scope.row.money }}</span
                  >
                  <span
                    v-if="scope.row.status == 1"
                    style="opacity:0.2;"
                    >{{ scope.row.money }}</span
                  >
                </template> -->
              </el-table-column>
              <el-table-column
                label="优惠折扣"
              >
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.discount == 1"
                    >无</span
                  >
                  <span
                    v-if="scope.row.discount == 0.8"
                    >8折</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="实际扣费"
              >
                <!-- <template slot-scope="scope">
                  <span
                    v-if="scope.row.status == 0"
                    style="opacity:0.8;"
                    >{{ scope.row.amount }}</span
                  >
                  <span
                    v-if="scope.row.status == 1"
                    style="opacity:0.2;"
                    >{{ scope.row.amount }}</span
                  >
                </template> -->
              </el-table-column>
              <el-table-column
                prop="update_time"
                min-width="160"
                label="最后更新时间"
              >
                <!-- <template slot-scope="scope">
                  <span
                    v-if="scope.row.status == 0"
                    style="opacity:0.8;"
                    >{{ scope.row.update_time }}</span
                  >
                  <span
                    v-if="scope.row.status == 1"
                    style="opacity:0.2;"
                    >{{ scope.row.update_time }}</span
                  >
                </template> -->
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.status == 0"
                    style="opacity:0.8;"
                    >已启用</span
                  >
                  <span
                    v-if="scope.row.status == 1"
                    style="opacity:0.2;"
                    >已禁用</span
                  >
                </template>
              </el-table-column>
              <el-table-column min-width="150" label="操作">
                <template slot-scope="scope">
                  <span
                    class="particulars"
                    v-if="scope.row.status == 0"
                    @click="handleDisable(scope.$index, scope.row)"
                  >
                    禁用
                  </span>
                  <span
                    class="particulars"
                    v-if="scope.row.status == 1"
                    @click="handleDisable(scope.$index, scope.row)"
                  >
                    启用
                  </span>
                  <span
                    class="message"
                    @click="handleModification(scope.$index, scope.row)"
                    >修改</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {getCookie} from '../../public'
export default {
  name: "ShoppingProduct",
  data() {
    return {
      dataList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        discount: "",
        status: "",
        operation:'',
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      loading: true,
      nav1:true,
      nav2:false,
    };
  },
  methods: {
    handleDisable(index, row) {
      // var _this = this;
      // console.log(index, row);
      if (row.status == 0) {
        this.$confirm("确定要禁用当前产品？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // console.log(index)
            axios({
              method: "post",
              url: "/rest/chargeapi/sysProductController/modify",
              headers: {
                Authorization: getCookie(1001)
              },
              data: {
                id: index + 1,
                status: 1,
              }
            }).then((result)=>{
              // console.log(result.data)
              row.status = result.data.data.status;
              // console.log(row.state)
              row.update_time = result.data.data.update_time;
              this.$message({
                type: "success",
                message: "禁用成功!",
                center: true
              });
            }).catch((err)=>{
              console.error(err);
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消禁用",
              center: true
            });
          });
      } else {
        this.$confirm("确定要启用当前产品？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "post",
              url: "/rest/chargeapi/sysProductController/modify",
              headers: {
                Authorization: getCookie(1001)
              },
              data: {
                id: index + 1,
                status: 0,
              }
            }).then((result)=>{
              // console.log(result.data)
              row.status = result.data.data.status;
              row.update_time = result.data.data.update_time;
              this.$message({
                type: "success",
                message: "启用成功!",
                center: true
              });
            }).catch((err)=>{
              console.error(err);
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消启用",
              center: true
            });
          });
      }
    },
    handleModification(index, row) {
      // console.log(index, row);
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("div", {class:'bbb'}, [
          h("span", { style: "font-size:12px;color:rgba(255,255,255,0.8);margin-right:10px;display: inline-block;width:80px;height:30px;text-align: right;" }, "设定金额"),
          h("input", { class:'input', style: "width:138px;height:28px;background-color:rgba(10,10,10,0.4);border:1px solid rgba(164,164,164,0.4);color:rgba(255,255,255,0.8)" }, ""),
          h("p", {style:'margin-bottom:1px'}, ""),
          h("span", { style: "font-size:12px;color:rgba(255,255,255,0.8);margin-right:10px;display: inline-block;width:80px;height:30px;text-align: right;" }, "优惠折扣"),
          h("select", { class:'select01', style: "width:138px;height:28px;background-color:rgba(10,10,10,0.4);border:1px solid rgba(164,164,164,0.4);color:rgba(255,255,255,0.8)" }, [
            h("option", {style:'background:#313131;'}, "无"),
            h("option", {style:'background:#313131;'}, "8折")
          ]),
          h("p", {style:'margin-bottom:1px'}, ""),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
          if(document.getElementsByClassName('input')[0].value == ''){
          this.$message({
          message: '修改失败，请输入金额！',
          type: 'warning',
          center: true
        });
          return
        }else{
          var select01Value = document.getElementsByClassName('select01')[0].value;
          // this.operation = document.getElementsByClassName('select02')[0].value;
          if( select01Value == '无'){
            this.discount = 1;
          }else if(select01Value == '8折'){
            this.discount = 0.8;
          }
          axios({
              method: "post",
              url: "/rest/chargeapi/sysProductController/modify",
              headers: {
                Authorization: getCookie(1001)
              },
              data: {
                id: index + 1,
                money: document.getElementsByClassName('input')[0].value,
                discount:this.discount,
              }
            }).then((result)=>{
              // console.log(result.data)
            row.money = result.data.data.money;
            row.discount = result.data.data.discount;
            row.amount = result.data.data.amount;
            row.update_time = result.data.data.update_time;
            document.getElementsByClassName('input')[0].value = '';
            this.$message({
              type: "success",
              message: "修改成功!",
              center: true
            });
          }).catch((err)=>{
            console.log(err);
          })
        }          
      }).catch(()=>{
        this.$message({
          type: "info",
          message: "已取消修改!",
          center: true
        });
      });
    },
    getDateString(date){ //转换时间格式
      var year = date.getFullYear();
      var month = (date.getMonth() + 1).toString();
      var day = date.getDate().toString();
      var time = new Date().toTimeString().substring(0,8);
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      var dateTime = year + "-" + month + "-" + day + ' ' + time;
      return dateTime;
    }
  },
  mounted() {
    axios({
      method:'post',
      url:'/rest/chargeapi/sysProductController/chargeTypeList',
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
      this.dataList = result.data.data.chargeTypeList;
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
  min-width:1116px;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  background: #000000;
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
.particulars {
  color: #ffab3e;
  cursor: pointer;
  margin-right: 25px;
}
.message {
  color: #51d4ff;
  cursor: pointer;
}
.statedd {
  color: #fff;
  opacity: 0.8;
}
</style>
