<!--  -->
<template>

  <div class="mian">
    <div class="backimg"  @click='goback'>
      <van-icon size="30px" name="arrow-left" color="#fff" />
    </div>
    <video-player class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions">
    </video-player>  
    <div class="my-container">
      <van-popup v-model="show" class="popmian" transition-appear   position="bottom" round  :style="{ height: '50%' }">
           <h4>评论({{total}})</h4>
           <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul>
              <li style="color:#fff" v-for="(item,index) in listData">
                <div class="ingandname">
                  <p><img  width="20" height="20" v-lazy="item.user.avatarUrl" /></p>
                 
                  <p>{{item.user.nickname}}</p>
                  <p>{{ item.time| dealWithTime }}</p>
                </div>
                <div class="content">
                   <p>{{item.content}}</p>
                </div>
              </li>
            </ul>
          </van-list>
      </van-popup>
   </div>
    <div class="num">
      <div class="nummain">
         <div class="listmian">
           <ul>
             <li>
               <p><img src="../../assets/img/dianzan.png" alt=""></p>
               <p>{{numData.likedCount}}</p>
             </li>
              <li @click="openlist">
               <p><img src="../../assets/img/xiaoxi.png" alt=""></p>
               <p>{{numData.commentCount}}</p>
             </li>
              <li>
               <p><img src="../../assets/img/fenxiang.png" alt=""></p>
               <p>{{numData.shareCount}}</p>
             </li>
           </ul>
         </div>
      </div>
    </div>
    <!---->
  
  </div>
</template>
<script>
import __Config from '../../api/config.js';
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import { Popup } from 'vant';
Vue.use(Popup);
export default {
  data () {
    return { 
         loading: false,
         finished: false,
         show:false,
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
             },
             numData:{},
             total:0,
             page:1,
             listData:[],
             moveId:""
    }
   }, 
   filters: {
      dealWithTime(originVal) {
        const dt = new Date(originVal)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')
        const hh = (dt.getHours() + '').padStart(2, '0')
        const mm = (dt.getMinutes() + '').padStart(2, '0')
        const ss = (dt.getSeconds() + '').padStart(2, '0')
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },　　　
   },
    methods: {
     onLoad() {
      this.page++;
      this.pl();
    },
      getVideo(mvid){
            this.$axios({
                method: 'get',
                dataType: 'json',
                url:__Config.api.getmvDetail+mvid + "&cookie=" +this.$store.state.userinfo.cookie,
            }).then(res => {
               var moveyrl = [{
                            type: "video/mp4",
                            src:res.data.data.url
                         }];
               this.playerOptions.sources= moveyrl;
            }).then(err =>{
            }).catch(function (err) {
        
        });			
    },
    getnum(mvid){
          this.$axios({
                method: 'get',
                dataType: 'json',
                url:__Config.api.getMvnums+mvid,
            }).then(res => {
               this.numData=res.data;
            }).then(err =>{}).catch(function (err) {});		
    },
    pl(){
       this.$axios({
                method: 'get',
                dataType: 'json',
                url:__Config.api.getMvpl+this.moveId+"&offset="+this.page,
            }).then(res => {
                this.total = res.data.total;
                var arr = res.data.comments; //请求返回当页的列表
                this.loading = false; //关闭加载框
                //获取100页
                if (this.page==100) {
                  // 加载结束
                   this.finished = true;
                  return;
                }
                // 将新数据与老数据进行合并
                this.listData = this.listData.concat(arr);
            }).then(err =>{}).catch(function (err) {});		

    },
    openlist(){
      this.show=true;
    },
    closenam(){
       this.show=false;
    },
    goback(){
       window.history.back(-1);
    }
 },
mounted () {

},
created: function() { 
    let id = this.$route.query.mvid;
    this.moveId = id;
    this.getVideo(id);
    this.getnum(id);
    this.pl();
},


}

</script>
<style  scoped>
.van-overlay {
    background-color: rgba(0,0,0,.0) !important;
}
.mian{
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
}
.van-popup{
 background: #fff; 
}
.backimg{
    width: 40px;
    height: 40px;
    z-index: 999;
    position: fixed;
    top: 5px;
    left:0px;
}
.num{
  width: 50px;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 2%;
}
.nummain{
  width: 50px;
  height: 100%;
  position: relative;
}
.nummain .listmian{
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 100px;
  background: #000;
  right: 0px;
}
.nummain .listmian ul li{
  margin-top: 8px;
}
.nummain .listmian ul li p:nth-child(1){
  width: 28px;
  height: 28px;
}
.nummain .listmian ul li p:nth-child(1) img{
  width:100%;
  height: 100%;
  margin-left:13px;
}
.nummain .listmian ul li p:nth-child(2){
  text-align: center;
}
.popmian h4{
  text-align: center;
}
.ingandname{
    width: 100%;
    position: relative;
    height: 30px;
}
.ingandname p:nth-child(1){
   width: 20px;
    height: 20px;
    position: absolute;
    left: 6px;
}
.ingandname p:nth-child(1) img{
  border-radius: 100%;
}
.ingandname p:nth-child(2){
  position: absolute;
  left: 34px;
  top: -4px;
  color: #03A9F4;
}
.ingandname p:nth-child(3){
  position: absolute;
  left: 34px;
  top: 10px;
  color: #03A9F4;
}

.popmian ul li{
  margin: 10px 10px;
}
.content p{
   margin: 5px 30px;
   color: darkorange;
}
 
</style>