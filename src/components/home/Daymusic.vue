<template>
	<div class="Daymusic">
      
       <div class="back"> 
            <div class="backmenu" @click='goback'>
                  <img src="../../assets/img/back.png" alt="">
            </div>
            <div class="time">
                <p>{{time}}</p>
                <p>历史今推<span>cvip</span></p>
            </div>
       </div>
     
       <!---->
       <div class="list">
           <ul>
            <li v-for='(item,index) in listdata' :key='index' @click="playMusic(item.id,item.name,item.album.picUrl)">
                <div class="musicbg">
                   <img :src="item.album.picUrl" alt="">
                </div>
                <div class="title">
                    <div class="item1">
                        <p>{{item.name}}</p>
                        <p>{{item.album.artists[0].name}}-{{item.album.name}}</p>
                    </div>
                    <div class="item2">
                       <van-icon name="service" size='28' class="imgs" color='#999'/>
                    </div>
                </div>
            </li>
          
           </ul>
       </div>
        <Loading v-show="isloading"></Loading>
      <Footer></Footer>
	</div>
</template>

<script>
import Vue from 'vue';
import Footer from '../Footer.vue'  
import __Config from '../../api/config.js';//api
import { Icon } from 'vant';
import Loading from '../Loading.vue'  
Vue.use(Icon);
	export default {
		 components: {
		   Footer,Loading
		 },
		name: 'Daymusic',
		data() {
			return {
                isloading:true,
                time:"",
                listdata:[]
			}
        },
      
		methods: {
		   //每日歌单
            gettaydaymusic(){
 
                 var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.gettaydaymusic + "?cookie=" +this.$store.state.userinfo.cookie ,
                 }).then(res => {
                     that.listdata =res.data.data.dailySongs;
                     this.isloading= false;
                 }).then(err =>{

                 }).catch(function (err) {
                     this.isloading= false;
                });			
            },
            //播放
            playMusic(id,name,pic){
                //需要检查此音乐能否播放
                  var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.isPlay + id,
                 }).then(res => {
                    if (res.data.success) {
                          this.$router.push({
                                name:'Playmusic',
                                query: {
                                    musicId:id,
                                    name:name,
                                    pic:pic
                                }
                            })
                    } else {
                       that.$toast('暂无版权')
                    }
                   
                 }).then(err =>{
                   
                 }).catch(function (err) {
                   
                });		
            },
            goback(){
                window.history.back(-1);
            }
         
		},
		created: function() { 
          this.gettaydaymusic();
          var time = new Date();
          var mytime=time.toLocaleDateString(); //获取当前时间
          this.time = mytime;
   
		},
		 mounted() {
			 //this.$store.state.userinfo.token
		},
	}
</script>
<style scoped>
 .back{
     width: 100%;
     height: 150px;
     background-image: linear-gradient(#1989fa87, #ee0a2433);
 }
 .backmenu{
     width: 30px;
     height: 30px;
 }
 .backmenu img{
     width: 100%;
     height: 100%;
 }
 .time{
    width: 100%;
    height: 70px;
   
    margin-top: 50px;
 }
  .time p:nth-child(1){
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      margin-left: 20px;
  }
   .time p:nth-child(2){
        background: #fff;
        width: 100px;
        height: 22px;
        border-radius: 10px;
        font-size: 13px;
        text-align: center;
        margin-left: 20px;
        line-height: 26px;
        margin-top: 10px;
        color: #666;
   }
      .time p:nth-child(2) span{
        background: #000;
        color: #fff;
        margin-left: 8px;
      }

      /* */
      .list{
          margin-bottom: 50px;
      }
      .list ul li{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #c8c9cc21;
        display: flex;
      }
      .musicbg{
        width: 50px;
        height: 48px;
       
      }
      .musicbg img{
        width: 40px;
        height: 39px;
     
        margin-top: 5px;
        margin-left: 5px;
      }
      .title{
          flex: 1;
       
          display: flex;
      }
       .title p:nth-child(1){
           font-size: 14px;
            color: rgba(0,0,0,.7);
            height: 25px;
            overflow: hidden;
            width: 248px;
      
            line-height: 27px;
            font-weight: bold;
       }
        .title p:nth-child(2){
                font-weight: lighter;
                font-size: 13px;
                color: #999;
                height:20px;
                overflow: hidden;
                width: 248px;
            
       }
      .item1{
          flex: 1;
      }
      .item2{
          width: 60px;
          height: 48px;
      }
      .imgs{
        font-size: 28px;
        margin-left: 20px;
        margin-top: 5px;
      }
</style>
