<template>
	<div class="loading">
          <div class="main">
             <div class="centerbox"> 
                    <div class="mianbox">
                       <van-loading size="24px" vertical color="#fff">加载中...</van-loading>
                    </div>
             </div>
          </div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Loading } from 'vant';
Vue.use(Loading);
	export default {
		 components: {
		
		 },
		name: 'loading',
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		created: function() {

		},
		 mounted() {
	      
			 
		},
	}
</script>
<style scoped>
.loading{
    width: 100%;
    height: 100%;
    z-index: 9999999999999999999999999999999999999 !important;
}
.main{
   width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
}
.centerbox{
     width: 100%;
    height: 100%;
    position: relative;
     background: rgba(0, 0, 0, 0.65);
}
.mianbox{
    width: 65px;
    height: 65px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
   color:#fff ;
}
.van-loading--vertical .van-loading__text{
    color:#fff ;
}
</style>
