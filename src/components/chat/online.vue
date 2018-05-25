<template>
	<div class="online">
		<div class="online-all" ref="online">
			<div class="online-for" v-for="(item,i) in newMsg" :key='i' :class="{'online-f':state_uid==item.receiver}">
				<div class="online-info">
					<div class="online-tx">
						<img src="../../../static/image/tx.png">
					</div>
					<div class="online-name">
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
							<div class="arrow"></div>
						</div>
					</div>
				</div>
				
			</div>
			<div class="online-44"></div>
		</div>
		<div class="online-bottom">
			<div class="relav">
				<ul class="emoji_imgs" v-show="emojiShow">
					<li v-for="i in emoji" v-html="i" @click="addEmoji(i)">
					</li>
				</ul>
				<div class="online-input">
					<input type="text" v-model="msg" @input="showEmoji(6)">
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
				newMsg:[],
				uid:'',
				emoji:'',
				emojiShow:false,
				uniqueId:''
			}
		},
		methods: {
			sendMessage(){
				 if(this.msg != ''){
				 	 let stompClient = this.$store.state.sockData.stompClient;
				 		stompClient.send(this.urlApi.boxSend, {}, JSON.stringify({
			            'receiver':this.$route.query.uid,
			            'content':this.msg
			    		}));
			    		this.newMsg = this.message;
						this.emojiShow = false;
			    		this.msg = '';
			    		this.toBottom();
			    	
			    }
			},
			saveHistory(){
				//保存历史
			},
			toBottom(){
				setTimeout(()=>{
					var el = this.$refs.online;
					el.scrollTop = el.scrollHeight;
				},80)
			},
			addEmoji(i){
				this.msg  = this.msg.replace(/\/emoji/,i);
				this.emojiShow = false;
			},
			showEmoji(size){
				this.emoji = emoji.default.emoji;
				if(this.msg.length>=size){
					this.emojiShow = (this.msg.slice(-size)=='/emoji') ? true : false;
				}else{
					this.emojiShow = false;
				}
			}
		},
		beforeDestroy(){
			this.saveHistory();
		},
		computed:{
			state_uid(){
				return this.$route.query.uid; 
			},
			message () {
				if (!this.$store.state.sockData.data.get(this.uniqueId)) {
					this.$store.state.sockData.data.set(this.uniqueId, [])
				}
				return this.$store.state.sockData.data.get(this.uniqueId);
			}
		},
		created(){	
			this.uniqueId = Number(this.$store.state.uid) + Number(this.state_uid);
			this.newMsg = this.message;
			this.toBottom();
			this.showEmoji(0)
			this.emoji = emoji.default.emoji;
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
	.online-44{
		height: 44px;
		width: 100%;
		clear: both;
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
		left: -15px;
		/* 圆角的位置需要细心调试哦 */
		width: 0;
		height: 0;
		font-size: 0;
		border: solid 8px;
		border-color: #fff #F8C301 #fff #fff;
	}
	.online-f .send .arrow {
		right: -15px;
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