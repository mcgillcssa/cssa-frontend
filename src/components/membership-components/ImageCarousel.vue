<!-- eslint-disable no-unused-vars -->
<template>
  <div class="carousel">
    <left-c
      class="control previous"
      :style="{
        top: `calc(50% - ${buttonSize / 2}px)`
      }"
      theme="two-tone"
      :size="buttonSize"
      :fill="['#FFF', '#9C71C6']"
      strokeLinejoin="miter"
      strokeLinecap="square"
      @click="previous"
    />
    <img :src="images[currentImage]" alt="" />
    <right-c
      class="control next"
      :style="{
        top: `calc(50% - ${buttonSize / 2}px)`
      }"
      theme="two-tone"
      :size="buttonSize"
      :fill="['#FFF', '#9C71C6']"
      strokeLinejoin="miter"
      strokeLinecap="square"
      @click="next"
    />
    <div class="slide-selector">
      <span
        class="selector"
        v-for="(image, index) in images"
        :key="index"
        :style="{
          width: index === currentImage ? `${activeSelectorWidth}%` : `${selectorWidth}%`
        }"
        :class="{ active: index === currentImage }"
        @click="goToImage(index)"
      ></span>
    </div>
  </div>
</template>

<script>
import { LeftC, RightC } from '@icon-park/vue-next'

export default {
  components: {
    LeftC,
    RightC
  },
  props: ['images'],
  data() {
    return {
      currentImage: 0,
      buttonSize: 48
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateButtonSize)
    this.updateButtonSize()
  },
  computed: {
    selectorWidth() {
      return 60 / (this.images.length + 1)
    },
    activeSelectorWidth() {
      return this.selectorWidth * 2
    }
  },
  methods: {
    next() {
      this.currentImage = (this.currentImage + 1) % this.images.length
    },
    previous() {
      this.currentImage = (this.currentImage + this.images.length - 1) % this.images.length
    },
    goToImage(index) {
      this.currentImage = index
    },
    updateButtonSize() {
      if (window.innerWidth < 600) {
        this.buttonSize = '36'
      } else {
        this.buttonSize = '48'
      }
    }
  }
}
</script>

<style scoped>
.carousel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.carousel img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  display: block;
}

.control {
  position: absolute;
  z-index: 1;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  cursor: pointer;
}

/* Apply hover effects only for devices that support hover */
@media (hover: hover) {
  .control:hover {
    transform: translateY(-50%) scale(1.2);
  }
}

.control:active {
  transform: translateY(-50%) scale(0.9);
}

.previous {
  left: 10px;
}

.next {
  right: 10px;
}

.slide-selector {
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 10px;
  background-color: #ffffff;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Updated .selector class */
.selector {
  height: 4px; /* Make the line thicker */
  margin: 0 5px;
  background-color: rgb(255, 255, 255);
  border: #9c71c6 2px solid;
  cursor: pointer;
  transition: width 0.3s ease, border-radius 0.3s ease; /* Added border-radius transition */
  border-radius: 2px; /* Make the ends rounded */
}

.selector.active {
  background-color: #9c71c6;
  border-radius: 2px; /* Keep the ends rounded when active */
}

@media (max-width: 600px) {
  .carousel img {
    max-height: 180px;
  }
}
</style>
