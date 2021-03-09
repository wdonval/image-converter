<template>
    <Navbar />
    <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside class="pb-6 lg:py-0 lg:col-span-3">
                <nav class="space-y-1">
                    <router-link
                        v-for="(item, index) in menu"
                        :key="`menu-item-${index}`"
                        :to="{ name: item.link }"
                        :class="`${
                            $route.name == item.link
                                ? 'bg-white text-primary-600 hover:bg-white'
                                : 'text-blueGray-900 hover:text-blueGray-900 hover:bg-blueGray-50'
                        } group rounded-md px-3 py-2 flex items-center text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`"
                    >
                        <!-- Heroicon name: outline/user-circle -->
                        <div
                            v-html="
                                $route.name == item.link
                                    ? item.iconActive
                                    : item.icon
                            "
                        ></div>
                        <span class="truncate"> {{ item.label }} </span>
                    </router-link>
                </nav>
            </aside>
            <div class="space-y-6 lg:px-0 lg:col-span-9">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '/~/components/Navbar.vue'
import menuItems from '/~/data/menu_item_settings.js'

export default {
    computed: {
        menu() {
            return menuItems
        },
    },
    components: {
        Navbar,
    },
}
</script>
