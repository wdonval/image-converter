<template>
	<Modal
		v-model:isModalOpen="outputPathModal"
		:icon="false"
		title="Select an output directory"
		cancel-text="Cancel"
		action-text="Confirm"
		:custom-content="true"
		@modal-confirm="createOutputPath"
	>
		<div class="mt-6 mb-2">
			<div class="mt-1 flex rounded-md shadow-sm">
				<div class="relative flex items-stretch flex-grow focus-within:z-10">
					<input
						v-model="modalForm.outputPath"
						type="text"
						class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-none rounded-l-md sm:text-sm border-blueGray-300"
						placeholder="output/path/of/images"
					/>
				</div>
				<button
					type="button"
					class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-blueGray-300 text-sm font-medium rounded-r-md text-blueGray-700 bg-blueGray-50 hover:bg-blueGray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
					@click.prevent="updateOutputPath"
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
			</div>
		</div>
	</Modal>
	<div class="flex sm:space-x-3 space-x-0 sm:space-y-0 space-y-2 flex-wrap">
		<Select
			class="flex-grow flex-shrink-0 sm:flex-shrink min-w-0"
			:data="formats"
			:value="selectedFormat ? selectedFormat.value : null"
			@data-changed="setFormat($event)"
			no-data="No format available (Go to settings to active formats)"
		/>
		<button
			type="button"
			class="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 transition-colors duration-150"
			@click.prevent="convert"
		>
			<span>Convert to</span><span v-if="selectedFormat?.value" class="opacity-80 ml-1.5">{{ selectedFormat?.value }}</span>
		</button>
	</div>
</template>

<script>
	import Select from "/~/components/Select.vue";
	import outputFormats from "/~/data/output_formats";
	import Notification from "/~/components/Notification.vue";
	import Modal from "/~/components/Modal.vue";
	import { useToast } from "vue-toastification";
	const sharp = require("sharp");
	const path = require("path");
	const fs = require("fs");
	const dialog = require("electron").remote.dialog;

	export default {
		components: {
			Select,
			Modal,
		},
		data() {
			return {
				modalForm: {
					outputPath: null,
				},
				outputPathModal: false,
				toast: useToast(),
				notification: {
					component: Notification,
					props: {
						title: "Success",
						content: null,
						type: "success",
						timout: 5000,
					},
				},
				selectedFormat: null,
				formats: [],
			};
		},
		computed: {
			outputFormats() {
				return outputFormats.sort(function(a, b) {
					if (a.value < b.value) return -1;
					if (a.value > b.value) return 1;
					return 0;
				});
			},
		},
		created() {
			this.initialize();
			console.log(this.formats, this.selectedFormat);
		},
		methods: {
			initialize() {
				this.selectedFormat = this.$store.getters.getFormat ? this.$store.getters.getFormat : null;
				this.formats = this.$store.state.settings.formats ? this.$store.state.settings.formats.filter((item) => item.active) : [];
			},
			setFormat(selected) {
				this.selectedFormat = selected;
				this.$store.dispatch("setFormat", this.selectedFormat);
			},
			createOutputPath() {
				this.$store.dispatch("setOutputPath", this.modalForm.outputPath);
				this.convert();
			},
			async updateOutputPath(event) {
				const result = await dialog.showOpenDialog({
					properties: ["openDirectory"],
				});
				if (result.filePaths.length > 0) {
					this.modalForm.outputPath = result.filePaths[0];
				}
			},
			renameFileIfExists(outputPath, filename, ext, number) {
				if (fs.existsSync(`${outputPath}/${filename}.${ext}`)) {
					console.log("oui", filename);
					this.renameFileIfExists(outputPath, `${filename} ${number}`, ext, number + 1);
				} else {
					return `${outputPath}/${filename}.${ext}`;
				}
			},
			async convert() {
				const imagesNumber = this.$store.getters.getImages.length;
				const outputPath = this.$store.state.settings.outputPath;
				if (!outputPath) {
					this.outputPathModal = true;
					return;
				}
				if (!fs.existsSync(outputPath)) {
					fs.mkdirSync(outputPath, { recursive: true });
				}
				this.$store.getters.getImages.forEach(async (image, index) => {
					let converted;
					let ext;
					if (!this.selectedFormat) return;
					switch (this.selectedFormat.value.toLowerCase()) {
						case "avif":
							converted = await sharp(image).avif();
							ext = "avif";
							break;
						case "jpeg":
							converted = await sharp(image).jpeg();
							ext = "jpeg";
							break;
						case "png":
							converted = await sharp(image).png();
							ext = "png";
							break;
						case "tiff":
							converted = await sharp(image).tiff();
							ext = "tiff";
							break;
						case "webp":
							converted = await sharp(image).webp();
							ext = "webp";
							break;
					}
					const filename = path.parse(image).name;
					converted.toFile(this.renameFileIfExists(outputPath, filename, ext, 1));
				});
				this.$store.dispatch("clearImages");
				if (imagesNumber > 0) {
					this.notification.props.content = `${imagesNumber} image(s) converted to ${this.selectedFormat.value}`;
					this.toast(this.notification);
				}
			},
		},
	};
</script>
