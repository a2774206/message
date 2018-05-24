import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
export default new vuex.Store({
	state:{
		show:false,
		ip:'http://127.0.0.1:8080', //请求ip地址http://39.104.169.117
		LoginStatus:false,
		nicknameShow:true,
		nickname:'',
		uid:'',
		foottab:false,
		sockData:{
			socket:'',
			stompClient:'',
			data: new Map()
		}
	}
})
