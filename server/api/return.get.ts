export default defineEventHandler(event => {
    const { apiSecret } = useRuntimeConfig(event);

    const message = 'Test get handler';
    // console.error(message); // Відобразиться в терміналі
    return { message }; // Відобразиться в браузері
});
