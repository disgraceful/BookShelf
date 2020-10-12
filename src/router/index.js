import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/HomePage";
import Register from "../components/auth/RegisterPage";
import Login from "../components/auth/LoginPage";
import BookPage from "../components/bookviews/BookPage";
import UserStats from "../components/userviews/UserStats";
import SeriesPage from "../components/series/SeriesPage";
import AuthorPage from "../components/author/AuthorPage";
import Favorites from "../components/userviews/Favorites.vue";
import MyBooks from "../components/userviews/MyBooks";

Vue.use(VueRouter);
const authGuard = (to, from, next) => {
  if (localStorage.getItem("user")) {
    next();
  } else {
    next({
      name: "login",
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
    beforeEnter: authGuard,
  },
  {
    path: "/home*",
    redirect: "/home",
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/book/:id",
    name: "book",
    props: true,
    component: BookPage,
    beforeEnter: authGuard,
  },
  {
    path: "/user/:id",
    name: "user",
    props: true,
    component: UserStats,
    beforeEnter: authGuard,
  },
  {
    path: "/user/:id/favorites",
    name: "favorites",
    props: true,
    component: Favorites,
    beforeEnter: authGuard,
  },
  {
    path: "/series/:id",
    name: "series",
    props: true,
    component: SeriesPage,
    beforeEnter: authGuard,
  },
  {
    path: "/author/:id",
    name: "authors",
    props: true,
    component: AuthorPage,
    beforeEnter: authGuard,
  },
  {
    path: "/user/:id/mybooks",
    name: "mybooks",
    component: MyBooks,
    beforeEnter: authGuard,
  },

  //component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
