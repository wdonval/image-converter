<template>
	<Listbox as="div" :id="id" class="space-y-1" v-model="selected" v-slot="{ open }" @update:modelValue="$emit('data-changed', selected)">
		<ListboxLabel v-if="label" class="block text-sm leading-5 font-medium text-blueGray-700">
			{{ label }}
		</ListboxLabel>
		<div class="relative">
			<span class="inline-block w-full rounded-md shadow-sm">
				<ListboxButton
					v-if="selected"
					class="cursor-default relative w-full rounded-md border border-blueGray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-primary focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
				>
					<span class="w-full inline-flex truncate" :title="`${selected?.value} ${selected?.add}`">
						<span class="block">
							{{ selected.value }}
						</span>
						<span class="ml-2 truncate opacity-70">
							{{ selected.add }}
						</span>
					</span>
					<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<svg class="h-5 w-5 text-blueGray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
							<path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
				</ListboxButton>
				<button
					v-else
					class="text-blueGray-500 cursor-default relative w-full rounded-md border border-blueGray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-primary focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
				>
					{{ noData }}
					<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
						<svg class="h-5 w-5 text-blueGray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
							<path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
				</button>
			</span>

			<transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
				<div v-if="open" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-50">
					<ListboxOptions
						v-if="data"
						static
						class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
					>
						<ListboxOption
							v-for="(element, index) in data"
							:key="`select-${id}-element-${index}`"
							:value="element"
							v-slot="{ selected, active }"
							class="focus:outline-none"
						>
							<div
								:class="`${active ? 'text-white bg-primary' : 'text-blueGray-900'} cursor-default select-none relative py-2 pl-8 pr-4 flex`"
								:title="`${element.value} ${element.add}`"
							>
								<span :class="`${selected ? 'font-semibold' : 'font-normal'} block`">
									{{ element.value }}
								</span>
								<span class="ml-2 opacity-70 truncate">
									{{ element.add }}
								</span>
								<span v-if="selected" :class="`${active ? 'text-white' : 'text-primary'} absolute inset-y-0 left-0 flex items-center pl-1.5`">
									<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							</div>
						</ListboxOption>
					</ListboxOptions>
				</div>
			</transition>
		</div>
	</Listbox>
</template>

<script>
	import { ref, onMounted } from "vue";
	import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";

	export default {
		props: {
			data: {
				type: Array,
				default() {
					return [
						{ value: "Wade Cooper", add: "" },
						{ value: "Arlene Mccoy", add: "" },
						{ value: "Devon Webb", add: "" },
						{ value: "Tanya Fox", add: "" },
						{ value: "Hellen Schmidt", add: "" },
						{ value: "Caroline Schultz", add: "" },
						{ value: "Mason Heaney", add: "" },
					];
				},
			},
			value: {
				type: String,
				default: null,
			},
			label: {
				type: String,
				default: null,
			},
			noData: {
				type: String,
				default: "No data",
			},
		},
		components: {
			Listbox,
			ListboxLabel,
			ListboxButton,
			ListboxOptions,
			ListboxOption,
		},
		setup(props, { emit }) {
			const id = Math.random()
				.toString(36)
				.substr(2, 9);
			const found = props.value && props.data ? props.data.find((item) => item.value === props.value) : null;
			const selected = found ? ref(props.data[props.data.indexOf(found)]) : ref(props.data[0]);
			onMounted(() => {
				if (!selected) {
					emit("data-changed", null);
				} else {
					emit("data-changed", selected.value);
				}
			});

			return {
				selected,
				id,
			};
		},
	};
</script>

<style></style>
