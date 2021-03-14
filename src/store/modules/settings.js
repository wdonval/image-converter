const Store = require("electron-store");
const electronStore = new Store();

const settings = {
	state() {
		return {
			language: null,
			theme: null,
			outputPath: null,
			formats: [],
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
		setFormats(state, payload) {
			state.formats = payload;
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
		setFormats({ state, commit }, value) {
			commit("setFormats", value);
			electronStore.set("settings.formats.available", value);
			console.log("setFormats called", state.formats);
		},
	},
	getters: {
		getFormats: (state) => state.formats,
	},
};

export default settings;
