<script setup lang="ts">
    // const { data: api } = await useFetch('/api/hello');
    const { data: api1 } = await useFetch('/api/hello/vavan');
    const { data: api2 } = await useFetch('/api/hello/petro');

    const { data: get } = await useFetch('/api/return');

    const body = await useFetch('/api/return', {
        method: 'post',
        body: { test: 123 },
    });

    const { data: routes } = await useFetch('/hello');
    const { data: indexGet } = await useFetch('/api/index/get');
    const { data: indexPost } = await useFetch('/api/index/post', {
        method: 'post',
        body: { index: 'post' },
    });

    const { apiSecret } = useRuntimeConfig();
    const { public: config } = useRuntimeConfig();
    console.log('apiSecret ', apiSecret);
    console.log('config', config);
    console.log('import.meta', import.meta.server);

    if (import.meta.server) {
        console.log('API secret:', config.apiBase);
    }

    const bodySubmit = await useFetch('/api/submit', {
        method: 'post',
        body: { test: 'bodySubmit' },
        headers: {
            Authorization: `Bearer ${apiSecret}`,
        },
    });

    const query = await useFetch('/api/query');

    const { data } = await useFetch('/api/cookies');
    // console.log('cookies', data.value?.cookies);

    const route = useRoute();
    const { focus } = useNuxtApp();

    // console.log('focus', focus);

    useHead({
        title: 'Index',
    });

    definePageMeta({
        layout: 'custom',
    });

    const hello = capitalize('hello');
    // console.log('hello', hello);

    // console.log('useRoute() =>', route);
    // console.log('useRouter() =>', useRouter());
    // console.log('useRuntimeConfig() =>', useRuntimeConfig()); // API runtimeConfig надає такі значення, як змінні середовища
    // console.log('useAppConfig() =>', useAppConfig()); // використовується для надання загальнодоступних змінних, які можна визначити під час збирання
</script>

<template>
    <section>
        <p>/ route.</p>
        <p style="font-family: 'Josefin+Sans'">/ route.</p>
        <AppButton :name="'AppButton'"> AppButton. </AppButton>

        <h1 class="animate__animated animate__bounce">Привіт, Nuxt!</h1>
        <h1 class="animate__animated animate__bounce">{{ capitalize('привіт, nuxt!') }}</h1>
        <h1 class="animate__animated animate__bounce">{{ camelCase('привіт, nuxt!') }}</h1>
        <button class="animate__animated animate__pulse animate__infinite">Натисни мене</button>

        <input
            v-focus
            type="text"
        />

        <pre>===1>>>>>>> {{ api1 }}</pre>
        <pre>===1>>>>>>> {{ api2 }}</pre>
        <br />
        <pre>===2>>>>>>> {{ routes }}</pre>
        <br />
        <pre>===get>>>>>>> {{ get }}</pre>
        <p id="comments">comments</p>

        <br />
        <pre>===post>>>>>>> {{ body }}</pre>
        <br />
        <pre>===indexGet>>>>>>> {{ indexGet }}</pre>

        <br />
        <pre>===indexPost>>>>>>> {{ indexPost }}</pre>
        <br />
        <pre>===bodySubmit>>>>>>> {{ bodySubmit }}</pre>
        <br />
        <pre>===query>>>>>>> {{ query }}</pre>
    </section>
</template>

<style scoped>
    @import url('~/assets/css/first.css');

    p {
        color: orange;
    }
</style>
