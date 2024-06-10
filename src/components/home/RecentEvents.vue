<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <div class="recent-events">
    <div class="recent-events-title">
      <div class="zhs-title">近期活动</div>
      <div class="en-title">RECENT EVENTS</div>
    </div> 
    <div class="wrapper">
      <!--<fa class="i" :icon="['fas', 'arrow-left']" style="color: #ffa7d1;"/>-->
      <i id="left" class="fa-solid fa-arrow-left"></i>
      <div class="carousel" id="carousel-id">
        <div v-for="(item, index) in items" :key="index" class="carousel-item">
          <img class="event-image" :src="item.eventImageUrl" alt="Slide image" draggable="false"/>
        </div>
      </div>
      <!--<fa class="i" :icon="['fas', 'arrow-right']" style="color: #ffa7d1;"/>-->
      <i id="right" class="fa-solid fa-arrow-right"></i>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue'

const items = ref({})

const moveCarousel = () => {
  const carousel = document.querySelector(".carousel");
  const arrowButtons = document.querySelectorAll(".wrapper i");
  const firstItemWidth = document.querySelector(".carousel-item").offsetWidth;

  let isDragging = false;

  arrowButtons.forEach(button => {
    button.addEventListener("click", () => {
      carousel.scrollLeft += button.id === "left" ? -firstItemWidth : firstItemWidth;
    });
  });

  const dragStart = () => {
    isDragging = true;
    carousel.classList.add("dragging");
  }
  const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = e.pageX
  }

  // const dragStop = () => {
  //   isDragging = false;
  //  // carousel.classList.remove("dragging");
  // }

  carousel.addEventListener("mousemove", dragStart); 
  carousel.addEventListener("mousemove", dragging); 
  //document.addEventListener("mouseup", dragStop);

}
  
/*
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${month}${day}`
} */

onMounted (async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/events/upcoming/4`)
    items.value = response.data.events
    moveCarousel()
    console.log(response.data.events)
    var root = document.querySelector(':root')
    if (this.items.lenth < 5){
      for (let i = 1; i < 5; i++){
        if (i == this.items.length){
          root.style.setProperty('--itemslen', i)
        }
      }
    }
    else {
      root.style.setProperty('--itemslen', this.items.length)
      root.style.setProperty('--extraspace', 9)
    }

  } catch (err) {
    console.error(err)
  }
})
</script>

<style scoped>
body {
  margin: 0;
}

:root {
  --itemslen: 1;
  --extraspace: 0;
  --extraspacepx: calc( var(--extraspace) * 1px);
}

.recent-events {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  min-height: 100vh;
  padding: 0 35px;
  background: #EAEBF6;
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
  font-weight: 700;
  font-size: 8em;
  letter-spacing: 0.175em;
  line-height: 0.8em;
  color: #33378C;
;
}

.recent-events-title .en-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 800;
  font-size: 1.75em;
  line-height: 0.8em;
  font-size: 8vw;
  color: #988FCE;
}

.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: #988FCE;
  border-style: solid;
}

.wrapper {
  max-width: 1100px;
  width: 100%;
  position: relative;
}
 
.wrapper i {
  height: 50px;
  width: 50px;
  background: #fff;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  border-width: 10px;
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 3px 6px rgba(0,0,0,0.23);
}

i {
  z-index: 9999;
  
}

.wrapper i:first-child {
  left: -22px;

}

.wrapper i:last-child {
  right: -22px;
}

.carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% / 3));
  overflow: hidden;
}

.carousel-item {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0.4rem;
  margin: 0 auto;
  transition: transform 0.3s;
}

.carousel.dragging.carousel-item {
  cursor: grab;
  user-select: none;
}


.carousel-item:hover {
  transform: scale(1.1);
  cursor: pointer;
} 
/*
.carousel-item:nth-child(even) {
  flex-direction: row-reverse;
}
*/ 

.carousel-item-content {
  width: 60%;
}

.event-image {
  width: 100%;
  max-width: 350px;
  max-height: 100%;
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

  :deep(.recent-events-title .zhs-title) {
    font-size: 1.55rem;
  }
  :deep(.recent-events-title .en-title) {
    font-size: 2.55rem;
  }
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
    align-items: center; 
    padding: 1rem;
    margin: 0 auto;
  }

  :deep(.event-description) {
    font-size: 30px;
    padding-left: 7rem;
    padding-right: 5rem;
  }
}

@media screen and (max-width: 1000px) {

  .wrapper #carousel-id {
    grid-auto-columns: calc(100% / 2);
  }

}

@media screen and (max-width: 700px) {

.wrapper #carousel-id {
  grid-auto-columns: 100%;
}

}



</style>
