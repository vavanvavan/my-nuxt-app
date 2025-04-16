<script setup lang="ts">
    const route = useRoute();
    const attrs = useAttrs();
    console.log(attrs.foobar); // Outputs: 123

    definePageMeta({
        key: route => route.fullPath,
        layout: 'default',
        // layout: 'custom',
    });

    const isClient = useState(() => import.meta.env.DEV);
    console.log('import.meta', import.meta);
    console.log('import.meta.env', import.meta.env);
    // 📌 1. app:created — Викликається при створенні Nuxt-застосунку
    useRuntimeHook('app:created', () => {
        console.log('📌app:created Nuxt застосунок успішно створено!');
    });

    // 📌 2. page:start та page:finish — Відстеження завантаження сторінки
    useRuntimeHook('page:start', () => {
        console.log('📌page:start Завантаження нової сторінки...');
    });

    useRuntimeHook('page:finish', () => {
        console.log('📌page:finish Сторінка завантажена!');
    });

    // 📌 3. link:prefetch — Відстеження попереднього завантаження посилань
    useRuntimeHook('link:prefetch', link => {
        console.log(`📌link:prefetch Nuxt готує посилання до завантаження: ${link}`);
    });

    // 📌 4. error:created — Відстеження помилок
    useRuntimeHook('app:error', error => {
        console.error('📌app:error Помилка Nuxt:', error);
    });

    // 📌 vue:error — Відловлення Vue-помилок
    useRuntimeHook('vue:error', error => {
        console.error('📌 vue:error Помилка в компоненті Vue:', error);
    });
</script>

<template>
    <section>
        <NuxtLoadingIndicator color="blue" />

        <h1>I am the parent view</h1>
        <!-- page-key - Дочірні ключі маршруту -->
        <!-- <NuxtPage :foobar="123" :page-key="route => route.fullPath" /> -->

        <div v-if="isClient">
            <p>Цей контент тільки для клієнта</p>
        </div>

        <TestApiComponents :route="route.fullPath">
            <template #fallbackClient>
                <p>ClientOnly component</p>
            </template>
            <template #fallbackDev>
                <p>DevOnly component</p>
            </template>
        </TestApiComponents>
    </section>
</template>

<style></style>
