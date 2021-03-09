const Store = require("electron-store");
const electronStore = new Store();

const settings = {
	state() {
		return {
			language: null,
			theme: null,
			outputPath: null,
		};
	},
	mutations: {
		setLanguage(state, payload) {
			state.language = payload;
		},
		setTheme(state, payload) {
			state.theme = payload;
		},
		setOutputPath(state, payload) {
			state.outputPath = payload;
		},
	},
	actions: {
		setLanguage({ state, commit }, value) {
			commit("setLanguage", value);
			electronStore.set("settings.general.language", value);
			console.log("setLanguage called", state.language);
		},
		setTheme({ state, commit }, value) {
			commit("setTheme", value);
			electronStore.set("settings.general.theme", value);
			console.log("setTheme called", state.theme);
		},
		setOutputPath({ state, commit }, value) {
			commit("setOutputPath", value);
			electronStore.set("settings.general.outputPath", value);
			console.log("setOutputPath called", state.outputPath);
		},
	},
	getters: {},
};

export default settings;
