<template>
	<div class="newmv">
        <div class="commtit">
          <p> 〓 最新Mv</p>
        </div>
	    <div class="newmvbox">
            <ul>
                <li v-for="(item,index) in newMv" :key="item.id" @click="playdetail(item.id,item.cover,2)">
                    <div class="pic">
                        <p><img :src="item.cover" alt=""></p>
                        <p><van-icon name="play" />{{item.playCount}}万</p>
                    </div>
                    <div class="tit"><p>{{item.artistName}}</p></div>
                </li>
                
            </ul>
        </div>
	</div>
</template>

<script>
import __Config from '../../api/config.js';//api
import Vue from 'vue';
import { Icon } from 'vant';
Vue.use(Icon);
	export default {
		components: {
			
		},
		name:'NewMv',
		data() {
			return {
			  newMv:[]
			}
		},
		methods:{
			 getnew(){
                 var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getnewMv,
                 }).then(res => {
                     that.newMv = res.data.data
                
                 }).then(err =>{

                 }).catch(function (err) {
                    
                });		
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
			 this.getnew();
		}
	}
</script>
<style scoped>
.newmvbox{
    width: 100%;
    height: 100%;
}
.newmvbox ul li{
    width: 30%;
    height: 135px;
    display: inline-block;
    margin: 1.1%;
}
.pic{
    width: 100%;
    height: 100px;
    position: relative;
}
.pic p:nth-child(1){
    position: absolute;
     width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
}
.pic p:nth-child(1) img{
    width: 100%;
    height: 100%;
}
.pic p:nth-child(2){
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 13px;
    color: #fff;
}

.tit{
    width: 100%;
    height:35px;
    overflow: hidden;
}
.tit p{
    font-size: 13px;
    color: #666;
    margin: 2px 2px;
}
</style>
