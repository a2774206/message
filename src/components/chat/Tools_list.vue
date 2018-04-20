<template>
	<ul class="tools-list">
		
		<router-link tag="li" :to="{path:'/addFriend',query:{tab:6}}"  >
			<p><i><img src="../../../static/image/friend.png"></i><span>新朋友</span></p>
		</router-link>
		<router-link tag="li" :to="{path:'/userList',query:{tab:1}}">
			<i><img src="../../../static/image/friendlist.png"></i><span>通讯录</span>
		</router-link>
		<li><i><img src="../../../static/image/host.png"></i><span>热门</span></li>
	</ul>
</template>

<script>
	import Friend from '../../../static/js/friend_.js'
	export default {
		name: 'tools_list',
		data() {
			return {
				msg: 'index_list'
			}
		},
		beforeDestroy () {
			//解决循环触发eventbus多触发问题（Tools_list.vue）
			Friend.$emit('newfriend','3');
		}
		
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tools-list{
	position: fixed;
	z-index: 99;
	left: 0;
	top: 44px;
	width: 375px;
	height: 80px;
	display: flex;
	display: -ms-flexbox;
	display: -webkit-flex;
	align-items: center;
	border-bottom: 10px solid #e5e5e5;
	background: #fff;
}
.tools-list li{
	flex: 1;
	text-align: center;
	}
.tools-list i{
	width: 21px;
	height: 18px;
	display: block;
	text-align: center;
	margin: 0 auto;
	margin-bottom: 5px;/*no*/
}
.tools-list i img{
	width: 100%;
	height: 100%;
}
.tools-list li span{
	font-size: 15px;
	font-weight: bold;
	color: #7f7e7e;
}

</style>