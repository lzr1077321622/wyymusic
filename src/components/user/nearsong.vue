<!-- 最近播放 -->
<template>
  <div>
    <van-sticky :offset-top="0">
       <div>
            <van-nav-bar
                title="最近播放"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            
                />
        </div>
      </van-sticky>  
        <div>
              <van-cell v-for="(item,index) in nearData" :key="index" :title="item.song.name" @click="playMusic(item.song.id,item.song.al.name,item.song.al.picUrl)" />
        </div>
        <Loading v-show="isloading"></Loading>
  </div>
</template>

<script>
import __Config from '../../api/config.js';//api
import Vue from 'vue';

import { Sticky } from 'vant';
import Loading from '../Loading.vue'  
import { List } from 'vant';
Vue.use(List);
Vue.use(Sticky);
export default {
  components: {
		   Loading
		 },
  data () {
    return {
      nearData:[],
      isloading:true,
    };
  },
  methods: {
    nearSong(){
            this.$axios({
                method: 'get',
                dataType: 'json',
                url:__Config.api.getusernearSong + this.$store.state.userinfo.id,
            }).then(res => {
                this.nearData = res.data.allData;
                this.isloading =false;
            }).then(err =>{
               this.isloading =false;
            }).catch(function (err) {
               this.isloading =false;
            });	
    },
     playMusic(id,name,pic){
                //需要检查此音乐能否播放
                  var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.isPlay + id,
                 }).then(res => {
                     console.log(res);
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
     onClickLeft() {
        window.history.back();  
     },
  },
  created () {
        this.nearSong();
  }
}

</script>
<style  scoped>
</style>