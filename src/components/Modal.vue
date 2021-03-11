<template>
	<teleport to="body">
		<div class="fixed z-10 inset-0 overflow-y-auto" v-show="isModalOpen">
			<div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				<transition
					enter-active-class="duration-300 ease-out"
					enter-from-class="opacity-0"
					enter-to-class="opacity-100"
					leave-active-class="duration-200 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<div class="fixed inset-0 transition-opacity" aria-hidden="true" v-show="isModalShown">
						<button
							v-if="closable"
							type="button"
							class="absolute inset-0 w-full h-full cursor-default bg-blueGray-500 opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
							@click="isModalShown = false"
						></button>
						<button
							v-else
							class="absolute inset-0 w-full h-full cursor-default bg-blueGray-500 opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
						></button>
					</div>
				</transition>
				<!-- This element is to trick the browser into centering the modal contents. -->
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
				<transition
					enter-active-class="duration-300 ease-out"
					enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
					enter-to-class="translate-y-0 opacity-100 sm:scale-100"
					leave-active-class="duration-200 ease-in"
					leave-from-class="translate-y-0 opacity-100 sm:scale-100"
					leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
				>
					<div
						v-show="isModalShown"
						class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline"
					>
						<div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
							<button
								v-if="closable"
								type="button"
								class="bg-white rounded-md text-blueGray-400 hover:text-blueGray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								<span class="sr-only">Close</span>
								<svg
									class="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<div class="sm:flex sm:items-start">
							<div
								v-if="props.type === 'danger'"
								class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
							>
								<!-- Heroicon name: outline/exclamation -->
								<svg
									class="h-6 w-6 text-red-600"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<div
								v-else
								class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
							>
								<svg
									class="h-6 w-6 text-green-600"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3 class="text-lg leading-6 font-medium text-blueGray-900" id="modal-headline">
									{{ props.title }}
								</h3>
								<div class="mt-2">
									<p class="text-sm text-blueGray-500">
										{{ props.content }}
									</p>
								</div>
							</div>
						</div>
						<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
							<button
								v-if="props.type === 'danger'"
								type="button"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							>
								{{ props.actionText }}
							</button>
							<button
								v-else
								type="button"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
							>
								{{ props.actionText }}
							</button>
							<button
								type="button"
								class="mt-3 w-full inline-flex justify-center rounded-md border border-blueGray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blueGray-700 hover:text-blueGray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
								@click.prevent="isModalShown = false"
							>
								{{ props.cancelText }}
							</button>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</teleport>
</template>

<script>
	import { defineComponent, ref, watch, toRefs } from "vue";

	export default defineComponent({
		props: {
			isModalOpen: {
				type: Boolean,
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
			closable: {
				type: Boolean,
				default: true,
			},
			type: {
				type: String,
				default: "success",
			},
			actionText: {
				type: String,
				required: true,
			},
			cancelText: {
				type: String,
				default: "Cancel",
			},
		},
		setup(props, { emit }) {
			const { isModalOpen } = toRefs(props);
			const isModalShown = ref(false);

			watch(isModalOpen, () => {
				isModalShown.value = isModalOpen.value;
			});

			watch(isModalShown, () => {
				setTimeout(() => {
					emit("update:isModalOpen", isModalShown.value);
				}, 200);
			});

			return { isModalOpen, isModalShown, props };
		},
	});
</script>

<style></style>
