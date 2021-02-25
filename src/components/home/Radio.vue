<template>
	<div class="Radio">
        <van-sticky>
        <van-nav-bar
                left-text="返回"
                title="主播电台"
                left-arrow
                @click-left="onClickLeft"
            />
        </van-sticky>
        <div>
        <!--电台轮播-->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in listpic" :key="index">
            <img :src="item.pic" alt="">
            </van-swipe-item>
        </van-swipe>

          <!--电台tab-->
          <div class="dttab">
              <ul>
                   <router-link to="/radioType">
                  <li>
                      <div class="dtimg"><img src="../../assets/img/jd1.png" alt=""></div>
                      <div class="dttit">
                         <router-link to="/radioType">电台分类</router-link> 
                      </div>
                  </li>
                   </router-link> 
                   <router-link to="/hotRadio">
                   <li>
                      <div class="dtimg"><img src="../../assets/img/dj2.png" alt=""></div>
                      <div class="dttit">
                         <router-link to="/hotRadio">类别热门</router-link> 
                      </div>
                  </li>
                   </router-link> 
                   <router-link to="/payBoutique">
                   <li>
                      <div class="dtimg"><img src="../../assets/img/dj3.png" alt=""></div>
                      <div class="dttit">
                         <router-link to="/payBoutique">付费精品</router-link> 
                      </div>
                  </li>
                   </router-link> 
                   <li>
                       <router-link to="#">
                               <div class="dtimg"><img src="../../assets/img/dj4.png" alt=""></div>
                                <div class="dttit">
                                    <router-link to="">主播学院</router-link> 
                                </div>
                       </router-link> 
                  </li>
              </ul>
          </div>
        </div>

          <!--热门电台-->
          <div class="commonName">
             <p>热门电台</p>
          </div>
           <div class="listdata">
               <ul>
                    <li v-for="(item,index) in djRadios" :key="item.id" @click="openDafreemname(item.id)">
                       <div class="pic">
                           <img :src="item.picUrl" alt="">
                            <div class="category">
                              <p>{{item.subCount}}W</p>
                           </div>
                       </div>
                       <div class="signature">
                           <p>{{item.rcmdtext}}</p>
                       </div>
                   </li>
                   
               </ul>
           </div>

        <!--推存电台-->
         <div class="commonName">
             <p>推存电台</p>
          </div>
           <div class="listdata" style="height:703px">
               <ul>
                    <li v-for="(item,index) in getrecommendData" :key="item.id" @click="openDafreemname(item.id)">
                       <div class="pic">
                           <img :src="item.picUrl" alt="">
                            <div class="category">
                              <p>{{item.subCount}}W</p>
                           </div>
                       </div>
                       <div class="signature">
                           <p>{{item.rcmdtext}}</p>
                       </div>
                   </li>
                   
               </ul>
           </div>
      <!---->
      <Loading v-show="isLoading"></Loading>
	</div>
</template>

<script>
import Loading from '../Loading';
import __Config from '../../api/config.js';//api
import Vue from 'vue';
import { NavBar } from 'vant';
import { Sticky } from 'vant';
Vue.use(Sticky);
Vue.use(NavBar);
	export default {
		components: {
			Loading
		},
		name: 'Radio',
		data() {
			return {
                 isLoading:true,
                 listpic:[],
                 djRadios:[],//热门电台
                 getrecommendData:[],//推存电台
			}
		},
		methods:{
            /*此处使用了axios.all方法*/
           /*----------------------------------*/ 
             getdjbanner:function(){
                console.log('调用第一个接口')
                return this.$axios({
                        url:__Config.api.getdjbanner,
                        method:'get',
                        params:{
                         
                        }
                     })
                },
           /*----------------------------------*/ 
            getHotradio:function(){
                console.log('调用第2个接口')
                return this.$axios({
                        url:__Config.api.gethotradio,
                        method:'get',
                        params:{
                            
                        }
                    })
                },
                /*----------------------------------*/ 
            getrecommend:function(){
                console.log('调用第3个接口')
                return this.$axios({
                        url:__Config.api.getrecommend,
                        method:'get',
                        params:{
                            
                        }
                    })
                },
            /*------------------------------- */ 
             openDafreemname(id){
                 this.$router.push({
                        name:'Radio_detail',
                        query: {
                            radio:id,
                        }
                    })
            },
            onClickLeft() {
                window.history.back(-1);
            },   
        },
		created:function(){
   
            var that = this; 
            this.$axios.all([that.getdjbanner(),that.getHotradio(),that.getrecommend()])
            .then(that.$axios.spread(function(res1,res2,res3){
                //这里请求速度太快 看不到加载效果。延迟一秒关闭 
                setTimeout( function(){
                    that.isLoading =false;//关闭弹窗
                },500)
                console.log('所有请求完成')
                that.listpic = res1.data.data;
                that.djRadios = res2.data.djRadios;
                that.getrecommendData = res3.data.djRadios;
            }))     
  
		}
	}
</script>
<style scoped>
  .my-swipe .van-swipe-item {
	width:100%;
	font-size:20px;
	height:140px;
	text-align:center;
	background-color:#39a9ed;
}
.my-swipe .van-swipe-item img {
	width:100%;
	height:100%;
}
.dttab ul li {
	display:inline-block;
	width:23%;
}
.dttab ul li .dtimg {
	width:100%;
	height:40px;
	position:relative;
}
.dttab ul li .dtimg img {
	display:block;
	width:40px;
	height:40px;
	position:absolute;
	top:5px;
	left:0px;
	right:0px;
	margin:auto;
}
.dttit {
	width:100%;
	height:20px;
}
.dttit a {
	text-align:center;
	margin-top:10px;
	font-size:13px;
	color:#999;
	display:inherit;
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
.signature {
	width:100%;
	height:33px;
	font-size:13px;
	color:#666;
	overflow:hidden;
	padding:4px 5px;
}
.signature p{
font-size: 12px;
color: #999;
margin: 2px 2px;
}

</style>
