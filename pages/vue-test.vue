<script setup>
    const showComponent = ref(false);
    // Асинхронне завантаження компонента
    const AsyncComponent = defineAsyncComponent(() => import('../components/MountainsList.vue'));
    // ---------------------------------------------------------------------------------------------------------
    const count = ref(0);

    watchEffect(() => console.log(count.value));
    // ---------------------------------------------------------------------------------------------------------
    const attrs = useAttrs();
    console.log('attrs', attrs);
    // ---------------------------------------------------------------------------------------------------------
    const slots = useSlots();
    console.log('slots', slots);
    // ---------------------------------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------------------------------
</script>

<template>
    <section>
        <div>
            <h1>Welcome to the app</h1>
            <button @click="showComponent = !showComponent">Toggle Async Component</button>
            <button @click="count++">count++</button>

            <AsyncComponent v-if="showComponent" />
            <MountainsList v-if="showComponent" />
        </div>
        <p>---------------------------------------------------------------------------------------------------------</p>
    </section>
</template>
