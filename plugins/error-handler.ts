export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        // handle error, e.g. report to a service
        // console.log('errorHandler', error, instance, info);
    };

    // Also possible
    nuxtApp.hook('vue:error', (error, instance, info) => {
        // handle error, e.g. report to a service
        // console.log('vue:error', error, instance, info);
    });

    addRouteMiddleware(
        'global',
        () => {
            console.log('===>>> this global middleware was added in a plugin and will be run on every route change');
        },
        { global: true },
    );

    addRouteMiddleware('auth', () => {
        console.log('===>>> this named middleware was added in a plugin and would override any existing middleware of the same name');
    });
});
