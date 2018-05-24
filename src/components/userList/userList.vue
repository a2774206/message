<template>
	<div class="userList">
		<mt-index-list>
			<mt-index-section v-for='(word,i) in words' :index="word|toUpperCase" :key="word" v-show="isShow(word)">
				<mt-cell :title="nick(A)" v-for ="(A,i) in friendSort.get(word)" :key="i" ref="list" 
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
				words:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
				show:[]
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
			},
			isShow(w){
				//过滤好友列表
				return this.show.indexOf(w)!=-1;
			}
		},
		created(){
			this.LoadFrindList();
			
		},
		computed:{
			h(){
				return this.friendSort
			},
			friendSort(){
				//初始化pinyin获取拼音
				this.py = new Pinyin();
				let ary = this.friendA;
				const map = new Map();
				if (!ary.length) return map
				ary.forEach((item,index,input)=> {  		
					const word = this.py.getFullChars(this.nick(item)).toLowerCase().substr(0,1)
					//小写格式化
					map.has(word)?map.get(word).push(item) : map.set(word,[item])
					this.show.push(word);
				})  
				
				return map
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