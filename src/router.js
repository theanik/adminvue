import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path: '/employee',
          name: 'employee',
          component: () => import(/* webpackChunkName: "demo" */ './views/Employee.vue')
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import(/* webpackChunkName: "demo" */ './views/Admin.vue')
        },
        {
          path: '/driver',
          name: 'driver',
          component: () => import(/* webpackChunkName: "demo" */ './views/Driver.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import(/* webpackChunkName: "demo" */ './views/User.vue')
        },
        {
          path: '/vehicle',
          name: 'vehicle',
          component: () => import(/* webpackChunkName: "demo" */ './views/Vehicle.vue')
        },
        {
          path: '/region',
          name: 'region',
          component: () => import(/* webpackChunkName: "demo" */ './views/Region.vue')
        },
        {
          path: '/promocode',
          name: 'promocode',
          component: () => import(/* webpackChunkName: "demo" */ './views/Promocode.vue')
        },
      ]
    },
    
  ]
})
