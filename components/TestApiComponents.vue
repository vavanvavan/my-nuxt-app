<script setup lang="ts">
    import type { LayoutKey } from '#build/types/layouts';

    const SSROpen = ref(false);
    const ClientOpen = ref(false);
    const postID = ref(12);

    defineProps({
        route: String,
    });

    const NuxtPageRef = useTemplateRef('nuxtWelcomeRef');
    console.log('NuxtPageRef', NuxtPageRef.value);

    // The watch will be triggered when the component is available
    watch(
        NuxtPageRef,
        () => {
            console.log('<NuxtWelcome /> mounted', NuxtPageRef.value);
        },
        { once: true },
    );

    onMounted(() => {
        setTimeout(() => {
            if (NuxtPageRef.value) {
                console.log('<NuxtWelcome /> mounted', NuxtPageRef.value);

                NuxtPageRef.value;
            }
        }, 1000);
    });

    const layout = ref<false | LayoutKey>('custom'); // Виправлений тип

    const refLayout = ref(null);

    nextTick(() => {
        console.log('refLayout.value =>', refLayout.value);
        // layout.value.layoutRef
    });

    const handleError = (error: unknown) => {
        if (error instanceof Error) {
            console.error('Помилка завантаження острова:', error.message);
        } else {
            console.error('Невідома помилка при завантаженні острова');
        }
    };

    // Створюємо ref для доступу до компонента NuxtIsland
    const island = ref<{ refresh: () => Promise<void> } | null>(null);

    const refreshIsland = async () => {
        if (island.value) {
            try {
                // Викликаємо refresh, щоб примусово оновити острів
                await island.value.refresh();
                console.log('Острів оновлено!');
            } catch (error) {
                console.error('Помилка при оновленні острова:', error);
            }
        }
    };

    // ✅ useAppConfig дозволяє отримувати доступ до глобальної конфігурації, визначеної у app.config.ts
    console.log(' >>> useAppConfig()', useAppConfig());
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useNuxtApp — це хук, який дозволяє отримати доступ до глобального об'єкта NuxtApp, що містить загальну інформацію про застосунок Nuxt,
    // такі як плагіни, ін'єкції, контекст та інші корисні методи.
    console.log(' >>> useNuxtApp()', useNuxtApp());
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useNuxtData - useNuxtData — це Nuxt API, який дозволяє отримувати доступ до кешованих даних,
    // що були отримані через useAsyncData, useLazyAsyncData, useFetch, useLazyFetch
    const { data: nuxtData } = useNuxtData('postId-useAsyncData');
    console.log(' >>> useNuxtData', nuxtData.value); // Використовує кеш
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ Використовуйте usePreviewMode, щоб перевірити та контролювати режим попереднього перегляду в Nuxt
    const preview = usePreviewMode();
    console.log(' >>> usePreviewMode', preview); // value: true / false
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRequestEvent використовується для доступу до вхідного HTTP-запиту (наприклад, у серверних ендпоінтах, middleware або плагінах).
    // Важливо: У браузері useRequestEvent() поверне undefined, оскільки там немає серверного контексту.
    // Коли використовувати? 🔹 У server/api, middleware та плагінах. ❌ Не у компонентах або сторінках.
    const requestEvent = useRequestEvent();
    console.log(' >>> useRequestEvent', requestEvent); // undefined
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRequestFetch - Автоматично пересилає заголовки та контекст запиту при SSR (серверному рендерингу).
    // Використовується всередині useFetch та useAsyncData, тож зазвичай немає потреби викликати useRequestFetch напряму.
    const requestFetch = useRequestFetch();
    const { data: forwarded } = await useAsyncData(() => requestFetch('/api/cookies'));
    console.log(' >>> useRequestFetch', forwarded);
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅  useRequestHeader — це вбудований composable у Nuxt, який дозволяє отримувати заголовки вхідного запиту на сервері.
    // Працює лише на сервері, У браузері повертає undefined, Використовується для доступу до HTTP-заголовків, наприклад, для перевірки авторизації.
    const requestHeader = useRequestHeader('authorization'); // Отримує один заголовок
    console.log(' >>> useRequestHeader', requestHeader); // undefined
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRequestHeaders — це вбудований composable у Nuxt, який дозволяє отримати всі заголовки вхідного запиту або тільки певні заголовки.
    // Працює тільки на сервері (SSR, API-роути, middleware), У браузері повертає undefined, Зручно для збереження авторизації
    const requestHeaders = useRequestHeaders(['authorization', 'cookie']); // Отримує кілька заголовків
    // const requestHeaders = useRequestHeaders() // Отримує всі заголовки
    console.log(' >>> useRequestHeaders', requestHeaders); // undefined
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRequestURL — це composable у Nuxt, який дозволяє отримати об'єкт URL запиту як на сервері, так і на клієнті.
    // Повертає об'єкт URL, з якого можна отримати hostname, pathname, searchParams
    const url = useRequestURL();
    console.log(' >>> useRequestURL', url); // URL { href: 'http://localhost:3000/', ... }
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useResponseHeader — це composable у Nuxt, який дозволяє встановлювати заголовки у відповідь сервера прямо зі сторінок, компонентів і middleware.
    // Працює тільки на сервері (SSR, API-роути, middleware), Повертає функцію, яка дозволяє встановлювати кастомні заголовки у відповіді сервера.
    const header = useResponseHeader('X-My-Header');
    // header.value = 'my-value';
    console.log(' >>> useResponseHeader', header.value); // undefined
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRoute — це composable, який повертає об'єкт поточного маршруту
    //  Доступні параметри (params), запити (query), шлях (path), хеш (hash), повний шлях (fullPath) та інші дані маршруту.
    const route = useRoute();
    console.log(' >>> useRoute', route);
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRouteAnnouncer — це composable для оголошення змін заголовка сторінки через екранні зчитувачі
    // Автоматично оновлює повідомлення при зміні заголовка сторінки.
    // Використовує Unhead для зчитування заголовка (<title>) після рендерингу.
    // Використовується для автоматичного оновлення заголовка або вручну (set(), polite(), assertive()).
    // Три рівні пріоритету (off, polite, assertive).
    //     useRouteAnnouncer допомагає користувачам з вадами зору розуміти, що відбувається на сторінці.
    const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
        politeness: 'assertive', // Встановлює рівень оголошення (off, polite, assertive)
    });
    // message	Поточне повідомлення для зчитувача (реактивне)
    // politeness	Рівень оголошення (off, polite, assertive)
    // set(message, politeness)	Встановлює повідомлення і рівень оголошення
    // polite(message)	Додає "ввічливе" повідомлення (не перебиває користувача)
    // assertive(message)	Додає "асертивне" повідомлення (перебиває користувача)
    console.log(' >>> useRouteAnnouncer', message, politeness);
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRouter — це composable, який повертає екземпляр Vue Router, що дозволяє керувати навігацією у додатку
    // Керування навігацією (push, replace, back, forward, go)
    // Додавання / видалення маршрутів (addRoute, removeRoute, hasRoute)
    // Отримання списку маршрутів (getRoutes())
    // Перехоплення навігації (beforeEach, afterEach, beforeResolve)
    // Обробка помилок (onError)

    //     Основні маніпуляції
    // addRoute(): додайте новий маршрут - router.addRoute({ name: 'home', path: '/home', component: Home })
    // removeRoute(): видалити  маршрут за його назвою - router.removeRoute('home')
    // getRoutes(): отримати повний список усіх записів маршруту - router.getRoutes()
    // hasRoute(): перевіряє, чи існує маршрут із заданою назвою - router.hasRoute('home')
    // resolve(): допомагає отримати інформацію про маршрут без навігації - router.resolve('/home')

    //     Основні History API
    // back(): повернутися в історію, якщо можливо, так само, як router.go(-1) - router.back()
    // forward(): Перейти вперед в історії, якщо можливо, так само, як router.go(1) - router.forward()
    // go(): переміщення вперед або назад по історії без ієрархічних обмежень, які застосовуються в router.back() і router.forward() - router.go(3)
    // push(): Програмно перейдіть до нової URL-адреси, натиснувши запис у стеку історії. Рекомендується використовувати замість нього.navigateTo - router.push({ path: "/home" })
    // replace(): Програмний перехід до нової URL-адреси шляхом заміни поточного запису в стеку історії маршрутів. Рекомендується використовувати замість нього.navigateTo - router.replace({ hash: "#bio" })

    //     Основні допоміжні методи
    // afterEach(): викликається після кожної навігації - router.afterEach((to, from) => { console.log('afterEach', to, from); })
    // beforeEach (): викликається перед кожною навігацією - router.beforeEach((to, from) => { console.log('beforeEach', to, from); })
    // beforeResolve (): викликається перед кожною навігацією, але після обробки всіх асинхронних компонентів - router.beforeResolve((to, from) => { console.log('beforeResolve', to, from); })
    // В Nuxt краще використовувати defineNuxtRouteMiddleware(), але можна й напряму через useRouter().

    //     Обробка обіцянок і помилок
    // isReady() – повертає Promise, який вирішується, коли маршрутизатор завершив початкову навігацію. router.isReady().then(() => console.log('Маршрутизатор готовий!'))
    // onError() – дозволяє відловлювати не перехоплені помилки, які можуть виникнути під час навігації. router.onError((error) => console.error('Помилка:', error))

    const router = useRouter();
    console.log(' >>> useRouter', router);
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRuntimeConfig – доступ до конфігурації під час виконання, дозволяє отримувати глобальні змінні конфігурації під час виконання, включаючи:
    // Приватні змінні (доступні лише на сервері)
    // Публічні змінні (доступні як на сервері, так і на клієнті)
    const runtimeConfig = useRuntimeConfig();
    console.log(' >>> useRuntimeConfig', runtimeConfig); // { public: { ... }, private: { ... } }
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useRuntimeHook — це композиційна функція (composable), яка дозволяє реєструвати та автоматично очищати хуки під час життєвого циклу компонента.
    //     Деякі доступні хуки для useRuntimeHook, Ви можете передати будь-який з Runtime Nuxt Hooks:
    // app:created	Викликається, коли Nuxt застосунок створено
    // page:start	Коли починається завантаження сторінки
    // page:finish	Коли сторінка завантажена
    // link:prefetch	Коли Nuxt починає попереднє завантаження (prefetch) посилання
    // error:created	Викликається, коли створюється помилка
    // render:context	Викликається під час SSR, щоб модифікувати контекст рендерингу
    // ------------------------------------------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useLoadingIndicator це хук, який допомагає відображати індикатор завантаження під час виконання асинхронних операцій,
    // таких як HTTP-запити або завантаження даних.
    const {
        error: errorIndicator,
        isLoading: isLoadingIndicator,
        progress: progressIndicator,
        clear: clearIndicator,
        finish: finishIndicator,
        set: setIndicator,
        start: startIndicator,
    } = useLoadingIndicator({
        duration: 2000, // Тривалість панелі завантаження в мілісекундах (за замовчуванням 2000).
        throttle: 200, // Придушення появи та приховування за мілісекунди (за замовчуванням 200).
        // This is how progress is calculated by default
        // estimatedProgress: (duration, elapsed) => (2 / Math.PI) * 100 * Math.atan(((elapsed / duration) * 100) / 50),
    });
    console.log('progressIndicator', progressIndicator);

    // ✅ useAsyncData – це вбудований хук у Nuxt 3, який допомагає отримувати та керувати асинхронними даними у ваших компонентах.
    const { data, status, error, refresh, execute, clear } = await useAsyncData(
        'postId-useAsyncData', // Унікальний ключ
        async () => {
            try {
                startIndicator({ force: true });
                const response = await $fetch<{ id: number; title: string; body: string }>(
                    `https://jsonplaceholder.typicode.com/posts/${postID.value}`,
                );
                return response || null; // Переконуємось, що повертається правдиве значення
            } catch (error) {
                console.error('Error:', error);
            } finally {
                finishIndicator();
            }
        },
        {
            default: undefined, // Початкове значення (якщо не задано — undefined) +
            lazy: false, // Виконує запит одразу після виклику +
            immediate: true, // Запускається автоматично +
            server: true, // Виконується на сервері (SSR) +
            pick: undefined, // Всі дані повертаються без фільтрації +
            watch: [postID], // Не слідкує за змінами +
            deep: false, // Глибоке слідкування вимкнене +
            transform: data => data, // Не змінює отримані дані +
            getCachedData: undefined, // Використовує стандартний кеш Nuxt +
            dedupe: 'cancel', // Запобігає дублюванню запитів (cancel, defer) +
        },
    );
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useLazyAsyncData() — useLazyAsyncData — це версія useAsyncData, яка не запускається автоматично, а тільки після взаємодії користувача або виклику refresh().
    // різниця між useLazyAsyncData та useAsyncData в параметрах lazy та immediate
    // const { data, status, error, refresh, execute, clear } = await useLazyAsyncData( key, handler, options );
    const useLazyAsyncDataMethod = await useLazyAsyncData(
        'postId-useLazyAsyncData', // Унікальний ключ
        async () => {
            const response = await $fetch<{ id: number; title: string; body: string }>(`https://jsonplaceholder.typicode.com/posts/${postID.value}`);
            return response || null; // Переконуємось, що повертається правдиве значення
        },
        {
            server: true, // Виконувати на сервері (SSR)
            // lazy: true, // запит виконується вручну (за замовчуванням lazy: true)
            default: () => ({ title: 'Завантаження...', body: '' }), // Початкове значення
            transform: data => ({
                ...data,
                transformed: true, // Додатковий оброблений параметр
            }),
            pick: ['id', 'title'], // Вибираємо лише певні поля
            watch: [postID], // Перезапускати при зміні postID
            immediate: false, // потрібен refresh() (за замовчуванням immediate: false)
            deep: false, // Чи стежити за вкладеними змінами в watch
        },
    );
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useFetch() — це обгортка для fetch(), яка забезпечує реактивне завантаження даних у Nuxt.
    // Якщо дані критично необхідні для рендерингу сторінки → useFetch
    // const { data, status, error, refresh, execute, clear } = useFetch(url, options);
    const fetchData = await useFetch<{ id: number; title: string; body: string }>(`https://jsonplaceholder.typicode.com/posts/${postID.value}`, {
        key: `postId-useFetch`, // Унікальний ключ
        headers: {
            Authorization: `Bearer ${useCookie('username').value}`,
        },
        // body: {},
        method: 'GET',
        query: { param1: 'value1', param2: 'value2' },
        cache: 'default', // default, no-store, reload, no-cache, force-cacheі only-if-cached
        server: true, // Виконувати на сервері (SSR)
        lazy: false, // Завантажувати негайно, а не відкладати
        pick: ['id', 'title'], // Вибираємо лише певні поля
        watch: [postID], // Перезапускати при зміні postID
        immediate: true, // Виконати запит одразу після створення
        deep: false, // Чи стежити за вкладеними змінами в watch
        // default використовується для визначення значення за замовчуванням, яке буде повернуте, якщо запит не вдається
        default: () => ({ id: 1, title: 'Завантаження...', body: '' }), // Початкове значення
        // transform дозволяє змінювати або обробляти отримані дані перед їх поверненням
        transform: data => ({
            ...data,
            transformed: true, // Додатковий оброблений параметр
        }),
        // подія, яка спрацьовує перед відправкою запиту.
        async onRequest({ request, options }) {
            // Log request
            console.log('onRequest >>> [request, options]', request, options);

            // Add `?t=1640125211170` to query search params
            options.query = options.query || {};
            options.query.t = new Date();
        },
        // Викликається, якщо сталася помилка при відправці запиту.
        async onRequestError({ request, options, error }) {
            // Handle the request errors
            console.log('onRequestError >>> [request, options, error ]', request, options, error);
        },
        // 	Викликається при отриманні відповіді.
        async onResponse({ request, response, options }) {
            // Process the response data
            console.log('onResponse >>> [request, response, options ]', request, response, options);
            // localStorage.setItem('token', response._data.token);
        },
        // Викликається, якщо відповідь містить помилку.
        async onResponseError({ request, response, options }) {
            // Handle the response errors
            console.log('onResponseError >>> [request, response, options ]', request, response, options);
        },
    });
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useLazyFetch() — це обгортка для fetch(), яка забезпечує реактивне завантаження даних у Nuxt.
    // Якщо дані можуть знадобитися пізніше або не знадобитися взагалі → useLazyFetch.
    // різниця між useLazyFetch та useFetch в параметрах lazy та immediate
    // const { data, status, error, refresh, execute, clear } = useFetch(url, options);

    const fetchLazyData = await useLazyFetch<{ id: number; title: string; body: string }>(
        `https://jsonplaceholder.typicode.com/posts/${postID.value}`,
        {
            key: 'postId-useLazyFetch', // Унікальний ключ
            headers: {
                Authorization: `Bearer ${useCookie('username').value}`,
            },
            // body: {},
            method: 'GET',
            query: { param3: 'value3', param4: 'value4' },
            cache: 'default', // default, no-store, reload, no-cache, force-cacheі only-if-cached
            server: true, // Виконувати на сервері (SSR)
            // lazy: true, // Завантажувати негайно, а не відкладати
            pick: ['id', 'title'], // Вибираємо лише певні поля
            watch: [postID], // Перезапускати при зміні postID
            immediate: false, // Виконати запит одразу після створення
            deep: false, // Чи стежити за вкладеними змінами в watch
            // default використовується для визначення значення за замовчуванням, яке буде повернуте, якщо запит не вдається
            default: () => ({ id: 1, title: 'Завантаження...', body: '' }), // Початкове значення
            // transform дозволяє змінювати або обробляти отримані дані перед їх поверненням
            transform: data => ({
                ...data,
                transformed: true, // Додатковий оброблений параметр
            }),
            // подія, яка спрацьовує перед відправкою запиту.
            async onRequest({ request, options }) {
                // Log request
                console.log('onRequest >>> [request, options]', request, options);

                // Add `?t=1640125211170` to query search params
                options.query = options.query || {};
                options.query.t = new Date();
            },
            // Викликається, якщо сталася помилка при відправці запиту.
            async onRequestError({ request, options, error }) {
                // Handle the request errors
                console.log('onRequestError >>> [request, options, error ]', request, options, error);
            },
            // 	Викликається при отриманні відповіді.
            async onResponse({ request, response, options }) {
                // Process the response data
                console.log('onResponse >>> [request, response, options ]', request, response, options);
                // localStorage.setItem('token', response._data.token);
            },
            // Викликається, якщо відповідь містить помилку.
            async onResponseError({ request, response, options }) {
                // Handle the response errors
                console.log('onResponseError >>> [request, response, options ]', request, response, options);
            },
        },
    );
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useCookie – це функція, яка дозволяє працювати з HTTP куками на стороні клієнта та сервера в
    const counter = useCookie('counter', {
        default: () => 1,
        watch: true,
    });
    watch(
        counter,
        () => {
            console.log('counter', counter.value);
        },
        { immediate: true },
    );

    // При введенні тексту cookie оновлюється автоматично.
    // Якщо перезавантажити сторінку, поле заповниться з cookie.
    const username = useCookie('username', { default: () => 'vavan', watch: true });
    // theme.value = 'dark' оновлює і змінну, і cookie у браузері.
    // watch: true гарантує автоматичне оновлення.
    const theme = useCookie('theme', { default: () => 'light', watch: true });

    console.log('theme.value', theme.value); // 'light' (якщо cookie ще немає)
    theme.value = 'dark'; // Автоматично змінює cookie
    console.log('document.cookie', document.cookie); // 'theme=dark'
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useError composable повертає глобальну помилку Nuxt,
    const errors = useError();
    function throwError() {
        errors.value = {
            statusCode: 404,
            statusMessage: 'Сторінку не знайдено',
            fatal: false,
            unhandled: false,
            toJSON: () => ({ statusCode: 404, statusMessage: 'Сторінку не знайдено', message: 'Сторінку не знайдено' }),
            name: 'Error',
            message: 'Сторінку не знайдено',
        };
    }
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useSeoMeta — це Nuxt-композиційний API для налаштування SEO-метатегів з повною підтримкою TypeScript.
    // Коли використовувати - Коли потрібно просте та безпечне керування SEO мета-тегами без необхідності додавати інші теги (script, link, style).
    // Використовуй useSeoMeta для простого SEO (безпечніше та легше).
    useSeoMeta({
        title: 'Мій сайт',
        description: 'Опис мого сайту',
        ogTitle: 'Мій сайт',
        ogDescription: 'Опис для соцмереж',
        ogImage: 'https://example.com/image.jpg',
        twitterCard: 'summary_large_image',
    });
    // Для кращої продуктивності ви можете обернути свої useSeoMeta виклики в умову лише для сервера, коли мета-теги не повинні бути реактивними:
    if (import.meta.server) {
        // These meta tags will only be added during server-side rendering
        useSeoMeta({
            robots: 'index, follow',
            description: 'Static description that does not need reactivity',
            ogImage: 'https://example.com/image.png',
            // other static meta tags...
        });
    }

    const dynamicTitle = ref('My title');
    // Only use reactive meta tags outside the condition when necessary
    useSeoMeta({
        title: () => dynamicTitle.value,
        ogTitle: () => dynamicTitle.value,
    });
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useState - композиційний API, який дозволяє створювати реактивний стан, що підтримує серверний рендеринг (SSR).
    //  Це зручний спосіб для зберігання і управління станом, автоматично синхронізується між сервером і клієнтом, підтримує серіалізацію для відправки даних між ними.
    // const count = useState('counter', () => Math.round(Math.random() * 100));
    // console.log('useState', count.value); //  // { value: 42 } (значення зберігається в state)
    const useStates = useState();
    console.log('useState', useStates);

    // ✅
    // Створення реактивного стану з початковим значенням випадкового числа
    const count = useState<number>('randomNumber', () => Math.round(Math.random() * 100));

    // Функція для генерації нового випадкового числа
    const generateRandomNumber = () => {
        count.value = Math.round(Math.random() * 100);
        console.log('useState', count.value);
    };
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useHead() — використовується для зміни мета-тегів сторінки, заголовка (title), або додавання нових link, meta та script елементів у <head> документа.
    // додає або змінює мета-теги динамічно в будь-якому компоненті.
    //  Коли використовувати - Коли потрібно більше контролю, наприклад, додати script або link, Коли потрібно динамічно оновлювати мета-теги в реальному часі
    // Використовуй useHead, якщо потрібно додати скрипти, стилі, favicon тощо.
    const title = ref('My title');

    useHead({
        // Динамічний заголовок сторінки
        title: 'Головна сторінка',
        titleTemplate: title => (title ? `${title} | Мій сайт` : 'Мій сайт'),
        // Базовий шлях для всіх відносних URL
        base: { href: '/' },
        // Мета-дані
        meta: [
            { name: 'description', content: `This is a description for the ${title.value} page` },
            { property: 'og:title', content: 'Головна сторінка' },
            { property: 'og:description', content: 'Опис для соцмереж' },
            { property: 'og:image', content: 'https://example.com/og-image.jpg' },
        ],
        // Додаємо посилання (наприклад, фавікон)
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' },
            { rel: 'stylesheet', href: 'https://example.com/styles.css' },
        ],
        // Стилі, які додаються безпосередньо у <head>
        style: [{ innerHTML: `body { background-color: #f4f4f4; }` }],
        // Підключення JavaScript-скриптів
        script: [{ src: 'https://example.com/script.js', async: true }, { innerHTML: `console.log('Hello from inline script');` }],
        // Додаємо <noscript> контент (для користувачів без JS)
        noscript: [{ innerHTML: 'Для коректної роботи сайту потрібен JavaScript' }],
        // Атрибути для <html> тега
        htmlAttrs: {
            lang: 'uk',
            class: 'dark-mode',
        },
        // Атрибути для <body> тега
        bodyAttrs: {
            class: 'custom-body-class',
        },
    });
    // ------------------------------------------------------------------------------------------------------------------------

    // ✅ useHeadSafe() — працює аналогічно useHead, але він запобігає конфліктам під час SSR (Server-Side Rendering), блокує потенційно небезпечні скрипти
    // Повністю XSS-безпечний, додає мета-теги, якщо їх ще немає, не змінюючи вже встановлені, Менше можливостей (наприклад, не можна додати <script> з innerHTML
    // Коли використовувати - Коли потрібен повний контроль над <head>, але без ризику XSS, Коли є ризик вставки небезпечного контенту від користувача
    // Використовуй useHeadSafe, якщо потрібно повний контроль, але без XSS-уразливостей.
    useHeadSafe({
        title: 'Безпечний заголовок',
        titleTemplate: title => (title ? `${title} | Мій сайт` : 'Мій сайт'),
        meta: [
            { name: 'description', content: 'Це опис для SEO' },
            { property: 'og:title', content: 'Безпечний заголовок для соцмереж' },
        ],
        link: [{ rel: 'icon', href: '/favicon.ico' }],
        // script: [{ src: 'https://example.com/script.js', async: true }],
        htmlAttrs: {
            lang: 'en',
        },
        bodyAttrs: {
            class: 'safe-body',
        },
    });
    // ------------------------------------------------------------------------------------------------------------------------
    // ✅ Запустіть задану функцію або блок коду один раз під час SSR або CSR.
    // Функція callOnce призначена для виконання даної функції або блоку коду лише один раз протягом:
    // рендеринг на стороні сервера, але не гідратація
    // навігація на стороні клієнта
    await callOnce(
        async () => {
            console.log('This will only be logged once and then on every client side navigation');
        },
        { mode: 'navigation' },
    );
    // ------------------------------------------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------------------------------------------
