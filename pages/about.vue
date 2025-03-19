<script setup lang="ts">
    // import { useCounterStore } from '@/stores/counter';
    // import { useDoubleCounterStore } from '@/stores/counter';
    // console.log(useCounterStore, useDoubleCounterStore);

    useHead({
        title: 'Про нас',
    });

    definePageMeta({
        pageTransition: {
            // name: 'rotate',
        },
    });
    // -------------------------------------- store ---------------------------------
    const counter = useState('counters', () => Math.round(Math.random() * 1000));
    const doubles = useState('double', () => Math.round(counter.value * 2));
    const sameCounter = useState('counters');
    setTimeout(() => {
        // Щоб глобально очистити всі кешовані стани
        // clearNuxtState('');
        // Щоб глобально очистити конкретний стан
        // clearNuxtState('double');
    }, 10000);
    // -------------------------------------- store ---------------------------------
    // -------------------------------------- pinia ---------------------------------
    const pinia = usePinia();
    const data = initialData();
    const piniaCounter = useCounterStore();
    const piniaDoubleCounter = useDoubleCounterStore();
    console.log('pinia', pinia);

    // коли вам потрібно отримати окремі посилання з store
    const { count } = storeToRefs(piniaCounter);
    const { singleCount, doubleCount } = storeToRefs(piniaDoubleCounter);
    console.log('>>>>>>>>>>', data, count.value, singleCount.value, doubleCount.value);

    // $subscribe Підписка на стан
    [piniaCounter, piniaDoubleCounter].forEach(el =>
        el.$subscribe((mutation: any, state: any) => {
            console.log('$subscribe =>>> mutation, state', mutation, state);
            // зберігати весь стан у локальному сховищі щоразу, коли він змінюється
            // localStorage.setItem('cart', JSON.stringify(state))
        }),
    );

    // $onAction Підписка на дію
    // piniaDoubleCounter.$onAction(
    //     ({
    //         name, // назва дії
    //         store, // екземпляр сховища, те саме, що `someStore`
    //         args, // масив параметрів, переданих дії
    //         after, // хук після повернення або вирішення дії
    //         onError, // гачок, якщо дія відкидає або відхиляє
    //     }) => {
    //         console.log('$onAction =>>> store', store);

    //         // спільна змінна для цього конкретного виклику дії
    //         const startTime = Date.now();
    //         // це буде викликано перед виконанням дії на `store`
    //         console.log(`Старт "${name}" з параметрами [${args.join(', ')}].`);

    //         // це буде викликано, якщо дія завершиться вдало та після її повного виконання
    //         // це чекає на будь-яке повернення promise
    //         after(result => {
    //             console.log(`Завершення "${name}" після ${Date.now() - startTime}мс.\nРезультат: ${result}.`);
    //         });

    //         // це спрацює, якщо дія відкидає або повертає promise, який відхиляється
    //         onError(error => {
    //             console.warn(`Невдале виконання "${name}" після ${Date.now() - startTime}мс.\nПомилка: ${error}.`);
    //         });
    //     },
    // );
    // -------------------------------------- pinia ---------------------------------

    // Це корисно для коду, який має бути виконано лише один раз, наприклад для реєстрації події або встановлення глобального стану.
    const websiteConfig = useState('config');
    callOnce(async () => {
        console.log('This will only be logged once');
        websiteConfig.value = await $fetch('https://dummyjson.com/products/1');
    });

    const show = ref(false);
    const onHydrated = () => console.log('Component has been hydrated!');

    const navigate = () => {
        return navigateTo({
            path: '/secret',
            query: {
                name: 'secret',
                type: 'secret',
            },
        });
    };
</script>

<template>
    <section>
        <p>/about route.</p>

        <AppAlert :name="'AppAlert'"> This is an auto-imported component. </AppAlert>
        <img
            src="assets/img/girl.png"
            alt="/assets"
        />

        <h1 class="animate__animated animate__bounce">Привіт, Nuxt!</h1>
        <button class="animate__animated animate__pulse animate__infinite">Натисни мене</button>

        Counter: {{ counter }} Doubles: {{ doubles }} sameCounter: {{ sameCounter }}
        <button @click="counter++">+</button>
        <button @click="counter--">-</button>

        piniaCounter: {{ piniaCounter.count }} piniaDoubleCounter: {{ piniaDoubleCounter.singleCount }} : {{ piniaDoubleCounter.doubleCount }}

        <button @click="piniaCounter.increment">piniaCounter</button>
        <button @click="piniaDoubleCounter.increment">piniaDoubleCounter++</button>
        <button @click="piniaDoubleCounter.decrement">piniaDoubleCounter--</button>

        <p>{{ formatNumber(1234) }}</p>

        <LazyMountainsList
            hydrate-on-visible
            v-if="show"
        />
        <LazyMountainsList
            :hydrate-after="10000"
            @hydrated="onHydrated"
        />
        <button @click="show = !show">Show List</button>
        <button @click="navigate">redirect to secret</button>

        <!-- <LazyMountainsList v-if="isToggled" /> -->
    </section>
</template>

<style>
    @import url('~/assets/css/second.css');
    p {
        color: blue;
    }
</style>
