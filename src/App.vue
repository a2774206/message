<template>
	<div id="app">
		<heading :child='router' :isShow='show'></heading>
		<div class="clex"></div>
		<router-view />
		<foot ></foot>
	
	</div>
</template>

<script>
//	router.beforeEach((to, from, next) => {
//		if(to.path == '/index'||to.query == 0){
//			this.show = false;
//		}
//		next();
//	});

	import Vue from 'Vue';
	import router from './router'
	import heading from './components/public/head'
	import foot from './components/public/foot'
	import login from './components/Login/Login'
	export default {
		name: 'App',
		data(){
			return {
				router:'/index',
				show:true
			}
		},
		components: {
			heading,
			foot
		},
		watch: {
			'$route' (to, from) {
				//监听路由发生变化，然后传值到head组件
				//也可以在head中监听，这里可以简化，不用父子传值
				//console.log(to.query)
				if(to.path == '/index'||to.query == 0||to.path == '/'){
					this.show = false;
				}else{
					this.show = true;
				}
				this.router = to.path;
				
			}
		},
		methods:{
			friend(){
		          Friend.$emit('newFriend', 2)
		     }
		},
		created(){
			//去返回键
			this.show = false;
			
			//console.log(this.$route.path)
			//刷新后title传值，解决刷新后路由恢复/index
			switch(this.$route.path){
					case '/':
					this.router = '/index';
					break;
					case '/index':
					this.router = '/index';
					break;
					case '/userList':
					this.router = '/userList'
					break;
					case '/group':
					this.router = '/group'
					break;
					case '/my':
					this.router = '/my'
					break;
					case '/addFriend':
					this.router = '/addFriend'
					break;
				}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-y: hidden;
		color: #2c3e50;
		width: 375px;
	}
	.clex{
		height: 44px;
	}
	.mint-indexlist-nav{
		justify-content:flex-start !important;	
	}
	.mint-cell-text{
		color: #2c3e50;
	}
	.is-plain{
		width: 335px;
		
		margin-top: 30px;
		border: 1px solid red;
	}
	#Login .mint-cell-wrapper{
		border-bottom: 1px solid #969292;
	}
	.mint-button--default.is-plain{
		border:1px solid #969292;/*no*/
		margin-bottom: 2px;
	}
	#Login .mint-tab-item .mint-tab-item-label{
		font-size: 18px;
	}
	#Login .mint-cell-wrapper{
		margin: 5px 0;
	}
	#Login .mint-cell-wrapper{
		background-image: none;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #f8ab7e !important;
	}
	.mint-spinner-triple-bounce .mint-spinner-triple-bounce-bounce1{
		background-color: #f26715 !important
	}
	.mint-spinner-triple-bounce .mint-spinner-triple-bounce-bounce2{
		background-color: #f26715 !important
	}
	.mint-spinner-triple-bounce .mint-spinner-triple-bounce-bounce3{
		background-color: #f26715 !important
	}
	.more_loading{
		background: #fff;
		height: 30px;
		line-height: 30px;
	}
	


</style>