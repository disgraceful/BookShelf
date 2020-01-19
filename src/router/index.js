import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../components/HomePage"
import ToRead from "../components/ToReadPage.vue"
import Reading from "../components/ReadingPage.vue"
import Register from "../components/auth/RegisterPage"
import Login from "../components/auth/LoginPage"
import BookPage from "../components/bookviews/BookPage"
import UserPage from "../components/userviews/UserPage"

Vue.use(VueRouter)

//when page is reloading request is sending to server validating user data in localstorage
//until request is done, it is null. so first user get send to login, then user gets loaded and it's redirected to '/' => '/home'
//need to be fixed
const authGard = (to, from, next) => {
  if (localStorage.getItem("user")) {//rewrite
    console.log(to);
    next();
  } else {
    console.log("unathorized", to);
    next({
      name: "login"
    });
  }
};

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    beforeEnter: authGard
  },
  {
    path: "/toread",
    name: "2read",
    component: ToRead,
    beforeEnter: authGard
  },
  {
    path: "/reading",
    name: "reading",
    component: Reading,
    beforeEnter: authGard
  },
  {
    path: "/finished",
    name: "finished",
    component: Home,
    beforeEnter: authGard
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/book/:id",
    name: "book",
    props: true,
    component: BookPage,
    beforeEnter: authGard
  },
  {
    path: "/user/:id",
    name: "user",
    props: true,
    component: UserPage,
    beforeEnter: authGard
  }

  //component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
]

const router = new VueRouter({
  routes
})

export default router
