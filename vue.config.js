const path = require("path");

module.exports = {
	configureWebpack: {
		target: "electron-renderer",
		resolve: {
			alias: {
				"/~": path.resolve(__dirname, "src/"),
			},
		},
		externals: {
			sharp: "commonjs sharp",
		},
	},
};
