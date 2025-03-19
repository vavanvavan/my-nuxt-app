export default defineNitroPlugin(nitro => {
    console.log('Nitro plugin', nitro);

    nitro.hooks.hook('render:html', (html, { event }) => {
        // This will be an object representation of the html template.
        console.log('html', html);
        html.head.push(`<meta name="description" content="My custom description" />`);
        // додаємо  зовнішні таблиці стилів
        // Зовнішні таблиці стилів є ресурсами, які довше завантажуються: вони мають бути завантажені та оброблені до того, як браузер відобразить сторінку
        // html.head.push('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">');
    });
    // You can also intercept the response here.
    nitro.hooks.hook('render:response', (response, { event }) => {
        console.log('response', response);
    });

    nitro.hooks.hook('close', async () => {
        // Will run when nitro is being closed
        console.log('Will run when nitro is being closed');
    });

    nitro.hooks.hook('error', async (error, { event }) => {
        console.error(`${event?.path} Application error:`, error);
    });
});

// список усіх доступних хуків часу виконання.
// "close", () => {}
// "error", (error, { event? }) => {}
// "render:response", (response, { event }) => {}
// "request", (event) => {}
// "beforeResponse", (event, { body }) => {}
// "afterResponse", (event, { body }) => {}
