<template>
	<div class="login">
          <van-row class="userinfo">
			    <van-field type="password" v-model="username" placeholder="请输入用户名" maxlength='11' clearable autofocus label="手机号码" />
	        	<van-field type="password"  v-model="password" placeholder="请输入密码" label="登录密码" clearable />
		  </van-row>
		  <van-row type="flex" justify="space-around" style="margin-top:20px">
			<van-col span="4"></van-col>
			<van-col span="16"> <van-button  block @click='getadmin' type="info">登&nbsp;&nbsp;&nbsp;录</van-button></van-col>
			<van-col span="4"></van-col>
		</van-row>
	</div>
</template>

<script>
import Vue from 'vue';
import {hex_md5} from '../assets/js/md5.js'
import __Config from '../api/config.js';//api

import { Col, Row } from 'vant';
import { Button } from 'vant';
import { Field } from 'vant';

Vue.use(Field);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
	export default {
		 components: {
		 
		 },
		name: 'Index',
		data() {
			return {
				username: '15331742840',
				password: 'lzr448470520'
			}
		},
		methods: {
			getadmin() {
				var pass = encodeURIComponent(this.password);
				if(this.username ==''){
					this.$toast("手机号不能为空"); 
				}else if(this.password ==''){
					this.$toast("密码不能为空"); 
				}else{
					 var that =this;
					 this.$axios.post(__Config.api.getLogo + this.username+"&password="+pass,{ 
							}).then(function(res){
                              if(res.data.code==502){
                                that.$toast('密码错误')
							  }else if(res.data.code==200){
							      	document.cookie="Cookies=" + res.data.cookie;
								     var objdata = {
											token: res.data.token,
											id:res.data.account.id,
											cookie:res.data.cookie
										}
								
								     that.$store.commit('SaveNane', objdata);
									 that.$router.push({
										path: '/home',
									 })
							  }else{
                                 	document.cookie="Cookies=" + res.data.cookie;
								     var objdata = {
											token: res.data.token,
											id:res.data.account.id,
											cookie:res.data.cookie
										}
								
								     that.$store.commit('SaveNane', objdata);
									 that.$router.push({
										path: '/home',
									 })
							  }

							}).catch(function (error) {
								that.$toast('登录失败')
							});
						
				}
				
			},

			getinfo(){
				
			}
		},
		created: function() {

		},
		 mounted() {
	      
			 
		},
	}
</script>
<style scoped>
.userinfo{
	margin-top: 20px;
}
.login {
	width: 98%;
	height: 100%;
	margin: 0 auto;
	overflow: hidden;
	
}
.van-button--info{
	background: red;
    border-radius: 33px;
    border: 1px solid #fff;
}
.van-cell__title  span{
	font-weight: bold !important;
}
</style>
