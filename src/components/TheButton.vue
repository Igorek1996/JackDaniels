<template>
  <button class="flex justify-center items-center px-7 gap-1.5 text-primary text-xs text-center uppercase leading-loose"
    :class="{
      'solid-btn': variant === 'solid',
      'outline-btn': variant === 'outline',
    }">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'solid',
    validator(value) {
      return ['solid', 'outline'].includes(value)
    }
  }
})

</script>


<style>
.solid-btn {
  @apply py-2.5 bg-primary border border-primary text-black font-bold w-full hover:bg-transparent hover:text-primary stroke-current stroke-2;

  stroke-linejoin: round;
  stroke-linecap: round;
}

.outline-btn {
  @apply py-1.5 hover:scale-105;

  border-image: url(../assets/images/border.png) 30 stretch;
  border-image-outset: 0 0 0 0;
  border-image-repeat: stretch stretch;
  border-image-slice: 18 10 18 10;
  border-image-width: 20px 10px 20px 10px;

}
</style>
