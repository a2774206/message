<template>
	<div class="footer" v-show="footShow">
		<ul class="footer-list">
			<router-link tag="li" :to="{path:tab.router,query:{tab:i}}" v-for="(tab,i) in styleSwitch" :key='i'>
				<p v-on:click='active(tab,i)'>
					<i class="tx">
						<img :src="defaultSrc+tab.url">
					</i>
					<span>{{tab.title}}</span>
				</p>
			</router-link>
			<!--foot js路径问题，1px过粗问题，路由 :to笔记，css3nth问题，：key警告问题，后续路由特效-->
		</ul>
	</div>
</template>

<script>

	export default {
		name: 'foot',
		data() {
			return {
				defaultSrc: './static/image/',
				styleSwitch: [{
						'id': 1,
						'url': 'liaotian1.png',
						'router': '/index',
						'title': '聊天',
						'url1': 'liaotian.png',
						'url2': 'liaotian1.png'
					},
					{
						'id': 2,
						'url': 'tianshi.png',
						'router': '/userList',
						'title': '好友',
						'url1': 'tianshi.png',
						'url2': 'tianshi1.png'
					},
					{
						'id': 3,
						'url': 'gongyi.png',
						'router': '/group',
						'title': '群组',
						'url1': 'gongyi.png',
						'url2': 'gongyi1.png'
					},
					{
						'id': 4,
						'url': 'my.png',
						'router': '/my',
						'title': '我的',
						'url1': 'my.png',
						'url2': 'my1.png'
					}
				],
				footShow:true
			}
		},
		methods: {
			active(tab, i) {
				//foot传值到head
				//可以删掉整个事件及传值
//				Bus.$emit('eventTitle', tab.title);
			}
		},
		watch: {
			'$route' (to, from) {
				//这里通过路由传参简化
				let str = to.query.tab;
				//foot tab imgsrc切换
				if(to.query.tab<=3){
						document.title = this.styleSwitch[str].title;
						for(let j = 0; j < this.styleSwitch.length; j++) {
							this.styleSwitch[j].url = this.styleSwitch[j].url1
					}
					this.styleSwitch[str].url = this.styleSwitch[str].url2;
					this.footShow = true;
				}
				//如果非底部四个tab是路由则隐藏
				else if(str==4||str==5||str==6){
					this.footShow = false;
				}
				else if(to.path=='/'){
					this.footShow = true;
				}
//				
				
			}
		},
		created(){
			//tab刷新图片显示初始化
			let str = this.$route.query.tab;
			
			if(str<=3&&str!=0){
				this.styleSwitch[str].url = this.styleSwitch[str].url2
			}else{
				this.styleSwitch[0].url = this.styleSwitch[0].url2;
			}
			if(this.$route.path=='/'||this.$route.path=='/index'){
				this.styleSwitch[0].url = this.styleSwitch[0].url2;
			}else{
				this.styleSwitch[0].url = this.styleSwitch[0].url1;
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
	
	.footer-list {
	
		width: 375px;
		height: 60px;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		align-items: center;
		position: fixed;
		bottom: 0;
	}
	
	.footer-list li {
		flex: 1;
		text-align: center;
	}
	
	.footer-list p {
		padding: 10px;
	}
	
	.footer-list p:hover {
		background: #E5E5E5;
	}
	
	.footer-list i {
		width: 21px;
		height: 18px;
		display: block;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 5px;
		/*no*/
	}
	
	.footer-list i:first-child {
		width: 36.5px;
		height: 19px;
	}
	
	.footer-list i.tx {
		width: 22.5px;
		height: 21px;
	}
	
	.footer-list li:nth-of-type(2) i {
		width: 30px;
		height: 18px;
	}
	
	.footer-list li:nth-of-type(3) i {
		width: 25px;
		height: 23px;
	}
	
	.footer-list i img {
		width: 100%;
		height: 100%;
	}
	
	.footer-list li span {
		font-size: 12px;
		color: #7f7e7e;
	}
	
	.router-link-active span {
		color: #f26715 !important;
	}
	
	.router-link-active {
		background: #E5E5E5;
	}
</style>