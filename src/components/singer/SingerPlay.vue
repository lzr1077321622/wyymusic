
<template>
	<div class="SingerPlay">
        <van-sticky>
	     <div>
            <van-nav-bar
                title="歌手热门50首"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                />
        </div>
        </van-sticky>
        <div>
              <van-cell v-for="(item,index) in hotData" :key="item.id" :title="item.name" is-link @click="playMusic(item.id,item.name,item.al.picUrl)"/>
        </div>
	</div>
</template>

<script>
import __Config from '../../api/config.js';//api
import Vue from 'vue';
import { Cell, CellGroup } from 'vant';
import { Sticky } from 'vant';

Vue.use(Sticky);
Vue.use(Cell);
Vue.use(CellGroup);
	export default {
		components: {
			
		},
		name: 'SingerPlay',
		data() {
			return {
			    hotData:[]
			}
        },
       
		methods:{
          gethotMusic(){
            var that =this;
            this.$axios({
                method: 'get',
                dataType: 'json',
                url:__Config.api.gethot + this.$route.query.musicId,
            }).then(res => {
                that.hotData = res.data.songs;
              
            }).then(err =>{

            }).catch(function (err) {

            });			
        },
        onClickLeft() {
             window.history.back();  
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
                     that.$toast('亲爱的,暂无版权')
                }
                
                }).then(err =>{

                }).catch(function (err) {
                
            });		
        },
        },
		created:function(){
			 this.gethotMusic();
		}
	}
</script>
<style scoped>

</style>
