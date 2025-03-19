<script setup lang="ts">
    const route = useRoute();

    // definePageMeta({
    //     validate: async route => {
    //         console.log('route 1 ===>>>', route);
    console.log('useRoute() =>', route);
    //         // Check if the id is made up of digits
    //         return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id);
    //     },
    // });
</script>

<template>
    <div>
        <pre>default layout</pre>
        <slot />
    </div>
</template>

<style scoped>
    div {
        background-color: yellow;
    }
</style>
