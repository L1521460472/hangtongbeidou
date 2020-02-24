<template>
  <div>
    <div id="mymap"></div>
    <button @click="decCount">减速</button>
    <button @click="play(1)">播放</button>
    <button @click="play(2)">暂停</button>
    <button @click="play(3)">停止</button>
    <button @click="addCount">加速</button>
    <div style="border:5px solid red"> {{newTime}} </div>

    <div class="VehicleBox" style="width:300px;height:100px">
      车牌号:
      <el-row class="demo-autocomplete">
        <el-col :span="12">
          <div class="sub-title"></div>
          <el-autocomplete
            ref="vehicle"
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <br />
      开始时间:
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
          ref="startTime"
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <br />
      结束时间:
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
          ref="endTime"
          v-model="value2"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- <el-button round class="btn" @click="login">登录</el-button> -->
    <el-button round class="btn" @click="selectVehicle">搜索</el-button>
    <div id="progress">
			<div id="filldiv"></div>
			<span id="percent">0</span>
		</div>
  </div>
</template>
<script>
import ElementUI from "element-ui";
import axios from "axios";
// import {getColor} from'../public';
export default {
  data() {
    return {
      gpsArr: [], //后台拿到的gps点数组
      lushu: {}, //路书
      mycaiId: "",
      myMap: {}, //地图
      restaurants: [],
      state1: "",
      velocity: "",
      direction: "",
      gps_time: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      speed: 4000, //速度
      newTime:new Date().toLocaleString()
    };
  },
  mounted() {
    this.initMap();
    this.restaurants = this.loadAll();
    this.login()
    this._newTime = setInterval(()=>{
    this.newTime = new Date().toLocaleString()
      // console.log(this.mycaiId)
    },1000)
  },
  beforeDestroy() {
    clearInterval(this._newTime)
  },
  watch: {

  },
  methods: {
    ccc(){
    var filldiv = document.getElementById("filldiv");
 	var progress = document.getElementById("progress");
 	var percent = document.getElementById("percent");
 	var progressWidth = progress.clientWidth;
 	//alert(progressWidth)
 	//开启一个定时器
 	var timer = setInterval(autoPlay,20);
 	function autoPlay(){
 		//每一个毫秒数让filldiv的宽递增
 		filldiv.style.width = filldiv.offsetWidth + 2 + "px";
 		//filldiv背景颜色随机发生变化
 		// filldiv.style.background = getColor();
 		//percent统计进行百分比。
 		var per = parseInt((filldiv.offsetWidth/progressWidth) * 100) + "%"
 		percent.innerHTML = per;
 		
 		//直到filldiv的宽与progress的宽相等停止定时器
 		if(filldiv.offsetWidth == progressWidth){
 			clearInterval(timer);
 		}
   }
    },
    initMap() { //初始化地图
      var map = new BMap.Map("mymap");
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl({ isOpen: true }));
      map.enableScrollWheelZoom(true);
      var point = new BMap.Point(114.05525, 22.5504);
      var mapType2 = new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        anchor: BMAP_ANCHOR_TOP_RIGHT
      });
      map.addControl(mapType2);
      // 创建点坐标
      map.centerAndZoom(point, 14);
    },
    initBMap() {
      var map = new BMap.Map("mymap");

      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl({ isOpen: true }));
      map.enableScrollWheelZoom();
      var point = new BMap.Point(this.gpsArr[0].lng, this.gpsArr[0].lat);
      var mapType1 = new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        anchor: BMAP_ANCHOR_TOP_RIGHT
      });
      map.addControl(mapType1);
      //添加默认缩略地图控件
      // 创建点坐标
      map.centerAndZoom(point, 12);
      var arrPois = [];
	  var brr = [];
      for (let i = 0; i < this.gpsArr.length; i++) {
        var p0 = this.gpsArr[i].lng;
        var p1 = this.gpsArr[i].lat;
        this.gps_time = this.gpsArr[i].gpsTime;
        this.mycaiId = this.gpsArr[i].velocity + "Km/h " + this.gpsArr[i].gpsTime;
        var point = new BMap.Point(p0, p1); //118.230272,33.482474
        arrPois.push(point);
      }
      var count = 0;
      //画轨迹
      var polyLine = new BMap.Polyline(arrPois, {
        strokeColor: "blue", //设置颜色
        strokeWeight: 2, //宽度
        strokeOpacity: 0.5 //透明度
      });
      map.addOverlay(polyLine);
      //画轨迹结束
      BMapLib.LuShu.prototype._move = function(initPos, targetPos, effect,mycaiId) {
		
        var filldiv = document.getElementById("filldiv");
 	      var progress = document.getElementById("progress");
 	      var percent = document.getElementById("percent");
 	      var progressWidth = progress.clientWidth;
        var pointsArr = [initPos, targetPos]; //点数组
        var me = this,
          //当前的步长
          currentCount = 0,
          //步长，米/秒
          timer = 10,
          step = this._opts.speed / (1000 / timer),
          //初始坐标
          init_pos = this._projection.lngLatToPoint(initPos),
          //获取结束点的(x,y)坐标
          target_pos = this._projection.lngLatToPoint(targetPos),
          //总的步长
          count = Math.round(me._getDistance(init_pos, target_pos) / step);
        //如果想显示小车走过的痕迹，放开这段代码就行
        this._map.addOverlay(
          new BMap.Polyline(pointsArr, {
            strokeColor: "#111",
            strokeWeight: 3,
            strokeOpacity: 0.5
          })
        ); // 画线
        //如果小于1直接移动到下一点
        if (count < 1) {
          me._moveNext(++me.i);
          return;
        }
        me._intervalFlag = setInterval(function() {
   //        progressWidth = currentCount;
   //        filldiv.style.width = filldiv.offsetWidth + progressWidth/count + "px";
 		// //filldiv背景颜色随机发生变化
 		// // filldiv.style.background = getColor();
 		// //percent统计进行百分比。
 		// var per = parseInt((count/progressWidth) * 100) + "%"
 		// percent.innerHTML = per;
 		
 		// //直到filldiv的宽与progress的宽相等停止定时器
 		// if(filldiv.offsetWidth == progressWidth){
 		// 	clearInterval(timer);
 		// }

          //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
          if (currentCount >= count) {
            clearInterval(me._intervalFlag);
            //移动的点已经超过总的长度
            if (me.i > me._path.length) {
              return;
            }
            //运行下一个点
            me._moveNext(++me.i);
          } else {
            currentCount++;
			
            var x = effect(init_pos.x, target_pos.x, currentCount, count),
              y = effect(init_pos.y, target_pos.y, currentCount, count),
              pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
            //设置marker
            if (currentCount == 1) {
              var proPos = null;
              if (me.i - 1 >= 0) {
                proPos = me._path[me.i - 1];
              }
              if (me._opts.enableRotation == true) {
                me.setRotation(proPos, initPos, targetPos);
              }
              if (me._opts.autoView) {
                if (!me._map.getBounds().containsPoint(pos)) {
                  me._map.setCenter(pos);
                }
              }
            }
            //正在移动
            me._marker.setPosition(pos,mycaiId);
            //设置自定义overlay的位置
            me._setInfoWin(pos,mycaiId);
          }
        }, timer);
      };
      BMapLib.LuShu.prototype.changeSpeed = function (times) {
            var now = parseInt(times) ? parseInt(times) : this._opts.speed;
            if (now > 0 && now < 10) {
                this._opts.speed = this._defaultSpeeds * times;
            }
        },
      this.initLushu(map, arrPois, this.mycaiId);
    },
    initLushu(map, arrPois, mycaiId) {
      this.lushu = new BMapLib.LuShu(map, arrPois, {
        defaultContent: mycaiId, 
        autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon(
          "http://developer.baidu.com/map/jsdemo/img/car.png",
          new BMap.Size(52, 26),
          {
            anchor: new BMap.Size(27, 13)
          }
        ),
        speed: this.speed,
        enableRotation: true, //是否设置marker随着道路的走向进行旋转
        landmarkPois:
        [
          {
            lng: 116.306954,
            lat: 40.05718,
            html: "加油站",
            pauseTime: 2
          }
        ]
      });
    },
    play(val) {
      if (this.arrIndex >= this.gpsArr.length - 3) {
        this.arrIndex = 0;
      }
      switch (val) {
        case 1:
          this.lushu.start();
          break;
        case 2:
          this.lushu.pause();
          break;
        case 3:
          this.lushu.stop();
          this.arrIndex = 0;
          this.percentage = 0;
          break;
      }
    },
    decCount() {
      if (this.speed == 1000) {
        this.speed = 1000;
      } else {
        this.speed -= 2000;
        console.log(this.speed);
        this.initBMap();
        this.lushu.start();
      }
    },
    addCount() {
      // if (this.speed == 19000) {
      //   this.speed = 19000;
      // } else {
      //   this.speed += 2000;
      //   console.log(this.speed);
      //   this.initBMap();
      //   this.lushu.start();
      // }
      this.lushu.changeSpeed(4);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "比亚迪泥头车" }];
    },
    handleSelect(item) {
      console.log(item);
    },
    selectVehicle() {
      var startTime = this.$refs.startTime.value;
      var endTime = this.$refs.endTime.value;
      axios
        .post(
          "/rest/busapi/vehicle/trackPlaybackQuery",
          {
            mapType: 1,
            vehicleNo: this.$refs.vehicle.value,
            startTime: this.dateToString(startTime),
            endTime: this.dateToString(endTime)
          },
          {
            headers: {
              Authorization: this.token,
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res.data);
          this.gpsArr = res.data.data.track;
          this.initBMap();
          this.lushu.start();
        });
    },
    curt(gpsArr){
      var m = gpsArr.slice(1);
      return m
    },
    login() {
      axios
        .post("/rest/userapi/appLoginController/login", {
          pushPlatform: "0",
          userName: "LOGOCS02",
          userPassword: "123456"
        })
        .then(res => {
          console.log(res.data);
          this.token = res.data.data.token;
        });
    },
    

    dateToString(date) {
      var str = "";
      var weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];

      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var f = date.getMinutes();
      var s = date.getSeconds();
      var w = date.getDay(); //0-6

      str += y + "-" + this.getDb(m) + "-" + this.getDb(d) + " ";
      str += this.getDb(h) + ":" + this.getDb(f);

      //m是一个个位数，在个位数前加0；
      //封装一个前面加的方法
      return str;
    },
    getDb(num) {
      //小于10的数，前面加0
      return num < 10 ? "0" + num : num;
    }
  }
};
</script>
<style scoped>
#mymap {
  widows: 100%;
  height: 500px;
  background: #ccc;
}
.btn {
  margin-left: 400px;
}
#progress{
			position: relative;
			margin: auto;
			top: 200px;
			display: block;
			width: 400px;
			height: 20px;
			border-style: dotted;
			border-width: thin;
			border-color: darkgreen;
		}
		#filldiv{
			position:absolute;
			top: 0px;
			left: 0px;
			width: 0px;
			height: 20px;
			background: blue;
		}
		#percent{
			position: absolute;
			top: 0px;
			left: 200px;
			
		}
</style>
