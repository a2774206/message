<template>
	<div class="online">
		<div class="online-all">
			<div class="online-for">
				<div class="online-info">
					<div class="online-tx">
						<img src="../../../static/image/tx.png">
					</div>
					<div class="online-name">
						且行且珍惜
					</div>
					<div class="online-time">
						2018/5/5 3:55
					</div>
				</div>
				<div class="online-content">
					<div class="online-k">
						<div class="send">
							你好，我是来自山西的且行且珍惜，请大家多多关照！
							<div class="arrow">

							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="online-for online-f">
				<div class="online-info">
					<div class="online-tx">
						<img src="../../../static/image/tx.png">
					</div>
					<div class="online-name">
						且行且珍惜
					</div>
					<div class="online-time">
						2018/5/5 3:55
					</div>
				</div>
				<div class="online-content">
					<div class="online-k">
						<div class="send">
							你好，我是来自山西的且行且珍惜，请大家多多关照！
							<div class="arrow">

							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="online-for">
				<div class="online-info">
					<div class="online-tx">
						<img src="../../../static/image/tx.png">
					</div>
					<div class="online-name">
						且行且珍惜
					</div>
					<div class="online-time">
						2018/5/5 3:55
					</div>
				</div>
				<div class="online-content">
					<div class="online-k">
						<div class="send">
							你好，我是来自山西的且行且珍惜，请大家多多关照！
							<div class="arrow">

							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="online-for">
				<div class="online-info">
					<div class="online-tx">
						<img src="../../../static/image/tx.png">
					</div>
					<div class="online-name">
						且行且珍惜
					</div>
					<div class="online-time">
						2018/5/5 3:55
					</div>
				</div>
				<div class="online-content">
					<div class="online-k">
						<div class="send">
							你好，我是来自山西的且行且珍惜，请大家多多关照！
							<div class="arrow">

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="online-bottom">
			<div class="online-input">
				<input type="text">
			</div>
			<div>
				<button class="mint-button mint-button--default mint-button--normal is-plain fasong" @click='stomp'>发送</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'Vue';
//	import SockJS from 'sockjs-client';
//	import Stomp from 'stomp-websocket';
	export default {
		name: 'online',
		data() {
			return {

			}
		},
		methods: {
			stomp() {
				var stompClient = null;
				var socket = new SockJS('/gs-guide-websocket');
				stompClient = Stomp.over(socket);

				stompClient.connect({}, function(frame) {
					console.log('Connected: ' + frame);
					//订阅消息发送后的通知
					stompClient.subscribe('/user/topic/message/handle/notify', function(data) {
						console.log("接收到通知：" + data.body);
					});

					stompClient.send("/app/websocket/connect/notify", {}, JSON.stringify({}));

				});
			}
		},
		deactivated() {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.online {}
	
	.online-all {
		padding: 15px 12px;
	}
	
	.online-for {
		margin: 25px 0;
		clear: both;
	}
	
	.online-tx {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		float: left;
		margin-right: 15px;
	}
	
	.fasong {
		width: 80px;
		margin: 0;
		height: 36px;
		margin-top: 4.5px;
		float: right;
		font-size: 16px;
	}
	
	.online-tx img {
		width: 100%;
		height: 100%;
	}
	
	.online-time {
		float: right;
		color: #aaa;
		font-size: 12px;
		/*no*/
		display: none;
	}
	
	.online-name {
		float: left;
		width: 130px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
		color: #999;
	}
	
	.online-info {
		overflow: hidden;
	}
	
	.online-content {
		margin-left: 62px;
		margin-top: -18px;
	}
	
	.online-k {
		width: 100%;
		top: 25px;
		z-index: 999;
	}
	
	.send {
		position: relative;
		width: 85%;
		height: auto;
		background: #F8C301;
		border-radius: 5px;
		/* 圆角 */
		padding: 10px 15px;
		font-size: 12px;
		line-height: 1.4em;
		padding-right: 28px;
	}
	
	.send .arrow {
		position: absolute;
		top: 5px;
		left: -16px;
		/* 圆角的位置需要细心调试哦 */
		width: 0;
		height: 0;
		font-size: 0;
		border: solid 8px;
		border-color: #fff #F8C301 #fff #fff;
	}
	
	.online-f .send .arrow {
		right: -16px;
		left: inherit;
		border-color: #fff #fff #fff #F8C301;
	}
	
	.online-f .online-time {
		float: left;
	}
	
	.online-f .online-content {
		margin-right: 62px;
		margin-left: 0;
	}
	
	.online-f .online-tx {
		float: right;
		margin-left: 15px;
		margin-right: 0;
	}
	
	.online-f .online-name {
		float: right;
	}
	
	.online-bottom {
		width: 100%;
		height: 44px;
		border-top: 1px solid #c9c9ca;
		position: fixed;
		bottom: 0px;
		background: #f5f5f5;
	}
	
	.online-input {
		width: 295px;
		float: left;
		height: 30px;
		margin-top: 9px;
	}
	
	.online-input input {
		height: 100%;
		padding: 0 5px;
		width: 98%;
		border: 0;
		border-bottom: 1px solid #ccc;
		outline: none;
	}
	
	.online-input input:focus {
		border-bottom-color: #65f747;
	}
</style>