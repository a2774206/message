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
						<mt-field label="验证码" placeholder="请输入验证码" type="text" v-model="LoginData.yanzheng" class='v' ></mt-field>
						<p class="yzm_img">
							<img :src="YzmSrc" @click="renovate">
						</p>
					</div>

					<p class="r_right">
						<a>忘记密码？</a>
					</p>
					<mt-button plain @click.native="Loginbtn" >登录</mt-button>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<mt-field label="" placeholder="请输入昵称" v-model="RegisterData.nickName"></mt-field>
					<mt-field label="" placeholder="请输入邮箱" type="email" v-model="RegisterData.email"></mt-field>
					<div class="email_y">
						<mt-field label="" placeholder="请输入邮箱校验码" type="email" v-model="RegisterData.yanzheng"></mt-field>
						<mt-button type="primary" :disabled='RegisterStatus' size="small" class='send' style="position: absolute;z-index: 99;right: 15px;top:7.5px;" @click='RegisterSend'>
							{{RegisterSendBtn}}
						</mt-button>
					</div>
					<mt-field label="" placeholder="请输入密码" type="password" v-model="RegisterData.registermm"></mt-field>
					<mt-button plain v-on:click.native='RegisterBtn'>注册</mt-button>
				</mt-tab-container-item>

			</mt-tab-container>
			
		</div>
		<mt-popup v-model="popupVisible" position="top" >{{status}}</mt-popup>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { Field, Button, Navbar, TabItem, Popup } from 'mint-ui';
	import { getStorage } from '../../../handle/public.js';
	
	import SockJS from 'sockjs-client';
	import Stomp from 'stomp-websocket';
	
	export default {
		name: 'Login',
		data() {
			return {
				selected: '1',
				popupVisible:false,
				status:'登陆成功',
				RegisterSendBtn:'发送',
				RegisterStatus:false,
				YzmSrc: this.urlApi.yzmSrc,
				//登陆数据
				LoginData: {
					id: '10005',
					nickName: '',
					password:'asd123456789',
					phone: '',
					yanzheng: '',
				},
				RegisterData: {
					//注册数据
					nickName:'',
					email:'',
					registermm:'',
					yanzheng:''
					
				},
				index:0,
				nick:''
			}
		},
		methods: {
			encrypts(str){
				//md5加密
				let md5 = hex_md5(str);
				//哈希加密
				let sha = hex_sha1(md5);
				//返回AES加密
				return Encrypt(sha);
			},
			Loginbtn() {
				if(this.LoginData.id!=''||this.LoginData.loginmm!=''){
					
					//login参数集合
					let parameter = {
						name: this.LoginData.id,
						password: this.encrypts(this.LoginData.password)
//						,
//						verifyCode: this.LoginData.yanzheng
					}
					//登陆后台提交
					this.axios({
						method: 'post',
						url: this.urlApi.loginApi,
						data: parameter,
						withCredentials:true
					}).then(res => {
						this.ModalStatus(res.data.message);
						if(res.data.status=='success'){
							this.status = '登录成功';
							this.getNick();
							this.$store.state.LoginStatus = true;
							this.$store.state.nickname = res.data.data.nickName;
							this.$store.state.uid = res.data.data.code;
							localStorage.setItem('islogin',true);
							this.socketInit();
							setTimeout(()=>{
								this.$router.push('/');
							},2000);
						}else{
							//登录失败刷验证
							this.renovate();
							this.LoginData.yanzheng = '';
						}
					});	
				}else{
					
					this.ModalStatus('不能为空')
				}
				
			},
			ModalStatus(info,timer){
				//信息提示，info:提示内容，timer:显示时间
				if(timer ==''||timer == undefined){
					timer = 3000
				}
				this.status = info;
				this.popupVisible = true;
				setTimeout(()=>{
					this.popupVisible = false;
				},timer);
			},
			renovate() {
				//login验证码刷新
				this.YzmSrc = this.urlApi.yzmSrc + Math.random();
			},
			RegisterSend(){
				//注册邮箱发送验证码
				let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				if(this.RegisterData.email != '' && reg.test(this.RegisterData.email)){
					this.axios({
						method: 'post',
						url: this.urlApi.mailCode,
						data: {'email':this.RegisterData.email},
						withCredentials:true
					}).then(res => {
						if(res.data.status=='success'){
							this.RegisterStatus = true;
							this.ModalStatus('发送成功');
							let WaitTime = 20;
							var start = setInterval(()=>{
								this.RegisterSendBtn = WaitTime--;
								if(!this.RegisterSendBtn){
									clearInterval(start);
									this.RegisterSendBtn = '发送'
									this.RegisterStatus = false;
								}
							},1000)
						}else if(res.data.status=='error'){
							this.ModalStatus(res.data.message);
						}
					});	
				}else{
					this.ModalStatus('请正确填写邮箱!');
				}
				
			},
			RegisterBtn(){
				//注册密码三层加密
				
				let _register = {
					  "email": this.RegisterData.email,
					  "nickName": this.RegisterData.nickName,
					  "password": this.encrypts(this.RegisterData.registermm),
					  "verifyCode": this.RegisterData.yanzheng
				}
				this.axios({
						method: 'post',
						url: this.urlApi.register,
						data: _register,
						withCredentials:true
				}).then(res => {
					this.ModalStatus(res.data.message);
					this.$store.state.LoginStatus = true;
					if(res.data.status=='success'){
						this.status = '注册成功';
						setTimeout(()=>{
							this.$router.push('/')
						},2000);
					}
				});	
				
			},
			getNick(){
				this.axios({
						method: 'post',
						url: this.urlApi.friendList
				}).then(res => {
					
					this.nick = res.data.data;
					
				});	
				
			},
			getname(uid){
				let arr = this.nick;
				let n ='';
					arr.forEach((item,i)=>{
						//console.log(uid+'===='+item.code)
						if(uid == item.code){
							//console.log(item.nickName)
							if(item.aliasName!=''&& item.aliasName!=null){
								n = item.aliasName;
							}else{
								n = item.nickName;
							}
							return n;
						}
						
					})
					return n;
			},
			update(record,arr) {
			/* 发送人和接收人都显示*/
//				var index = 0;
				let nm =this.$store.state.uid;
				
				record['nick'] = (nm==record.receiver) ? this.getname(record.sender) : this.getname(record.receiver);
		    	
			    for(let index = 0;index < arr.length;index++) { 
			    	
			    	if((+arr[index].receiver)+(+arr[index].sender) == (+record.receiver)+(+record.sender)) {
					  arr.splice(index, 1);
				    }

			 	 }
				
			  arr.unshift(record);
			 // console.log(arr)
			},
			readHistory(){
				//聊天记录
				this.$store.state.sockData.data = new Map(getStorage('msg'));
				//聊天列表
				if(!getStorage('list')){
					return;
				}
				else{
					this.$store.state.sockData.setData = getStorage('list');
				}
			},
			socketInit(){
		     	let socket,stompClient;
		     	socket = this.$store.state.sockData.stompClient = new SockJS(this.urlApi.sockServer);
				stompClient = this.$store.state.sockData.stompClient = Stomp.over(socket);
				const mapData = this.$store.state.sockData.data;
				//let setData = this.$store.state.sockData.setData;
				stompClient.connect({}, frame => {
					stompClient.subscribe(this.urlApi.boxMessage, data => {
						let ds = JSON.parse(data.body);
						let str,friendtz;
						/*通知app组件提示*/
						this.$store.state.notice = JSON.parse(data.body);
						console.log(this.$store.state.sockData.data);
						if(ds.type=='MESSAGE'){
							str = ds.data;
							let M =(+str.receiver)+(+str.sender)
							mapData.has(M) ? mapData.get(M).push(str) : mapData.set(M, [str])
							console.log(str);
							this.update(str,this.$store.state.sockData.setData);
							//保存历史
							window.sessionStorage.setItem('data',JSON.stringify(this.$store.state.sockData.data));
							console.log(new Map(JSON.parse(window.sessionStorage.getItem('data'))));
						}
						
						if(ds.type=='FRIEND_APPLY'){
							//添加好友
							friendtz = ds.data;
							this.$store.state.addfriend.push(friendtz);
							console.log(this.$store.state.addfriend)
//							this.urlApi.agree
						}
						console.log(ds)
						
						
						//setData.has(str) ? setData.delete(str).add(str) : setData.add(str)
//						this.ModalStatus('收到一条好友消息');
						/* 这个方法无法删除旧对象数组，后续了解
						setData.push(str);
						let obj = {};
						setData = setData.reduce((cur,next) => {
							console.log(obj[next.receiver])
						    obj[next.receiver] ? (cur[next.receiver] = next.receiver) : obj[next.receiver] = true && cur.push(next);
						    return cur;
						},[]) //设置cur默认类型为数组，并且初始值为空的数组
						*/
						
					});
					//通知服务器我上线了
					
					stompClient.send(this.urlApi.notice, {}, JSON.stringify({type:'WEB_SOCKET_CONNECT'}));
			
					
					
					
				});
		     }
		},
		created(){
			this.readHistory();
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
		right: 0;
		position: absolute;
		bottom: 9px;
		z-index: 99;
	}
	
	
</style>