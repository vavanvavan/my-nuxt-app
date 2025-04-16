import { defineNuxtModule, installModule, addTemplate, addTypeTemplate, useLogger } from '@nuxt/kit';
import { value } from '#build/my-template';
import type { Message, APP_NAME, VERSION } from 'my-types';

// defineNuxtModule() Це основна функція для створення модулів:
export default defineNuxtModule({
    meta: {
        name: 'my-module',
        configKey: 'myModule',
    },
    defaults: {
        test: 'Hello from my module',
    },
    async setup(options, nuxt) {
        nuxt.hook('ready', async nuxt => {
            console.log('✅ Nuxt is ready');
        });

        nuxt.hook('build:before', () => {
            console.log('⚡ Nuxt починає збірку!');
        });

        nuxt.hook('close', () => {
            console.log('🛑 Nuxt зупиняється!');
        });

        // installModule() Використовується всередині модуля, щоб програмно встановити інші модулі:
        await installModule('@nuxtjs/google-fonts', {
            families: {
                Roboto: {
                    wght: [400],
                    fallbacks: ['Arial'],
                },
            },
        });

        console.log('Модуль запущено з опцією:', options.test);

        // Приклад: хук після ініціалізації всіх модулів
        nuxt.hook('modules:done', () => {
            console.log('Модулі готові!');
        });

        // ✅ addTemplate() — дозволяє створювати шаблони (файли) під час розробки або білду. Шаблони генеруються автоматично, потрапляють у .nuxt/ і можуть використовуватись у плагінах, компонентах, middleware тощо.

        addTemplate({
            filename: 'my-template.ts',
            getContents: () => `export const value = 42`,
            write: true, // запише фізично файл - my-template.ts у .nuxt/
        });
        // результат буде доступний у терміналі
        console.log(value); // Hello from template!

        //✅ addTypeTemplate() — дозволяє додати типізований шаблон, тобто .d.ts файл або будь-який інший файл з типами
        // запише фізично файл - types/my-types.d.ts
        addTypeTemplate({
            filename: 'types/my-types.d.ts',
            getContents: () => `
              declare module 'my-types' {
                export const value: number
                export type Message = 'hello' | 'world'
                export const APP_NAME: string
                export const VERSION: string
              }
            `,
        });

        // ✅ updateTemplates() — дозволяє перегенерувати шаблони, створені за допомогою addTemplate() або addTypeTemplate().
        // Вона корисна, коли шаблони залежать від змінного контенту (наприклад, даних із API, конфігів, тощо), і ти хочеш оновити їх динамічно.
        // ✅  useLogger — зручний спосіб логування у модулях за допомогою useLogger(), що працює через бібліотеку consola.
        const logger = useLogger('📦 my-module');

        logger.info('Модуль ініціалізовано!');
        logger.success('Усе пройшло успішно!');
        // logger.warn('Попередження: перевірте конфігурацію!');
        // logger.error('Помилка при запуску модуля!');
    },
});
