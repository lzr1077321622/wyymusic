<template>
	<div class="box">

        <div>
            <van-nav-bar
                title="歌手列表"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            
                />
        </div>
	    <van-index-bar sticky highlight-color='red' @select='changetype'>
           <div v-for="(item,index) in letter" :key="index" class="list">
                 <van-index-anchor :index="item" />
                <ul>
                    <li  v-for="(item,index) in artists" :key="index" @click="getGsid(item.id)">
                        <div class="pic">
                         <van-image
                            width="40"
                            height="40"
                            lazy-load
                            :src="item.picUrl" 
                            />
                        </div>
                        <div class="name"><p>{{item.name}}</p></div>
                    </li> 
                   
                </ul>
           </div>
          
        </van-index-bar>
       <Loading v-show="isLoading"></Loading>
	</div>
</template>

<script>
import Vue from 'vue';
import Loading from '../Loading';
import __Config from '../../api/config.js';//api
import { IndexBar, IndexAnchor } from 'vant';
import { NavBar } from 'vant';
import { Lazyload } from 'vant';
import { Image as VanImage } from 'vant';

Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(NavBar);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
	export default {
		components: {
			Loading
		},
		name: 'Singer',
		data() {
			return {
                 isLoading:true,
                 letter:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
                 nameLatt:"A",
                 artists:[]
			}
		},
		methods:{
             getgeshoutype(){
                 var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getgeshoutype + this.nameLatt,
                 }).then(res => {
                     that.artists = res.data.artists;
                     that.isLoading =false;//关闭弹窗
                 }).then(err =>{

                 }).catch(function (err) {
                      that.isLoading =false;//关闭弹窗
                });			
             },
            changetype(e){
                  this.nameLatt =e;    
                  this.getgeshoutype();  
            },
            getGsid(id){
               this.$router.push({
                    name:'SingerPlay',
                    query: {
                        musicId:id,
                    }
                })
            },
            onClickLeft() {
                 window.history.back();  
            },

        },
		created:function(){
			 this.getgeshoutype();
		}
	}
</script>
<style scoped>

.list ul li{
    display: inline-block;
    padding: 8px 8px;
}
.list ul li .pic{
    width: 40px;
    height: 40px;
}
.list ul li .pic .van-image__img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
}
.list ul li .name p{
    font-size: 13px;
    color: #797777;
    margin-top: 3px;
}
</style>
