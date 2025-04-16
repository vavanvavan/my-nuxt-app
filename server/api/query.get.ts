export default defineEventHandler(event => {
    const { apiSecret } = useRuntimeConfig(event);

    const query = getQuery(event);

    return { a: query.foo || null, b: query.baz || null };
});
