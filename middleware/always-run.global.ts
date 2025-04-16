export default defineNuxtRouteMiddleware(() => {
    // console.log('running global middleware');

    const header = useResponseHeader('X-My-Always-Header');
    // header.value = `I'm Always here!`;
});
