<template>
	<form @submit.prevent="$emit(`save-settings`)">
		<div class="shadow rounded-md">
			<div class="bg-white py-6 px-4 sm:p-6 rounded-md">
				<div>
					<h2 id="payment_details_heading" class="text-lg leading-6 font-medium text-blueGray-900">
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
			<div class="px-4 py-3 bg-blueGray-50 text-right sm:px-6 rounded-b-md">
				<button
					type="submit"
					class="bg-blueGray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blueGray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueGray-900"
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
