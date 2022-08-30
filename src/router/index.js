import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import store from '@/store'
const ViewTodos = () => import('@/views//ViewTodos');
const ViewLogIn = () => import('@/views/ViewLogIn');
const ViewSignIn = () => import('@/views/ViewSignIn');

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    meta: {layout: 'LayoutAuth'},
    component: ViewLogIn
  },
  {
    path: '/signin',
    meta: {layout: 'LayoutAuth'},
    component: ViewSignIn
  },
  {
    path: '/',
    meta: { layout: 'LayoutMain'},
    component: ViewTodos,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
