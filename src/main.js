import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import Dashboard from "./components/dashboard/Dashboard.vue";
import AuthForm from "./components/auth/AuthForm.vue";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);
const requiresAuth = (to, from, next) => {
  //fetch user from localStorage
  const users = localStorage.getItem("user");
  const user = JSON.parse(users);

  if (user.email === "" || user.password === "") return;
  //if there is a user then navigate to dashboard
  if (user) {
    next();
  } else {
    //otherwise don't navigate to root route
    next({ path: "/" });
  }
};
const router = new VueRouter({
  base: __dirname,
  mode: "history",
  routes: [
    {
      path: "/",
      component: AuthForm,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      //require auth here only authenticated user
      //can access the dashboard route
      beforeEnter: requiresAuth,
    },
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
