<template>
	<div id="model">
		<!--<center class="friendNotice" >
			10002申请添加您为好友
		</center>-->
		
		<center class="friendmsg">
			<router-link :to='{path:"/online",query:{uid:info.sender,nick:info.title}}'>
				<strong>{{info.title}} : </strong>
				<span>{{info.content}}</span>
			</router-link>
		</center>
	</div>
</template>

<script>
//	import Vue from 'Vue';
//	import SockJS from 'sockjs-client';
//	import Stomp from 'stomp-websocket';
//	import Toolslist from './Tools_list'
//	import Indexlist from './Index_list'
	export default {
		name: 'messageModel',
		data() {
			return {
				msg: 'messageModel'
			}
		},
		props:['info'],
		components: {
			
		},
		methods:{
			
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
	#model{
		overflow: hidden;
		position: fixed;
		top: 0;
		width: 345px;
		padding: 0 15px;
		height: 50px;
		background: #000;
		z-index: 100;
		border-radius: 5px; /*no*/
		color: #fff;
		opacity: 0.6;
		line-height: 50px;
		white-space :nowrap ;
	}
	.friendmsg{
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.friendmsg a{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
</style>