<template>
	<div class="space-y-6">
		<SettingsBlock :index="1" title="User Interface" @save-settings="saveFormUserInterface">
			<div class="space-y-4">
				<Select class="max-w-lg" label="Language" :data="languages" :value="formUserInterface.language" @data-changed="setLanguage($event)" />
				<Select class="max-w-lg" label="Theme" :data="themes" :value="formUserInterface.theme" @data-changed="setTheme($event)" />
			</div>
		</SettingsBlock>
		<SettingsBlock :index="2" title="Output" @save-settings="saveFormOutput">
			<div class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-blueGray-700">Output directory</label>
					<div class="mt-1 flex rounded-md shadow-sm">
						<div class="relative flex items-stretch flex-grow focus-within:z-10">
							<input
								v-model="formOutput.outputPath"
								type="text"
								name="email"
								id="email"
								class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-none rounded-l-md sm:text-sm border-blueGray-300"
								placeholder="output/path/of/images"
							/>
						</div>
						<button
							type="button"
							class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-blueGray-300 text-sm font-medium rounded-r-md text-blueGray-700 bg-blueGray-50 hover:bg-blueGray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
							@click.prevent="$refs.output_directory.click()"
						>
							<svg class="h-5 w-5 text-blueGray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
								/>
							</svg>
							<span>Select folder</span>
						</button>
						<input
							tabindex="-1"
							ref="output_directory"
							type="file"
							webkitDirectory
							name="output_directory"
							id="output_directory"
							class="sr-only"
							@change="updateOutputPath"
						/>
					</div>
					<p v-if="formOutput.errors.outputPath" class="mt-2 text-sm text-red-600">{{ formOutput.errors.outputPath }}</p>
				</div>
			</div>
		</SettingsBlock>
	</div>
</template>

<script>
	import SettingsBlock from "/~/components/settings/SettingsBlock.vue";
	import Select from "/~/components/Select.vue";
	import languages from "/~/data/supported_languages.js";
	import Notification from "/~/components/Notification.vue";
	import { useToast } from "vue-toastification";
	const path = require("path");
	import { promises as fsp } from "fs";

	export default {
		data() {
			return {
				toast: useToast(),
				notification: {
					component: Notification,
					props: {
						title: "Settings saved",
						content: null,
						type: "success",
						timout: 5000,
					},
				},
				themes: [{ value: "System" }, { value: "Light theme" }, { value: "Dark theme" }],
				formUserInterface: {
					language: null,
					theme: null,
				},
				formOutput: {
					outputPath: null,
					errors: {},
				},
			};
		},
		computed: {
			languages() {
				return languages.map((language) => ({ value: language.name }));
			},
		},
		created() {
			this.initialize();
		},
		methods: {
			initialize() {
				this.formUserInterface.language = this.$store.state.settings.language ? this.$store.state.settings.language : null;
				this.formUserInterface.theme = this.$store.state.settings.theme ? this.$store.state.settings.theme : null;
				this.formOutput.outputPath = this.$store.state.settings.outputPath ? this.$store.state.settings.outputPath : null;
			},
			setLanguage(selected) {
				this.formUserInterface.language = selected.value;
			},
			setTheme(selected) {
				this.formUserInterface.theme = selected.value;
			},
			updateOutputPath(event) {
				this.formOutput.outputPath = event.target.files[0].path ? path.dirname(event.target.files[0].path) : null;
			},
			saveFormUserInterface() {
				this.$store.dispatch("setLanguage", this.formUserInterface.language);
				this.$store.dispatch("setTheme", this.formUserInterface.theme);
				this.notification.props.content = "User Interface settings updated";
				this.toast(this.notification);
			},
			async saveFormOutput() {
				if (await this.checkPath()) {
					this.$store.dispatch("setOutputPath", this.formOutput.outputPath);
					this.notification.props.content = "Output settings updated";
					this.toast(this.notification);
				}
			},
			async checkPath() {
				this.formOutput.errors.outputPath = null;
				try {
					await fsp.access(this.formOutput.outputPath);
					return true;
				} catch (error) {
					this.formOutput.errors.outputPath = "This directory does not exist.";
					return false;
				}
			},
		},
		components: {
			SettingsBlock,
			Select,
		},
	};
</script>
