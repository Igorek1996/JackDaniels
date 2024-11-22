<script setup lang="ts">
import IconShoppingCart from './icons/IconShoppingCart.vue';
import IconTimer from './icons/IconTimer.vue';
import TheNotification from './TheNotification.vue';
import { ref, computed, onMounted } from 'vue';

const totalTime = ref(8 * 60);
const isTimerFinished = ref(false);

const formattedTime = computed(() => {
  const minutes = Math.floor(totalTime.value / 60);
  const seconds = totalTime.value % 60;

  return minutes > 0
    ? `${minutes}M:${String(seconds).padStart(2, '0')}`
    : `${seconds}S`;
});

const startCountdown = () => {
  const interval = setInterval(() => {
    if (totalTime.value > 0) {
      totalTime.value--;
    } else {
      clearInterval(interval);
      isTimerFinished.value = true;
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

</script>

<template>
  <header>
    <div class="max-h-screen overflow-hidden duration-200" :class="{ 'notification-active': isTimerFinished }">
      <TheNotification class="px-4">
        <IconTimer />
        <p class="text-black">
          You only have <strong id="timer">{{ formattedTime }}, </strong> to participate.
        </p>
      </TheNotification>
    </div>

    <div class="container mx-auto px-4">
      <div class="grid grid-cols-[104px_1fr_104px] gap-2.5 py-3">
        <div class="flex items-center"></div>
        <div class="flex items-center justify-center gap-2.5">
          <a href="/">
            <picture>
              <source srcset="../assets/images/logo.avif" type="image/avif">
              <source srcset="../assets/images/logo.webp" type="image/webp">
              <source srcset="../assets/images/logo.png" type="image/png">

              <img src="../assets/images/logo.png" width="130px" height="48px" alt="logo">
            </picture>
          </a>
        </div>
        <div class="flex justify-end items-center gap-2.5">
          <a href="#" class="">
            <IconShoppingCart />
          </a>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 border-y border-whiteTransparent ">
      <div class="flex items-center justify-between gap-1.5 text-xs leading-loose uppercase -mx-[5px] py-2">
        <p>Loyalty program</p>
        <p>2 June 2024</p>
      </div>
    </div>
  </header>
</template>

<style>
.notification-active {
  @apply max-h-0;
}
</style>
