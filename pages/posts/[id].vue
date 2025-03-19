<script setup lang="ts">
    const route = useRoute();

    definePageMeta({
        // Перевірка маршруту
        validate: async route => {
            console.log('route 1 ===>>>', route);
            console.log('route.params.id ===>>>>>>', route.params.id);
            // Check if the id is made up of digits
            // Перевірте, чи ідентифікатор складається з цифр
            return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id);
        },
    });
</script>

<template>
    <p>post number {{ route.params.id }}</p>
</template>

<style></style>
