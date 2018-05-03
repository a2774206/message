<template>
	<div id="Login">
		<div class="flex_login">
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">登录</mt-tab-item>
				<mt-tab-item id="2">注册</mt-tab-item>

			</mt-navbar>

			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<mt-field label="账号" placeholder="请输入邮箱/ID" type="text" v-model="LoginData.id"></mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" v-model="LoginData.password"></mt-field>
					<div class="v">
						<mt-field label="验证码" placeholder="请输入验证码" type="text" v-model="LoginData.yanzheng" class='v'></mt-field>
						<p class="yzm_img">
							<img :src="YzmSrc" @click="renovate">
						</p>
					</div>
					
					<p class="r_right"><a>忘记密码？</a></p>
					<mt-button plain @click="Loginbtn">登录</mt-button>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<mt-field label="" placeholder="请输入用户名" v-model="LoginData.username"></mt-field>
					<mt-field label="" placeholder="请输入邮箱" type="email" v-model="LoginData.email"></mt-field>
					<mt-field label="" placeholder="请输入密码" type="password" v-model="LoginData.loginmm"></mt-field>
					<mt-field label="" placeholder="请输入手机号" type="tel" v-model="LoginData.phone"></mt-field>
					<mt-button plain>注册</mt-button>
				</mt-tab-container-item>

			</mt-tab-container>

		</div>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { Field, Button, Navbar, TabItem } from 'mint-ui';
	export default {
		name: 'Login',
		data() {
			return {
				selected:'1',
				YzmSrc:this.$store.state.ip+'/login/verifyCode?width=80&height=30',
				//登陆数据
				LoginData:{
					id: '',
					username:'',
					loginmm: '',
					phone:'',
					yanzheng:'',
				},
				RegisterData:{
					//注册数据
				}
			}
		},
		components: {
			
		},
		methods:{
			Loginbtn(){
				//login参数集合
				let parameter = {
					name:this.LoginData.id,
					password:this.LoginData.password,
					verifyCode:this.LoginData.yanzheng
				}
				//登陆后台提交
				let PostUrl = this.$store.state.ip + '/login/commit';
				this.axios({
					method:'post',
					url:PostUrl,
					data:parameter
				}).then(res=>{
				    console.log(res.data);
				});
			},
			renovate(){
				//验证码刷新
				let yzm = this.YzmSrc;
				this.YzmSrc =this.$store.state.ip+'/login/verifyCode?width=80&height=30&'+ Math.random();
			}
			
		},
		created(){
			//this.getJson();
		},
		computed:{
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
	
	body {
		position: relative;
		background: #fff;
		overflow: hidden;
	}
	.r_right{
		text-align: right;
	}
	#Login{
		background: #fff;
		width: 375px;
		overflow: hidden;
		height: 700px;
		position: relative;
		z-index: 9999;
		margin-top:-44px;
		
	}
	.flex_login {
		padding: 0 20px;
		position: absolute;
		top: 30%;
		transform: translateY(-50%);
		z-index: 999;
		width: 335px;
	}
	.v{
		position: relative;
	}
	.yzm_img{
		width: 80px;
		height: 30px;
		right: 0;
		position: absolute;
		bottom: 10px;
		z-index: 99;
	}
</style>