export default defineEventHandler(event => {
    return {
        message: 'Default other route [...].ts',
        event: event.context.path,
    };
});
