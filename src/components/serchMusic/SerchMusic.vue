<template>
	<div class="SerchMusic">
        <van-sticky>
           <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        </van-sticky>  
         <ul>
             <li v-for="item in songsData" :key="item.id" @click="playMusic(item.id,item.name,null)">
                  <div class="musicData">
                    <div class="serchname">
                        <van-icon name="search" />
                    </div>
                    <div class="musicname">
                        <p>{{item.name}}</p>
                    </div>
                </div> 
             </li>
         </ul> 
	</div>
</template>

<script>
import Vue from 'vue';
import __Config from '../../api/config.js';//api
import { Sticky } from 'vant';
import { NavBar } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Sticky);
	export default {
		 components: {
		
		 },
		name: 'SerchMusic',
		data() {
			return {
				songsData:[]
			}
		},
		methods: {
          getname(){
                 var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getMusic + this.$route.query.keywords,
                 }).then(res => {
                     that.songsData = res.data.result.songs
                    
                 }).then(err =>{
                 
                 }).catch(function (err) {
                    
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
                    let img ='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576645644,3953160720&fm=26&gp=0.jpg';
                    let img1='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1747301017,3691712009&fm=26&gp=0.jpg';
                    let img2 ='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2717348355,1964925168&fm=26&gp=0.jpg';
                    let img3='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1272584774,1884829751&fm=26&gp=0.jpg';
                    let img4 ='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=911900123,817855562&fm=26&gp=0.jpg';
                    let img5 ="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2882686151,1491712320&fm=26&gp=0.jpg";
                    let img6 ="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3949459071,1981844500&fm=26&gp=0.jpg";
                    let img7 ='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3949459071,1981844500&fm=26&gp=0.jpg';
                    var arrimg = [img,img1,img2,img3,img4,img5,img6,img7];
                    let index  = Math.floor((Math.random()*arrimg.length)); 
                  if (res.data.success) {
                          this.$router.push({
                                name:'Playmusic',
                                query: {
                                    musicId:id,
                                    name:name,
                                    pic:arrimg[index]
                                }
                            })
                    } else {
                       that.$toast('暂无版权')
                    }
                   
                 }).then(err =>{
                   
                 }).catch(function (err) {
                   
                });		
            },
		  onClickLeft() {
               window.history.back(-1);
           },	
		},
		created: function() {
            this.getname();
		},
		 mounted() {
	      
			 
		},
	}
</script>
<style scoped>
ul li{
    width: 95%;
    height: 40px;
    border-bottom: 1px solid #3333330d;
    margin: 0 auto;
    cursor: pointer;
    overflow: hidden;
}
.musicData{
    width: 100%;
    display: flex;
}
.serchname{
    width: 30px;
    height: 30px;
    margin-top: 12px;
    margin-left: 11px;
}
.serchname i{
    width: 30px;
    height: 30px;
}

.serchname{
    width: 30px;
}
.musicname{
    width: 100%;
    height: 40px;
    float: 1;
}
.musicname p{
    line-height: 40px;
    font-size: 14px;
    color: rgba(43, 51, 63, 0.75);
}
</style>
