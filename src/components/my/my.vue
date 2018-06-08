<template>
	<div id="my">
		<ul class="index_listJ">
			<div class="li">
				<div class="my_tx">
					<img src="../../../static/image/tx.png">
				</div>
				<div class="describe">
					<h3>{{_nickName}}</h3>
					<p>ID:<span>{{this.$store.state.uid}}</span></p>
				</div>
				<div class="time" @click="setting">
					<img src="../../../static/image/setting.png">
				</div>
			</div>
		</ul>
		
	
		<ul class="tools">
			<li @click="$router.push({path:'/history'})">
				<span>聊天记录<i class="mintui mintui-back setting_rotate"></i></span>
			</li>
			<li @click="$router.push({path:'/security'})">
				<span>账户安全<i class="mintui mintui-back setting_rotate"></i></span>
			</li>
		</ul>
		<ul class="tools_exit" >
			<li class="exit" @click="exit"><span>退出登录</span></li>
		</ul>
			
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		<mt-actionsheet :actions="actions1"  v-model="sheetVisible1"></mt-actionsheet>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { Actionsheet,Toast ,MessageBox } from 'mint-ui';
	export default {
		name: 'My',
		data() {
			return {
				sheetVisible:false,
				actions:[
					{
						name:'退出账号',method:()=>{
							this.axios({
								method:'post',
								url:this.urlApi.exit
							}).then(res =>{
								Toast('已退出');
								let stompClient = this.$store.state.sockData.stompClient;
								stompClient.disconnect();
								this.$store.state.LoginStatus = false;
								setTimeout(()=>{
									this.$router.push('/login');
								},1220)
							}).catch(res =>{
								Toast('发生了一个错误');
								setTimeout(()=>{
									window.location.reload()
								},2000)
							})
						}
					}
				],
				sheetVisible1:false,//setting
				actions1:[
					{
						name:'修改昵称',method:()=>{
						MessageBox.prompt('请输入昵称').then(({ value, action }) => {
							this.axios({
								method: 'post',
								url: this.urlApi.updateNick,
								data: {'nickname':value}
							}).then(res => {
								if(res.data.status=='success'){
									this.$store.state.nickname = value;	
									Toast('修改成功');
								}
							})
						});
						
						}
					},
					{
						name:'更换头像',method:()=>{
							Toast('开发中...');
						}
					}
				]
			}
		},
		methods: {
			exit(){
				this.sheetVisible = true;
				localStorage.setItem('islogin',false)
			},
			clearLocal(){
				MessageBox({
				  title: '提示',
				  message: '确定执行此操作?',
				  showCancelButton: true
				});
				MessageBox.confirm('确定执行此操作?').then(action => {
				  Toast('清除成功');
				  localStorage.clear();
				});
			},
			setting(){
				this.sheetVisible1 = true;
			}
			
		},
		computed:{
			_nickName(){
				return this.$store.state.nickname;
			}
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
	.index_listJ{
		background: #e8e8e8;
		
	}
	.index_listJ .li {
		display: block;
		padding: 16px 15px;
		width: 345px;
		height: 47px;
		text-align: left;
		background: #fff;
		margin: 0;
		margin-bottom: 1px; /*no*/
		position: relative;
		border-top: 20px solid #f0f0f0;
		border-bottom: 20px solid #f0f0f0;
		background: #fff;
	}
	.my_tx {
		width: 48.5px;
		height: 48.5px;
		border-radius: 50%;
		margin-right: 10px;
	}
	
	.describe {
		margin-left: 7px;
	}
	
	.describe h3 {
		font-size: 15px;/*no*/
		margin-bottom: 5px;/*no*/
		margin-top: -1px;/*no*/
		font-weight: 500;
		overflow: hidden;
	}
	
	.describe p {
		
		width: 264px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #999898;
		font-size: 14px;
	}
	#my{
		background: #f5f5f5;
	}
	.describe,
	.my_tx {
		float: left;
	}
	
	.my_tx img {
		width: 100%;
		height: 100%;
	}
	
	.time {
		width: 20px;
		position: absolute;
		right: 15px;
		font-size: 12px !important;
		color: #888787;
		top:calc(50% - 10px);
	}
	.time img{
		width: 20px;height: 20px;
	}
	.exit{
		width:360px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		font-size:16px;
		border-bottom: 1px solid #e5e5e5;
		color:#000;
		margin: 0 auto;
		margin-top: 20px;
		background: #fff;
	}
	.tools {
		padding: 0;
		margin: 0;
		color: #666;
	}
	.tools li,.tools_exit li{
		width: 100%;
		height: 40px;
		line-height:40px;
		text-align: left;
		padding: 0;
		margin: 0;
		display: block;
		background:#fff;
		font-size: 14px;
		border-top: 1px solid #e8e8e8;/*no*/ 
		border-bottom: 1px solid #e8e8e8;/*no*/
	}
	.tools_exit li{
		margin-top: 20px;
		text-align: center;
	}
	/*.tools li::before{
		content: "\E600";
	}*/
	.tools li span{
		display: inline-block;
		margin-left: 15px;
	}
	.setting_rotate:before{
		font-size: 10px;
		transform: rotate(180deg) !important;
	 	position: absolute;
	 	right: 15px;
	}
</style>