import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import "./index.css";

const toastOptions = {
	transition: "Vue-Toastification__fade",
	maxToasts: 5,
	newestOnTop: true,
	closeOnClick: true,
	timeout: 5000,
	icon: false,
	draggable: true,
	pauseOnFocusLoss: false,
	pauseOnHover: false,
};

createApp(App)
	.use(store)
	.use(router)
	.use(Toast, toastOptions)
	.mount("#app");
