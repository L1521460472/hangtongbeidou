<template>
	<div class="home">
		<div id="map_canvas"></div>
		<div id="result"></div>
		<button id="run2">减速x2</button>
		<button id="run">开始</button>
		<button id="run3">加速x2</button>
		<!-- <button id="resetSpeed">重置速度</button> -->
		<!-- <button id="back">快退</button> -->
		<button id="stop">停止</button>
		<button id="pause">暂停</button>
		<!-- <button id="hide">隐藏信息窗口</button> -->
		<!-- <button id="show">展示信息窗口</button> -->

		<!-- <button @click="selectVehicle">搜索</button> -->
		<hr>
		<!-- <el-progress id="pro_gress" :percentage="countm" :format="format" :stroke-width="10" ></el-progress>
		<c-progress class="c-progress" :percent="countm" :show-slider="true" :width="1200"/> -->
		<div class="block">
    <!-- <span class="demonstration">默认</span> -->
    <el-slider v-model="value9" :show-tooltip="false" style="width:100%"></el-slider>
  </div>
		<hr>
		<!-- <div class="VehicleBox" style="width:300px;height:100px">
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
		</div> -->
		<el-button round class="btn" @click="selectVehicle">搜索</el-button>

	<div>
		<!-- <el-button @click="show3 = !show3">Click Me</el-button>
		  <transition name="el-zoom-in-bottom">
			  <div v-show="show3">
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
			  </div>
			  
      </transition> -->
<!-- <el-button @click="show3 = !show3">Click Me</el-button> -->
	  <el-collapse-transition>
        <div v-show="show3">
          <div class="VehicleBox" style="width:300px;height:100px">
		  车牌号:
		  <el-row class="demo-autocomplete">
			<el-col :span="12">
			  <div class="sub-title"></div>
			  <el-autocomplete
				ref="vehicle"
				class="inline-input"
				v-model="state1"
				size="mini"
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
			  size="mini"
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
			  size="mini"
			  type="datetime"
			  placeholder="选择日期时间"
			  align="right"
			  :picker-options="pickerOptions"
			>
			</el-date-picker>
		  </div>
		</div>
        </div>
      </el-collapse-transition>

    </div>
	</div>
	
</template>

