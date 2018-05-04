<template>
	<ul class="index_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" 
			infinite-scroll-distance="6">
		<li v-for="i in list">
			<div class="my_tx">
				<img src="../../../static/image/tx.png">
			</div>
			<div class="describe">
				<h3>春蕾计划</h3>
				<p>春蕾计划，帮助老弱病残，欢迎您加入慈善事业..</p>
			</div>
			<div class="time">2017-08-01 10:20</div>
		</li>
		 <center class="more_loading" v-show="true">
	  		<mt-spinner type="triple-bounce" color="#00ccff" :size="20" v-show="true"></mt-spinner>
	  		<span v-show="allLoaded()">扯到底了</span>
 		</center>
	</ul>
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
				list:[1,1,1,1,1,1],
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
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index_list {
		overflow-y: scroll;
		padding-bottom: 85px;
		height: 473px;
		background: #e8e8e8;
		margin-top: 90px;
	}
	
	.index_list li {
		padding: 16px 15px;
		width: 345px;
		height: 47px;
		text-align: left;
		background: #fff;
		margin-bottom: 1px; /*no*/
		position: relative;
	}
	
	
	.my_tx {
		width: 48.5px;
		height: 48.5px;
		border-radius: 50%;
	}
	
	.describe {
		margin-left: 7px;
	}
	
	.describe h3 {
		font-size: 15px;
		/*no*/
		margin-bottom: 5px;
		/*no*/
		margin-top: 1px;
		/*no*/
		font-weight: 500;
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
		width: 120px;
		position: absolute;
		right: 15px;
		font-size: 12px;
		color: #888787;
	}
</style>