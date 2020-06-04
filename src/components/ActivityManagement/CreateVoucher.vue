<template>
    <div id="header">
        <div class="header">
            <h1>创建代金券</h1>
            <div class="header_select">
              <div class="sub-title">*名称</div>
              <el-input
                v-model="value01"
                placeholder="请输入用户账号"
                clearable
              ></el-input>
            </div>
            <div class="header_select">
              <div class="sub-title">*有效期</div>
              <el-select v-model="value01" placeholder="请选择">
                <el-option
                  v-for="item in options01"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-checkbox v-model="checked">不限制</el-checkbox>
            </div>
        </div>
        <div class="main">
            <div class="nav">
                <h1>面额信息-面额01 <button class="buttonDel">- 删除面额</button><button class="buttonAdd">+ 添加新面额</button></h1>
                <div class="nav_info">
              <div class="sub-title">*代金券金额</div>
              <el-input
                v-model="value11"
                size="mini"
                placeholder="请输入代金券金额"
                clearable
              ></el-input> <i>元</i>
            </div>
            <div class="nav_info">
              <div class="sub-title">*使用门槛</div>
              <el-input
                v-model="value12"
                size="mini"
                placeholder="门槛需高于"
                clearable
              ></el-input> <i>元</i>
              <el-input
                v-model="value13"
                size="mini"
                placeholder="描述"
                clearable
              ></el-input>
            </div>
            <div class="nav_info">
              <div class="sub-title">*每人限领</div>
              <el-select v-model="value14" placeholder="请选择">
                <el-option
                  v-for="item in options11"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> 张  <span> 以每个用户为单位进行限制</span>
            </div>
            <div class="nav_info">
                <div class="sub-title">*可领取用户</div>
                <el-checkbox-group v-model="checkList">
    <el-checkbox label="不限制"></el-checkbox>
    <el-checkbox label="新能源物流车"></el-checkbox>
    <el-checkbox label="纯电动泥头车"></el-checkbox>
  </el-checkbox-group>
            </div>
            </div>
        </div>
        <div class="footer">
            <button @click="confirm">确认创建</button>
            <button @click="cancel">取消</button>
        </div>
    </div>
</template>
<script>
export default {
    name:'CreateVoucher',
    data() {
        return {
            value01:'',
            value11:'',
            value12:'',
            value13:'',
            value14:'',
            options01:[
                {
                value: "",
                label: "全部",
                },
            ],
            options11:[
                {
                value: "",
                label: "全部",
                },
            ],
            checked:false,
            checkList: []
        }
    },
    methods: {
        confirm(){

        },
        cancel(){

        },
    },
    mounted() {
        
    },
}
</script>
<style scoped>
#header {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
}
.header{
    width: 100%;
    height: 200px;
    background: #212121;
    border-radius: 6px 6px 0 0;
}
.header h1{
    width: 100%;
    height: 30%;
    line-height: 60px;
    box-sizing: border-box;
    padding-left: 8%;
    font-size: 16px;
    color: #ffffff;
}
.sub-title {
    width: 12%;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  text-align: right;
  margin-right: 10px;
}
.header_select {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 2.5%;
}
.header_select span {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-right: 4%;
}
.el-input{
    width: 160px !important;
}
.el-select{
    margin-right: 20px;
}
/* .el-checkbox >>> .el-checkbox__inner{
    background: #181818 !important;
    border: 1px solid #505050 !important;

} */
.main{
    width: 100%;
    height: calc(100% - 260px);
    background: #212121;
}
.footer{
    width: 100%;
    height: 60px;
    background: #313131;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 40px;
    border-radius: 0 0 6px 6px;
}
.footer button{
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
.footer button:nth-child(2){
    width: 80px !important;
    height: 34px !important;
    background: rgba(33, 33, 33, 1) !important;
    border: 1px solid rgba(199, 150, 89, 1) !important;
    border-radius: 4px;
    color: #c79659 !important;
}
.nav{
    width: 100%;
    height: 310px;
    border-top: 1px solid rgba(255, 255, 255, .2);
    border-bottom: 1px solid rgba(255, 255, 255, .2);
}
.nav h1{
    width: 100%;
    height: 56px;
    line-height: 56px;
    color: #ffffff;
    box-sizing: border-box;
    padding: 0 8%;
    border-bottom: 1px solid rgba(255, 255, 255, .1);
}
.nav h1 button{
    width: 110px;
    float: right;
    margin-top: 15px;
    background: #212121;
    border: none;
    font-size: 16px;
    cursor: pointer;
}
.buttonAdd{
    color: #FFAA46;
}
.buttonDel{
    color: rgba(255, 255, 255, .4);
}
.nav_info{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 2.5%;
    color: rgba(255, 255, 255, .8);
    font-size: 12px;
}
.nav_info >>> .el-input .el-input__inner {
    width: 160px !important;
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
.nav_info span{
    color: rgba(255, 255, 255, .4);
    margin-left: 30px;
    background: url('../../image/info.png') left no-repeat;
    padding-left: 20px;
}
.nav_info i{
    margin-left: 20px;
    margin-right: 30px;
}
  /deep/ .el-checkbox__inner {
    background-color: #181818;
    border-color: #505050;
  }
  /deep/ .el-checkbox {
    color: rgba(255, 255, 255, .8);
  }
  /deep/ .el-checkbox__label{
      font-size: 12px;
  }
  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: rgba(255, 255, 255, .8);
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #181818;
    border-color: #FFAA46;
  }
  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
      border-color: #FFAA46;
  }
  /deep/ .el-checkbox__input .el-checkbox__inner::after {
    border: 1px solid #FFAA46;
    box-sizing: content-box;
    content: "";
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    width: 3px;
  } 
</style>