// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    components: true,

    ssr: false,
    // ssr: true,

    // У файлі nuxt.config можна налаштувати повністю введені зміни для кожного середовища
    $production: {
        routeRules: {
            '/**': { isr: true },
        },
    },

    $development: {
        //
    },

    $env: {
        staging: {
            //
        },
    },

    vite: {
        css: {
            preprocessorMaxWorkers: true, // number of CPUs minus 1
        },
    },

    // задаємо глобальні стилі, препроцесори і css бібліотеки
    css: ['~/assets/css/main.css', 'animate.css', '~/assets/scss/main.scss'],

    // додаємо  зовнішні таблиці стилів
    // Зовнішні таблиці стилів є ресурсами, які довше завантажуються: вони мають бути завантажені та оброблені до того, як браузер відобразить сторінку
    // app: {
    // head: {
    // link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }],
    // },
    // },
    runtimeConfig: {
        // runtimeConfig: використовується для надання приватних або загальнодоступних даних, які потрібно вказати після збірки за допомогою змінних середовища.
        // опції можна перевизначити за допомогою змінних середовища
        // Приватні ключі, доступні лише на сервері
        apiSecret: 'secret', // Доступно лише на сервері
        // Ключі в межах public також доступні на стороні клієнта
        public: {
            apiBase: '', // Доступно і на клієнті, і на сервері
        },
    },

    future: {
        compatibilityVersion: 4,
    },

    experimental: {
        clientFallback: true,
        crossOriginPrefetch: true,
        componentIslands: 'local+remote', // Дозволяє локальні та віддалені острівці (islands)
    },

    // https://google-fonts.nuxtjs.org/getting-started/setup
    modules: [
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Roboto: true,
                    Inter: [400, 700],
                    'Josefin+Sans': true,
                    Lato: [100, 300],
                    Raleway: {
                        wght: [100, 400],
                        ital: [100],
                    },
                },
            },
        ],
        '@pinia/nuxt',
        './modules/module',
        'nuxt-auth-utils',
        '@nuxt/image',
    ],

    image: {
        dir: 'assets/img', // Вказує, де шукати зображення
        // provider: 'static', // Використовує прямий шлях без IPX
    },

    plugins: ['~/plugins/directives/focus'],

    build: {
        transpile: ['@vue/reactivity'],
    },

    // Якщо весь ваш CSS вбудовано в Nuxt, ви можете (експериментально) повністю припинити посилання на зовнішні файли CSS у вашому відтвореному HTML
    hooks: {
        'build:manifest': manifest => {
            // find the app entry, css list
            const css = Object.values(manifest).find(options => options.isEntry)?.css;
            if (css) {
                // start from the end of the array and go to the beginning
                for (let i = css.length - 1; i >= 0; i--) {
                    // if it starts with 'entry', remove it from the list
                    if (css[i]?.startsWith('entry')) css.splice(i, 1);
                }
            }
        },
    },

    // Встановлюємо конфігурацію head яка є статичною, динамічну конфігурацію можна встановити в app.vue у методі useHead (він має пріоритет)
    // або через /server/plugins/extend-html хук
    // Доцільно встановлювати тут теги, які не змінюватимуться, наприклад назву сайту за умовчанням, мову та піктограму сайту, все інше у методі useHead в app.vue
    app: {
        head: {
            title: 'Nuxt', // default fallback title
            htmlAttrs: {
                lang: 'en',
            },
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
        // Ви можете ввімкнути переходи сторінок, щоб застосувати автоматичний перехід для всіх ваших сторінок .
        layoutTransition: { name: 'layout', mode: 'out-in' },
        pageTransition: { name: 'page', mode: 'out-in' },

        // Ви можете глобально налаштувати ці назви переходів за замовчуванням
        // pageTransition: {
        //     name: 'fade', // fade, slide - назви класів css в app.vue
        //     mode: 'out-in', // default
        // },
        // layoutTransition: {
        //     name: 'slide',
        //     mode: 'out-in', // default
        // },

        // pageTransition і layoutTransition може бути вимкнено глобально для певного маршруту:
        // pageTransition: false,
        // layoutTransition: false
    },

    imports: {
        dirs: [
            // Scan top-level modules
            'composables',
            // ... or scan modules nested one level deep with a specific name and file extension
            'composables/*/*.{ts,js}',
            // 'composables/*/index.{ts,js}',
            // 'composables/*/utils.{ts,js}',
            // ... or scan all modules within given directory
            //   'composables/**'
        ],
    },

    router: {
        options: {
            scrollBehaviorType: 'smooth',
        },
    },

    // допомагає відлагоджувати код у браузері та Node.js.
    sourcemap: {
        // для розробки використовувати можна явно використовувати true
        server: true, // Увімкнути на сервері (Node.js)
        client: true, // Увімкнути у браузері
        // для прода використовувати false
        // server: false, // Увімкнути на сервері (Node.js)
        // client: false, // Увімкнути у браузері
    },
});
