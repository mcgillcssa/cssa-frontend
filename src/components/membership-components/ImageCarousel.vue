<!-- eslint-disable no-unused-vars -->
<template>
  <div class="carousel">
    <button class="control previous" @click="previous">Previous</button>
    <img :src="images[currentImage]" alt="" />
    <button class="control next" @click="next">Next</button>
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
export default {
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
  justify-content: center;
  align-items: center;
}

.carousel img {
  max-width: 100%;
  height: auto;
}

.control {
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
}

.previous {
  left: 10px;
}

.next {
  right: 10px;
}

.slide-selector {
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Updated .selector class */
.selector {
  height: 4px; /* Make the line thicker */
  width: 20px;
  margin: 0 5px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  transition: width 0.3s ease, border-radius 0.3s ease; /* Added border-radius transition */
  border-radius: 2px; /* Make the ends rounded */
}

.selector.active {
  width: 40px;
  background-color: rgb(191, 149, 231);
  border-radius: 2px; /* Keep the ends rounded when active */
}
</style>
