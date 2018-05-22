<template>
	<div id="my">
		<ul class="tools">
			<li @click="$router.push({path:'/updateMsg'})">
				<span>修改密码<i class="mintui mintui-back setting_rotate"></i></span>
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
//				MessageBox({
//				  title: '提示',
//				  message: '确定执行此操作?',
//				  showCancelButton: true
//				});
				MessageBox.confirm('确定执行此操作?').then(action => {
				  Toast('清除成功');
				  localStorage.clear();
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