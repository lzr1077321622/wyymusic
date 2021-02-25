<template>
	<div class="PayBoutique">
	       <van-sticky>
            <van-nav-bar
                    left-text="返回"
                    title="付费精选"
                    left-arrow
                    @click-left="onClickLeft"
                />
            </van-sticky>
      
           <div class="listdata">
               <ul>
                    <li v-for="(item,index) in djRadios" :key="item.id" @click="openPay()">
                       <div class="pic">
                           <img :src="item.picUrl" alt="">
                            <div class="category">
                              <p>{{item.originalPrice/100}}￥</p>
                           </div>
                       </div>
                       <div class="signature">
                           <p>{{item.rcmdtext}}</p>
                       </div>
                   </li>
                   
               </ul>
           </div>

        <div>
            <van-pagination v-model="currentPage" :total-items="55" :items-per-page="5" @change="changepage" />
        </div>
       <Loading v-show="isloading"></Loading>
	</div>
</template>

<script>
import Loading from '../Loading.vue'  
import __Config from '../../api/config.js';//api
import Vue from 'vue';
import { NavBar } from 'vant';
import { Sticky } from 'vant';
import { Pagination } from 'vant';

Vue.use(Pagination);
Vue.use(Sticky);
Vue.use(NavBar);
	export default {
		components: {
			 Loading
		},
		name: 'PayBoutique',
		data() {
			return {
                isloading:true,
                currentPage:1,
                limit:9,
                offset:1,
                djRadios:[]
			}
		},
		methods:{
                //这种是封装过的方法
             async getFilmList() {//说明 : 调用此接口 , 可获取推荐新音乐
                const url = "/dj/paygift";
                let obj={
                   limit:this.limit,
                   offset:this.currentPage
                }
                 const res = await this.$http.get(url,obj);
                 this.djRadios = res.data.list;
                 this.isloading= false;
             },
             changepage(e){
                 this.currentPage =e;
             	 this.getFilmList();
             },
			 onClickLeft() {
                window.history.back(-1);
            }, 	
            openPay(){
                 this.$toast('请先付费')
            }
        },
		created:function(){
			 this.getFilmList();
		}
	}
</script>
<style scoped>
.listdata{
    width: 98%;
    height: 527px;
    margin: 0 auto;
}
.listdata ul li {
	width:33%;
	float:left;
	height:175px;
	margin-left:1px;
	overflow:hidden;
}
.listdata ul li .pic {
	width:100%;
	height:130px;
	position:relative;
}
.listdata ul li .pic img {
	width:100%;
	height:130px;
	position:absolute;
	top:0px;
	left:0px;
}
.listdata ul li .pic .category {
	position:absolute;
	top:3px;
	right:5px;
	font-size:13px;
	color:#fff;
}
</style>
