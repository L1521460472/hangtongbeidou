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
              style="width: 100%;height:570px"
              max-height="590"
            >
              <el-table-column
                prop="products"
                label="充值产品"
              ></el-table-column>
              <el-table-column
                prop="price"
                min-width="100"
                label="设定金额/元"
              ></el-table-column>
              <el-table-column
                prop="discounts"
                label="优惠折扣"
              ></el-table-column>
              <el-table-column
                prop="reality"
                label="实际扣费"
              ></el-table-column>
              <el-table-column
                prop="time_end"
                min-width="160"
                label="最后更新时间"
              ></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.state == 1"
                    style="opacity:0.8;"
                    class="stated"
                    >已启用</span
                  >
                  <span
                    v-if="scope.row.state == 0"
                    style="opacity:0.2;"
                    class="stated"
                    >已禁用</span
                  >
                </template>
              </el-table-column>
              <el-table-column min-width="150" label="操作">
                <template slot-scope="scope">
                  <span
                    class="particulars"
                    @click="handleDisable(scope.$index, scope.row)"
                  >
                    {{ scope.row.operation }}
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
export default {
  name: "ShoppingProduct",
  data() {
    return {
      dataList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region_discounts: "无",
        region_state: "启用",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      loading: true,
    };
  },
  methods: {
    handleDisable(index, row) {
      // var _this = this;
      console.log(index, row);
      if (row.operation == "禁用") {
        this.$confirm("确定要禁用当前产品？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log(index)
            axios.post('/rest/ShoppingProduct',{
              id : index,
              state : "0",
              operation : "启用",
            }).then((result)=>{
              console.log(result)
              row.state = "0";
              row.operation = "启用";
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
            row.state = "1";
            row.operation = "禁用";
            this.$message({
              type: "success",
              message: "启用成功!",
              center: true
            });
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
      console.log(index, row);
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
          h("span", { style: "font-size:12px;color:rgba(255,255,255,0.8);margin-right:10px;display: inline-block;width:80px;height:30px;text-align: right;" }, "状态"),
          h("select", { class:'select02', style: "width:138px;height:28px;background-color:rgba(10,10,10,0.4);border:1px solid rgba(164,164,164,0.4);color:rgba(255,255,255,0.8)" }, [
            h("option", {style:'background:#313131;'}, "启用"),
            h("option", {style:'background:#313131;'}, "禁用")
          ])
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
          row.price = document.getElementsByClassName('input')[0].value;
          row.discounts = document.getElementsByClassName('select01')[0].value;
          row.operation = document.getElementsByClassName('select02')[0].value;
          document.getElementsByClassName('input')[0].value = '';
          if(row.operation == '启用'){
              row.state = "0";
          }else{
              row.state = "1";
          }
        this.$message({
          type: "success",
          message: "修改成功!",
          center: true
        });
        }          
      }).catch(()=>{
        this.$message({
          type: "info",
          message: "已取消修改!",
          center: true
        });
      });
    }
  },
  mounted() {
    axios.post('/rest/ShoppingProduct')
    .then((result)=>{
      if(result.status === 200){
        this.loading = false;
        this.dataList = result.data;
      }
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
.state {
  color: #fff;
  opacity: 0.8;
}
</style>
