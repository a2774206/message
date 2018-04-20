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
					<mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
					<p class="r_right"><a>忘记密码？</a></p>
					<mt-button plain>登录</mt-button>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<mt-field label="" placeholder="请输入用户名" v-model="username"></mt-field>
					<mt-field label="" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
					<mt-field label="" placeholder="请输入密码" type="password" v-model="password"></mt-field>
					<mt-field label="" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
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
				email: '',
				password: '',
				selected:'1',
				phone:'',
				username:''
			}
		},
		components: {

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
		width: 750px;
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
	}
</style>