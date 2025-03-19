export default defineEventHandler(event => {
    const message = 'Test post handler';
    console.error(message); // Відобразиться в терміналі
    return { message }; // Відобразиться в браузері
});
