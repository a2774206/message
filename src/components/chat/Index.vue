<template>
	<div id="Index">
		<toolslist></toolslist>
		<indexlist></indexlist>
	</div>
</template>

<script>
	import Vue from 'Vue';
	import SockJS from 'sockjs-client';
	import Stomp from 'stomp-websocket';
	import Toolslist from './Tools_list'
	import Indexlist from './Index_list'
	export default {
		name: 'Index',
		data() {
			return {
				msg: 'index'
			}
		},
		components: {
			Toolslist,
			Indexlist
		},
		methods:{
			stomp() {
				var socket = new SockJS(this.urlApi.sockServer);
				this.stompClient = Stomp.over(socket);

				this.stompClient.connect({}, frame => {
					//console.log('Connected: ' + frame);
					//订阅消息发送后的通知
					//console.log(this.stompClient)
					this.stompClient.subscribe(this.urlApi.boxMessage, data => {
						console.log((JSON.parse(data.body)).data)
						this.message.push((JSON.parse(data.body)).data)
					});

					this.stompClient.send('/api/friend/add/apply/agree', {}, JSON.stringify({}));

				});
			}
		},
		created(){
//			this.stomp();
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
	#Index{
		overflow: hidden;
		
	}
</style>