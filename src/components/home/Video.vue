<template>
	<div class="Video">
	     <van-sticky>
            <van-nav-bar
                    left-text="返回"
                    title="全部视频"
                     right-text="换一批"
                    left-arrow
                    @click-left="onClickLeft"
                     @click-right="onClickRight"
                />
            </van-sticky>

          <div class="moveList">
                  <ul>
                        <li v-for="(item,index) in data" :key="index" @click="playdetail(item.data.vid,item.data.coverUrl,3)">
                            <div class="imgs">
                               <van-image
                                error-icon=""
                                width="100%"
                                height="150"
                                lazy-load
                                :src="item.data.coverUrl"
                                /> 
                            </div>
                            <div class="name">
                              <p>{{item.data.title}}</p>
                            </div>
                            <div class="unm">
                                 <span><van-icon name="good-job" />{{item.data.commentCount}}</span><span><van-icon name="share" />{{item.data.shareCount}}</span>
                            </div>
                        </li>
                      
                  </ul>
          </div>
	</div>
</template>

<script>
import __Config from '../../api/config.js';//api
import Vue from 'vue';
import { NavBar } from 'vant';
import { Sticky } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(Sticky);
Vue.use(NavBar);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
	export default {
		components: {
			
		},
		name: 'Video',
		data() {
			return {
			    data:[],
               
			}
        },
         computed:{
	     
	    },
         mounted(){
          
        },
		methods:{

            //随机取1 - 10页之间的数据
              getNumRepeat (maxNum) {
                  return Math.floor(Math.random()*maxNum)+1;
              },
              async getallVideo() {
                const url = "/video/timeline/all?cookie="+this.$store.state.userinfo.cookie;
                let obj={
                   offset:this.getNumRepeat(20)
                }
                const res = await this.$http.get(url,obj);
                this.data = res.datas
              
             },	
             onClickRight(){
                 this.getallVideo();
             },
             onClickLeft() {
                window.history.back(-1);
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
			 this.getallVideo();
		}
	}
</script>
<style scoped>
.v-waterfall-content{
    width: 100%;
    height: 100%;
    position: relative;
}
.v-waterfall-item{
    float: left;
    position: absolute;
}
.v-waterfall-item img{
    width: auto;
    height: auto;
}
.moveList{
    width: 100%;
    height: 150px;
}
.moveList ul li:first-child{
    margin-top: 25px;
}
.moveList ul li{
    width: 90%;
    height: 150px;
    -webkit-box-shadow: 0px 0px 3px #ccc;
    box-shadow: 0px 0px 3px #ccc;
    margin: -40px auto 55px auto;
    border-radius: 10px;
    position: relative;
}
.imgs{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 150px;
}
.moveList ul li  img{
    
    width: 100%;
    height: 150px;
}
.moveList ul li .van-image__img{
   border-radius: 10px !important; 
}
.name{
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 30px;
    overflow: hidden;
}
.name p{
    font-size: 13px;
    color: #fff;
    line-height: 30px;
    margin-left: 5px;
}
.unm{
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.5);

}
.unm span{
    float: right;
    color: #fff;
    margin: 0px 5px;
    line-height: 30px;
}
.unm span i{
    color: #fff;
}
</style>
