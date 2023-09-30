<template>
  <div class="carousel-container">
    <button @click="rotate(-1)">Left</button>
    <div class="carousel" :style="{ transform: `translateX(${translateX.value}%)` }">
      <div
        v-for="(item, index) in orderedItems"
        :key="index"
        :class="['carousel-item', { selected: index === 2 || index === 7 }]"
      >
        <img :src="item.eventImageUrl" alt="Slide image" />
      </div>
    </div>
    <button @click="rotate(1)">Right</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const items = ref([])
const translateX = ref(-100) // Start on the first clone

onMounted(async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/events/upcoming/5`)
    items.value = [...response.data.events] // Clone the array to avoid direct reference issues
    // Clone first and last items and add them to the array
    items.value.unshift(items.value[items.value.length - 1])
    items.value.push(items.value[1])
    console.log(items.value)
  } catch (err) {
    console.error(err)
  }
})

const rotate = direction => {
  // Turn off transition to make "teleportation" invisible
  if ((direction > 0 && translateX.value === -500) || (direction < 0 && translateX.value === 0)) {
    document.querySelector('.carousel').style.transition = 'none'
  }

  translateX.value -= 100 * direction

  // Check if we've moved to the clone at the end
  if (translateX.value <= -600) {
    translateX.value = -100 // Jump to the first real item
  }
  // Check if we've moved to the clone at the beginning
  else if (translateX.value >= 100) {
    translateX.value = -500 // Jump to the last real item
  }

  // Restore transition
  setTimeout(() => {
    document.querySelector('.carousel').style.transition = ''
  }, 50) // Short delay to ensure the "teleport" happens first
}

const orderedItems = ref(items.value)
</script>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: relative;
}

.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-out;
}

.carousel-item {
  flex: 1;
  transition: transform 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item img {
  max-height: 70%;
  transition: max-height 0.5s;
}

.carousel-item.selected img {
  max-height: 100%;
}
</style>