</script>

<template>
    <section>
        <h1>test_api_composables</h1>
        <h1>Випадкове число</h1>
        <p>Число: {{ count }}</p>
        <button @click="generateRandomNumber">Генерувати нове число</button>

        <p>progressIndicator: {{ progressIndicator }}</p>
        <p>isLoadingIndicator: {{ isLoadingIndicator }}</p>
        <!-- <NuxtErrorBoundary> – використовується для обробки помилок у компонентах. Він дозволяє перехоплювати помилки, відображати користувацьке повідомлення
            та відновлювати роботу без перезавантаження сторінки. -->
        <NuxtErrorBoundary>
            <template #errors="{ error, clearError }">
                <div>
                    <h2>Помилка: {{ error.message }}</h2>
                    <button @click="clearError">Очистити</button>
                </div>
            </template>

            <button @click="throwError">Викликати помилку</button>
        </NuxtErrorBoundary>

        <div>
            <input
                v-model="username"
                placeholder="Введіть ім'я"
            />
            <h1>Counter: {{ counter || '-' }}</h1>
            <button @click="counter = 0">reset</button>
            <button @click="counter--">-</button>
            <button @click="counter++">+</button>
        </div>
        <div>
            <p v-if="status !== 'success'">Завантаження... {{ status }}</p>
            <p v-else-if="error">Помилка: {{ error.message }}</p>
            <p v-else>data: {{ data }}</p>
            <button @click="refresh()">Оновити useAsyncData</button>
            <button @click="useLazyAsyncDataMethod.refresh()">Оновити useLazyAsyncDataMethod</button>
            <button @click="clear()">Очистити</button>
            <button @click="postID++">postID++</button>
        </div>
        <h1>test_api_components</h1>

        <!-- <ClientOnly> — це обгортка для компонентів, які повинні рендеритися тільки на клієнті (тобто в браузері), -->
        <ClientOnly fallbackTag="span">
            <template #fallback>
                <!-- this will be rendered on server side -->
                <p>Loading comments...</p>
            </template>

            <slot name="fallbackClient">
                <!-- this will be rendered on client side -->
                <p>Loading comments...</p>
            </slot>
            <input
                type="text"
                ref="nuxtWelcomeRef"
            />
        </ClientOnly>

        <!-- DevOnly — це утиліта, яка дозволяє виконувати код тільки в режимі розробки (dev), а в продакшені (production) його ігнорувати. -->
        <DevOnly :route="route">
            <slot name="fallbackDev"> </slot>
        </DevOnly>

        <!-- NuxtClientFallback — це компонент, який дозволяє відображати серверний контент у випадку, якщо клієнтський рендеринг не спрацює. -->
        <NuxtClientFallback fallback-tag="span">
            <Broken />
            <template #fallback>
                <!-- this will be rendered on server side if the default slot fails to render in ssr -->
                <p>Broken</p>
            </template>
        </NuxtClientFallback>

        <!-- NuxtPicture — це компонент із модуля @nuxt/image, який дозволяє автоматично оптимізувати зображення, конвертувати їх у WebP/AVIF та додавати lazy loading. -->
        <NuxtPicture
            src="/girl.png"
            format="webp"
            quality="80"
            width="100"
            height="100"
            alt="girl"
        />
        <!-- Різниця:
            NuxtPicture — додає picture тег + source для адаптивного завантаження
            NuxtImg — просто оптимізований img -->
        <!-- Якщо вам потрібен просто img, використовуйте NuxtImg: -->
        <NuxtImg
            src="/girl.png"
            width="400"
            height="300"
            alt="girl"
        />

        <!-- <Teleport> — це спеціальний Vue-компонент, який дозволяє рендерити контент в інше місце DOM-дерева, незалежно від його розташування в шаблоні. -->
        <button @click="SSROpen = true">SSROpen Modal</button>
        <!-- SSR Teleport -->
        <Teleport to="#teleports">
            <div
                v-if="SSROpen"
                class="modal"
            >
                <p>Hello from the modal! SSR Teleport</p>
                <button @click="SSROpen = false">Close</button>
            </div>
        </Teleport>

        <button @click="ClientOpen = true">ClientOpen Modal</button>
        <!-- Client Teleport -->
        <ClientOnly>
            <!-- <ClientOnly> — це обгортка для компонентів, які повинні рендеритися тільки на клієнті (тобто в браузері), -->
            <Teleport to="#some-selector">
                <div
                    v-if="ClientOpen"
                    class="modal"
                >
                    <p>Hello from the modal! Client Teleport</p>
                    <button @click="ClientOpen = false">Close</button>
                </div>
            </Teleport>
        </ClientOnly>

        <!-- Nuxt надає компонент <NuxtLayout> для відображення макетів на сторінках -->
        <NuxtLayout
            :name="layout"
            ref="refLayout"
        >
            <select v-model="layout">
                <option value="default">Default Layout</option>
                <option value="custom">Custom Layout</option>
            </select>
        </NuxtLayout>

        <!-- Nuxt надає компонент <NuxtLink> для обробки будь-яких посилань у вашій програмі. -->
        <NuxtLink :to="{ name: 'posts-id', params: { id: 123 } }"> Post 123 </NuxtLink><br />

        <!-- Для статичних файлів у /public каталозі, таких як PDF-файли або зображення, використовуйте external prop -->
        <NuxtLink
            to="/example-report.pdf"
            external
        >
            Download Report
        </NuxtLink>
        <br />

        <!-- для переходу на іншу програму в тому самому домені, використовуємо external prop -->
        <NuxtLink
            to="/another-app"
            external
        >
            Go to Another App
        </NuxtLink>
        <br />

        <NuxtLink
            to="/about"
            target="_blank"
            >About page</NuxtLink
        >
        <br />
        <!-- <NuxtIsland> – дозволяє рендерити окремі частини сторінки на клієнті, зберігаючи при цьому статичне або серверний рендеринг для решти сторінки. -->
        <NuxtIsland
            @error="handleError"
            ref="island"
            name="AppButton"
            :props="{ user: 'John' }"
            :lazy="true"
            tag="section"
        >
            <template #fallback>
                <div>Завантаження...</div>
            </template>
            <AppButton />
        </NuxtIsland>
        <button @click="refreshIsland">Оновити острів</button>
    </section>
</template>

<style></style>
