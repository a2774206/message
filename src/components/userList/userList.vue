<template>
	<div class="userList">
		<mt-index-list>
			<mt-index-section index="A">
				<mt-cell :title="A.code" v-for ="(A,i) in friendA" :key="i" v-on:click.native="$router.push({path:'/online',query:{uid:A.code}})"></mt-cell>
			</mt-index-section>
			<mt-index-section index="B">
				<mt-cell title="Baldwin"></mt-cell>
				<mt-cell title="Braden"></mt-cell>
			</mt-index-section>
			<mt-index-section index="C">
				<mt-cell title="Cack"></mt-cell>
				<mt-cell title="Cane"></mt-cell>
			</mt-index-section>
			<mt-index-section index="D">
				<mt-cell title="Dack"></mt-cell>
				<mt-cell title="Dane"></mt-cell>
			</mt-index-section>
			<mt-index-section index="E">
				<mt-cell title="Eack"></mt-cell>
				<mt-cell title="Eane"></mt-cell>
			</mt-index-section>
			<mt-index-section index="F">
				<mt-cell title="Fack"></mt-cell>
				<mt-cell title="Fane"></mt-cell>
			</mt-index-section>
			<mt-index-section index="G">
				<mt-cell title="Gack"></mt-cell>
				<mt-cell title="Gane"></mt-cell>
			</mt-index-section>
			<mt-index-section index="H">
				
			</mt-index-section>
			<mt-index-section index="I"><mt-cell title="IACK"></mt-cell></mt-index-section>
			<mt-index-section index="J"><mt-cell title="Jack"></mt-cell></mt-index-section>
			<mt-index-section index="K"><mt-cell title="Kack"></mt-cell></mt-index-section>
			<mt-index-section index="L"><mt-cell title="Lack"></mt-cell></mt-index-section>
			<mt-index-section index="M"><mt-cell title="Mack"></mt-cell></mt-index-section>
			<mt-index-section index="N"><mt-cell title="Nack"></mt-cell></mt-index-section>
			<mt-index-section index="O"><mt-cell title="Oack"></mt-cell></mt-index-section>
			<mt-index-section index="P"><mt-cell title="Pack"></mt-cell></mt-index-section>
			<mt-index-section index="Q"><mt-cell title="Qack"></mt-cell></mt-index-section>
			<mt-index-section index="R"><mt-cell title="Gack"></mt-cell></mt-index-section>
			<mt-index-section index="S"><mt-cell title="Gack"></mt-cell></mt-index-section>
			<mt-index-section index="T"><mt-cell title="Gack"></mt-cell></mt-index-section>
			<mt-index-section index="U"><mt-cell title="Gack"></mt-cell></mt-index-section>
			<mt-index-section index="V"><mt-cell title="Gack"></mt-cell></mt-index-section>
			<mt-index-section index="W"><mt-cell title="Gack"></mt-cell></mt-index-section>
			<mt-index-section index="X"></mt-index-section>
			<mt-index-section index="Y"></mt-index-section>
			<mt-index-section index="Z"></mt-index-section>
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
				friendA:[]
			}
		},
		methods:{
			LoadFrindList(){
				
				this.axios({
						method: 'post',
						url: this.urlApi.friendList,
						withCredentials:true
				}).then(res => {
					console.log(res.data.data)
					if(res.data.status=="success"){
						this.friendA = res.data.data;
						console.log(this.friendA)
					}
				});	
			},
			ListA(){
				
			}
		},
		created(){
			this.LoadFrindList()
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