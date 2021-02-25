<template>
	<div class="Newsong">
	    <div class="commtit">
          <p> 〓 推荐新音乐</p>
        </div>
        <div class="newsong">
            <ul>
                <li v-for="(item,index) in newsongData" @click="playMusic(item.id,item.name,item.picUrl)">
                  <div class="pic">
                      <van-image
                        width="25"
                        height="25"
                        lazy-load
                        :src="item.picUrl"
                        />
                  </div>
                  <div class="titles">
                      <p>{{item.name}}</p>
                  </div>
                </li>
            </ul>
        </div>
	</div>
</template>

<script>
import __Config from '../../api/config.js';//api
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
	export default {
		components: {
			
		},
		name: 'Newsong',
		data() {
			return {
			      newsongData:[]
			}
		},
		methods:{
            //这种是封装过的方法
            async getFilmList() {//说明 : 调用此接口 , 可获取推荐新音乐
                const url = "/personalized/newsong";
                // let obj={
                //    limit:5
                // }
                const res = await this.$http.get(url);
                this.newsongData = res.result;
             },
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
        },
		created:function(){
			 this.getFilmList();
		}
	}
</script>
<style scoped>
.newsong{
    margin-bottom: 50px;
}
.newsong ul li{
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #fb4d3f1a;
}
.newsong ul li .pic{
    width: 30px;
    height: 100%;
}
.van-image{
   width: 25px;
    height: 25px;
    margin-left: 7px;
    margin-top: 8px; 
}
 
.newsong ul li  .titles{
     width: 100%;
    height: 40px;
    flex: 1;
    margin-left: 10px;
}
.newsong ul li  .titles p{
    line-height: 40px;
    font-size: 13px;
    color: #666;
}
</style>
