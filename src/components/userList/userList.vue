<template>
	<div class="userList">
		<mt-index-list>
			<mt-index-section v-for='(word,i) in words' :index="word|toUpperCase" :key="word" v-show="isShow(word)">
				<mt-cell :title="nick(A)" v-for="(A,i) in friendSort.get(word)" :key="i" ref="list"
					 v-on:click.native="$router.push({path:'/online',query:{uid:A.code,nick:nick(A)}})"  v-on:mousedown.native="delSide" @mouseup.native="clearSide"
					 v-on:touchstart.native="delSide(nick(A),A.code)" @touchend.native="clearSide">
				</mt-cell>
			</mt-index-section>
			<mt-actionsheet
			  :actions="actions"
			  v-model="sheetVisible">
			</mt-actionsheet>
		</mt-index-list>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import { IndexList, IndexSection, Actionsheet ,MessageBox,Toast} from 'mint-ui';

	export default {
		name: 'userList',
		data() {
			return {
				msg: 'UserList',
				friendA: [],
				py: '',
				words: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
				show: [],
				start:'',
				actions:[
					{
						name:'修改备注',method:()=>{
							MessageBox.prompt('修改的昵称名').then(({ value, action }) => {
									
									this.axios({
											method: 'post',
											url: this.urlApi.updataBz,
											data:{'aliasName':value,'friendCode':this.friendN.id}
									}).then(res => {
										
										if(res.data.status=='success'){
											Toast('备注成功');
											
										}
									});	
							});
						}
					},{
						name:'删除好友',method:()=>{
							
						}
					}
				],
				sheetVisible :false,
				friendN:{
					name:'',
					id:''
				}
			}
		},
		methods: {
			LoadFrindList() {

				this.axios({
					method: 'post',
					url: this.urlApi.friendList,
					withCredentials: true
				}).then(res => {
					if(res.data.status == "success") {
						console.log(res.data.data)
						this.friendA = res.data.data;
					}
				});
			},
			nick(A) {

				if(A.aliasName != '' && A.aliasName != null) {
					return A.aliasName;
				} else {
					return A.nickName;
				}
			},
			isShow(w) {
				//过滤好友列表
				return this.show.indexOf(w) != -1;
			},
			delSide(name,id){
				this.start = setTimeout(()=>{
					//长按函数
					console.log(name,id)
					this.sheetVisible = true;
					this.friendN.name = name;
					this.friendN.id = id;
				},1000);
			},
			clearSide(){
				clearTimeout(this.start);
				return false;
			}
			
		},
		created() {
			this.LoadFrindList();

		},
		computed: {
			h() {
				return this.friendSort
			},
			friendSort() {
				//初始化pinyin获取拼音
				this.py = new Pinyin();
				let ary = this.friendA;
				const map = new Map();
				if(!ary.length) return map
				ary.forEach((item, index, input) => {
					const word = this.py.getFullChars(this.nick(item)).toLowerCase().substr(0, 1)
					//小写格式化
					map.has(word) ? map.get(word).push(item) : map.set(word, [item])
					this.show.push(word);
				})

				return map;
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
	
	.mint-indexlist-nav {
		justify-content: flex-start !important;
	}
</style>