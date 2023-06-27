<template>
  <div class="recent-events">
    <div class="recent-events-title">
      <div class="zhs-title">近期活动</div>
      <div class="en-title">RECENT EVENTS</div>
    </div>
    <div id="carousel">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: index === currentIndex }"
        class="carousel-item"
      >
        <h3>{{ item.eventName }}</h3>
        <p>{{ item.eventDescription }}</p>
        <img :src="item.eventImageUrl" alt="Slide image" />
      </div>
      <div class="carousel-indicators">
        <span
          v-for="(item, index) in items"
          :key="index"
          @click="currentIndex = index"
          :class="{ active: index === currentIndex }"
          class="carousel-dot"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: [],
      currentIndex: 0
    }
  },

  async created() {
    try {
      const response = await axios.get('http://localhost:8080/api/events/upcoming/4')
      this.items = response.data.events
      console.log(response.data.events)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

.recent-events {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 750px;
  background: #fff;
  padding: 20;
}

.recent-events-title {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.recent-events-title .zhs-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  letter-spacing: 0.175em;
  line-height: 0.8em;
  color: #ff6c6c;
}

.recent-events-title .en-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 1.75em;
  line-height: 0.8em;
}

#carousel {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.carousel-item {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.carousel-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
}

.carousel-dot.active {
  background-color: #333;
}
</style>
