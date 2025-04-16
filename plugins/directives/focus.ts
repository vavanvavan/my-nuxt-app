export default defineNuxtPlugin(nuxt => {
    nuxt.vueApp.directive('focus', {
        mounted(el) {
            console.log('✅ v-focus is triggered!');
            el.focus();
        },
        getSSRProps(binding, vnode) {
            // you can provide SSR-specific props here
            return {};
        },
    });
});
