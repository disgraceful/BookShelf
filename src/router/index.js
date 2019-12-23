import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HomePage'
import ToRead from '../components/ToReadPage.vue'
import Reading from "../components/ReadingPage.vue"
import Register from "../components/auth/RegisterPage"
import Login from "../components/auth/LoginPage"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/toread',
    name: '2read',
    component: ToRead
  },
  {
    path: "/reading",
    name: "reading",
    component: Reading
  }, {
    path: "/register",
    component: Register
  }, {
    path: "/login",
    component: Login
  }

  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

]

const router = new VueRouter({
  routes
})

export default router
