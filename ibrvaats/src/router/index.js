import { createRouter, createWebHistory } from "vue-router";

import { user } from "./modules/user";
import { admin } from "./modules/admin";
import { session } from "./modules/session";
import { owner } from "./modules/owner";
import { search } from "./modules/search";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/session/login",
    },

    {
      path: "/forbidden",
      name: "ForbiddenView",
      component: () => import("@/views/forbidden/ForbiddenView.vue"),
      meta: { authenticated: false },
    },

    { ...session },
    { ...user },
    { ...admin },
    { ...owner },
    { ...search },
  ],
});

import { getCurrentUser } from "@/utils/firebase";
router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  const { authenticated } = to.meta;

  document.title = `IBRVAATS - ${to.name}`;

  if (!authenticated && !user) next();
  if (authenticated && !user) next({ name: "SessionLogin" });
  if (!authenticated && user) next();
  if (authenticated && user) next();
});

export default router;
