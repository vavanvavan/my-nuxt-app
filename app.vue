<script setup lang="ts">
    const title = ref('Hello World');
    const description = ref('description');

    // https://unhead.unjs.io/
    // useHead Компонована функція підтримує реактивне введення, дозволяючи вам керувати тегами голови програмно
    useHead({
        title: 'Subscribe now!',
        // titleTemplate - динамічно встановлює назву вашого сайту в залежності від сторінки
        // titleTemplate(titleChunk: string | undefined) {
        //     return titleChunk ? `${titleChunk} - Site Title` : 'Site Title';
        // },

        htmlAttrs: {
            class: { dark: true, light: false },
        },
        bodyAttrs: {
            style: { overflow: 'hidden' },
            'data-modal': true,
        },
        link: [{ href: 'https://3p.com/subscribe.js', as: 'script' }],
        meta: [{ name: 'description', content: description }],
    });

    // useSeoMeta Composable дозволяє визначати метатеги SEO вашого сайту як об’єкт із повною безпекою типів.
    useSeoMeta({
        title: 'My Amazing Site',
        ogTitle: 'My Amazing Site',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    });

    const { id } = useRoute().params;

    const route = useRoute();
    const slug = route.params.slug; // Масив сегментів URL

    interface Product {
        title: string;
        description: string;
    }
    const { data, error } = await useFetch<Product>(`https://dummyjson.com/products/${id || 1}`, {
        pick: ['title', 'description'], // Мінімізуйте розмір корисного навантаження
    });

    watch: [id];

    // const { data, error, refresh } = useAsyncData('key', async () => {
    //     // асинхронна функція для отримання даних
    //     const response = await fetch(`https://dummyjson.com/products/${id || 1}`);
    //     const data = await response.json();
    //     return data;
    // });

    console.log(data.value, error.value);
    // ------------------------------- errors --------------------------------------
    const errors = useError(); // поверне глобальну помилку Nuxt, яка обробляється.
    console.log('>>>>>>>>>>>>>>>>>>', errors.value || 'no errors');

    if (errors.value) {
        console.error('An error occurred on pages:', useRoute().name, '===>>>', errors.value);
        // Ви можете використовувати `er
        //
        // ror.value` для відображення повідомлення про помилку або іншої інформації на UI.
    }

    // const datas = ref(null);

    // const fetchData = async () => {
    //     try {
    //         datas.value = await $fetch('/api/data'); // чи інший асинхронний запит
    //     } catch (e: any) {
    //         console.log(e);
    //         console.log(datas.value);

    //         errors.value = e;

    //         // або Створіть об’єкт помилки
    //         // createError() Створіть об’єкт помилки з додатковими метаданими
    //         throw createError({
    //             ...e,
    //             status: '...',
    //             message: '...',
    //             statusText: '...',
    //         });
    //     }
    // };

    // fetchData();

    // Компонент clearError очищає всі оброблені помилки.
    // clearError({ redirect: '/' })

    // ------------------------------- errors --------------------------------------

    // ------------------------------- composables --------------------------------------
    const foo = useFoo();
    const bar = useBar();
    console.log('foo, bar', foo.value, bar.value);

    // ------------------------------- composables --------------------------------------
</script>

<template>
    <Html>
        <!-- Nuxt надає вбудовані компоненти для мета даних: <Title>, <Base>, <NoScript>, <Style>, <Meta>, <Link>, <Body> -->
        <!-- <Head> і <Body> може приймати вкладені мета-теги -->
        <!-- Рекомендується обернути ваші компоненти або в <Head> компоненти або в <Html> -->
        <Head>
            <Title>{{ title }}</Title>
            <Meta
                name="description"
                :content="title"
            />
            <!-- <Style type="text/css"> body { background-color: green; } </Style> -->
            <Style></Style>
            <Link></Link>
        </Head>

        <Body>
            <NuxtRouteAnnouncer />
            <header>
                <nav>
                    <ul>
                        <li><NuxtLink to="/">Index</NuxtLink></li>
                        <li><NuxtLink to="/About">About</NuxtLink></li>
                        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
                        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
                        <li><NuxtLink to="/secret">secret</NuxtLink></li>
                    </ul>
                </nav>
            </header>

            <p>Параметри маршруту ( route.params.slug ): {{ slug }}</p>

            <!-- <NuxtLoadingIndicator> — це вбудований компонент у Nuxt 3, який показує індикатор завантаження при навігації між сторінками  -->
            <NuxtLoadingIndicator color="red" />
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </Body>
    </Html>
</template>

<style lang="scss">
    @use '~/assets/scss/main.scss';

    .page-enter-active,
    .page-leave-active {
        transition: all 0.4s;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.4s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }

    .slide-enter-active,
    .slide-leave-active {
        transition:
            transform 0.5s ease,
            opacity 0.5s ease;
    }
    .slide-enter-from {
        transform: translateX(-100%);
        opacity: 0;
    }
    .slide-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }

    .layout-enter-active,
    .layout-leave-active {
        transition: all 0.4s;
    }
    .layout-enter-from,
    .layout-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }

    .rotate-enter-active,
    .rotate-leave-active {
        transition: all 0.4s;
    }
    .rotate-enter-from,
    .rotate-leave-to {
        opacity: 0;
        transform: rotate3d(1, 1, 1, 15deg);
    }

    .bounce-enter-active,
    .bounce-leave-active {
        animation: bounce 0.6s ease;
    }

    @keyframes bounce {
        0% {
            transform: translateY(-50px);
            opacity: 0;
        }
        50% {
            transform: translateY(10px);
            opacity: 1;
        }
        100% {
            transform: translateY(0);
        }
    }

    .bounce-enter-from {
        transform: translateY(-50px);
        opacity: 0;
    }

    .bounce-leave-to {
        transform: translateY(50px);
        opacity: 0;
    }
</style>
