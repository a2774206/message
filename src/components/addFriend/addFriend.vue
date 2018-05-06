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
				<div class="search_all">
					<!--<mt-search v-model="SearchFriends.friend" placeholder="搜索好友ID/邮箱" @blur.native="SearchFriend"></mt-search>-->
					<div class="mint-searchbar">
						<div class="mint-searchbar-inner">
							<i class="mintui mintui-search"></i> 
							<input type="search" placeholder="搜索好友ID/邮箱" class="mint-searchbar-core" @blur="SearchFriend" v-model="SearchFriends.friend">
						</div> 
					</div>
					<ul class="index_listJ" v-show='f_list'>
						<div class="li">
							<div class="my_tx">
								<img src="../../../static/image/tx.png">
							</div>
							<div class="describe">
								<h3>{{FriendInfo.name}}</h3>
								<p>ID:{{FriendInfo.uid}}</p>
							</div>
							<div class="time" @click="AddFriendBtn" v-if="isAdd">
								<a>添加好友</a>
							</div>
							<div class="time" v-else>
								<a>已申请</a>
							</div>
						</div>
					</ul>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<mt-search v-model="SearchFriends.group" placeholder="搜索好群组ID" ></mt-search>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
				<!--<mt-cell v-for="n in 6" :title="'张三 ' + n+'请求加您为好友'" />-->

			</mt-tab-container-item>
		</mt-tab-container>
		<mt-popup v-model="popupVisible" position="top" >{{status}}</mt-popup>
		<center class="wait_ico" v-show="waitico">
			<mt-spinner :type="3"></mt-spinner>
		</center>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import Friend from '../../../static/js/friend_.js'
	//覆盖ui框架的css样式，暂时没起作用
	import '../../../static/css/default.css'

	import { Navbar, TabItem ,MessageBox} from 'mint-ui';
	import { Search } from 'mint-ui';

	export default {
		name: 'addFriend',
		data() {
			return {
				selected: '1',
				waitico:false,
				f_list:false,
				status:'',
				popupVisible:false,
				SearchFriends: {
					friend: '',
					group: '',
				},
				isAdd:true,
				FriendInfo:{
					'name':'',
					'uid':10000
				}
			}
		},
		created() { // 当前实例创建完成就监听这个事件
			Friend.$on('newfriend', value => {
				//判断路由参数来绝定是否传值（因为不是点击事件传过来的）
				if(this.$route.query.tab == 6) {
					this.print(value);
				}
			})
		},
		methods: {
			print(value) {
				console.log(value)
				this.selected = value;
			},
			SearchFriend() {
				this.waitico = true;
				this.isAdd = true;
				let PostUrl = this.$store.state.ip + '/api/friend/search'
				this.axios({
					method: 'post',
					url: PostUrl,
					data: {keyword:this.SearchFriends.friend}
				}).then(res => {
					this.waitico = false;
					if(res.data.status=='success'){
						if(!res.data.data.length){
							this.ModalStatus('没有该用户！')
							this.f_list = false;
						}else{
							this.FriendInfo.name = res.data.data[0].nickName;
							this.FriendInfo.uid = res.data.data[0].code;
							this.f_list = true;
						}
						
					}else{
						this.f_list = false;
						this.ModalStatus('请输入查询的用户ID或邮箱！')
					}
					console.log(res)
				});

			},
			AddFriendBtn() {
				let PostUrl = this.$store.state.ip+'/api/friend/applyAdd'
				this.axios({
					method: 'post',
					url: PostUrl,
					data: {friendCode:this.FriendInfo.uid}
				}).then(res => {
					if(res.data.status == 'success')MessageBox('提示', '发出申请成功');
					this.isAdd = false;
				});
				
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
		},
		beforeDestroy() {
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
		font-size: 17px;
		/*no*/
		margin-bottom: 5px;
		/*no*/
		margin-top: -1px;
		/*no*/
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
	.time{
		width: 80px;height: 20px;
		font-size: 16px;
		line-height: 16px;
	}
</style>