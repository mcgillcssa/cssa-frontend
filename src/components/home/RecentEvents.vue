<template>
  <div class="recent-events">
    <!-- <div class="recent-events-title">
      <div class="zhs-title">近期活动</div>
      <div class="en-title">RECENT EVENTS</div>
    </div> -->

    <!-- New div for carousel -->
    <div class="carousel-container">
      <button class="carousel-control prev" @click="prev">&#10094;</button>
      
      <!-- slide transition -->
      <transition-group name="slide" tag="div" class="carousel">
        <div v-for="(item, index) in items" 
             :key="index" 
             v-show="currentIndex === index"
             :data-direction="direction"
             class="carousel-item">
          <img class="event-image" :src="item.eventImageUrl" alt="Event image" />
        </div>
      </transition-group>

      <button class="carousel-control next" @click="next">&#10095;</button>
      
      <!-- bottom dots indicating image order -->
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
//import axios from 'axios' //Backend
export default {
  data() {
    return {
      items: [],
      currentIndex: 0,
      timer: null,
      direction: 'right',
    }
  },

  methods: {
    // formatDate(dateString) {
    //   const date = new Date(dateString)
    //   const month = (date.getMonth() + 1).toString().padStart(2, '0')
    //   const day = date.getDate().toString().padStart(2, '0')
    //   return `${month}${day}`
    // },
    //new methods
    next() {
      this.direction = 'right'
      this.currentIndex = (this.currentIndex + 1) % this.items.length
    },

    prev() {
      this.direction = 'left'
      this.currentIndex = this.currentIndex === 0
        ? this.items.length - 1
        : this.currentIndex - 1
    },

    goToSlide(index) {
      this.direction = index > this.currentIndex ? 'right' : 'left'
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
  },

  async created() {
    //连接后端
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
      eventImageUrl: "https://i.imgur.com/SttwfZp.png"
    },
    {
      eventImageUrl: "https://i.imgur.com/4VFA7Pe.png"
    },
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

/* #carousel {
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
} */

/* new styles */
/* 白色框 */
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
  height: fit-content;
  display: flex;
  justify-content: center;
}

.carousel {
  position: relative;
  width: 95%;
  min-height: 850px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.event-image {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
}
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26, 79, 135, 0.5);
  color: white;
  padding: 20px 30px;
  border: none;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  transition: background 0.3s ease;
  font-size: 32px;
}

.carousel-control:hover {
  background: rgba(26, 79, 135, 0.8); /* darker */
}

/* indicators and buttons */
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
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  background: rgba(26, 79, 135, 0.3);
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

.indicator.active {
  background: #1A4F87;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Entering from right */
.slide-enter-from[data-direction="right"] {
  transform: translateX(100%);
}

/* Entering from left */
.slide-enter-from[data-direction="left"] {
  transform: translateX(-100%);
}

/* Leaving to right */
.slide-leave-to[data-direction="right"] {
  transform: translateX(-100%);
}

/* Leaving to left */
.slide-leave-to[data-direction="left"] {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

/* Mobile styles (to override desktop styles) */
@media (max-width: 768px) {
  .carousel {
    width: 98%;
    min-height: 400px;
    height: auto;
    aspect-ratio: 4/3; 
  }
  
  .carousel-container {
    width: 95vw; 
    padding: 1vw; 

  }
  .carousel-item {
    padding: 25px;  
  }

  .event-image {
    max-width: 100%; 
    max-height: 100%;
  }
  .carousel-control {
    padding: 13px 20px;
    font-size: 20px;
  }
}

</style>
