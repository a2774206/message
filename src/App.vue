<template>
	<div id="app">
		<heading :child='router' :isShow='show'></heading>
		<transition name="slide1-right" >   
	     	<MessageModel v-show="noticeTop.show" :info="noticeTop"></MessageModel>
	    </transition>
		
		<div class="clex"></div>
		<transition :name="transitionName">   
	      <router-view></router-view>
	    </transition>
		<foot></foot>
	
	</div>
</template>

<script>
	import Vue from 'Vue';
	import router from './router'
	import heading from './components/public/head'
	import foot from './components/public/foot'
	import login from './components/Login/Login'
	import MessageModel from './components/chat/MessageModel'
	export default {
		name: 'App',
		data(){
			return {
				router:'/index',
				show:true,
				transitionName:'',
				Foot:false,
				noticeTop:{
					show:false,
					title:'',
					content:'',
					sender:''
				}
			}
		},
		components: {
			heading,
			foot,
			MessageModel
		},
		watch: {
			'$route' (to, from) {
				//登陆路由判断
				this.isLogin();
				//监听路由发生变化，然后传值到head组件
				//也可以在head中监听，这里可以简化，不用父子传值
				this.router = to.path;
				
				this.show = (to.path == '/index'||to.query == 0||to.path == '/') ? false :true;
				
				this.$store.state.nicknameShow = (to.path == '/online') ? true :false;
			
				//路由动画
				this.transitionName = to.meta.index > from.meta.index ? 'slide-left' : 'slide-right';
			},
			'notice': {
				/*监听vuex数据，先computed记录一下值，然后再监听*/
		　　　　handler(newValue, oldValue) {
		　　　　　　switch(newValue.type){
						case 'UNREAD_MESSAGE':
						//未读message
						this.underMsg()
						break;
						case 'FRIEND_APPLY':
						alert("有好友加您为好友！（暂时弹框处理）")
						break;
					}
		　　　　},
		　　　　deep: true
		　　}
		},
		methods:{
			 friend(){
		          Friend.$emit('newFriend', 2)
		     },
		     isLogin(){
		     	//检测是否登陆过,登录且保持刷新在线
		     	let isLoginStatus = localStorage.getItem('islogin');
		     	if(isLoginStatus==null||!isLoginStatus){
		     		if(!this.$store.state.LoginStatus){
						this.$router.push('/login');
					}
		     	}
		     	/*暂时先不处理网络中断
		     	this.axios({
		     		method:'post',
		     		url:'/api/login/status'
		     	}).then((res)=>{
		     		if(res.data.status != 'success'){
		     			this.$router.push('/login');
		     		}
		     	})*/
		     },
		     underMsg(){
		     	let msg = this.$store.state.sockData.setData;
		     	let uid = this.$store.state.uid;
		     	
		     	if(!msg[0].status&&msg[0].sender!=uid){
		     		this.noticeTop.title = msg[0].nick;
		     		this.noticeTop.content = msg[0].content;
		     		this.noticeTop.sender = msg[0].sender;
		     		this.noticeTop.show = true;
		     	}
		     	document.onclick=()=>{
		     		this.noticeTop.show = false;
		     	}
		     	setTimeout(()=>{
		     		this.noticeTop.show = false;
		     	},2000)
		     }
		     
		},
		created(){
			if(!this.$store.state.LoginStatus){
				this.$router.push('/login');
			}
			let str = this.$route.query.tab;
			//是否登录
			this.isLogin()
			//去返回键
			this.show = false;
			this.router = this.$route.path;
			
		},
		computed:{
			notice(){
				//通知,及类型
				return this.$store.state.notice;
			}
		}
	}
