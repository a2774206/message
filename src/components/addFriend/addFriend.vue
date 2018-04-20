<template>
	<div class="addFriend">
		<mt-navbar v-model="selected">
			<mt-tab-item id="1"><span class="font15">查找好友</span></mt-tab-item>
			<mt-tab-item id="2"><span class="font15">查找群组</span></mt-tab-item>
			<mt-tab-item id="3"><span class="font15">新朋友</span></mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<mt-search v-model="value" placeholder="搜索好友ID">></mt-search>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<mt-search v-model="value1" placeholder="搜索好群组ID">></mt-search>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
				<!--<mt-cell v-for="n in 6" :title="'张三 ' + n+'请求加您为好友'" />-->

			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import Friend from '../../../static/js/friend_.js'
	//覆盖ui框架的css样式，暂时没起作用
	import '../../../static/css/default.css'
	
	import { Navbar, TabItem } from 'mint-ui';
	import { Search } from 'mint-ui';

	export default {
		name: 'addFriend',
		data() {
			return {
				selected: '1',
				value: '',
				value1: ''
			}
		},
		created() { // 当前实例创建完成就监听这个事件
			Friend.$on('newfriend', value => {
				//判断路由参数来绝定是否传值（因为不是点击事件传过来的）
				if(this.$route.query.tab==6){
					this.print(value);
				}
			})
		},
		methods: {
			print(value) {
				console.log(value)
				this.selected = value;
				
			}
		},
		beforeDestroy () {
			//解决循环触发eventbus多触发问题（Tools_list.vue）
		   Friend.$off('newfriend')
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	li {
		list-style: none;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
		background: #f0f0f0;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		color: #f2640e;
	}
	
	.addFriend .mint-navbar .mint-tab-item-label {
		font-size: 15px;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		border-bottom: 3px solid #f2640e;
	}
	
	.font15 {
		font-size: 15px;
	}
	
	.mint-navbar {
		margin-bottom: 15px;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		border-bottom: 1 solid #4CAF50 !important;
	}
	
	.mint-searchbar-cancel {
		color: #f2640e !important;
	}
</style>