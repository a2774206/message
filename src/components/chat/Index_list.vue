<template>
	<div>
		<!--v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"-->
		<ul class="index_list" v-if="newlyMsg.length>0"  
				infinite-scroll-distance="6">
			<router-link v-for="(i,key) in newlyMsg" 
				:to='{path:"/online",query:{uid:(+i.receiver+(+i.sender)-$store.state.uid),nick:i.nick}}'tag='li' :key='key' class='friend-li' @click="delContact">
				<mt-cell-swipe  
	            :right="[  
	                {  
	                    content: '删除',  
	                    style: { background: '#ff7900', color: '#fff'},  
	                    handler: () =>delContact(key)
	                }  
	            ]">  
	           <div class="my_tx">
					<img src="../../../static/image/tx.png">
				</div>
				<div class="describe">
					<h3><span>{{i.nick}}</span><div class="time">{{i.createTime|filterTime}}</div></h3>
					<p>{{i.content}}</p>
					<mt-badge type="error" size="small" class="badges" v-show="!i.status">1</mt-badge>
				</div>
				
	        </mt-cell-swipe>  
			</router-link>
			
			<!--<span v-show="allLoaded()">扯到底了</span>-->
		</ul>
		<div v-else>
			<center class="nopeople">空空如也~</center>
		</div>
	</div>
</template>

<script>
	import Vue from 'Vue';
	import { InfiniteScroll} from 'mint-ui';
	Vue.use(InfiniteScroll)
	export default {
		name: 'index_list',
		data() {
			return {
				msg: 'index_list',
				list:[],
				loading:false
			}
		},
		methods:{
			loadMore() {
			this.loading = true;
			  setTimeout(() => {
			    let last = this.list[this.list.length - 1];
			    for (let i = 1; i <= 6; i++) {
			      this.list.push(last + i);
			    }
			    this.loading = false;
			  }, 1500);
			},
			allLoaded(){
				return false;
			},
			delContact(key){
				/*删除聊天*/
				this.$store.state.sockData.setData.splice(key,1);
			}
		},
		computed:{
			newlyMsg(){
				var arr = this.$store.state.sockData.setData;
				return arr;
//				var newArr = [],newBrr = [];
//				this.$store.state.sockData.data.forEach((item)=>{
//					newArr.push(item);
//				})
//				for ( var i = 0; i < newArr.length;i++){
//					for(var j = 0;j < newArr[i].length; j++){
//						let len = newArr[i].length-1;
//						newBrr.push(newArr[i][len]);
//						console.log(newBrr)
//					}
//				}
//				var narr = {},barr=[];
				
//				for(var j = 0 ; j<newBrr.length;j++){
//					console.log(narr[newBrr[j]])
//					if(!narr[newBrr[j]]){
//						narr[newBrr[j]] = true;
//						barr.push(newBrr[j]);
//					}
//					//在login中处理下map数据
//					barr.push(newBrr[j]);
//				}
//				console.log(barr)
//				return barr;
			
			}
		},
		created(){
			//console.log(this.$store.state.sockData.data)
			this.list = this.newlyMsg;
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index_list {
		overflow-y: scroll;
		padding-bottom: 85px;
		height: 473px;
		background: #eee;
		margin-top: 90px;
	}
	
	.index_list li.friend-li {
		padding:0;
		width: 375px;
		height: 67px;
		text-align: left;
		background: #fff;
		margin-bottom: 1px; /*no*/
		position: relative;
		line-height: 67px;
	}
	
	
	.my_tx {
		width: 48.5px;
		height: 48.5px;
		border-radius: 50%;
	}
	
	.describe {
		margin-left: 7px;
		position: relative;
		width: 258.5px;
	}
	.describe .badges{
		position: absolute;
		right: 0;
		top: calc(67px / 2 - 12px);
		transition: all 0.5; 
		transform: scale(0.9);
		
	}
	.describe .badges:hover{
	/*	transition:cubic-bezier(5,.1,.25,1)*/
	}
	.describe h3 {
		font-size: 14px;
		margin-bottom: 10px;
		margin-top: 1px;/*no*/
		font-weight: 200;
		letter-spacing:1px ; /*no*/
	}
	
	.describe p {
		width: 230px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #999898;
		padding: 1px;
		font-size: 14px;
	}
	.describe,
	.my_tx {
		float: left;
	}
	.my_tx img{
		width: 100%;
		height: 100%;
	}
	.my_tx_false img {
		
		-webkit-filter: grayscale(100%);
	    -moz-filter: grayscale(100%);
	    -ms-filter: grayscale(100%);
	    -o-filter: grayscale(100%);
	    filter: grayscale(100%);
		filter: gray;
	}
	
	.time {
		width: 120px;
		float: right;
		text-align: right;
		font-size: 12px;
		color: #D9D9D9;
	}
	.nopeople{
		margin-top: 220px;
		font-size: 14px;
		color: #C8C8CD;
	}
</style>