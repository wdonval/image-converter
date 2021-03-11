<template>
	<div class="bg-white rounded-md -space-y-px">
		<!-- On: "bg-primary-50 border-primary-200 z-10", Off: "border-blueGray-200" -->
		<div
			v-for="(input, index) in data"
			:key="`input-${id}-${index}`"
			:class="
				`${index === 0 ? 'rounded-tl-md rounded-tr-md' : null} ${index === data.length - 1 ? 'rounded-bl-md rounded-br-md' : null} ${
					input.active ? 'bg-primary-50 border-primary-200 z-10' : 'border-blueGray-200'
				} relative border p-4 flex`
			"
		>
			<div class="flex items-center h-5">
				<input
					v-model="input.active"
					:id="`${id}-${index}`"
					type="checkbox"
					class="rounded focus:outline-none focus-visible:ring-primary-500 h-4 w-4 text-primary cursor-pointer border-blueGray-300 transition-colors duration-150"
					:checked="input.active"
				/>
			</div>
			<label :for="`${id}-${index}`" class="ml-3 flex flex-col cursor-pointer items-stretch flex-grow">
				<!-- On: "text-primary-900", Off: "text-blueGray-900" -->
				<span :class="`${input.active ? 'text-primary-900' : 'text-blueGray-900'} block w-full text-sm font-medium`">
					{{ input.value }}
				</span>
				<!-- On: "text-primary-700", Off: "text-blueGray-500" -->
				<span :class="`${input.active ? 'text-primary-700' : 'text-blueGray-500'} block w-full text-sm`">
					{{ input.add }}
				</span>
			</label>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				required: true,
			},
			id: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				dataCopy: [],
			};
		},
		created() {
			this.dataCopy = this.data;
		},
		methods: {
			handleClick(event, index) {
				const dataCopy = this.data;
				dataCopy[index].active = event.target.value;
				this.$emit("update:data", dataCopy);
			},
		},
	};
</script>

<style></style>
