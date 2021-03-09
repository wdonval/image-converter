import { createWebHashHistory, createRouter } from "vue-router";
import store from "/~/store";

import Home from "/~/views/Home.vue";
import Settings from "/~/views/Settings.vue";
import SettingsGeneral from "/~/views/SettingsGeneral.vue";
import SettingsFormats from "/~/views/SettingsFormats.vue";

import LayoutDefault from "/~/layouts/LayoutDefault.vue";
import LayoutSettings from "/~/layouts/LayoutSettings.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			layout: LayoutDefault,
		},
	},
	{
		path: "/settings",
		name: "Settings",
		component: Settings,
		meta: {
			layout: LayoutSettings,
		},
		children: [
			{
				path: "general",
				name: "SettingsGeneral",
				component: SettingsGeneral,
			},
			{
				path: "formats",
				name: "SettingsFormats",
				component: SettingsFormats,
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	console.log(`from: ${from.path}, to: ${to.path}`);
	store.dispatch("setPreviousPage", from.fullPath);
	next();
});

export default router;
