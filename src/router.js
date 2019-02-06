import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

function isLoggedIn(to, from, next) {
  store
    .dispatch("auth/authenticate")
    .then(() => {
      next();
    })
    .catch(() => {
      next("/login");
    });
}

function loadView(view) {
  return () =>
    import(/* webpackMode: "lazy-once" */
    /*  webpackChunkName: "view-[request]" */
    `./views/${view}.vue`);
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      name: "signup",
      component: loadView("Signup")
    },
    {
      path: "/login",
      name: "login",
      component: loadView("Login")
    },
    {
      path: "/boards",
      name: "boards",
      component: loadView("Boards"),
      beforeEnter: isLoggedIn
    },
    {
      path: "/boards/:id",
      name: "board",
      component: loadView("Board"),
      beforeEnter: isLoggedIn
    }
  ]
});
