<script setup lang="ts">
    const route = useRoute();
    const slug = route.params.slug; // отримаємо масив параметрів

    // Для зручності, можемо обробити параметри в окремі частини
    const slugParts = Array.isArray(slug) ? slug : [slug];
</script>

<template>
    <div>
        <h1>Slug: {{ slug }}</h1>
        <p>Частини шляху: {{ slugParts }}</p>
    </div>
</template>
