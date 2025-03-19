<script setup lang="ts">
    const route = useRoute();

    definePageMeta({
        key: route => route.fullPath,
    });
</script>

<template>
    <section>
        <h1>I am the parent view</h1>
        <!-- page-key - Дочірні ключі маршруту -->
        <!-- <NuxtPage :page-key="route => route.fullPath" /> -->

        <NuxtPage :foobar="123" />
    </section>
</template>

<style></style>
