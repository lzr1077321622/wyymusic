<template>
	<div class="login">
        <div class="logo">
              <!-- <img src="../../assets/img/logo.jpg" alt=""> -->
              <div style="height:50px"></div>
              <div class="logopic">

              </div>
        </div>
        <div class="logobn" @click="tellogin">
            <p>手机号登录</p>
        </div>
	</div>
</template>

<script>

	export default {
		 components: {
		 
		 },
		name: 'Login',
		data() {
			return {
				
			}
		},
		methods: {
		   tellogin(){
               this.$router.push({ path:"index"})
           }
		},
		created: function() {

		},
		 mounted() {
	      
			 
		},
	}
</script>
<style scoped>
.login{
    width: 100%;
    height: 100%;
     background-image: linear-gradient(#e66465, #000);
  
}
.logo{
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
.logopic {
    width: 100px;
    height: 100px;
    background: url("../../assets/img/wyy.png");
    background-size: 100% 100%;
     -webkit-animation: lzr 2s linear infinite alternate;
    -moz-animation: lzr 2s linear infinite alternate;
    animation: lzr 2s linear infinite alternate;
}
  @-webkit-keyframes lzr {
    0% {
        -webkit-transform: scale(1, 1);
    }
    100% {
        -webkit-transform: scale(1.03, 1.03);
    }
}

@keyframes lzr {
    0% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(1.2, 1.2);
    }
}
.logobn{
    width: 76%;
    height: 45px;
    background: #fff;
    margin: 309px auto 0px auto;
    border-radius: 34px;
}
.logobn p{
    text-align: center;
    line-height: 45px;
    color: red;
    font-weight: bold;
}
</style>
