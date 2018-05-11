<template>
	<div id="my">
		<ul class="index_listJ">
			<div class="li">
				<div class="my_tx">
					<img src="../../../static/image/tx.png">
				</div>
				<div class="describe">
					<h3>李鹏鹏</h3>
					<p>ID:2774206</p>
				</div>
				<div class="time">
					<img src="../../../static/image/setting.png">
				</div>
			</div>
		</ul>
		<ul class="tools">
			<li @click="clearLocal">清除聊天记录</li>
			<li class="exit" @click="exit">退出</li>
		</ul>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { Actionsheet,Toast ,MessageBox } from 'mint-ui';
	export default {
		name: 'My',
		data() {
			return {
				msg: '建设中...',
				sheetVisible:false,
				actions:[
					{
						name:'退出账号',method:()=>{
						Toast('已退出');
						this.$store.state.LoginStatus = false;
							setTimeout(()=>{
								this.$router.push('/login')
							},1220)
						
						}
					}
				]
			}
		},
		methods: {
			exit(){
				this.sheetVisible = true;	
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
		border-bottom: 2px solid #f0f0f0;
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
		background: #e8e8e8;
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
		width: 40px;
		position: absolute;
		right: 0px;
		font-size: 12px;
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
	}
	.tools li{
		width: 100%;
		height: 40px;
		line-height:40px;
		text-align: center;
		padding: 0;
		margin: 0;
		margin-top:4px; /*no*/
		display: block;
		background:#fff;
		font-size: 14px;
	}
</style>