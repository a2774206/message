<template>
	<div id="group">
		<ul class="index_listG"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" 
			infinite-scroll-distance="10">
			<li v-for="i in list">
				<div class="my_tx">
					<img src="../../../static/image/tx.jpg">
				</div>
				<div class="describe">
					<h3>623</h3>
					<p>[图片]</p>
				</div>
				<div class="time">2017-08-01 10:20</div>
			</li>
			 <center class="more_loading" v-show="true">
	  			<mt-spinner type="triple-bounce" color="#00ccff" :size="20" v-show="true"></mt-spinner>
	  			<span v-show="allLoaded()">扯到底了</span>
 			</center>
		</ul>
		
	</div>
</template>

<script>
	import Vue from 'Vue';
	import { InfiniteScroll} from 'mint-ui';
	Vue.use(InfiniteScroll)
	export default {
		name: 'group',
		data() {
			return {
				msg: 'group',
				list:[1,1,1,1,1,1],
				loading:false
			}
		},
		components: {

		},
		methods:{
			loadMore() {
			this.loading = true;
			  setTimeout(() => {
			    let last = this.list[this.list.length - 1];
			    for (let i = 1; i <= 5; i++) {
			      this.list.push(last + i);
			    }
			    this.loading = false;
			  }, 2500);
			},
			allLoaded(){
				return false;
			}
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
	#group{
		height: 563px;
		overflow-y: scroll;
	}
	.index_listG {
		background: #e8e8e8;
		
	}
	.index_listG li {
		display: block;
		padding: 16px 15px;
		width: 345px;
		height: 47px;
		text-align: left;
		background: #fff;
		margin: 0;
		margin-bottom: 1px; /*no*/
		position: relative;
		
		background: #fff;
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
		width: 120px;
		position: absolute;
		right: 15px;
		font-size: 12px;
		color: #888787;
	}
</style>