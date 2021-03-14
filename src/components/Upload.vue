<template>
	<div class="mt-1 sm:mt-0 sm:col-span-2">
		<div
			class="flex justify-center px-6 pt-5 pb-6 border-2 border-blueGray-300 border-dashed rounded-md transition-colors duration-150"
			:class="{ 'bg-primary-50': hover }"
			@dragover.prevent="dragOver"
			@dragenter.prevent="dragEnter"
			@dragleave.prevent="dragLeave"
			@drop.prevent="drop($event)"
		>
			<div class="space-y-1 text-center" :class="{ 'pointer-events-none': hover }">
				<svg class="mx-auto h-12 w-12 text-blueGray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
					<path
						d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div class="flex text-sm justify-center text-blueGray-600">
					<button
						for="file-upload"
						class="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 transition-colors duration-150"
						@click.prevent="getFiles"
					>
						Select files
					</button>
					<p class="pl-1">or drag and drop</p>
				</div>
				<p class="text-xs text-blueGray-500">
					Supported formats: PNG, JPEG, WebP, AVIF, TIFF, GIF and SVG
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { types, extensions } from "/~/data/authorized_types.js";
	const dialog = require("electron").remote.dialog;
	const url = require("url");
	const path = require("path");

	export default {
		data() {
			return {
				hover: false,
			};
		},
		computed: {
			authorizedTypesString() {
				return types.join(",");
			},
		},
		methods: {
			async getFiles() {
				const result = await dialog.showOpenDialog({
					properties: ["openFile", "multiSelections"],
					filters: [
						{
							name: "Images",
							extensions,
						},
					],
				});
				if (result.filePaths.length > 0) {
					const files = Array.from(result.filePaths);
					this.$store.dispatch("addImages", files);
					console.log(files);
				}
			},
			dragOver(event) {
				event.dataTransfer.dropEffect = "copy";
			},
			dragEnter() {
				this.hover = true;
			},
			dragLeave() {
				this.hover = false;
			},
			drop(event) {
				this.hover = false;
				const files = Array.from(event.dataTransfer.files);
				const images = [];
				files.forEach((file) => {
					console.log(file.path, extensions);
					if (
						extensions.includes(
							path
								.extname(file.path)
								.split(".")[1]
								.toLowerCase()
						)
					) {
						images.push(file.path);
					}
				});
				this.$store.dispatch("addImages", images);
			},
		},
	};
</script>
