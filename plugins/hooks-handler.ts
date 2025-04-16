export default defineNuxtPlugin(nuxt => {
    const config = useRuntimeConfig();

    console.log('API base URL:', config.public.apiBase);

    nuxt.hook('page:start', () => {
        console.log('===>>> hook page:start');
    });

    nuxt.hook('app:mounted', () => {
        console.log('===>>> hook app:mounted');
    });
});
