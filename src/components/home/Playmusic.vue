<template>
    <div>
         <div class="playbox">
         <div class="back" @click='goback'>
             <img src="../../assets/img/back.png" alt="">
         </div>

        <div class="mians">
          <div class="banji" id="rotatebox">
            <img src="../../assets/img/banji.png" alt="">
         </div>
         <div class="logo">
            <img class=" img" id="imgId" :src="pic" width="150" height="150"/>
        </div>
        </div>

        <div class="lrcData">
           <ul id='topmian'>
               <li v-for="(item,index) in lyric"   :style="{'color': (index==currentRow ? 'red':'')}">{{item.text}}</li>
           </ul>
           <p class="pname" v-show='islrc'>暂无歌词</p>
        </div>
      <!---->

      <div>
            <audio :src="playurl"  id="song" controls="controls" controlsList="nodownload" ></audio>
        </div>
      <!----->
        <!-- <keep-alive>     
        <div class="playcount">
        <aplayer autoplay :music="{
                title: name,
                src:playurl, 
                pic: pic,
                showLrc
            }"
            />
        </div>
        </keep-alive> -->
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Footer from '../Footer.vue'  
import __Config from '../../api/config.js';//api
import aplayer from "vue-aplayer";
	export default {
		 components: {
           Footer,
           aplayer
		 },
		name: 'Playmusic',
		data() {
			return {
                col:"#d45553",
                lrc: "[00:00.00]lrc here\n[00:01.00]aplayer",
                playurl:"",
                name:this.$route.query.name ||"",
                pic:this.$route.query.pic || "",
                lyric:[],
                lyricCurrent:"",
                currentRow:-1,
                islrc:false,
			}
        },
      
		methods: {
             goback(){
                window.history.back(-1);
            },
		 
            playMusic(){
               //playUrl
                 var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.playUrl + this.$route.query.musicId,
                 }).then(res => {
                     that.playurl = res.data.data[0].url;
                 
                 }).then(err =>{

                 }).catch(function (err) {
                    
                });	
            },
            //获取歌词
           getblc(){
               this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getblc + this.$route.query.musicId,
               }).then(res => {
                var lrc = res.data.lrc.lyric;
                let arr = lrc.split("\n"); 
                let row = arr.length;
                for(let i = 0; i < row; i++){
                    let temp_row = arr[i];
                    let temp_arr = temp_row.split("]");
                    let text = temp_arr.pop();
                      temp_arr.forEach(element => {
                            let obj = {};
                            let time_arr = element.substr(1, element.length - 1).split(":");
                            let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); 
                            obj.time = s;
                            obj.text = text;
                            this.lyric.push(obj);
                      })
                 }
                 this.lyric.sort(this.sortRule); 
                 }).then(err =>{
                 }).catch(err => {
                     this.islrc =true;
                });	
           },
           sortRule(a,b){
                return a.time - b.time;
           },
          
		},

		created: function() { 
    
		},
        watch: {
           lyricCurrent(newName, oldName) {
                 this.lyric.forEach((element, index) => {
                    if (this.lyricCurrent == element.time) {
                          document.getElementById('topmian').style.marginTop= -index * 30 + "px";
                          this.currentRow = index; 
                        }
                 })
          }
        },
		 mounted() {
           var that =this;
           let musicDom = document.getElementById('song');//获取Audio的DOM节点
           musicDom.addEventListener("timeupdate",function(){
                let timeDisplay;
                //用秒数来显示当前播放进度
              timeDisplay = Math.floor(musicDom.currentTime);//获取实时时间
              that.lyricCurrent=timeDisplay;
              
           })
           //监听播放完成 
            musicDom.addEventListener('ended', function () {
               document.getElementById('topmian').style.marginTop= 0 + "px";
            }, false);
            //开始
             musicDom.addEventListener('play', function () {
                 document.getElementById('imgId').className = "Rotation";
                 document.getElementById('rotatebox').className = "rotatesty";
            }, false);
           //暂停
           musicDom.addEventListener('pause', function () {
               try {
                    document.getElementById('imgId').className = "removeclass"; 
               } catch (error) {
                   
               }
            }, false);

             var that =this;
			 setTimeout(function(){
                  that.playMusic();
                  that.getblc();
             },300)
		},
	}
</script>
<style scoped>
.pname{
    text-align: center;
    color: #ffff;
    line-height: 50px;
}
.mians{
    width: 100%;
    height: 200px;
}
.banji{
    width: 150px;
    height: 130px;
    position: absolute;
    top: -18px;
    left: 0px;
    right: 0px;
    margin: auto;
    z-index: 9;
}
.rotatesty{
     width: 150px;
    height: 130px;
    position: absolute;
    top: -18px;
    left: 0px;
    right: 0px;
    margin: auto;
    z-index: 9;
    transform: rotate(18deg);
}
.banji img{
    width: 100%;
    height: 100%;
}
.back{
    width: 30px;
    height: 30px;
    margin: 10px;
}
.back img{
    width: 100%;
    height: 100%;
}
.playbox{
   width: 100%;
    height: 100%;
    background-image: radial-gradient(#322920, #18181a, #382d29);
    position: fixed;
    top: 0px;
    left: 0px;
}
.playcount{
    position: fixed;
    bottom: 0px;
}
.playcount{
    width: 100%;
}
.logo {
 position: absolute;
    top: 99px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: 150px;
    height: 150px;
}
@-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}

.Rotation {
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
    overflow: hidden;
    width: 150px;
    height: 150px;
    border-radius: 100%; 
    box-shadow: 1px 0px 9px 9px #ff572230;
}
.removeclass{
     overflow: hidden;
     width: 150px;
    height: 150px;
    border-radius: 100%; 
}
.img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    overflow: hidden;
}
.lrcData{
    position: relative;
    top: 0;
    width: 100%;
    overflow: hidden;
    /* background-image: radial-gradient(rgba(0, 0, 0, 0.5), #8fabc7, #c8c9ccad); */
}
.lrcData ul li{
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
}
audio{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
}
</style>
