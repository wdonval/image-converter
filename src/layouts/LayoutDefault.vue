<template>
    <Navbar />
    <div class="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <slot />
    </div>
</template>

<script>
import Navbar from '/~/components/Navbar.vue'

export default {
    components: {
        Navbar,
    },
}
</script>