<script>
	import axios from "axios";
	import "../LuShu.js";
	import "../public";
	export default {
		name: "homeAbout",
		data() {
			return {
				show3:false,
				gpsArr: [
					// new BMap.Point(108.988452, 34.392405),
					// new BMap.Point(108.945046, 34.381442),
					// new BMap.Point(108.915438, 34.372742),
					// new BMap.Point(108.844579, 34.355817),
					// new BMap.Point(108.767253, 34.34628),
					// new BMap.Point(108.740663, 34.349856),
					// new BMap.Point(108.67268, 34.336861),
					// new BMap.Point(108.571351, 34.305735),
					// new BMap.Point(108.4946, 34.296431),
					// new BMap.Point(108.518136, 34.299728),
					// new BMap.Point(108.558452, 34.302405),
					// new BMap.Point(108.575046, 34.311442),
					// new BMap.Point(108.585438, 34.322742),
					// new BMap.Point(108.594579, 34.335817),
					// new BMap.Point(108.607253, 34.34628),
					// new BMap.Point(108.610663, 34.349856),
					// new BMap.Point(108.62268, 34.356861),
					// new BMap.Point(108.631351, 34.365735),
					// new BMap.Point(108.644946, 34.376431),
					// new BMap.Point(108.658136, 34.389728),

					// new BMap.Point(108.658836, 34.402405),
					// new BMap.Point(108.668836, 34.492405),
					// new BMap.Point(108.678836, 34.498405),
					// new BMap.Point(108.681836, 34.502405),
					// new BMap.Point(108.688836, 34.512405),
					// new BMap.Point(108.718836, 34.592405),
					// new BMap.Point(108.728836, 34.612405),
					// new BMap.Point(108.738836, 34.616405),
					// new BMap.Point(108.748836, 34.622405),
				],
				speed: 400,
				mycaiId:new Date().toLocaleString(),
				state1: "",
				restaurants: [],
				map: new BMap.Map('map_canvas'),
				countm:0,
				poiList:[],
				poiList1:[],
				poiList2:[],
				sList:[],
				count1:0,
				step1:0,
				s:0,
				s1:0,
				Timer:'',

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
				value9:0,
			};
		},
		components: {
		},
		mounted() {
			this.restaurants = this.loadAll();
			this.todoBMap();
			this.login();
			
		},
		methods: {
			formatTooltip(val) {
        return val / 100;
      },	
// 			onPercentChange (countm) {
//     console.log(countm)
// },
		format(percentage) {
		      // return percentage === 100 ? `${percentage}%` : `${percentage}%`;
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
			      // {
			      //   mapType: 1,
			      //   vehicleNo: this.$refs.vehicle.value,
			      //   startTime: this.dateToString(startTime),
			      //   endTime: this.dateToString(endTime)
			      // },
				  {
				    mapType: 1,
				    vehicleNo: "粤BA09925",
				    startTime: "2020-01-14 00:00:00",
				    endTime: "2020-01-14 23:59:59"
				  },
			      {
			        headers: {
			          Authorization: this.token,
			          "Content-Type": "application/json"
			        }
			      }
			    )
			    .then(res => {
			      this.gpsArr = res.data.data.track;
				  this.getTotalMil();
			      this.todoMap();
			    });
			},
			curt(gpsArr){
			  var m = gpsArr.slice(1);
			  return m
			},
			login() {
			  axios
			    .post("/rest/userapi/appLoginController/login", {
			      "pushPlatform": "0",
			      "userName": "LY2019",
			      "userPassword": "123456",
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
			},
			rad(d) {
				return d * Math.PI / 180.0;
			},
			GetDistance(lat1, lng1, lat2, lng2) {
				var EARTH_RADIUS = 6378.137;
				var radLat1 = this.rad(lat1);
				var radLat2 = this.rad(lat2);
				var a = radLat1 - radLat2;
				var b = this.rad(lng1) - this.rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000;
				return s;
			},
			getTotalMil() {
				//var s1 = 0;
				var lat1, lng1, lat2, lng2;
				for (var i = 0; i < this.gpsArr.length; i++) {
					lat2 = this.gpsArr[i].lat;
					lng2 = this.gpsArr[i].lng;
					this.speed = this.gpsArr[i].velocity;
					if (i == 0) {
						lat1 = lat2;
						lng1 = lng2;
						continue;
					} else if (i <= this.gpsArr.length - 1) {
						this.s1 = this.GetDistance(lat1, lng1, lat2, lng2);
						if(this.s1 > 0.020){
							var point = new BMap.Point(lng2, lat2); //118.230272,33.482474
							this.sList.push(point);
						}
						this.s += this.s1;
					}
					lat1 = lat2;
					lng1 = lng2;
				}
				return this.s1;
				
			 },
			// getTotalMil2() {
			// 	var s1 = 0;
			// 	for (var i = 0; i < this.gpsArr.length; i++) {
			// 		if (i < this.gpsArr.length - 1) {
			// 			s1 = this.map.getDistance(this.gpsArr[i], this.gpsArr[i + 1]);
			// 			this.s += s1;
			// 		}
			// 		console.log(this.s);
			// 	}
			// 	return this.s;
			// },
			//初始化地图
			todoBMap() {
				this.map = new BMap.Map('map_canvas');
				var map = this.map;
				// map.enableScrollWheelZoom();
				map.addControl(new BMap.NavigationControl());
				map.addControl(new BMap.ScaleControl());
				map.addControl(new BMap.OverviewMapControl({
					isOpen: true
				}));
				map.enableScrollWheelZoom();
				map.centerAndZoom('深圳', 12);
			},
			//初始化路书
			todoMap() {
				this.map = new BMap.Map('map_canvas');
				var map = this.map;
				var lushu;
				var _this = this;
				var count = 0;
				// var progress = document.getElementsByClassName("el-progress-bar__outer")[0];
				var progress1 = document.getElementsByClassName("el-slider__runway")[0];
				var progress2 = document.getElementsByClassName("el-slider__button-wrapper")[0];
				for (let i = 0; i < _this.sList.length; i++) {
						var p0 = _this.sList[i].lng;
						var p1 = _this.sList[i].lat;
						var point = new BMap.Point(p0, p1); //118.230272,33.482474
						_this.poiList.push(point);
				}
				map.addControl(new BMap.NavigationControl());
				map.addControl(new BMap.ScaleControl());
				map.addControl(new BMap.OverviewMapControl({
					isOpen: true
				}));
				map.enableScrollWheelZoom();
				map.centerAndZoom(_this.poiList[0], 12);
				var polyline = new BMap.Polyline(_this.poiList, {
					strokeColor: "blue",
					strokeWeight: 2,
					strokeOpacity: 0.7,
				});
				map.addOverlay(polyline); //增加折线
				//3.填充坐标到路书 
				lushu = new BMapLib.LuShu(map, _this.poiList, {
					defaultContent: new Date().toLocaleString(),
					autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
					icon: new BMap.Icon(
					  "http://developer.baidu.com/map/jsdemo/img/car.png",
					  new BMap.Size(52, 26),
					  {
					    anchor: new BMap.Size(27, 13)
					  }
					),
					speed: 400, 
					enableRotation: true, //是否设置marker随着道路的走向进行旋转
				})
				//设置小车上面显示的文本
				_this.Timer = setInterval(function(){
					lushu._opts.defaultContent = new Date().toLocaleString() + " " + _this.speed + "km/h";
				},1000);
				
				//绑定事件
				//开始
				$("run").onclick = function() {
					 _this.countm = 0 ;
					 count = 0;
					lushu.start();
				}
				//减速*2
				$("run2").onclick = function() {
					if (count == 0) {
						count = 0;
					} else {
						count--;
					}
					if (count == 0) {
						lushu.changeSpeed(1);
					} else if (count == 1) {
						lushu.changeSpeed(2);
					} else if (count == 2) {
						lushu.changeSpeed(4);
					} else if (count == 3) {
						lushu.changeSpeed(8);
					} else if (count == 4) {
						lushu.changeSpeed(16);
					} else if (count == 5) {
						lushu.changeSpeed(32);
					}
					console.log(count)
				}
				//加速*2
				$("run3").onclick = function() {
					if (count == 5) {
						count = 5;
					} else {
						count++;
					}
					if (count == 0) {
						lushu.changeSpeed(1);
					} else if (count == 1) {
						lushu.changeSpeed(2);
					} else if (count == 2) {
						lushu.changeSpeed(4);
					} else if (count == 3) {
						lushu.changeSpeed(8);
					} else if (count == 4) {
						lushu.changeSpeed(16);
					} else if (count == 5) {
						lushu.changeSpeed(32);
					} 
					console.log(count)
				}
				//重置速度
				// $("resetSpeed").onclick = function() {
				// 	count = 0;
				// 	lushu.resetSpeed();
				// }
				//停止
				$("stop").onclick = function() {
					clearInterval(_this.Timer);
					lushu.stop();
				}
				// $("back").onclick = function() {
				// 	lushu.back();
				// }
				//暂停
				$("pause").onclick = function() {
					lushu.pause();
				}
				//隐藏信息
				// $("hide").onclick = function() {
				// 	lushu.hideInfoWindow();
				// }
				//显示信息
				// $("show").onclick = function() {
				// 	lushu.showInfoWindow();
				// }
				var num = 0;
				var num1 = 0;
				//运行到下一个点
			   lushu._moveNext= function (index) { 
			       var me = this;
			       if (index < this._path.length - 1) {
			           me._move(me._path[index], me._path[index + 1], me._tween.linear);
					}		
			   }
			   lushu._move = function (initPos, targetPos, effect) {
				   
			       var pointsArr = [initPos, targetPos];
			       var me = this,
			           //当前的帧数
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
			       //两点之间匀速移动
			       me._intervalFlag = setInterval(function () {
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
						   if(pos){
						   	_this.step1++;
						   	
						   }
						   //console.log(_this.step1)
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
			                           me._map.setCenter(pos);			                       }
			                   }
						   }
			               //正在移动
						   me._marker.setPosition(pos);
							
					
			               //设置自定义overlay的位置
						   me._setInfoWin(pos);
			           }
				   }, timer);
				//    _this.countm = Number(((me.i+2)/me._path.length) * 100);//进度条的百分比值
				   _this.value9 = ((me.i+2)/me._path.length) * 100;
				//    console.log(_this.value9)
							// //点击进度条
					// var progressclick = progress.onmousedown = function(eve){
					// 			var e = eve || event;
					// 		var xx = e.offsetX || e.layerX;
					// 		var yy = e.offsetY || e.layerY;
					// 		var target = e.target || e.srcElement;
					// 		_this.countm = xx / this.offsetWidth * 100; //进度条的百分比值
						
					// 		me.i = Math.ceil(me._path.length * (xx / this.offsetWidth));
					// 	}
						var progressclick1 = progress1.onmousedown = function(eve){
								var e = eve || event;
							var xx = e.offsetX || e.layerX;
							var yy = e.offsetY || e.layerY;
							var target = e.target || e.srcElement;
							_this.value9 = xx / this.offsetWidth * 100; //进度条的百分比值
							// if(me.i + 2 == me._path.length){

							// }else{
							lushu.start();
							// }
							me.i = Math.ceil(me._path.length * (xx / this.offsetWidth));
						}
					// 	var progressclick2 = progress2.onmousedown = function(eve){
					// 		var e = eve || event;
					// 		var xx = e.offsetX || e.layerX;
					// 		var yy = e.offsetY || e.layerY;
					// 		var target = e.target || e.srcElement;
					// 		document.onmousemove = function(eve){
					// 			var xxx=e.pageX-xx;
					// var yyy=e.pageY-yy;
					// var maxL = document.documentElement.clientWidth - 18;
					// var maxT = document.documentElement.clientHeight - 18;

					// var l = xxx < 0 ? 0 : (xxx > maxL ? maxL : xxx);
				
					// progress2.style.left=l+"px";
					// window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
					// 			console.log(11111)
					// 		}
					// 		document.onmouseup = function(){
					// 		// 	var e = eve || event;
					// 		// var xxx = e.offsetX || e.layerX;
					// 		// var yyy = e.offsetY || e.layerY;
					// 		// var target = e.target || e.srcElement;
					// 		// 	me.i = Math.ceil(me._path.length * (xxx / this.offsetWidth));
					// 		// 	console.log(this.offsetWidth)
					// 			console.log(222222)
					// 		document.onmousemove = null;
					// 		}
					// 	}
			   }
				function $(element) {
					return document.getElementById(element);
				}
			}
		},
		watch:{
	
		},
		destroyed() {
			clearInterval(this.Timer);
		}
	};
</script>
<style scoped>
	#map_canvas {
		width: 100%;
		height: 500px;
	}

	#result {
		width: 100%;
	}

	#progress {
		position: relative;
		margin: auto;
		/* top: 200px; */
		display: block;
		width: 400px;
		height: 20px;
		border-style: dotted;
		border-width: thin;
		border-color: darkgreen;
	}

	#filldiv {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 0px;
		height: 20px;
		background: blue;
	}

	#percent {
		position: absolute;
		top: 0px;
		left: 200px;

	}
	.btn {
	  margin-left: 400px;
	}
	.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .el-slider__button-wrapper{
	  display: none;
  }
	/* .el-tooltip .el-slider__button-wrapper{
		display: none !important;
	}
	.el-slider__button{
		display: none !important;
	}
	.el-slider__button-wrapper .el-tooltip{
		display: none !important;
	}
	.el-slider__button-wrapper::after{
		display: none !important;
	} */
</style>
