export default defineEventHandler(event => {
    const message = 'Test get handler';
    console.error(message); // Відобразиться в терміналі
    return { message }; // Відобразиться в браузері
});
