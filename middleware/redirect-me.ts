export default defineNuxtRouteMiddleware((to, from) => {
    console.log('to, from', to, from);

    const { $config } = useNuxtApp();
    if ($config) {
        console.log('Accessed runtime config within middleware.');
    }
    console.log('Heading to', to.path, 'but I think we should go somewhere else...');
    return '/secret';
});
