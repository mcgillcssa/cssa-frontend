<template>
  <div class="recent-events">
    <div class="recent-events-title">
      <div class="zhs-title">近期活动</div>
      <div class="en-title">RECENT EVENTS</div>
    </div>
    <div id="carousel">
      <div v-for="(item, index) in items" :key="index" class="carousel-item">
        <div class="carousel-item-content">
          <div class="event-heading">
            <h3>{{ item.eventName }}</h3>
            <span class="event-date">{{ item.eventStartDate }}</span>
          </div>
          <p class="event-description">{{ item.eventDescription }}</p>
        </div>
        <img :src="item.eventImageUrl" alt="Slide image" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: []
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
  height: auto;
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
  height: auto;
}

.carousel-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.5rem;
  padding: 1rem;
  margin: 0 auto; /* This will center the content */
  max-width: 60%; /* This will limit the width of the content to 80% of the parent element's width */
}

.carousel-item:nth-child(even) {
  flex-direction: row-reverse;
}

.carousel-item-content h3 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  padding-top: 3rem;
}

.event-heading {
  position: relative;
  left: 4rem;
}

.event-date {
  position: absolute;
  opacity: 0.5; /* makes the date half transparent */
  top: 0;
  left: 0;
  font-size: 6rem; /* adjust as needed */
}

.carousel-item img {
  width: 60%;
  max-width: 600px;
}

.event-description {
  padding-left: 7rem;
  padding-right: 5rem;
}
</style>
