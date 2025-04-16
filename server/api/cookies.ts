export default defineEventHandler(event => {
    const { apiSecret } = useRuntimeConfig(event);

    const cookies = parseCookies(event);

    return { cookies };
});
