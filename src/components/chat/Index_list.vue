<template>
	<ul class="index_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" 
			infinite-scroll-distance="6">
		<router-link v-for="(i,key) in list" to='/online'  tag='li' :key='key'>
			
			<mt-cell-swipe  
            :right="[  
                {  
                    content: '删除',  
                    style: { background: '#ff7900', color: '#fff'},  
                    handler: () =>delContact()
                }  
            ]">  
           <div class="my_tx">
				<img src="../../../static/image/tx.png">
			</div>
			<div class="describe">
				<h3><span>李鹏鹏</span><div class="time">10:20</div></h3>
				<p>春蕾计划，帮助老弱病残，欢迎您加入慈善事业..</p>
				
			</div>
			
        </mt-cell-swipe>  
		</router-link>
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
				list:[1,1,1],
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
			delContact(){
				alert(1)
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
		background: #eee;
		margin-top: 90px;
	}
	
	.index_list li {
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
	}
	
	.describe h3 {
		font-size: 14px;/*no*/
		margin-bottom: 10px;
		margin-top: 1px;/*no*/
		font-weight: 200;
		letter-spacing:1px ; /*no*/
	}
	
	.describe p {
		width: 264px;
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
	
	.my_tx img {
		width: 100%;
		height: 100%;
	}
	
	.time {
		width: 120px;
		float: right;
		text-align: right;
		font-size: 12px;
		color: #D9D9D9;
	}
	
</style>