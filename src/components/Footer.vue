<template>
	<div class="box">
	    <van-tabbar  active-color="red" inactive-color="#000" route>
            <van-tabbar-item name='like' icon="like-o" replace to="/home" >发现</van-tabbar-item>
            <van-tabbar-item  icon="fire-o"  to="/transition">视频</van-tabbar-item>
            <van-tabbar-item icon="manager-o" to="/user">我的</van-tabbar-item>
         </van-tabbar>
		
	</div>
</template>

<script>
import Loading from './Loading.vue'  
	export default {
		components: {
			 Loading
		},
		name: 'Footer',
		data() {
			return {
			     active:0
			}
		},
		methods:{
					
        },
		created:function(){
			 
		}
	}
</script>
<style scoped>

</style>
