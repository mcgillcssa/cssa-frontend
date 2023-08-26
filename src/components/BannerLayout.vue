<template>
  <nav-bar />
  <div class="banner" :style="{ 'background-image': 'url(' + bannerSource + ')' }">
    <!-- <div class="banner-title">MEMBERSHIP</div> -->
    <div class="arrow-down">
      <arrow-down theme="filled" size="124" fill="#FFFFFF" strokeLinecap="butt" />
    </div>
    <div class="content-container">
      <div class="content"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import NavBar from './NavBar.vue'
import { ArrowDown } from '@icon-park/vue-next'

defineProps({
  bannerSource: String,
  bannerAlter: String
})
</script>

<style scoped>
.banner {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner-title {
  margin: 0;

  color: #ffffff;
  font-size: 90px;
  text-align: center;
}

.arrow-down {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  animation: pulse 3s infinite;
}

@keyframes pulse {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 0.7;
  }
  25% {
    transform: translateX(-50%) translateY(-10px) scale(1.02);
    opacity: 0.8;
  }
  40% {
    transform: translateX(-50%) translateY(-15px) scale(1.05);
    opacity: 0.9;
  }
  60% {
    transform: translateX(-50%) translateY(-10px) scale(1.02);
    opacity: 0.8;
  }
}
</style>
