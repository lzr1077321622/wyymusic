<template>
	<div class="box">
	      <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
         <div class="demo">
             <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions">
             </video-player>
         </div>  
         <div class="ismv" v-show="ismv">
               <div  v-if="num.liked">
                     <p><van-icon name="like" color='red'/></p>
               </div>
               <div v-else>
                    <p><van-icon name="like" color='green'/></p>
               </div>
               <p><van-icon name="thumb-circle" />{{num.commentCount}}</p>
               <p><van-icon name="star" />{{num.likedCount}}</p>
               <p><van-icon name="share" />{{num.shareCount}}</p>
         </div> 
	</div>
</template>

<script>
import __Config from '../api/config.js';//api
import Vue from 'vue';
import { Icon } from 'vant';
Vue.use(Icon);
import { NavBar } from 'vant';
Vue.use(NavBar);
	export default {
        name:"Transtion_detail",
		components: {
			
		},
	
		data() {
			return {
                  ismv:false,//是否是MV
                  num:{},
                  /*---------------------------------- */
                    playerOptions: {
                        //播放速度
                        playbackRates: [0.5, 1.0, 1.5, 2.0], 
                        //如果true,浏览器准备好时开始回放。
                        autoplay: true, 
                        // 默认情况下将会消除任何音频。
                        muted: false, 
                        // 导致视频一结束就重新开始。
                        loop: false, 
                        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                        preload: 'auto', 
                        language: 'zh-CN',
                        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                        aspectRatio: '16:9',
                        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                        fluid: true,
                        sources: [{
                            //类型
                            type: "video/mp4",
                            //url地址
                            src: '' 
                        }],
                        //你的封面地址
                        poster: '', 
                        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                        notSupportedMessage: '此视频暂无法播放，请稍后再试',
                        controlBar: {
                            timeDivider: true,
                            durationDisplay: true,
                            remainingTimeDisplay: false,
                            //全屏按钮
                            fullscreenToggle: true  
                        }
                    }

                 /*---------------------------------- */
			}
		},
		methods:{
			  onClickLeft() {
                   window.history.back(-1);
               },	
                
              //获取点击数
              getmVustart(id){
                   var that =this;
                    this.$axios({
                        method: 'get',
                        dataType: 'json',
                        url:__Config.api.getmVustart+id,
                    }).then(res => {
                   
                       that.num =res.data;
                    }).then(err =>{

                    }).catch(function (err) {
                        
                    });		
              }	
        },
		created:function(){
              this.playerOptions.poster =  this.$route.query.img;
              let type = this.$route.query.type;
              let url;
              //Mv
               if(type==2){
                     url = __Config.api.getmVurl+this.$route.query.id;
               }else if(type==3){
                   //视频
                     url = __Config.api.getMoveUrl +this.$route.query.id;
               }
              var that =this;
                this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:url,
                }).then(res => {
                    if (type==2) {
                        //是MV 才显示点赞数
                           that.ismv =true;
                           var moveyrl = [{
                        //类型 MV
                            type: "video/mp4",
                            //url地址
                            src:res.data.data.url
                         }];
                         that.playerOptions.sources= moveyrl;
                         that.getmVustart(this.$route.query.id);
                    } else if(type==3){
                         var moveyrl = [{
                        //类型视频
                            type: "video/mp4",
                            //url地址
                            src:res.data.urls[0].url
                         }];
                         that.playerOptions.sources= moveyrl;
                      
                    }
                  
                }).then(err =>{

                }).catch(function (err) {
                    
                });	
             
		}
	}
</script>
<style scoped>
.box{
    width: 100%;
    height: 100%;
    background: #000;
}
.demo{
    width: 100%;
    height: 338px;
  
  }
  .demo:hover{
    display: block;
  }
  .ismv{
     color: #fff;
    width: 95%;
    height: 100px;
    background: #ffffff1c;
    margin: -90px auto;
  }
  .ismv p{
      margin-top: 3px;;
  }
</style>
