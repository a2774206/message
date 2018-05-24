<template>
	<div id="my">
		<ul class="tools updateMsg">
			<li>
				<span>原密码：</span>
				<input type="password" placeholder="请输入原密码" v-model="nowMsg" />
			</li>
			<li>
				<span>新密码：</span>
				<input type="password" placeholder="请输入新密码" v-model="newMsg" />
			</li>
			<li style="margin-top:20px;" @click="upMsg">
				<center>修改密码</center>
			</li>
		</ul>
		
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { Actionsheet,Toast ,MessageBox } from 'mint-ui';
	export default {
		name: 'updateMsg',
		data() {
			return {
				nowMsg:'',
				newMsg:''
			}
		},
		methods: {
			watHistory(){
				Toast('开发中...');
			},
			encrypts(s){
				//md5加密
				let md5 = hex_md5(s);
				//哈希加密
				let sha = hex_sha1(md5);
				//返回AES加密
				return Encrypt(sha);
			},
			upMsg(){
				if(this.nowMsg!='' && this.newMsg!= ''){
					if(this.newMsg.length<6){
						Toast('密码不能小于5位数！');
					}
					else if(this.newMsg.length>15){
						Toast('密码不能大于15位数！');
					}
					else{
						MessageBox.confirm('确定修改为：'+this.newMsg).then(action => {
							let parameter = {
								newPassword:this.encrypts(this.newMsg),
 								oldPassword:this.encrypts(this.nowMsg)
							};
							this.axios({
								method: 'post',
								url: this.urlApi.updataPwd,
								data: parameter
							}).then(res => {
								console.log(res.data);
								if(res.data.status=='success'){
									Toast('修改成功，请重新登录');
									setTimeout(()=>{
										let stompClient = this.$store.state.sockData.stompClient;
										stompClient.disconnect();
										this.$router.push({'path':'/login'});
									},1000)
								}else if(res.data.status=='error'){
									Toast(res.data.message);
								}
							});	
						});
					}
					
				}
				
			}
			
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
	.updateMsg input {
		border: 0;
		outline: none;
		font-size: 14px;
	}
	.updateMsg span{
		color: #000;
	}
</style>