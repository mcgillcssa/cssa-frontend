<!-- eslint-disable no-unused-vars -->
<template>
  <div class="carousel">
    <left-c
      class="control previous"
      theme="two-tone"
      size="48"
      :fill="['#FFF', '#9C71C6']"
      strokeLinejoin="miter"
      strokeLinecap="square"
      @click="previous"
    />
    <img :src="images[currentImage]" alt="" />
    <right-c
      class="control next"
      theme="two-tone"
      size="48"
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
      currentImage: 0
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
  width: 500px;
  height: 300px;
  object-fit: cover;
  display: block;
}

.control {
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.control:hover {
  transform: translateY(-50%) scale(1.2); /* Slightly increase size when hovering */
}

.control:active {
  transform: translateY(-50%) scale(0.9); /* Slightly decrease size when clicking */
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
  width: 20%;
  margin: 0 5px;
  background-color: rgb(255, 255, 255);
  border: #9c71c6 2px solid;
  cursor: pointer;
  transition: width 0.3s ease, border-radius 0.3s ease; /* Added border-radius transition */
  border-radius: 2px; /* Make the ends rounded */
}

.selector.active {
  width: 40%;
  background-color: #9c71c6;
  border-radius: 2px; /* Keep the ends rounded when active */
}
</style>
