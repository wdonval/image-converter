<template>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" v-if="getImages.length > 0">
		<div class="mx-auto relative h-32 w-32" v-for="(image, index) in getImages" :key="`displayed-image-${index}`">
			<button
				class="absolute bg-white hover:bg-blueGray-50 text-blueGray-700 h-6 w-6 -right-1.5 -top-1.5 rounded-full shadow flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-150"
				@click.prevent="clear(index)"
			>
				<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<img
				class="h-32 w-32 object-cover rounded-lg bg-blueGray-200"
				:src="`safe-protocol://${image}`"
				:alt="`Selected image ${index + 1}`"
				:title="`Selected image ${index + 1}`"
				height="200"
				width="200"
			/>
		</div>
	</div>
	<div v-else class="text-blueGray-500 text-center text-sm">
		<span @click.prevent="$refs.file_upload.click()">No images selected.</span>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["getImages"]),
		},
		mounted() {},
		methods: {
			clear(index) {
				this.$store.dispatch("deleteImage", index);
			},
		},
	};
</script>
