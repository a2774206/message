import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Index from '@/components/chat/Index'
import userList from '@/components/userList/userList'
import group from '@/components/group/group'
import my from '@/components/my/my'
import addFriend from '@/components/addFriend/addFriend'
import online from '@/components/chat/online'
import historys from '@/components/my/history'
import security from '@/components/my/security'
import updateMsg from '@/components/my/updateMsg'

Vue.use(Router)

export default new Router({
routes: [
    {
      path: '/',
      name: 'Index',
      meta:{index:1},
      component: Index
    },
    {
      path: '/Index',
      name: 'Index',
      meta:{index:1},
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      meta:{index:0},
      component: Login
    },
    {
      path: '/userList',
      name: 'userList',
      meta:{index:2},
      component: userList,
    },
    {
      path: '/group',
      name: 'group',
      meta:{index:3},
      component: group
    },
    {
      path: '/my',
      name: 'my',
      meta:{index:4},
      component: my
    },
    {
      path: '/history',
      name: 'history',
      meta:{index:5},
      component: historys
    },
    {
      path: '/security',
      name: 'security',
      meta:{index:5},
      component: security
    },
    {
      path: '/updateMsg',
      name: 'updateMsg',
      meta:{index:6},
      component: updateMsg
    },
   	{
      path: '/addFriend',
      name: 'addFriend',
      meta:{index:2},
      component: addFriend
    },{
	    path:'/online',
	    name: 'online',
	    meta:{index:2},
	    component:online
	 }
]
})
