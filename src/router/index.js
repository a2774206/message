import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Index from '@/components/chat/Index'
import userList from '@/components/userList/userList'
import group from '@/components/group/group'
import my from '@/components/my/my'
import addFriend from '@/components/addFriend/addFriend'
Vue.use(Router)

export default new Router({
routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/userList',
      name: 'userList',
      component: userList
    },
    {
      path: '/group',
      name: 'group',
      component: group
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/addFriend',
      name: 'addFriend',
      component: addFriend
    }
]
})
