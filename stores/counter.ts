export const initialData = defineStore('initialData', () => {
    const data = {
        name: 'vavan',
        age: 44,
        weight: 66,
    };

    return { data };
});

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0);

    const increment = () => {
        count.value++;
    };

    return { count, increment };
});

export const useDoubleCounterStore = defineStore('doubleCounter', () => {
    const singleCount = ref(0);
    const doubleCount = computed(() => singleCount.value * 2);

    const increment = () => {
        singleCount.value++;
    };
    const decrement = () => {
        singleCount.value--;
    };

    return { singleCount, doubleCount, increment, decrement };
});
