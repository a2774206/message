//全局过滤器
let filter = {
	filterTime: function(value) {
		return value.toLocaleString().slice(value.indexOf(',') + 1);
	},
	filterFried: function(value,str) {
		let newArr = {};
		for (var i in value) {
			if(value[i].aliasName != '' && value[i].aliasName != null) {
				newArr = value[i].aliasName;
			} else {
				newArr = value[i].nickName;
			}
		}
		this.py = new Pinyin();
		
	},
	toUpperCase:function(value){
		return value.toLocaleUpperCase();
	}
}
export default filter;