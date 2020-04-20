<template>
   <home-index></home-index>
</template>

<script>
import HomeIndex from "./HomeIndex";
import { mapActions, mapState,mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("menu", {
      tabs: "tabs",
      activeItem: "activeItem"
    })
  },
  mounted() {
	
  },
  methods: {
    ...mapActions("menu", {
      closeTab: "closeTab"
    }),
    ...mapMutations("menu",{
      switchTab:"switchTab"
    }),
    tabClick(e){
      this.switchTab(e.name)
    }
  },
  components: {
    HomeIndex,
  }
};
</script>
<style>

.content-body {
  height: 100%;
}
</style>