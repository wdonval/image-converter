<template>
	<div class="space-y-8">
		<button
			type="button"
			class="inline-flex items-center px-4 py-2 border border-blueGray-300 shadow-sm text-sm font-medium rounded-md text-blueGray-700 bg-white hover:bg-blueGray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
			@click="modal = true"
		>
			Modal
		</button>
		<Modal v-model:isModalOpen="modal" title="Test" content="test"></Modal>
		<div class="bg-white shadow rounded-lg overflow-visible">
			<div class="px-4 py-5 sm:p-6 space-y-4">
				<Upload @upload="images = $event" />
				<Convert />
			</div>
		</div>
		<div class="bg-white shadow rounded-lg overflow-visible">
			<div class="px-4 py-5 border-b border-blueGray-200 sm:px-6">
				<div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
					<div class="ml-4 mt-2">
						<h3 class="text-lg leading-6 font-medium text-blueGray-900">
							Images
						</h3>
					</div>
					<div class="ml-4 mt-2 flex-shrink-0">
						<button
							type="button"
							class="inline-flex items-center px-4 py-2 border border-blueGray-300 shadow-sm text-sm font-medium rounded-md text-blueGray-700 bg-white hover:bg-blueGray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
							@click="clearAll"
						>
							Clear all
							<svg class="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div class="px-4 py-5 sm:p-6 space-y-4">
				<ImageList />
			</div>
		</div>
	</div>
</template>

<script>
	import Upload from "/~/components/Upload.vue";
	import Convert from "/~/components/Convert.vue";
	import ImageList from "/~/components/ImageList.vue";
	import Modal from "/~/components/Modal.vue";

	export default {
		components: {
			Upload,
			Convert,
			ImageList,
			Modal,
		},
		data() {
			return {
				modal: false,
				content: "Hello",
			};
		},
		mounted() {
			console.log(this.modal);
		},
		methods: {
			clearAll() {
				this.images = [];
				this.$store.dispatch("clearImages");
			},
			confirm() {
				// some code...
				this.show = false;
			},
			cancel(close) {
				// some code...
				close();
			},
		},
		watch: {
			modal() {
				console.log(this.modal);
			},
		},
	};
</script>
