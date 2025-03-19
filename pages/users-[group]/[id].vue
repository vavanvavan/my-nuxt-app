<script setup lang="ts">
    const route = useRoute();

    if (route.params.group === 'admins' && route.params.id) {
        console.log('Warning! Make sure user is authenticated!', route.params.group, route.params.id);
    } else if (route.params.group === 'user' && route.params.id) {
        console.log('Warning! Make sure user is authenticated!', route.params.group, route.params.id);
    }
</script>

<template>
    <p>{{ route.params.group }} - {{ route.params.id }}</p>
</template>

<style></style>
