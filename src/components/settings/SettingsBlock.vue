<template>
	<form @submit.prevent="$emit(`save-settings`)">
		<div class="shadow rounded-md">
			<div class="bg-white dark:bg-blueGray-800 py-6 px-4 sm:p-6 rounded-t-md">
				<div>
					<h2 id="payment_details_heading" class="text-lg leading-6 font-medium text-blueGray-900 dark:text-blueGray-100">
						{{ title }}
					</h2>
					<p v-if="subtitle" class="mt-1 text-sm text-blueGray-500">
						{{ subtitle }}
					</p>
				</div>
				<div class="mt-6">
					<slot />
				</div>
			</div>
			<div class="px-4 py-3 bg-blueGray-50 dark:bg-blueGray-800 text-right sm:px-6 rounded-b-md">
				<button
					type="submit"
					class="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 transition-colors duration-150"
				>
					Save
				</button>
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true,
			},
			subtitle: {
				type: String,
				default: null,
			},
		},
	};
</script>
