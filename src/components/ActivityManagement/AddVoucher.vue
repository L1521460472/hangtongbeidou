<template>
  <div class="nav">
    <h1>
      面额信息-面额01 <button class="buttonDel">- 删除面额</button
      ><button class="buttonAdd">+ 添加新面额</button>
    </h1>
    <div class="nav_info">
      <div class="sub-title">*代金券金额</div>
      <el-input
        v-model="value11"
        size="mini"
        placeholder="请输入代金券金额"
        clearable
      ></el-input>
      <i>元</i>
    </div>
    <div class="nav_info text12">
      <div class="sub-title">*使用门槛</div>
      <div class="sub_text">满</div>
      <el-input
        v-model="value12"
        size="mini"
        placeholder="门槛需高于"
        id="text12"
        clearable
      ></el-input>
      <i>元</i>
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
      </el-select>
      张 <span> 以每个用户为单位进行限制</span>
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
</template>
<script>
export default {
  name: "AddVoucher",
  data() {
    return {
      value11: "", //金额
      value12: "", //门槛
      value13: "", //描述
      value14: "", //限领
      options11: [
        //每人限领
        {
          value: "",
          label: "全部",
        },
      ],
      checkList: ["不限制"],
    };
  },
};
</script>
<style scoped>
.el-input {
  width: 160px !important;
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
.nav {
  width: 100%;
  height: 310px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.nav h1 {
  width: 100%;
  height: 56px;
  line-height: 56px;
  color: #ffffff;
  box-sizing: border-box;
  padding: 0 8%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.nav h1 button {
  width: 110px;
  float: right;
  margin-top: 15px;
  background: #212121;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
.buttonAdd {
  color: #ffaa46;
}
.buttonDel {
  color: rgba(255, 255, 255, 0.4);
}
.nav_info {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 2.5%;
  color: rgba(255, 255, 255, 0.8);
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
.nav_info >>> .el-input #text12 {
  width: 120px !important;
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
.text12 >>> .el-input {
  width: 120px !important;
}
.nav_info span {
  color: rgba(255, 255, 255, 0.4);
  margin-left: 30px;
  background: url("../../image/info.png") left no-repeat;
  padding-left: 20px;
}
.sub_text {
  display: inline-block;
  width: 40px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.nav_info i {
  margin-left: 20px;
  margin-right: 30px;
}
/deep/ .el-checkbox__inner {
  background-color: #181818;
  border-color: #505050;
}
/deep/ .el-checkbox {
  color: rgba(255, 255, 255, 0.8);
}
/deep/ .el-checkbox__label {
  font-size: 12px;
}
/deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #505050;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: rgba(255, 255, 255, 0.8);
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #181818;
  border-color: #ffaa46;
}
/deep/ .el-checkbox__input .el-checkbox__inner::after {
  border: 1px solid #ffaa46;
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