</script>
	
   		
<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-y: hidden;
		color: #2c3e50;
		width: 375px;
	}
	.clex{
		height: 44px;
	}
	.mint-indexlist-nav{
		justify-content:flex-start !important;	
	}
	.mint-cell-text{
		color: #2c3e50;
	}
	.is-plain{
		width: 335px;
		margin-top: 30px;
		border: 1px solid red;
	}
	#Login .mint-cell-wrapper{
		border-bottom: 1px solid #969292;
		
	}
	.index_list .mint-cell-wrapper{
		padding: 0 27px !important;
	}
	.mint-button--default.is-plain{
		border:1px solid #dadada;/*no*/
		margin-bottom: 2px;
	}
	#Login .mint-tab-item .mint-tab-item-label{
		font-size: 18px;
	}
	#Login .mint-cell-wrapper{
		margin: 5px 0;
		background-image: none;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #f8ab7e !important;
	}
	.mint-spinner-triple-bounce .mint-spinner-triple-bounce-bounce1{
		background-color: #f26715 !important
	}
	.mint-spinner-triple-bounce .mint-spinner-triple-bounce-bounce2{
		background-color: #f26715 !important
	}
	.mint-spinner-triple-bounce .mint-spinner-triple-bounce-bounce3{
		background-color: #f26715 !important
	}
	.more_loading{
		background: #fff;
		height: 30px;
		line-height: 30px;
	}
	#Login .v-modal,.addFriend .v-modal{
		height: 44px;
		line-height: 44px !important;
		
	}
	#Login .mint-popup,.addFriend .mint-popup{
		background: none;
		color: #fff;
		font-size: 14px;
	}
	#Login .mint-popup-top,.addFriend .mint-popup-top{
		top: 10px;
	}
	.email_y{
		position: relative;
	}
	#login .send{
		
		position: absolute !important;
		right: 0 !important;
	}
	.wait_ico{
		margin-top: 20px;
	}
	#my .mint-actionsheet-listitem, .mint-actionsheet-button{
		font-size: 16px;
	}
	.userList .mint-indexlist-content{
		/*height: 560px !important;*/
	}
	.userList .mint-indexlist-navitem{
		/*padding: 0.035rem 5px;*/
	}
	.index_list .mint-cell-wrapper{
		background-image:none !important;
	}
	.index_list .mint-cell:last-child{
		background-image:none;
	}
	.index_list .mint-cell,.index_list .mint-cell-value{
		min-height: 100% !important;
		height: 100%;
	}
	.index_list .mint-cell-title{
		flex: 0;
		-webkit-box-flex: 0;
	}
	.index_list .mint-cell-swipe-button{
		line-height: 67px;
	}
	.index_list .mint-cell-right{
		right: -1px;/*no*/
	}
	#Login .mint-popup .mint-popup-top{
		width: 375px !important;
   		text-align: center !important;
	}
	.slide-left-enter, .slide-right-leave-active {
	  opacity: 0;
	  -webkit-transform: translate(50px, 0);
	  transform: translate(50px, 0);
	}
	.slide-left-leave-active, .slide-right-enter {
	  opacity: 0;
	  -webkit-transform: translate(-50px, 0);
	  transform: translate(-50px, 0);
	}
	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
	  will-change: transform;
	  transition:all 0.1s cubic-bezier(.17, .86, .23, .14);
	  position: absolute;
	}
	.slide-right-enter {
	  opacity: 0;
	  transform: translate3d(-100%, 0, 0);
	}
	.slide-right-leave-active {
	  opacity: 0;
	  transform: translate3d(100%, 0, 0);
	}
	.slide-left-enter {
	  opacity: 0;
	  transform: translate3d(100%, 0, 0);
	}
	.slide-left-leave-active {
	  opacity: 0;
	  transform: translate3d(-100%, 0, 0);
	}
	.userList .mint-indexlist-navitem{
		display: block;
		overflow: hidden;
	}
	
	
	.slide1-left-enter, .slide1-right-leave-active {
	  opacity: 0;
	  -webkit-transform: translate(50px, 0);
	  transform: translate(50px, 0);
	}
	.slide1-left-leave-active, .slide1-right-enter {
	  opacity: 0;
	  -webkit-transform: translate(-50px, 0);
	  transform: translate(-50px, 0);
	}
	.slide1-right-enter-active,
	.slide1-right-leave-active,
	.slide1-left-enter-active,
	.slide1-left-leave-active {
	  will-change: transform;
	  transition:all 0.1s cubic-bezier(.17, .86, .23, .14);
	  position: absolute;
	}
	.slide1-right-enter {
	  opacity: 0;
	  transform: translate3d(0, -100%, 0);
	}
	.slide1-right-leave-active {
	  opacity: 0;
	  transform: translate3d(0, -100%, 0);
	}
	.userList .mint-actionsheet .mint-actionsheet-list .mint-actionsheet-listitem{
		font-size: 14px;
	}
	.userList .mint-actionsheet-list  .mint-actionsheet-button{
		font-size: 10px;
		
	}
</style>