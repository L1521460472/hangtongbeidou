<template>
    <div id="header">
        <div class="header">
            <el-row>
        <el-col :span="24">
          <div class="header_nav">
              <h1>充电折扣配置</h1>
              <p>折扣配置说明：折扣范围0-99以内的2位数，例如：要打9.2折，输入92，打8折，输入80，不打折，则输入100即可。<span>当折扣为1时，APP上不显示优惠与折扣内容</span></p>
              <div class="vehicle_01">
                  <div class="vehicle_01_left">
                      平台车辆
                  </div>
                  <div class="vehicle_01_right">
                      <p class="p1">新能源车</p>
                        <div class="vehicle_input">
                            <span>折扣</span>
                        <el-input
                        v-model.number="value1"
                        size='mini'
                        :disabled="falg"
                        placeholder="例如：0.92"
                        @change="proving1()"
                        ></el-input> %
                        <span v-show="open1" class="vehicle_span">输入错误</span>
                        </div>
                  </div>
                  <div class="vehicle_01_right">
                      <p class="p2">纯电动泥头车</p>
                        <span>折扣</span>
                        <el-input
                        v-model.number="value2"
                        size='mini'
                        :disabled="falg"
                        placeholder="例如：0.97"
                        @change="proving2()"
                        ></el-input> %
                        <span v-show="open2" class="vehicle_span">输入错误</span>
                  </div>
              </div>
              <div class="vehicle_02">
                  <div class="vehicle_02_left">
                      非平台车辆
                  </div>
                  <div class="vehicle_02_right">
                      <p class="p3">所有车辆类型</p>
                        <span>折扣</span>
                        <el-input
                        v-model.number="value3"
                        size='mini'
                        :disabled="falg"
                        placeholder="例如：0.98"
                        @change="proving3()"
                        ></el-input> %
                        <span v-show="open3" class="vehicle_span">输入错误</span>
                  </div>
                  <div class="vehicle_02_right"></div>
              </div>
              <div class="btn">
                  <button @click="edit" class="btn_left">修改</button>
                  <button @click="open" class="btn_right">保存</button>
              </div>
          </div>
        </el-col>
      </el-row>
        </div>
    </div>
