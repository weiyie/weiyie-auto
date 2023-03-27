import { createRouter, createWebHashHistory } from "vue-router";
import { useBase } from "@base";
import Home from "@views/home/index.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        index: 1,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@views/login/index.vue"),
      meta: {
        index: 1,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { user } = useBase();

  if (!user?.ws?.token) {
    return next("/login");
  }

  next();
});

export default router;
