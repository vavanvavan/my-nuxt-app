<script setup lang="ts">
    const props = defineProps({
        foobar: Number,
    });

    // const props = defineProps(['foobar']);

    console.log(props.foobar);
</script>

<template>
    <section>
        <p>Child</p>
        <p>{{ foobar }}</p>
    </section>
</template>

<style></style>