</template>
<script>
export default {
    name:'DiscountConfiguration',
    data() {
        return {
            value1:'',
            value2:'',
            value3:'',
            falg:true,
            open1:false,
            open2:false,
            open3:false,
            oldValue1: 92,
            oldValue2: 97,
            oldValue3: 100,
            mes1:'',
            mes2:'',
            mes3:'',
        }
    },
    methods: {
        proving1(){
        if(this.value1 > 0 && this.value1 <= 100 || this.value1 == ''){
            this.open1 = false;
        }else{
            this.open1 = true;
        }
      },
      proving2(){
        if(this.value2 > 0 && this.value2 <= 100 || this.value2 == ''){
            this.open2 = false;
        }else{
            this.open2 = true;
        }
      },
      proving3(){
        if(this.value3 > 0 && this.value3 <= 100 || this.value3 == ''){
            this.open3 = false;
        }else{
            this.open3 = true;
        }
      },
      edit(){
          this.falg = false;
      },
      open() {
          if(this.value1 == ''){
              this.mes1 = '未修改';
          }else{
              this.mes1 = '由' + this.oldValue1 + '%改为' + this.value1 + '%';
          }
          if(this.value2 == ''){
              this.mes2 = '未修改';
          }else{
              this.mes2 = '由' + this.oldValue2 + '%改为' + this.value2 + '%';
          }
          if(this.value3 == ''){
              this.mes3 = '未修改';
          }else{
              this.mes3 = '由' + this.oldValue3 + '%改为' + this.value3 + '%';
          }
          if(this.open1 == true || this.open2 == true || this.open3 == true){
              this.$message({
              type: "error",
              message: "输入有误，请重新输入",
              center: true
            });
              return
          }
        const h = this.$createElement;
        this.$msgbox({
          title: '请确定以下更改内容',
          message: h('div', null, [
            h('p', {class:'message_p',}, [
            h('span', {class:'message_left', style: 'color:rgba(255,255,255,.4);font-size: 12px;' }, '平台车辆 '),
            h('i', { class:'message_center', style: 'color:rgba(255,255,255,.8);font-size: 12px;' }, '新能源车折扣'),
            h('i', { class:'message_right',style: 'color: #FF4646;font-size: 12px;' }, this.mes1),
          ]),
            h('p', {class:'message_p',}, [
            h('span', {class:'message_left', style: 'color:rgba(255,255,255,.4);font-size: 12px;' }, '平台车辆 '),
            h('i', { class:'message_center', style: 'color:rgba(255,255,255,.8);font-size: 12px;' }, '纯电动泥头车折扣'),
            h('i', { class:'message_right',style: 'color: #FF4646;font-size: 12px;' }, this.mes2),
          ]),
            h('p', {class:'message_p',}, [
            h('span', { class:'message_left', style: 'color:rgba(255,255,255,.4);font-size: 12px;' }, '非平台车辆 '),
            h('i', { class:'message_center', style: 'color:rgba(255,255,255,.8);font-size: 12px;' }, '所有车辆类型折扣'),
            h('i', { class:'message_right',style: 'color: #FF4646;font-size: 12px;' }, this.mes3),
          ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,//点击空白处不会消失
        }).then(() => {
            console.log(1)
        });
      },
    },
    mounted() {
        if(this.value1 == ''){
            this.falg = false;//input可编辑
        }else{
            this.falg = true;//input禁用
        }
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
  box-sizing: border-box;
  padding: 35px 45px;
}
.header_nav h1{
    font-size: 24px;
    color:rgba(255,255,255,.8);
    margin-bottom: 15px;
}
.header_nav > p{
    font-size: 12px;
    color:rgba(255,255,255,.8);
    margin-bottom: 20px;
}
.header_nav > p > span{
    color: #FF4646;
}
.el-input {
  width: 100px;
}
.header_nav >>> .el-input .el-input__inner{
    width: 100px !important;
    font-size: 12px !important;
    height: 30px !important;
    line-height: 30px !important;
    background: #0a0a0a !important;
    background-color: rgba(0, 0, 0, 0.4) !important;
    border: 1px solid rgb(164, 164, 164) !important;
    border-color: rgba(164, 164, 164, 0.4) !important;
    color: #fff;
    opacity: 0.8;
}
.vehicle_01{
    width: 100%;
    height: 170px;
    background: #313131;
    border-bottom: 1px solid rgba(255,255,255,.2);
    border-radius: 6px 6px 0 0;
}
.vehicle_02{
    width: 100%;
    height: 170px;
    background: #313131;
    border-radius: 0 0 6px 6px;
}
.vehicle_01_left{
    width: 30%;
    height: 170px;
    text-align: center;
    line-height: 170px;
    font-size: 18px;
    color:rgba(255,255,255,.8);
    float: left;
}
.vehicle_02_left{
    width: 30%;
    height: 170px;
    text-align: center;
    line-height: 170px;
    font-size: 18px;
    color:rgba(255,255,255,.8);
    float: left;
}
.vehicle_01_right{
    width: 35%;
    height: 170px;
    color:rgba(255,255,255,.8);
    float: left;
}
.vehicle_02_right{
    width: 35%;
    height: 170px;
    color:rgba(255,255,255,.8);
    float: left;
}
.vehicle_01_right p{
    margin-top: 50px;
    margin-bottom: 22px;
}
.vehicle_02_right p{
    margin-top: 50px;
    margin-bottom: 22px;
}
.vehicle_01_right span{
    font-size: 14px;
    margin-right: 8px;
}
.vehicle_02_right span{
    font-size: 14px;
    margin-right: 8px;
}
.p1{
    font-size: 18px;
    color: #34FFBA;
}
.p2{
    font-size: 18px;
    color: #FF9F38;
}
.p3{
    font-size: 18px;
    color:rgba(255,255,255,.8);
}
.btn{
    margin-top: 78px;
    display: flex;
    justify-content: center;
}
.btn button{
    width: 80px;
    height: 34px;
    line-height: 34px;
    background: #c79659;
    border-radius: 6px;
    border: 1px solid #c79659;
    font-size: 14px;
    color: #212121;
    cursor: pointer;
}
.btn_left{
    margin-right: 10px;
}
.btn_right{
    margin-left: 10px;
}
.vehicle_input{
    width: 100%;
    height: 30px;
}
.vehicle_span{
    background: url('../../image/关闭.png') no-repeat left;
    margin-left: 10px;
    padding-left: 20px;
    font-size: 10px;
    color: #FF4646;
    display: inline-block;
}
.message_left{
    display: inline-block;
    width: 68px;
    height: 30px;
    line-height: 30px;
    text-align: left;
}
.message_center{
    display: inline-block;
    width: 102px;
    height: 30px;
    line-height: 30px;
    text-align: left;
}
.message_right{
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: left;
}
.message_p{
    background: #313131;
    margin-top: 5px;
}
</style>