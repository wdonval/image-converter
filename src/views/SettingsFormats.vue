<template>
	<div class="space-y-6">
		<SettingsBlock title="Available output formats" @save-settings="saveFormAvailableFormats">
			<div class="space-y-4">
				<CheckboxGroup v-model:data="formAvailableFormats.formats" id="formats" />
			</div>
		</SettingsBlock>
	</div>
</template>

<script>
	import SettingsBlock from "/~/components/settings/SettingsBlock.vue";
	import CheckboxGroup from "/~/components/settings/CheckboxGroup.vue";
	import outputFormats from "/~/data/output_formats.js";

	export default {
		components: {
			SettingsBlock,
			CheckboxGroup,
		},
		data() {
			return {
				formAvailableFormats: {
					formats: outputFormats.map((outputFormat) => ({
						value: outputFormat.value,
						add: outputFormat.add,
						active: true,
					})),
				},
			};
		},
		mounted() {
			this.initialize();
		},
		methods: {
			initialize() {
				this.formAvailableFormats.formats = this.$store.state.settings.formats
					? this.$store.state.settings.formats
					: outputFormats.map((outputFormat) => ({
							value: outputFormat.value,
							add: outputFormat.add,
							active: true,
					  }));
			},
			saveFormAvailableFormats() {
				this.$store.dispatch("setFormats", this.formAvailableFormats.formats);
			},
		},
	};
</script>
