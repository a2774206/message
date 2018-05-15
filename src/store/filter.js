//全局过滤器
let filter = {
	filterTime:function(value){
		return value.toLocaleString().slice(value.indexOf(',')+1);
	}
}
export default filter;