<template>
	<div class="online">
		<div class="online-all" ref="online">
			<div class="online-for" v-for="(item,i) in message" :key='i' :class="{'online-f':whoName==item.receiver}">
				<div class="online-info">
					<div class="online-tx">
						<img src="../../../static/image/tx.png">
					</div>
					<div class="online-name">
						<!--<span v-if="item.receiver==whoName">{{item.receiver}}</span>
						<span v-if="item.receiver!=10002">{{item.sender}}</span>-->
						{{item.sender}}
					</div>
					<div class="online-time">
						{{item.createTime|filterTime}}
					</div>
				</div>
				<div class="online-content">
					<div class="online-k">
						<div class="send">
							{{item.content}}
							
							<div class="arrow">

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="online-bottom">
			<div class="relav">
				<ul class="emoji_imgs" v-show="emojiShow">
					<li v-for="i in _emoji" v-html="i" @click="addEmoji(i)">
						
					</li>
				</ul>
				<div class="online-input">
					<input type="text" v-model="msg" @input="showEmoji">
				</div>
				<div style="height: 100%;">
					<button class="mint-button mint-button--default mint-button--normal is-plain fasong" @click="sendMessage">发送</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'Vue';
	import SockJS from 'sockjs-client';
	import Stomp from 'stomp-websocket';
	let emoji = require('../../../static/js/emoji.js');
	export default {
		name: 'online',
		data() {
			return {
				msg:'',
				stompClient:'',
				message:[],
				uid:'',
				_emoji:'',
				emojiShow:false
			}
		},
		methods: {
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

					this.stompClient.send(this.urlApi.boxSend, {}, JSON.stringify({}));

				});
			},
			sendMessage(){
				 if(this.msg != ''){
				 	 this.stompClient.send(this.urlApi.boxSend, {}, JSON.stringify({
			            'receiver':this.$route.query.uid,
			            'content':this.msg
			    	 }));
			    	  this.emojiShow = false;
			    	  this.msg = '';
			     	//this.$refs.ref_a[0].click();
				    this.$nextTick(()=>{
				     this.toBottom()
				    })
				 }
			},
			saveHistory(){
				//保存历史消息
				if(localStorage.getItem(this.uid)){
					let uidArr = [];
					uidArr = this.message;
					localStorage.setItem(this.uid,JSON.stringify(uidArr))
				}else{
					localStorage.setItem(this.uid,JSON.stringify(this.message))
				}
			},
			toBottom(){
				var el = this.$refs.online;
				setTimeout(function(){
				 	el.scrollTop = el.scrollHeight;
				},80)
			},
			addEmoji(i){
				this.msg  = this.msg.replace(/\/emoji/,i);
				this.emojiShow = false;
			},
			showEmoji(){
				
				//console.log(this.msg.slice(-1,-6))
				if(this.msg.length>=6){
					if(this.msg.slice(-6)=='/emoji'){
						this.emojiShow = true;
					}else{
						this.emojiShow = false;
					}
				}else{
					this.emojiShow = false;
				}
			}
		},
		mounted(){
			this.stomp();
		},
		beforeDestroy(){
			this.saveHistory();
			this.stompClient.disconnect();
		},
		computed:{
			whoName(){
				 return this.$route.query.uid; 
			}
		},
		created(){
			//使用表情
			this._emoji = emoji.default.emoji;
			this.$nextTick(()=>{
				this.toBottom()
			})
			this.uid = this.$route.query.uid;
			//url字符串解码
			let nick = decodeURI(this.$route.query.nick)
//			this.$store.state.nickname = nick;
			//该好友是否有历史聊天
			if(localStorage.getItem(this.uid)){
				this.message = JSON.parse(localStorage.getItem(this.uid));
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.relav{
		position: relative;
		height: 100%;
	}
	.emoji_imgs{
		position: absolute;
		top: -76px;
		height:60px;
		width: calc(100% - 30px);
		background: #fff;
		left:0px;
		padding: 5px 15px;
	}
	.emoji_imgs li{
		float: left;
		font-size: 19px;
		list-style: none;
		text-align: center;
		letter-spacing: 5px;
	}
	.online-all {
		padding: 15px 12px;
		overflow-y:scroll  !important;
		height: 14.5rem;
	}
	
	.online-for {
		margin: 25px 0;
		clear: both;
		overflow: hidden;
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
		height: calc(100% - 2px);
		float: right;
		font-size: 16px;
	}
	.online-tx img {
		width: 100%;
		height: 100%;
	}
	.online-time {
		float: right;
		color: #d7d7d7;
		font-size: 12px;
		/*no*/
		
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
		display: inline-block;
		top: 25px;
		z-index: 999;
	}
	.send {
		position: relative;
		height: auto;
		background: #F8C301;
		border-radius: 5px;
		/* 圆角 */
		padding: 10px 15px;
		font-size: 12px;
		line-height: 1.4em;
		padding-right: 28px;
		word-break: break-all;
		word-wrap:break-word;
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
		float: right;
	}
	.online-f .online-tx {
		float: right;
		margin-left: 15px;
		margin-right: 0;
	}
	.online-f .online-name {
		float: right;
		text-align: right;
	}
	.online-bottom {
		width: calc(100% - 10px);
		height: 44px;
		border-top: 1px solid #c9c9ca;
		position: fixed;
		bottom: 0px;
		background: #f5f5f5;
		padding: 5px;
	
	}
	.online-input {
		width: 285px;
		float: left;
		height: calc(100% - 2px);
		
	}
	.online-input input {
		width: 100%;
		border: 0;
		border-bottom: 1px solid #ccc;
		outline: none;
		height: 100%;
		background: transparent;
		bottom: 0;
	}
	.online-input input:focus {
		border-bottom-color: #65f747;
	}
</style>