<template>
	<div>
	   <div class="error">
		     <div class="err404">
                  <div class="namebox">
					   <van-icon name="smile-o" />
				  </div>
				  <div class="goindex">
					  <router-link to='/home'>去主页</router-link>
				  </div>
			 </div>
			
	   </div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
	export default {
		components: {
			
		},
		name: 'Notfound',
		data() {
			return {
			
			}
		},
		methods:{
					
        },
		created:function(){
			 
		}
	}
</script>
<style scoped>
	.error{
		width: 100%;
		height: 100%;
		min-height: 500px;
	    position: relative;
	}
	.err404{
		 width: 250px;
		 height: 200px;
		 position: absolute;
		 left: 50%;
		 top: 50%;
	  	transform: translate(-50%,-50%);
	}
	.namebox{
		width: 100%;
		height: 160px;
		
	}
	.namebox i{
		font-size: 163px;
		padding: 2px 42px;
		color: #ff000069;
	}
	.goindex{
		width: 100%;
		height: 40px;
	}
	.goindex a{
		font-size: 15px;
		text-align: center;
		display: inherit;
		line-height: 40px;
	}
</style>
