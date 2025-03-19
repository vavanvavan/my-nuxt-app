export default defineNuxtRouteMiddleware((to, from) => {
    console.log('running midleware auth.ys');

    const { $config } = useNuxtApp();
    if ($config) {
        console.log('Accessed runtime config within middleware.');
    }

    // return;
});
