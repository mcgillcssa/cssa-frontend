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
            <div style="event-heading-info">
              <span class="event-date">{{ formatDate(item.eventStartDate) }}</span>
              <h3 class="event-name">{{ item.eventName }}</h3>
            </div>
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

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}${day}`
    }
  },

  async created() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/events/upcoming/4`)
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
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
}

.recent-events-title .zhs-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 10em;
  letter-spacing: 0.175em;
  line-height: 0.8em;
  color: #ff6c6c;
}

.recent-events-title .en-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 800;
  font-size: 1.75em;
  line-height: 0.8em;
  font-size: 8vw;
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

.event-image {
  width: 40%;
  max-width: 800px;
}
@media (max-width: 1200px) {
  :deep(.event-name) {
    font-size: 40px; /* change to fixed size */
  }

  :deep(.event-date) {
    font-size: 100px; /* change to fixed size */
  }

  :deep(.carousel-item-content .event-heading h3) {
    font-size: 30px;
  }

  :deep(.carousel-item-content .event-description) {
    font-size: 25px; /* change to fixed size */
    padding-left: 0;
    padding-right: 0;
  }

  :deep(.carousel-item) {
    flex-direction: column;
    align-items: center;
  }

  :deep(.carousel-item:nth-child(even)) {
    flex-direction: column;
  }

  :deep(.carousel-item-content),
  :deep(.event-image) {
    width: 100%;
  }

  :deep(.recent-events-title .zhs-title),
  :deep(.recent-events-title .en-title),
  :deep(.event-heading h3) {
    font-size: 2rem;
  }

  :deep(.event-heading .event-date) {
    font-size: 4rem;
  }

  :deep(.event-description) {
    padding-left: 7rem;
    padding-right: 5rem;
  }
}

@media (min-width: 1201px) {
  :deep(.recent-events-title .zhs-title) {
    font-size: 1em;
  }

  :deep(.recent-events-title .en-title) {
    font-size: 1.75em;
  }

  :deep(.event-heading h3) {
    font-size: 50px;
  }

  :deep(.event-heading .event-date) {
    font-size: 7rem;
  }

  .carousel-item {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Add this */
    padding: 1rem;
    margin: 0 auto;
  }

  :deep(.event-description) {
    font-size: 30px;
    padding-left: 7rem;
    padding-right: 5rem;
  }
}
</style>
