<template>
	<div class="flex sm:space-x-3 space-x-0 sm:space-y-0 space-y-2 flex-wrap">
		<Select class="flex-grow flex-shrink-0 sm:flex-shrink min-w-0" :data="formats" :value="selectedFormat?.value" @data-changed="setFormat($event)" />
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
	const sharp = require("sharp");
	const path = require("path");

	export default {
		components: {
			Select,
		},
		data() {
			return {
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
			async convert() {
				this.$store.getters.getImages.forEach(async (image) => {
					const arrayBuffer = await image.file.arrayBuffer();
					const buffer = Buffer.from(arrayBuffer);

					let converted;
					let ext;
					switch (this.selectedFormat.value.toLowerCase()) {
						case "avif":
							converted = await sharp(buffer).avif();
							ext = "avif";
							break;
						case "jpeg":
							converted = await sharp(buffer).jpeg();
							ext = "jpeg";
							break;
						case "png":
							converted = await sharp(buffer).png();
							ext = "png";
							break;
						case "tiff":
							converted = await sharp(buffer).tiff();
							ext = "tiff";
							break;
						case "webp":
							converted = await sharp(buffer).webp();
							ext = "webp";
							break;
					}
					const outputPath = this.$store.state.settings.outputPath;
					const filename = path.parse(image.file.name).name;
					converted.toFile(`${outputPath}/${filename}.${ext}`);
				});
			},
		},
	};
</script>
