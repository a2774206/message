//全局过滤器
//跨域切换地址http://39.104.169.117
const domain = '';
let apiUrl = {
	sockServer:domain + '/gs-guide-websocket',//连接socket服务
	yzmSrc:domain + '/api/login/verifyCode?width=80&height=30', //验证码
	loginApi:domain + '/api/login/commit', 				  	   //登陆
	mailCode:domain + '/api/register/email', 			      //邮箱验证
	register:domain + '/api/register/commit',		         //注册
	boxMessage:domain + '/user/topic/message/handle/notify',//聊天窗口页订阅地址
	boxSend:domain + '/app/websocket/message/handle',      //聊天窗口发送消息
	friendAPi:domain + '/api/friend/search',		      //查询好友
	applyAdd:domain + '/api/friend/add/apply',           //添加好友
	friendList:domain + '/api/friend/list', 	        //好友列表
	updateNick:domain + '/api/user/nickname/update'    //修改昵称
}
export default apiUrl;