import { createRouter, createWebHistory } from "vue-router";

import DashBoardPage from "@/views/DashBoardPage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: DashBoardPage,
		},
		{
			path: "/add-card",
			name: "add-card",
			component: () => import("../views/AddCard.vue"),
		},
	],
});

export default router;
