<script setup lang="ts">
    import type { NuxtError } from '#app';

    const props = defineProps({
        // const props = defineProps({
        error: Object as () => NuxtError,
    });

    console.error('error ===>>>>', props.error);

    const handleError = () => clearError({ redirect: '/' });
</script>

<template>
    <div>
        <h1>{{ error?.statusCode }}</h1>
        <h1>{{ error?.message }}</h1>

        <NuxtLink to="/">Go back home</NuxtLink>
        <button @click="handleError">Clear error</button>
    </div>
</template>
