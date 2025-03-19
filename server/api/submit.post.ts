export default defineEventHandler(async event => {
    try {
        const body = await readBody(event);
        return { body };
    } catch (error) {
        return { error: 'Failed to read body' };
    }
});
