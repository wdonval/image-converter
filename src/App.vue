<template>
	<component :is="this.$route.meta.layout || 'div'">
		<router-view />
	</component>
</template>

<script>
	const Store = require("electron-store");
	const electronStore = new Store();

	export default {
		created() {
			this.initialize();
		},
		methods: {
			initialize() {
				const language = electronStore.get("settings.general.language");
				const theme = electronStore.get("settings.general.theme");
				const outputPath = electronStore.get("settings.general.outputPath");
				if (language) {
					this.$store.dispatch("setLanguage", language);
				}
				if (theme) {
					this.$store.dispatch("setTheme", theme);
				}
				if (outputPath) {
					this.$store.dispatch("setOutputPath", outputPath);
				}
			},
		},
	};
</script>
