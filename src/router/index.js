import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../components/auth/RegisterPage";
import Login from "../components/auth/LoginPage";

const Home = () => import("../components/HomePage.vue");
const BookPage = () => import("../components/bookviews/BookPage.vue");
const UserStats = () => import("../components/userviews/UserStats.vue");
const AuthorPage = () => import("../components/author/AuthorPage.vue");
const SeriesPage = () => import("../components/series/SeriesPage.vue");
const Favorites = () => import("../components/userviews/Favorites.vue");
const MyBooks = () => import("../components/userviews/MyBooks");
const ErrorPage = () => import("../components/shared/ErrorPage");
const AuthorAllBooks = () => import("../components/author/AuthorAllBooks");

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
    path: "/register*",
    redirect: "register",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/login*",
    redirect: "login",
  },
  {
    path: "/book/:id/:search?",
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
    path: "/author/:id/books",
    name: "authorbooks",
    props: true,
    component: AuthorAllBooks,
    beforeEnter: authGuard,
  },
  {
    path: "/user/:id/mybooks",
    name: "mybooks",
    component: MyBooks,
    beforeEnter: authGuard,
  },
  {
    path: "/*",
    name: "notfound",
    component: ErrorPage,
    props: { error: { message: "Sorry, page were not found" } },
  },

  //component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
