import Vue from 'vue'
import Router from 'vue-router'
import FoodList from '@/components/food/List'
import FoodTable from '@/components/food/Table'
import UserList from '@/components/user/List'
import UserImages from '@/components/user/Images'
// import Dashboard from '@/components/dashboard/Index'

import Login from '@/components/Login'
import AuthGuard from './auth-guard'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/list',
      name: 'FoodList',
      component: FoodList
    },
    {
      path: '/table',
      name: 'FoodTable',
      component: FoodTable
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: (route) => ({ to: route.query.to })
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/users/images',
      name: 'UserImages',
      component: UserImages
    }
    // {
    //   path: '/',
    //   name: 'Dashboard',
    //   component: Dashboard
    // }
  ]
})
router.beforeEach(AuthGuard)

export default router
