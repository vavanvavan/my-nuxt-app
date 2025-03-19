<script setup lang="ts">
    const route = useRoute();

    // definePageMeta({
    //     validate: async route => {
    //         console.log('route 1 ===>>>', route);
    console.log('route.params.id ===>>>', route.params.id);
    //         // Check if the id is made up of digits
    //         return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id);
    //     },
    // });

    definePageMeta({
        pageTransition: {
            name: 'bounce',
            mode: 'out-in', // default
        },
    });

    definePageMeta({
        middleware: [
            function (to: any, from: any) {
                // Custom inline middleware
                console.log('to, from', to, from);
            },
            'auth',
        ],
    });
</script>

<template>
    <section>
        <p>number-one</p>
    </section>
</template>

<style></style>
