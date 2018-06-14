<template>
	<div id="my">
		<ul class="tools">
			<li @click="watHistory">
				<span>查看聊天记录<i class="mintui mintui-back setting_rotate"></i></span>
			</li>
			<li @click="clearLocal">
				<span>清除聊天记录<i class="mintui mintui-back setting_rotate"></i></span>
			</li>
		</ul>
		
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { Actionsheet,Toast ,MessageBox } from 'mint-ui';
	export default {
		name: 'historys',
		data() {
			return {
			}
		},
		methods: {
			watHistory(){
				Toast('开发中...');
			},
			clearLocal(){
				MessageBox({
				  title: '提示',
				  message: '确定执行此操作?',
				  showCancelButton: true
				});
				MessageBox.confirm('确定执行此操作?').then(action => {
				  //聊天记录清空
				  localStorage.clear();
				  this.$store.state.sockData.data.clear();
				  //列表清空
				  this.$store.state.sockData.setData = [];
				  Toast('清除成功');
				});
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