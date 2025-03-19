<script setup lang="ts">
    const route = useRoute();
    console.log(route.name);

    definePageMeta({
        title: 'My contact page',
    });
</script>

<template>
    <p>{{ route.name }} - {{ route.meta.title }}</p>
</template>

<style></style>
