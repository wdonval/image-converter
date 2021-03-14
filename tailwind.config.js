const colors = require("tailwindcss/colors");

module.exports = {
	purge: {
		content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	},
	darkMode: "media",
	theme: {
		fontFamily: {
			sans: ["Inter var", "Arial", "sans-serif"],
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			...colors,
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: "#045cff",
					50: "#e9f1ff",
					100: "#d0e0ff",
					200: "#9dbfff",
					300: "#6a9eff",
					400: "#377dff",
					500: "#045cff",
					600: "#0049d0",
					700: "#00379d",
					800: "#00256a",
					900: "#001337",
				},
			},
		},
	},
	variants: {
		extend: {
			rotate: ["group-hover"],
			ringWidth: ["focus-visible", "focus-within"],
			ringColor: ["focus-visible", "focus-within"],
			ringOpacity: ["focus-visible", "focus-within"],
			ringOffsetWidth: ["focus-visible", "focus-within"],
			ringOffsetColor: ["focus-visible", "focus-within"],
			outline: ["focus-within"],
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
