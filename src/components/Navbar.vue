<template>
	<nav class="bg-transparent">
		<div class="mx-auto px-3 sm:px-5 lg:px-8">
			<div class="relative flex items-center justify-between h-16">
				<div>
					<router-link
						v-if="$route.name !== 'Home'"
						:to="{ name: 'Home' }"
						class="inline-flex p-1 space-x-1 text-primary-500 items-center justify-center font-medium hover:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-blueGray-100 focus-visible:ring-primary-500 rounded-md"
					>
						<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>Retour</span>
					</router-link>
				</div>
				<router-link
					:to="{ name: 'SettingsGeneral' }"
					class="group bg-transparent p-1 rounded-full text-blueGray-400 hover:text-blueGray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
				>
					<span class="sr-only">Go to settings</span>
					<svg
						class="h-6 w-6 transform group-hover:rotate-180 transition-transform duration-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {};
</script>

<style></style>
