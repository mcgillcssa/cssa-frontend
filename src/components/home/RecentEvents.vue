<template>
  <div class="recent-events">
    <!-- <div class="recent-events-title">
      <div class="zhs-title">近期活动</div>
      <div class="en-title">RECENT EVENTS</div>
    </div> -->

    <!-- New div for carousel -->
    <div class="carousel-container">
      <button class="carousel-control prev" @click="prev">&#10094;</button>
      
      <transition-group name="slide" tag="div" class="carousel">
        <div v-for="(item, index) in items" 
             :key="index" 
             v-show="currentIndex === index"
             class="carousel-item">
          <img class="event-image" :src="item.eventImageUrl" alt="Event image" />
        </div>
      </transition-group>

      <button class="carousel-control next" @click="next">&#10095;</button>
      
      <div class="carousel-indicators">
        <button v-for="(item, index) in items" 
                :key="index"
                :class="['indicator', { active: currentIndex === index }]"
                @click="goToSlide(index)">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from 'axios' //temporary
export default {
  data() {
    return {
      items: [],
      currentIndex: 0,
      timer: null
    }
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${month}${day}`
    },
    //new methods
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length
    },

    prev() {
      this.currentIndex = this.currentIndex === 0 
        ? this.items.length - 1 
        : this.currentIndex - 1
    },

    goToSlide(index) {
      this.currentIndex = index
    },

    startSlideShow() {
      this.timer = setInterval(this.next, 5000)
    },

    stopSlideShow() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
    //--
  },

  async created() {
    //temporary comment----------------
    // try {
    //   const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/events/upcoming/4`)
    //   this.items = response.data.events
    //   console.log(response.data.events)
    // } catch (err) {
    //   console.error(err)
    // }

    //testing
    this.items = [
    {
      eventImageUrl: "https://i.imgur.com/xcLQH4B.jpeg"
    },
    {
      eventImageUrl: "https://i.imgur.com/YaWacqM.png"
    },
    {
      eventImageUrl: "https://picsum.photos/800/600?random=3"
    }
  ]
  //slideshow
  this.startSlideShow()


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
  background: #E3F4FF;
  padding: 20px;
  align-items: center;
}
/* 
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
  color: #1A4F87;
}

.recent-events-title .en-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 800;
  font-size: 1.75em;
  line-height: 0.8em;
  font-size: 8vw;
  color: #5291B9;
} */

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

/* new styles */
.carousel-container {
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90vw;
  padding: 2vw;
  border: 1px solid #5291B9;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-top: 3vw;
  margin-bottom: 3vw;
}

.carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; 
  max-height: 80vh;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px; /* Add rounded corners to images */
}

@media (max-width: 768px) {
  .carousel {
    aspect-ratio: 4/3; /* More square ratio for mobile */
  }
  
  .carousel-container {
    width: 95vw; /* Slightly wider on mobile */
    padding: 1vw; /* Less padding on mobile */
  }
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26, 79, 135, 0.5); /* Change to match theme color */
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.carousel-control:hover {
  background: rgba(26, 79, 135, 0.8); /* Darker on hover */
}

.prev {
  left: 30px;
}

.next {
  right: 30px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(26, 79, 135, 0.3);
  border: none;
  cursor: pointer;
}

.indicator.active {
  background: #1A4F87;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
