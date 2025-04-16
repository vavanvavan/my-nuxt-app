export default defineNuxtRouteMiddleware((to, from) => {
    console.log('running middleware auth.ys');

    const { $config } = useNuxtApp();
    if ($config) {
        console.log('Accessed runtime config within middleware.');
    }

    // Ми можемо використовувати useRequestHeader, щоб легко визначити, авторизований користувач чи ні.
    // Якщо токен не передано, перенаправляємо на сторінку входу
    const authHeader = useRequestHeader('authorization');

    if (!authHeader) {
        return navigateTo('/login'); // Якщо немає токена, перенаправити на сторінку входу
    }

    const header = useResponseHeader('X-Global-Header');
    header.value = 'This header is always set!';
});
