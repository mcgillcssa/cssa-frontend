<template>
    <div class="carousel">
      <slot :currentSlide="currentSlide" />
    </div>

    <div class="navigate">
      <div class="toggle-page left">
        <fa :icon="['fas', 'chevron-left']" size="3x" class="i" @click.stop="prevSlide"/>
      </div>
      <div class="toggle-page right">
        <fa :icon="['fas', 'chevron-right']" size="3x" class="i" @click.stop="nextSlide"/>
      </div>
    </div>
  </template>
  
<script>
import { ref, onMounted } from "vue"
export default {
  setup() {
    const currentSlide = ref(1);
    const getSlideCount = ref(null);

    const nextSlide = () => {
      if (currentSlide.value === getSlideCount.value){
        currentSlide.value = 1;
      }
      currentSlide.value += 1;
    }

    const prevSlide = () => {
      if (currentSlide.value === 1){
        currentSlide.value = 1;
        return;
      }
      currentSlide.value -= 1;
    }

    onMounted(() => {
      getSlideCount.value = document.querySelectorAll('.slide').length;
      console.log(getSlideCount.value);
    });
    return {currentSlide, nextSlide, prevSlide}
    
  }
};
</script>

<style>
  .navigate {
    padding: 0 16px;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .toggle-page {
    display: flex;

    flex: 1;
  }

  .right {
    justify-content: flex-end;
  }

  .i {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .i:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
</style>
  