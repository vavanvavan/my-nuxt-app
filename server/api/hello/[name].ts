export default defineEventHandler(event => {
    const name = getRouterParam(event, 'name');
    console.log('name', name);

    return {
        message: `Hello, ${name}!`,
        messages: camelCase(`Hello, ${name}!`),
    };
});
