<template>
	<div class="heading">
		<i class="mintui mintui-back" @click="back" v-show="isShows" ></i>
		<span >{{childs}}</span>
		<center class="nickname" v-show='this.$store.state.nicknameShow'>
			{{$route.query.nick}}
		</center>
		<router-link :to="{path:'/addFriend',query:{tab:4}}"><div class="btn-add">
			<img src="../../../static/image/add.png">
		</div></router-link>
	</div>
</template>

<script>
	
	export default {
		name: 'heading',
		data() {
			return {
				
			}
		},
		props:['child','isShow'],//当用户返回的时候，父组件路由变化的时，传递路由改变当前tab选项
		computed:{
			childs(){
				return this.computedFz()
			},
			isShows(){
				//接收传值判断显示隐藏返回按钮及刷新初始化
				 if(this.$route.path=='/'||this.$route.query.tab=='0'){
					 this.msg = this.isShow 
				 } else{
				 	this.msg =true;
				 }
				return this.msg
			},
			nick(){
				return this.$store.state.nick;
			}
		},
		methods: {
			back(){
				history.back();
			},
			computedFz(){
				let t = ''
				switch(this.child){
					case '/':
					t = '聊天';
					break;
					case '/index':
					t = '聊天';
					break;
					case '/userList':
					t = '好友'
					break;
					case '/group':
					t = '群组'
					break;
					case '/my':
					t = '我的'
					break;
					case '/addFriend':
					t = '添加好友'
					break;
				}
//				this.child = t;
				return t;
			}
			
		},
		created(){
				this.$store.state.nicknameShow = true;
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
	
	.heading {
		width: 375px;
		height: 44px;
		line-height: 44px;
		text-align: center;
		font-size: 18px;
		background: #f5f5f5;
		border-bottom: 1px solid #d9d9d9;
		position: fixed;
		top: 0;
		z-index: 100;
	}
	.btn-add {
		width: 17px;
		height: 18px;
		background: url('./static/image/add.png');
		background-size: 100% 100%;
		position: absolute;
		right: 15px;
		top: 14px;
	}
	
	.btn-add img {
		width: 100%;
		height: 100%;
		display: inherit;
	}
	
	.mintui-back::before{
		position: absolute;
		left:15px ;
		font-size: 18px;
		top: 0;
		
	}
	.nickname{
		width: 200px;
		margin:  0 auto;
		overflow: hidden;
		white-space: nowrap;
   		text-overflow: ellipsis;
	}
	
</style>