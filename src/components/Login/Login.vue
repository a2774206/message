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

					<p class="r_right">
						<a>忘记密码？</a>
					</p>
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
		<mt-popup v-model="popupVisible" position="top" >{{status}}</mt-popup>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { Field, Button, Navbar, TabItem, Popup } from 'mint-ui';
	export default {
		name: 'Login',
		data() {
			return {
				selected: '1',
				popupVisible:false,
				status:'登陆成功',
				YzmSrc: this.$store.state.ip + '/login/verifyCode?width=80&height=30',
				//登陆数据
				LoginData: {
					id: '',
					username: '',
					loginmm: '',
					phone: '',
					yanzheng: '',
				},
				RegisterData: {
					//注册数据
				}
			}
		},
		methods: {
			Loginbtn() {
				if(this.LoginData.username!=''||this.LoginData.loginmm!=''||this.LoginData.yanzheng!=''){
					//md5加密
					let md5word = hex_md5(this.LoginData.password);
					//哈希加密
					var hashword = hex_sha1(md5word);
					//AES加密
					let aes = Encrypt(hashword);
					//login参数集合
					let parameter = {
						name: this.LoginData.id,
						password: aes,
						verifyCode: this.LoginData.yanzheng
					}
					//登陆后台提交
					let PostUrl = this.$store.state.ip + '/login/commit';
					this.axios({
						method: 'post',
						url: PostUrl,
						data: parameter
					}).then(res => {
						console.log(res);
						this.status = res.data.message;
						this.popupVisible = true;
						this.$store.state.LoginStatus = true;
						setTimeout(()=>{
							this.popupVisible = false;
						},3000);
						if(res.data.status=='success'){
							this.status = '登录成功！';
							setTimeout(()=>{
								this.$router.push('/')
							},2000);
						}
					});	
				}else{
					this.status = '不能为空'
					this.popupVisible = true;
					setTimeout(()=>{
							this.popupVisible = false;
					},3000);
				}
				//验证码刷新
				this.renovate();
			},
			renovate() {
				//验证码刷新
				let yzm = this.YzmSrc;
				this.YzmSrc = this.$store.state.ip + '/login/verifyCode?width=80&height=30&' + Math.random();
			}

		},
		created() {
			
		},
		computed: {
			
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
	
	.r_right {
		text-align: right;
	}
	
	#Login {
		background: #fff;
		width: 375px;
		overflow: hidden;
		height: 700px;
		position: relative;
		z-index: 9999;
		margin-top: -44px;
	}
	
	.flex_login {
		padding: 0 20px;
		position: absolute;
		top: 30%;
		transform: translateY(-50%);
		z-index: 999;
		width: 335px;
	}
	
	.v {
		position: relative;
	}
	
	.yzm_img {
		width: 80px;
		height: 30px;
		right: 0;
		position: absolute;
		bottom: 10px;
		z-index: 99;
	}
	
</style>