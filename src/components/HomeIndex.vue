<template>
  <div style="width: 100%; height: 100%;">
    <div class="header">
      <el-row :gutter="16">
        <el-col :span="24">
          <div class="header_nav">
            <el-row type="flex" justify="space-around">
              <el-col :span="4">
                <div class="header_list">
                  <div>订单总量/单</div>
                  <div>{{ this.totalOrder }}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="header_list">
                  <div>累计充电量/度</div>
                  <div>{{ this.accumulativeCharge }}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="header_list">
                  <div>累计营收入/元</div>
                  <div>{{ this.cumulativeRevenue }}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="header_list">
                  <div>累计用户量/人</div>
                  <div>{{ this.cumulativeUsers }}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="header_list">
                  <div>供应商企业</div>
                  <div>{{ this.supplier }}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="header_list">
                  <div>充电站点</div>
                  <div>{{ this.site }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="box"> 
      <!-- ---------- 中间部分 ------------- -->
      <div class="mian">
        <el-row :gutter="16" type="flex">
          <el-col :span="14" style="margin-left: 16px;">
            <div class="mian_list">
              <h1><span>|</span> 订单实时看板</h1>
              <div class="information">
                <dl>
                  <dt>今日订单</dt>
                  <dd>
                    <span class="mian_list_span01">|</span>
                    {{ this.todayOrder }}
                  </dd>
                </dl>
                <dl>
                  <dt>环比</dt>
                  <dd class="mian_list_dd">
                    {{ this.todayOrderRatio }}%
                    <i class="el-icon-top"></i>
                    <i class="el-icon-bottom"></i>
                  </dd>
                </dl>
                <dl>
                  <dt>本周订单</dt>
                  <dd>
                    <span class="mian_list_span01">|</span>
                    {{ this.weekOrder }}
                  </dd>
                </dl>
                <dl>
                  <dt>环比</dt>
                  <dd class="mian_list_dd">
                    {{ this.weekOrderRatio }}%
                    <i class="el-icon-top"></i>
                    <i class="el-icon-bottom"></i>
                  </dd>
                </dl>
                <dl>
                  <dt>本月订单</dt>
                  <dd>
                    <span class="mian_list_span01">|</span>
                    {{ this.monthOrder }}
                  </dd>
                </dl>
                <dl>
                  <dt>环比</dt>
                  <dd class="mian_list_dd">
                    {{ this.monthOrderRatio }}%
                    <i class="el-icon-top"></i>
                    <i class="el-icon-bottom"></i>
                  </dd>
                </dl>
              </div>
              <div class="information">
                <dl>
                  <dt>今日营收</dt>
                  <dd>
                    <span class="mian_list_span02">|</span>
                    {{ this.todayRevenue }}
                  </dd>
                </dl>
                <dl>
                  <dt>环比</dt>
                  <dd class="mian_list_dd">
                    {{ this.todayRevenueRatio }}%
                    <i class="el-icon-top"></i>
                    <i class="el-icon-bottom"></i>
                  </dd>
                </dl>
                <dl>
                  <dt>本周营收</dt>
                  <dd>
                    <span class="mian_list_span02">|</span>
                    {{ this.weekRevenue }}
                  </dd>
                </dl>
                <dl>
                  <dt>环比</dt>
                  <dd class="mian_list_dd">
                    {{ this.weekRevenueRatio }}%
                    <i class="el-icon-top"></i>
                    <i class="el-icon-bottom"></i>
                  </dd>
                </dl>
                <dl>
                  <dt>本月营收</dt>
                  <dd>
                    <span class="mian_list_span02">|</span>
                    {{ this.monthRevenue }}
                  </dd>
                </dl>
                <dl>
                  <dt>环比</dt>
                  <dd class="mian_list_dd">
                    {{ this.monthRevenueRatio }}%
                    <i class="el-icon-top"></i>
                    <i class="el-icon-bottom"></i>
                  </dd>
                </dl>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="mian_list">
              <h1><b>|</b> 充电桩实时看板</h1>
              <div class="mian_list_right01">
                <div class="information_right">
                  <dl>
                    <dt>充电桩总数</dt>
                    <dd>
                      {{ this.totalNum }}
                      <span>个</span>
                    </dd>
                  </dl>
                  <dl>
                    <dt>在线</dt>
                    <dd>
                      {{ this.online }}
                      <span>个</span>
                    </dd>
                  </dl>
                  <dl>
                    <dt>离线</dt>
                    <dd>
                      {{ this.offline }}
                      <span>个</span>
                    </dd>
                  </dl>
                </div>
                <div class="information_right">
                  <dl>
                    <dt>充电中</dt>
                    <dd>
                      {{ this.charging }}
                      <span>个</span>
                    </dd>
                  </dl>
                  <dl>
                    <dt>空闲中</dt>
                    <dd>
                      {{ this.free }}
                      <span>个</span>
                    </dd>
                  </dl>
                  <dl>
                    <dt>故障</dt>
                    <dd>
                      {{ this.fault }}
                      <span>个</span>
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mian_list_right02">
                <p>今日使用率</p>
                <el-progress
                  type="circle"
                  :width="100"
                  color="#FBD198"
                  :stroke-width="3"
                  :percentage="usage"
                  :format="format"
                  style="opacity: 1;"
                ></el-progress>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- ------ 底部 --------- -->
      <div class="footer">
        <el-row>
          <el-col :span="24">
            <div class="footer_list">
              <h1>
                <span>|</span> 用户增长趋势图
                <b>
                  <el-input
                    placeholder="请输入内容"
                    v-model="value1"
                    size="mini"
                    :disabled="true"
                  >
                  </el-input>
                  至
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    :change="changeDate()"
                  >
                  </el-date-picker>
                </b>
              </h1>
              <div
                id="echars"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                style="opacity: 0.4;"
              ></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import echarts from "echarts";
import { getCookie } from "../public";
export default {
  name: "HomeIndex",
  data() {
    return {
      value1: "",
      value2: new Date(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      arrData: [],
      brrData: [],
      crrData: [],
      xAxis_data: [],
      series_data: [],
      loading: true,
      timer:'',

      totalOrder: 0, //订单总量
      accumulativeCharge: 0, //累计充电量
      cumulativeRevenue: 0, //累计营收入
      cumulativeUsers: 0, //累计用户量
      supplier: 0, // 供应商
      site: 0, //站点

      todayOrder: 0, //今日订单
      todayRevenue: 0, //今日营收
      weekOrder: 0, //本周订单
      weekRevenue: 0, //本周营收
      monthOrder: 0, //本月订单
      monthRevenue: 0, //本月营收
      todayOrderRatio: null, //今日订单环比
      todayRevenueRatio: null, //今日营收环比
      weekOrderRatio: null, //本周订单环比
      weekRevenueRatio: null, //本周营收环比
      monthOrderRatio: null, //本月订单环比
      monthRevenueRatio: null, //本月营收环比

      totalNum: 0, //充电桩总数
      online: 0, //在线
      offline: 0, //离线
      charging: 0, //充电中
      free: 0, //空闲中
      fault: 0, //故障
      usage: 0, //使用率
    };
  },
  methods: {
    format(percentage) {
      return `${percentage}%`;
    },
    getEchartsData() {
      //获取echarts的数据
      // console.log(this.value1 + " 00:00:00")
      // console.log(this.dateToString(this.value2) + " 12:00:00")
      axios({
        method: "post",
        url: "/rest/chargeapi/sysDataController/userStatistics",
        headers: {
          Authorization: getCookie(1001),
        },
        data: {
          startTime: this.value1 + " 00:00:00",
          endTime: this.dateToString(this.value2) + " 12:00:00",
        },
      })
        .then((result) => {
          // console.log(result.data)
          this.loading = false;
          this.xAxis_data = [];
          this.series_data = [];
          result.data.data.forEach((item) => {
            this.xAxis_data.push(item.day);
            this.series_data.push(item.counts);
          });
          this.totalDistance();
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    getBrowseData() {
      //获取首页上部分的数据
      axios({
        method: "post",
        url: "/rest/chargeapi/sysDataController/dataBrowse",
        headers: {
          Authorization: getCookie(1001),
        },
      })
        .then((result) => { //成功返回数据就赋值
          // console.log(result.data.data);
          var sysOrder = result.data.data.sysOrder;
          var sysStation = result.data.data.sysStation;
          var sysData = result.data.data.sysData;

          //sysOrder
          this.todayOrder = sysOrder.todayOrder;
          this.todayRevenue = sysOrder.todayRevenue;
          this.weekOrder = sysOrder.weekOrder;
          this.weekRevenue = sysOrder.weekRevenue;
          this.monthOrder = sysOrder.monthOrder;
          this.monthRevenue = sysOrder.monthRevenue;
          this.todayOrderRatio = sysOrder.todayOrderRatio;
          this.todayRevenueRatio = sysOrder.todayRevenueRatio;
          this.weekOrderRatio = sysOrder.weekOrderRatio;
          this.weekRevenueRatio = sysOrder.weekRevenueRatio;
          this.monthOrderRatio = sysOrder.monthOrderRatio;
          this.monthRevenueRatio = sysOrder.monthRevenueRatio;

          //sysData
          this.totalOrder = sysData.totalOrder;
          this.accumulativeCharge = sysData.accumulativeCharge;
          this.cumulativeRevenue = sysData.cumulativeRevenue;
          this.cumulativeUsers = sysData.cumulativeUsers;
          this.supplier = sysData.supplier;
          this.site = sysData.site;

          //sysStation
          this.totalNum = sysStation.totalNum; //充电桩总数
          this.online = sysStation.online; //在线
          this.offline = sysStation.offline; //离线
          this.charging = sysStation.charging; //充电中
          this.free = sysStation.free; //空闲中
          this.fault = sysStation.fault; //故障
          this.usage = sysStation.usage; //使用率
        })
        .catch((err) => {
          console.error(err);
        });
    },
    totalDistance() {
      let myChart = echarts.init(document.getElementById("echars"));
      let option = {
        backgroundColor: "", //背景颜色透明
        // color: ['#1DB0B8', '#37C6C0', '#D0E9FF', '#c7353a', '#f5b91e'],
        // title: {
        //   text: "用户增长趋势图",
        //   left: "20",
        //   top: "10",
        // },
        tooltip: {
          //提示框组件
          trigger: "axis",
          formatter: "{b}<br/>{c}人",
        },
        xAxis: {
          type: "category",
          // boundaryGap: false, //不从头开始显示，从中间开始显示
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff", //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
          },
          // boundaryGap: false,
          data: this.xAxis_data,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff", //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
          },
        },
        series: [
          {
            data: this.series_data,
            type: "line",
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(98,231,255,0.39)",
                  },
                  {
                    offset: 0.34,
                    color: "rgba(98,231,255,0.25)",
                  },
                  {
                    offset: 1,
                    color: "rgba(98,231,255,0.00)",
                  },
                ]),
              },
            }, //区域颜色渐变
            // smooth: true,
            color: "#62E7FF",
          },
        ],
      };
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    changeDate() {
      var lastMonth = [];
      for (let i = 0; i < 30; i++) {
        //今天前30天
        lastMonth.unshift(
          new Date(
            new Date(this.dateToString(this.value2)).setDate(
              new Date(this.dateToString(this.value2)).getDate() - i
            )
          )
            .toJSON()
            .substring(0, 10)
        );
      }
      this.value1 = lastMonth[0];
      this.getEchartsData();
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
    changeColor(){
      this.arrData = document.getElementsByClassName("mian_list_dd");
      this.brrData = document.getElementsByClassName("el-icon-top");
      this.crrData = document.getElementsByClassName("el-icon-bottom");
      for (var i = 0; i < this.arrData.length; i++) {
        if (this.arrData[i].innerText.slice(0, 1) == "-") {
          this.arrData[i].style.color = "#33e672";
          this.brrData[i].style.display = "none";
          this.crrData[i].style.display = "inline-block";
        } else {
          this.arrData[i].style.color = "#FF4B42";
          this.brrData[i].style.display = "inline-block";
          this.crrData[i].style.display = "none";
        }
      }
    }
  },
  //渲染到页面的时候
  mounted() {
    this.getBrowseData();
    this.changeDate();
    var _this = this;
    this.timer = setInterval(() => {
      _this.getBrowseData();
      _this.changeColor();
    }, 6000000);
  },
  computed: {},
  watch: {
    monthRevenueRatio:function(){//监听monthRevenueRatio一改变就执行
      var _this = this;
      _this.$nextTick(function(){
        _this.changeColor();
      })
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  min-width: 1116px;
  height: 156px;
  background: #000000;
}
.header_nav {
  width: 100%;
  height: 100%;
  background: #212121;
  border-radius: 6px;
}
.el-row {
  width: 100%;
  height: 100%;
  box-sizing: border-box !important;
  /* margin-bottom: 8px; */
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.header .el-col-24 {
  height: 100%;
  box-sizing: border-box;
  padding: 16px 8px 0 24px !important;
}
.el-col-4 {
  height: 100%;
  box-sizing: border-box;
  padding: 12px !important;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.header_list {
  width: 100%;
  height: 100%;
  background: #313131;
  border-radius: 6px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
}
.header_list div:nth-child(1) {
  font-size: 14px;
  opacity: 0.4;
}
.header_list div:nth-child(2) {
  font-size: 24px;
  opacity: 0.8;
}

.box {
  width: 100%;
  min-width: 1116px;
  height: calc(100% - 156px);
}

/* ---------------- mian ---------------- */

.mian {
  width: 100%;
  min-width: 1116px;
  height: 40%;
  min-height: 220px;
  padding-top: 16px;
  box-sizing: border-box;
  background: #000000;
}
.mian_list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #212121;
  border-radius: 6px;
}
.mian_list h1 {
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(255, 255, 254, 1);
  opacity: 0.8;
  margin-bottom: 0;
  margin-top: 0;
}
.mian_list h1 span {
  color: #fbd198;
  margin-left: 10px;
  margin-right: 5px;
}
.mian_list h1 b {
  color: #fbd198;
  margin-left: 40px;
  margin-right: 5px;
}
.information {
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  padding-left: 20px;
  text-align: start;
  margin-top: 0;
}
.information dl {
  width: 16.66%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  padding: 3% 0;
  margin: 0;
}
.information dl dt {
  width: 100%;
  height: 40%;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 254, 1);
  opacity: 0.4;
  padding: 0;
  margin: 0;
}
.information dl dd {
  width: 100%;
  height: 50%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 254, 1);
  opacity: 0.8;
  padding: 0;
  margin: 0;
}
.mian_list_span01 {
  color: #44a9ff;
  margin-right: 5px;
}
.mian_list_span02 {
  color: #fbd198;
  margin-right: 5px;
}
.information dl .mian_list_dd {
  font-size: 12px;
  line-height: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 75, 66, 1);
}
.mian_list_right01 {
  width: 70%;
  height: 80%;
  box-sizing: border-box;
  padding-left: 50px;
  float: left;
}
.information_right {
  width: 100%;
  height: 50%;
}
.information_right dl {
  width: 33.33%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  padding: 6% 0;
  margin: 0;
}
.information_right dt {
  width: 100%;
  height: 40%;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 254, 1);
  opacity: 0.4;
  padding: 0;
  margin: 0;
}
.information_right dd {
  width: 100%;
  height: 50%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 254, 1);
  opacity: 0.8;
  padding: 0;
  margin: 0;
}
.information_right dd span {
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 254, 1);
  opacity: 0.6;
}
.mian_list_right02 {
  width: 30%;
  height: 80%;
  box-sizing: border-box;
  float: left;
  padding-top: 3.5%;
}
.mian_list_right02 p {
  font-size: 12px;
  color: #fff;
  opacity: 0.4;
  margin-left: 23%;
}

/* ---------------- 底部 ---------------- */

.footer {
  width: 100%;
  min-width: 1116px;
  height: 60%;
  min-height: 324px;
  background: #000;
  box-sizing: border-box;
}
.footer .el-col-24 {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.footer_list {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #212121;
  border-radius: 6px;
}
.footer_list h1 {
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(255, 255, 254, 1);
  opacity: 0.8;
  margin-bottom: 0;
  margin-top: 0;
}
.footer_list h1 span {
  color: #fbd198;
  margin-left: 10px;
  margin-right: 5px;
}
.footer_list h1 b {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 254, 1);
  opacity: 0.6;
  margin-left: 50px;
}
#echars {
  width: 100%;
  height: 80%;
}
.footer_list >>> .el-input {
  width: 160px !important;
}
.footer_list >>> .el-input.is-disabled .el-input__inner {
  color: rgba(255, 255, 255, 0.8) !important;
  background: #212121 !important;
}
.footer_list >>> .el-input__inner {
  color: rgba(255, 255, 255, 0.8) !important;
  background: #212121 !important;
}
.el-icon-bottom{
  display: none;
}
</style>
