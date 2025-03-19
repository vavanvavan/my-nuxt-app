export default defineEventHandler(event => {
    return {
        message: 'Default other route [...slug].ts',
        event: event.context.path,
    };
});
