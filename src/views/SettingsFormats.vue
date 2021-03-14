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
	import Notification from "/~/components/Notification.vue";
	import { useToast } from "vue-toastification";

	export default {
		components: {
			SettingsBlock,
			CheckboxGroup,
			Notification,
		},
		data() {
			return {
				toast: useToast(),
				notification: {
					component: Notification,
					props: {
						title: "Settings saved",
						content: null,
						type: "success",
						timout: 5000,
					},
				},
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
				this.formAvailableFormats.formats =
					this.$store.getters.getFormats.length > 0
						? JSON.parse(JSON.stringify(this.$store.getters.getFormats))
						: outputFormats.map((outputFormat) => ({
								value: outputFormat.value,
								add: outputFormat.add,
								active: true,
						  }));
			},
			saveFormAvailableFormats() {
				this.$store.dispatch("setFormats", this.formAvailableFormats.formats);
				this.notification.props.content = "Available output formats settings updated";
				this.toast(this.notification);
			},
		},
	};
</script>
