<!--电台分类-->
<template>
	<div class="RadioType">
	    <van-sticky>
        <van-nav-bar
                left-text="返回"
                title="电台分类"
                left-arrow
                @click-left="onClickLeft"
            />
        </van-sticky>
        <div class="listradio">
           <van-grid clickable>
               <van-grid-item :icon="item.pic56x56Url" v-for="(item,index) in categories"  :key="index" :text="item.name" @click="dtDeatil(item.id)" />
            </van-grid>
        </div>
	</div>
</template>

<script>
import Vue from 'vue';
import __Config from '../api/config.js';//api
import { Grid, GridItem } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
	export default {
		components: {
			
		},
		name: 'RadioType',
		data() {
			return {
			   categories:[]
			}
		},
		methods:{

              getRoType(){
                var that =this;
                this.$axios({
                    method: 'get',
                    dataType: 'json',
                    url:__Config.api.getRoType,
                }).then(res => {
                    that.categories = res.data.categories;
              
                }).then(err =>{
                }).catch(function (err) {

                });		
              },
             //电台详情
             dtDeatil(id){
                 this.$router.push({
                        name:'typeRadio',
                        query: {
                            id:id,
                        }
                    })
             },
			  onClickLeft() {
                window.history.back(-1);
            },			
        },
		created:function(){
			  this.getRoType();
		}
	}
</script>
<style scoped>

</style>
