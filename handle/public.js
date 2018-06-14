export function setStorage(name,data){
	 /*Map或者object或者array*/
	data instanceof Object ? localStorage.setItem(name,JSON.stringify(data)) : localStorage.setItem(data);
	
}
export function getStorage(name){
	 /*Map或者object或者array*/
	return JSON.parse(localStorage.getItem(name));
}
