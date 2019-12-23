import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HomePage'
import ToRead from '../components/ToReadPage.vue'
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
  }

  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

]

const router = new VueRouter({
  routes
})

export default router
