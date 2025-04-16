export default defineNuxtPlugin(nuxt => {
    nuxt.vueApp.config.errorHandler = (error, instance, info) => {
        // handle error, e.g. report to a service
        // console.log('errorHandler', error, instance, info);
    };

    // Also possible
    nuxt.hook('vue:error', (error, instance, info) => {
        // handle error, e.g. report to a service
        // console.log('vue:error', error, instance, info);
    });

    // addRouteMiddleware() — це допоміжна функція для динамічного додавання проміжного програмного забезпечення
    addRouteMiddleware(
        'global',
        () => {
            // console.log('===>>> this global middleware');
        },
        { global: true },
    );

    addRouteMiddleware('auth', () => {
        // console.log('===>>> this named middleware');
    });
});
