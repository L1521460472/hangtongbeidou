<template>
  <div id="header">
    <div :class="{header:state,main:status}">
      <!-- 头部 -->
      hello word
    </div>
    <el-button @click="btn" type="primary" round>改变class</el-button>
    <!-- <button >改变class</button> -->
  </div>
</template>

<script>
import TopBar from './TopBar';
export default {
  name: "Home",
  data() {
    return {
      state: false,
      status:true,
      count:1
    };
  },
  mounted() {

  },
  computed: {},
  created() {},
  methods: {
    btn(){
      this.count++;
      if(this.count % 2 == 0){
        this.state = true;
        this.status = false;
      }else{
        this.state = false;
        this.status = true;
      }
    }
  },
  components: {
    TopBar,
  },
  beforeDestroy() {
    
  }
};
</script>

<style scoped>
#header{
  width: 100%;
  height: 100%;
  background: beige;
}
.header{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #313131;
  color: #fff;
}
.main{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: pink;
  color: red;
}
.el-button{
  padding: 0;
}
</style>
