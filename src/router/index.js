import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Transition from '@/components/Transition'
import Notfound from '@/components/Notfound'
import Login from '@/components/login/Login' //登录
import Daymusic from '@/components/home/Daymusic' //每日歌单
import Playmusic from '@/components/home/Playmusic' //每日歌单播放
import Transtion_detail from '@/components/Transtion_detail' //视频播放
import Singer from '@/components/singer/Singer' //歌手
import SingerPlay from '@/components/singer/SingerPlay' //歌手热门50
import Radio from '@/components/home/Radio' //电台
import Radio_detail from '@/components/home/Radio_detail' //电台详情
import RadioType from '@/components/RadioType' //电台详情
import HotRadio from '@/components/home/HotRadio' //类别热门
import SerchMusic from '@/components/serchMusic/SerchMusic' //搜索
import User from '@/components/user/User' //用户
import Video from '@/components/home/Video' //全部视频
import PayBoutique from '@/components/home/PayBoutique' // 付费精选
import TypeRadio from '@/components/home/TypeRadio' //分类电台列表
import Nearsong from '@/components/user/nearsong' //最近播放



Vue.use(Router)

const router = new Router({
	//mode: 'history', //去掉url中的#  
	routes: [{ //当输入路由为/的时候重定向到登录页面
		  path: '/',
	        	redirect: '/login'
			},
	         {
				path: '/login',
				name: 'Login',
				component: Login,
				meta: {
					title: '登录',
					index: 1,
					requireAuth: false
				}
			},
		{ //登录手机号输入
			path: '/index',
			name: 'Index',
			component: Index,
			meta: {
				title: '登录手机号输入',
				index: 2,
				requireAuth: false
			}
		},
	
		{ //首页
			path: '/home',
			name: 'Home',
			component: Home,
			meta: {
				title: '首页',
				index:3,
				requireAuth: true
			}
		},
		{//每日歌单
			path: '/daymusic',
			name: 'Daymusic',
			component: Daymusic,
			meta: {
				title: '每日歌单',
				index: 4,
				requireAuth: true
			}
		},
		{//每日歌单播放
			path: '/playmusic',
			name: 'Playmusic',
			component: Playmusic,
			meta: {
				title: '每日歌单播放',
				index:5,
				requireAuth: true
			}
		},
		
		{//视频播放
			path: '/transtion_detail',
			name: 'transtion_detail',
			component: Transtion_detail,
			meta: {
				title: '视频播放',
				index:6,
				requireAuth: true
			}
		},
		{//歌手
			path: '/singer',
			name: 'Singer',
			component: Singer,
			meta: {
				title: '歌手',
				index:7,
				requireAuth: true
			}
		},
		{//歌手热门50首
			path: '/singerPlay',
			name: 'SingerPlay',
			component: SingerPlay,
			meta: {
				title: '歌手热门50首',
				index:8,
				requireAuth: true
			}
		},
		{ //歌手分类
			path: '/transition',
			name: 'transition',
			component: Transition,
			meta: {
				title: '歌手分类',
				index: 9,
				requireAuth: true
			}
		},
		{ //电台
			path: '/radio',
			name: 'radio',
			component: Radio,
			meta: {
				title: '电台',
				index: 10,
				requireAuth: true
			}
		},
		{ //电台详情
			path: '/radio_detail',
			name: 'Radio_detail',
			component: Radio_detail,
			meta: {
				title: '电台详情',
				index: 11,
				requireAuth: true
			}
		},
		{ //电台分类
			path: '/radioType',
			name: 'RadioType',
			component: RadioType,
			meta: {
				title: '电台分类',
				index: 12,
				requireAuth: true
			}
		},
		{ //类别热门
			path: '/hotRadio',
			name: 'HotRadio',
			component: HotRadio,
			meta: {
				title: '类别热门',
				index: 13,
				requireAuth: true
			}
		},
		{ //歌曲搜索
			path: '/serchMusic',
			name: 'serchMusic',
			component: SerchMusic,
			meta: {
				title: '歌曲搜索',
				index: 14,
				requireAuth: true
			}
		},
		{ //歌曲搜索
			path: '/user',
			name: 'user',
			component: User,
			meta: {
				title: '歌曲搜索',
				index: 15,
				requireAuth: true
			}
		},
		{ //全部视频
			path: '/video',
			name: 'video',
			component:Video,
			meta: {
				title: '全部视频',
				index: 16,
				requireAuth: true
			}
		},
		{ // 付费精选
			path: '/payBoutique',
			name: 'payBoutique',
			component:PayBoutique,
			meta: {
				title: '付费精选',
				index: 17,
				requireAuth: true,
			}
		},
		{ // 分类电台列表
			path: '/typeRadio',
			name: 'typeRadio',
			component:TypeRadio,
			meta: {
				title: '分类电台列表',
				index: 18,
				requireAuth: true,
			}
		},
		{ // 最近播放
			path: '/nearsong',
			name: 'nearsong',
			component:Nearsong,
			meta: {
				title: '最近播放',
				index: 19,
				requireAuth: true,
			}
		},


		
      ///////////////////////////////////////////////////////////////////
	
		{
			path: '/404',
			name: '404',
			component: Notfound
		},
		{
			path: '*',//这里是当用户随意输入路由
			redirect: '/404' //匹配不到就跳转到自定义的404页面
		}
	]
})

export default router;

//下面是脚手架自带的 可以改写成上面的形式 只要暴露出去就行
// export default new Router({
//   routes: [
//     {//首页
//       path: '/',
//       name: 'Index',
//       component: Index
//     }, {//
//       path: '/admin',
//       name: 'admin',
//       component: Admin
//     }
//   ]
// })
