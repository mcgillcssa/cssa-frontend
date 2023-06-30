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
        <img class="event-image" :src="item.eventImageUrl" alt="Slide image" />
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
  padding: 20px;
}

.recent-events-title {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-size: 5vw;
}

.recent-events-title .en-title {
  font-size: 5vw;
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
  padding: 1rem;
  margin: 0 auto;
}

.carousel-item:nth-child(even) {
  flex-direction: row-reverse;
}

.carousel-item-content {
  width: 60%;
}

.carousel-item-content .event-heading h3 {
  font-size: 2vw;
}

.carousel-item-content .event-date {
  font-size: 2vw;
}

.carousel-item-content .event-description {
  font-size: 2vw;
}

.event-image {
  width: 40%;
  max-width: 800px;
}

@media (max-width: 1200px) {
  ::v-deep .carousel-item {
    flex-direction: column;
  }

  ::v-deep .carousel-item:nth-child(even) {
    flex-direction: column;
  }

  ::v-deep .carousel-item-content,
  ::v-deep .event-image {
    width: 100%;
  }

  ::v-deep .recent-events-title .zhs-title,
  ::v-deep .recent-events-title .en-title,
  ::v-deep .event-heading h3 {
    font-size: 1rem;
  }

  ::v-deep .event-date {
    font-size: 2rem;
  }

  ::v-deep .event-description {
    padding-left: 0rem;
    padding-right: 0rem;
  }
}

@media (min-width: 1201px) {
  ::v-deep .recent-events-title .zhs-title {
    font-size: 1em;
  }

  ::v-deep .recent-events-title .en-title {
    font-size: 1.75em;
  }

  ::v-deep .event-heading h3 {
    font-size: 4rem;
  }

  ::v-deep .event-date {
    font-size: 6rem;
  }

  ::v-deep .event-description {
    padding-left: 7rem;
    padding-right: 5rem;
  }
}
</style>
