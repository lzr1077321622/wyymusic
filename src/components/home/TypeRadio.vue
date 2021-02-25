<template>
	<div class="HotRadio">
        <van-sticky>
          <van-nav-bar
                left-text="返回"
                title=""
                left-arrow
                @click-left="onClickLeft"
            />
        </van-sticky>
       <div class="listdata">
                     <ul>
                            <li v-for="(item,index) in djRadios" :key="item.id" @click="openDafreemname(item.id)">
                            <div class="pic">
                            
                                 <van-image
                                        width="100%"
                                        height="130"
                                        lazy-load
                                        :src="item.picUrl"
                                        />
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
	</div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
import __Config from '../../api/config.js';//api
import { Sticky } from 'vant';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.use(Sticky);
Vue.use(Tab);
Vue.use(Tabs);
	export default {
		 components: {
		
		 },
		name: 'HotRadio',
		data() {
			return {
                 active:0,
                 tabmeunList:[],
                 categoryId:"2001",
                 djRadios:[]
			}
		},
		methods: {

            //获取列表
            getList(){
                  var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.geradioList+this.$route.query.id,
                 }).then(res => {
                     that.djRadios = res.data.djRadios
                  
                 }).then(err =>{
                 
                 }).catch(function (err) {
                    
                });			
            },
              //详情页
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
      
		created: function() {
         
           this.getList(this.categoryId);	
		},
	    mounted() {
	       
			 
		},
	}
</script>
<style scoped>
.listdata{
    margin-top: 20px;
}
 .listdata ul li{
          width: 33%;
          float: left;
          height: 175px;
          margin-left: 1px;
          overflow: hidden;
      }
       .listdata ul li .pic{
           width: 100%;
           height:130px;
           position: relative;
       }
    .listdata ul li .pic img{
        width: 100%;
        height: 130px;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .listdata ul li .pic .category{
        position: absolute;
        top: 3px;
        right: 5px;
        font-size: 13px;
        color: #fff;
    }
     .signature{
        width: 100%;
        height: 33px;
        font-size: 13px;
        color: #666;
        overflow: hidden;
        padding: 4px 5px;
    }
</style>
