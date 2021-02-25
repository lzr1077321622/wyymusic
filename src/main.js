// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import globalVariable from './global_variable.js'
/*全局使用Toast*/
import { Toast } from 'vant';
Vue.use(Toast);
Vue.prototype.$axios = axios;
Vue.prototype.API = globalVariable;
Vue.config.productionTip = false

//视频播放插件

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)


//封装的axiso方法
import { get, post } from "./utils/index";
Vue.prototype.$http = {
  get,
  post
};


/*瀑布库组件*/
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)


//路由守卫
router.beforeEach((to, from, next) => {
	
	//获取本地存储中的用户信息
	//JSON.parse这里要转化成对象，存在就是真 true  不存在就是false
	var islogin = JSON.parse(localStorage.getItem('userinfo'))
      
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if (islogin) { //判断本地是否存在userinfo 
			next();
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next();
	}
	/*如果输入的路由为/login*/  
	if (to.fullPath == "/login") {
        /*如果本地 存在 token 则直接跳转到后台首页 */
		if (islogin) {
			next({
				path: '/home'
			});
		} else {
			next();
		}
	}
});


new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
