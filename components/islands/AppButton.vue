<script setup lang="ts">
    // Виконуємо код перед гідратацією
    //onPrehydrate— це комбінований хук життєвого циклу, який дозволяє запускати зворотний виклик на клієнті безпосередньо перед тим, як Nuxt гідратує сторінку.
    onPrehydrate(el => {
        console.log('🚀 Nuxt починає гідратацію!, el=>>', el);
        // Можна тут очистити кеш або підготувати дані
    });
</script>
<template>
    <button class="btn">island button</button>
</template>
