<template>
	<div class="userList">
		<mt-index-list>
			<mt-index-section v-for='(word,i) in words' :index="word|toUpperCase" :key="word">
				<mt-cell :title="nick(A)" v-for ="(A,i) in friendA" :key="i"
					v-on:click.native="$router.push({path:'/online',query:{uid:A.code,nick:nick(A)}})">
				</mt-cell>
			</mt-index-section>
		</mt-index-list>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { IndexList, IndexSection } from 'mint-ui';
	
	export default {
		name: 'userList',
		data() {
			return {
				msg: 'UserList',
				friendA:[],
				py:'',
				words:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
			}
		},
		methods:{
			LoadFrindList(){
				
				this.axios({
						method: 'post',
						url: this.urlApi.friendList,
						withCredentials:true
				}).then(res => {
					
					if(res.data.status=="success"){
						this.friendA = res.data.data;
					}
				});	
			},
			nick(A){
				if(A.aliasName!=''&& A.aliasName!=null){
					return A.aliasName;
				}else{
					return A.nickName;
				}
			}
//			,
//			friendSort(){
//				//初始化pinyin获取拼音
//				this.py = new Pinyin();
//				
//				console.log(this.friendA)
//				let ary = this.friendA;
//				var res = ary.map((item,index,input)=> {  			   
//					//小写格式化
//					if(this.py.getFullChars(this.nick(item)).toLowerCase().substr(0,1)==str){
//						return input[index];
//					}
//				})  
//				var newRes = [];
//				//console.log(res)
//				for(var i = 0;i<res.length;i++){
//					if((res[i])!=undefined){
//						newRes.push(res[i]);
//					}
//				}
//				return newRes;
//			}
		},
		created(){
			this.LoadFrindList();
		},
		computed:{
			friendSort(){
				//初始化pinyin获取拼音
				this.py = new Pinyin();
				
				console.log(this.friendA)
				let ary = this.friendA;
				var res = ary.map((item,index,input)=> {  			   
					//小写格式化
					if(this.py.getFullChars(this.nick(item)).toLowerCase().substr(0,1)==str){
						return input[index];
					}
				})  
				var newRes = [];
				//console.log(res)
				for(var i = 0;i<res.length;i++){
					if((res[i])!=undefined){
						newRes.push(res[i]);
					}
				}
				return newRes;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	li {
		list-style: none;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
		background: #f0f0f0;
	}
	.mint-indexlist-nav{
		justify-content:flex-start !important;	
		}
</style>