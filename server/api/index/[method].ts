export default defineEventHandler(event => {
    return {
        message: 'index.[method]',
        event: event,
    };
});
