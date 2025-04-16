<script setup lang="ts">
    const route = useRoute();

    // definePageMeta({
    //     validate: async route => {
    //         console.log('route 2 ===>>>', route);
    console.log('route.params.id ===>>>', route.params.id);
    //         // Check if the id is made up of digits
    //         return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id);
    //     },
    // });
    // pageTransition і layoutTransition може бути вимкнено локально для певного маршруту:
    definePageMeta({
        pageTransition: false,
        layoutTransition: false,
        // layout: false,
    });

    function enableCustomLayout() {
        setPageLayout('custom');
    }
    function enableDefaultLayout() {
        setPageLayout('default');
    }
</script>

<template>
    <section>
        <p>number-two</p>

        <button @click="enableCustomLayout">Update layout</button>
        <button @click="enableDefaultLayout">Update layout</button>
    </section>
</template>

<style></style>
