//全局过滤器
let filter = {
	filterTime:function(value){
//		let now = new DateTimeFormat("yyyy-MM-dd HH:mm:ss")
//		return now.format()
	return value.toLocaleString().slice(value.indexOf(',')+1)
	}
}
export default filter;