const Store = require("electron-store");
const electronStore = new Store();

const images = {
	state() {
		return {
			images: [],
			format: null,
		};
	},
	mutations: {
		setImages(state, payload) {
			state.images = [...payload];
		},
		addImage(state, payload) {
			state.images = [...state.images, { payload }];
		},
		clearImages(state) {
			state.images = [];
		},
		deleteImage(state, payload) {
			state.images.splice(payload, 1);
		},
		setFormat(state, payload) {
			state.format = payload;
		},
	},
	actions: {
		setImages({ state, commit }, images) {
			commit("setImages", images);
			console.log("setImages called", state.images);
		},
		addImage({ state, commit }, image) {
			commit("addImage", image);
			console.log("addImage called", state.images);
		},
		clearImages({ state, commit }) {
			commit("clearImages");
			console.log("clearImages called", state.images);
		},
		deleteImage({ state, commit }, index) {
			commit("deleteImage", index);
			console.log("deleteImage called", state.images);
		},
		setMessage({ state, commit }, content) {
			commit("setMessage", content);
			console.log("setMessage called", state.message);
		},
		setFormat({ state, commit }, value) {
			if (!value) {
				commit("setFormat", null);
				electronStore.delete("format");
			} else {
				commit("setFormat", value);
				electronStore.set("format", value);
			}
			console.log("setFormat called", state.format);
		},
	},
	getters: {
		getImages: (state) => state.images,
		getFormat: (state) => state.format,
	},
};

export default images;
