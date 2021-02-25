<template>
	<div class="videoList">
	      <van-tabs v-model="active" sticky swipeable @change='getchange' @click='getchange'>
                <van-tab v-for="(item,index) in menuList" :key="item.id" :name='item.id' :title="item.name">
                   <div class="mlsi">
                         <ul>
                            <li v-for="(item,index) in moveList" :key="item.data.vid" @click="playdetail(item.data.vid,item.data.coverUrl,3)">
                                 <p><img :src="item.data.coverUrl" alt=""></p>
                                 <p>{{item.data.title}}</p>
                                 <p><van-icon name="play" size='45' color="rgba(255, 255, 255, 0.54)"/></p>
                            </li>
                        </ul>
                   </div>
                </van-tab>
            </van-tabs>
         
	  <Footer />
	</div>
</template>

<script>
import Vue from 'vue';
import Footer from './Footer.vue'  
import __Config from '../api/config.js';//api
import { Col, Row } from 'vant';
import { Tab, Tabs } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Col);
Vue.use(Row);
	export default {
		components: {
			Footer
		},
		name: 'Transition',
		data() {
			return {
               active:0,
               vid:"58100",//视频id 默认为现代
               menuList:[],//tab标签
               moveList:[]//视频列表
			}
		},
		methods:{
			 getvideoList() {
                 var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getvideoList + "?cookie=" +this.$store.state.userinfo.cookie ,
                 }).then(res => {
                     that.menuList = res.data.data;
                  
                 }).then(err =>{
                 }).catch(function (err) {
                    
                });			
			},	
            //获取分类视频
            gettypemoves(){
                  var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.gettypemove + this.vid+ "&cookie=" +this.$store.state.userinfo.cookie,
                 }).then(res => {
                    that.moveList = res.data.datas;
                    //   console.log(res.data.datas);
                 }).then(err =>{

                 }).catch(function (err) {
                    
                });			
            },
            getchange(e){
               this.vid= e;
               this.gettypemoves();   
            },
            playdetail(id,img,type){
                  this.$router.push({
                        name:'transtion_detail',
                        query: {
                            id:id,
                            img:img,
                             type:type
                        }
                    })
            }
        },
		created:function(){
              this.getvideoList();
              this.gettypemoves();  
        },
        mounted () {
            // //默认加载现代
           
        }
	}
</script>
<style scoped>
.mlsi ul li:nth-child(1){
    margin-top: 14px;
}
.mlsi ul li{
    width: 90%;
    height: 150px;
    box-shadow: 0px 0px 3px #ccc;
    margin: -40px auto 55px auto;
    border-radius: 10px;
    position: relative;
}
.mlsi ul li P:nth-child(1){
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}
.mlsi ul li P:nth-child(1) img{
     width: 100%;
    height: 100%;
}
.mlsi ul li P:nth-child(2){
     position: absolute;
    bottom: 5px;
    left: 5px;
    color: #fff;
    font-family: "LED";
    font-size: 13px;
}
.mlsi ul li P:nth-child(3){
    width: 45px;
    height: 45px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin:  auto;
}
</style>
