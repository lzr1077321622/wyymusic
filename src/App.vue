<template>
	<div id="app">
		<transition :name="transitionName">
			<router-view></router-view>
		</transition> 
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				transitionName: ''
			}
		},
		mounted() {

		},
		methods: {
	
		},

		watch: { 
			//使用watch 监听$router的变化
			$route(to, from) {
				//如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
				if (to.meta.index > 0) {
					if (to.meta.index < from.meta.index) {
						this.transitionName = 'slide-right';
					} else {
						this.transitionName = 'slide-left';
					}
				} else if (to.meta.index == 0 && from.meta.index > 0) {
					this.transitionName = 'slide-right';
				}

			}
		}

	}
</script>

<style>
	* {
	padding:0;
	margin:0;
}
html,body {
	width:100%;
	height:100%;
	min-width:350px;
	max-width:650px;
	margin: 0px auto;
}
#app {
	width:100%;
	height:100%;
	font-family:"微软雅黑";
	margin: 0px auto;
}
a {
	text-decoration:none;
}
ul li {
	list-style:none;
}
.van-nav-bar__title {
	font-size:13px !important;
}
.van-nav-bar__text {
	color:#b72020;
	font-size:14px;
	font-weight:bold;
}
.van-nav-bar .van-icon {
	color:#b72020;
	font-size:14px;
	font-weight:bold;
}
.van-image__error,.van-image__img,.van-image__loading {
	display:block;
	width:100%;
	height:100%;
	border-radius:100%;
}
/*路由动画开始*/
	.slide-right-enter-active,.slide-right-leave-active,.slide-left-enter-active,.slide-left-leave-active {
	will-change:transform;
	transition:all 300ms;
	transition-timing-function:linear;
}
.slide-right-enter {
	opacity:0;
	transform:rotateY(180deg);
}
.slide-right-leave-active {
	opacity:0;
	transform:rotateY(-180deg);
}
.slide-left-enter {
	opacity:0.8;
	transform:rotateY(-180deg);
}
.slide-left-leave-active {
	opacity:0;
	transform:rotateY(180deg);
}
/*路由动画结束*/
.commtit {
	width:98%;
	height:30px;
	margin:0 auto;
}
.commtit p {
	margin:3px;
	line-height:30px;
	font-size:15px;
	font-weight:bold;
	color:red;
}
.commonName {
	width:100%;
}
.commonName p {
	font-size:14px;
	font-weight:bold;
	color:rgb(0,0,0);
	padding:17px;
}
.van-image__img{
	border-radius: 0px;
}
.van-image__error-icon{
 width: 100%;
 height: 100%;
}
.van-nav-bar{
	z-index: 0;
}
.van-nav-bar__title{
	font-weight: bold;
}
</style>
