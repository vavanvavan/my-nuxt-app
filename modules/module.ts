import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
    setup(options, nuxt) {
        nuxt.hook('ready', async nuxt => {
            console.log('✅ Nuxt is ready');
        });

        nuxt.hook('build:before', () => {
            console.log('⚡ Nuxt починає збірку!');
        });

        nuxt.hook('close', () => {
            console.log('🛑 Nuxt зупиняється!');
        });
    },
});
