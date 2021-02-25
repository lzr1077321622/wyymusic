<template>
	<div class="Home">
    <van-sticky :offset-top="0">
      <div class="serch">
        <van-search
          v-model="musicName"
          show-action
          background=""
          placeholder="请输入歌曲,歌手名称"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
     </van-sticky> 
       <!--轮播-->
     <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in listpic" :key="index">
          <img :src="item.pic" alt="">
        </van-swipe-item>
      </van-swipe>
       <!--分类-->
      <van-grid clickable border>
        <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home1.png" to='./daymusic' text="每日推存" />
        <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home2.png" to='./radio' text="电台" />
        <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home3.png" to='./video' text="视频" />
        <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home4.png" to='./singer' text="歌手" />
        </van-grid>
         <!--NewMv--> 
         <NewMv></NewMv>
         <Newsong></Newsong>
         <!----> 
      <Footer></Footer>
	</div>
</template>

<script>
import Vue from 'vue';
import Footer from './Footer.vue'  
import NewMv from './home/NewMv.vue'  //最新MV
import Newsong from './home/Newsong.vue'  //最新音乐
import __Config from '../api/config.js';//api
import { Col, Row } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Search } from 'vant';
import { Sticky } from 'vant';
Vue.use(Sticky);
Vue.use(Search);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);
	export default {
		 components: {
		   Footer,NewMv,Newsong
		 },
		name: 'Home',
		data() {
			return {
                 listpic:[],
                 musicName:"",
              
		       	}
        },
      
		methods: {
      //最简单最直接的请求方法
			getbanner() {
           var that =this;
              this.$axios({
                method: 'get',
                dataType: 'json',
                url:__Config.api.getbanner,
              }).then(res => {
                  that.listpic = res.data.banners
              }).then(err =>{

              }).catch(function (err) {
                
            });			
            },
        //搜索    
       onSearch(){
          if (this.musicName=="") {
            this.$toast('请输入歌名名称,歌手')
          } else {
              this.$router.push({
                name:'serchMusic',
                query: {
                    keywords:this.musicName
                }
            })
          }
       
     },

   
         
		},
		created: function() { 
        this.getbanner();
		},
		 mounted() {
       var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?f7702d4eb1582f78454e87a9f39a8bce";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
		},
	}
</script>
<style scoped>
  .my-swipe .van-swipe-item {
    width: 100%;
    font-size: 20px;
    height: 140px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe .van-swipe-item img{
    width: 100%;
    height: 100%;
  }
</style>
