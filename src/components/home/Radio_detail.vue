<template>
	<div class="Radio_detail">
	   <div class="topBack" id="topBack">
          <div class="topbox">
            <div class="topBackpic"   @click="onClickLeft"><img src="../../assets/img/back.png" alt=""></div>
            <div  class="topBacktit"><p>电台</p></div>
            <div class="topBackpic"></div>
          </div>
          <div class="info">
             <p>{{name}}</p>
             <p>{{dynum}}{{txt}}</p>
          </div>
       </div>
       <div class="listdata">
            <!-- <van-sticky :offset-top="0"> -->
            <van-tabs v-model="active">
                <van-tab title="详情">
                    <div class="desc">
                       <p>{{desc}}</p>
                    </div>
                    <div class="listarr">
                        <ul>
                            <li v-for="(item,index) in pinglundata" :key="index">
                                <div class="listarrimg">
                                    <img :src="item.userProfile.avatarUrl" alt="">
                                </div>
                                <div class="username">
                                   <p>{{item.programName}}</p>
                                </div>
                                <div class="counts">
                                    <p>{{item.content}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </van-tab>
                <van-tab title="节目">

                     <!---->
                    <div class="list">
                        <ul>
                            <li v-for='(item,index) in jielist' :key='index' @click="playMusic(item.id,item.name,item.blurCoverUrl)">
                                <div class="musicbg">
                                <img :src="item.blurCoverUrl" alt="">
                                </div>
                                <div class="title">
                                    <div class="item1">
                                         <p>{{item.name}}</p>
                                         <p>{{item.description}}</p>
                                    </div>
                                    <div class="item2">
                                      <van-icon name="service" size='28' class="imgs" color='#999'/>
                                    </div>
                                </div>
                            </li>
                        
                        </ul>
                    </div>
                </van-tab>
               
                </van-tabs>
            <!-- </van-sticky> -->
       </div>
	</div>
</template>

<script>
import __Config from '../../api/config.js';//api
import Vue from 'vue';
import { Sticky } from 'vant';
import { Tab, Tabs } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sticky);
	export default {
		components: {
			
		},
		name: 'Radio_detail',
		data() {
			return {
               dynum:"",
               name:"",
               txt:"人订阅",
               active:0,
               desc:"",
               pinglundata:[],
               jielist:[]
			}
		},
		methods:{
				getDeatil() {
                  var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getDetailradio+ this.$route.query.radio,
                 }).then(res => {
                     
                        document.getElementById("topBack").style.backgroundImage = "url("+res.data.djRadio.picUrl+")";
                        that.dynum = res.data.djRadio.subCount;
                        that.name = res.data.djRadio.name;
                        that.desc = res.data.djRadio.desc;
                        that.pinglundata = res.data.djRadio.commentDatas

                 }).then(err =>{

                 }).catch(function (err) {
                    
                });			
            },	
            //获取电台节目
            getprogram(){
                 var that =this;
                  this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getprogram+ this.$route.query.radio+ "&cookie=" +this.$store.state.userinfo.cookie ,
                 }).then(res => {
                     that.jielist = res.data.programs
           
                 }).then(err =>{

                 }).catch(function (err) {
                    
                });			
            },
          playMusic(id,name,pic){
 
              //获取到节目ID 
                var that =this;
                this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getJMDetail+ id,
                }).then(res => {
                  //节目ID
                   let detaID =res.data.program.mainSong.id;
  
                    this.$router.push({
                        name:'Playmusic',
                        query: {
                            musicId:detaID,
                            name:name,
                            pic:pic
                        }
                    })
               
                }).then(err =>{

                }).catch(function (err) {

                });			
                
            },


            onClickLeft(){
                  window.history.back(-1);
            }
        },
		created:function(){
              this.getDeatil();
              this.getprogram();
		}
	}
</script>
<style scoped>
*{
    padding: 0;
    margin: 0;
}
.topBack{
    width: 100%;
    height: 236px;
    background-size: 100% 100%;
    overflow: hidden;
}
.topbox{
   width: 100%;
   height: 55px;
   display: flex;
}
.topBackpic{
    width: 60px;
    height: 100%;
 
}
.topBackpic img{
    width: 30px;
    height: 30px;
}
.topBacktit{
    flex: 1;
}
.topBacktit p{
    text-align: center;
    line-height: 55px;
    color: #fff;
}
.listdata{
    margin-bottom: 20px;
    width: 100%;
    height: 100%;
   
}
.info{
    width: 100%;
    height: 60px;
    margin-top: 131px;
    font-size: 13px;
    color: #fff;
    margin-left: 10px;
}
.desc p{
    font-size: 13px;
    color: #666;
    padding: 10px 10px;
}
.listarrimg{
    width: 30px;
    height: 30px;
}
.listarrimg img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
    padding: 5px;
}
.username{
    font-size: 14px;
    color: #000;
      padding: 5px;
}
.counts{
       font-size: 13px;
       color: #666;
         padding: 5px;
       }

       /**/ 
         .list{
          margin-bottom: 50px;
      }
      .list ul li{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #c8c9cc21;
        display: flex;
      }
      .musicbg{
        width: 50px;
        height: 48px;
       
      }
      .musicbg img{
        width: 40px;
        height: 39px;
     
        margin-top: 5px;
        margin-left: 5px;
      }
      .title{
          flex: 1;
       
          display: flex;
      }
       .title p:nth-child(1){
           font-size: 14px;
            color: rgba(0,0,0,.7);
            height: 25px;
            overflow: hidden;
            width: 248px;
      
            line-height: 27px;
            font-weight: bold;
       }
        .title p:nth-child(2){
                font-weight: lighter;
                font-size: 13px;
                color: #999;
                height:20px;
                overflow: hidden;
                width: 248px;
            
       }
      .item1{
          flex: 1;
      }
      .item2{
          width: 60px;
          height: 48px;
      }
      .imgs{
        font-size: 28px;
        margin-left: 20px;
        margin-top: 5px;
      }
</style>
