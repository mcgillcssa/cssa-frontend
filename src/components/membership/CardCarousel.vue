<template>
  <div class="carousel">
    <div class="slides">
      <div
        v-for="(url, index) in carouselUrls"
        :key="index"
        :style="'background-image:url(' + url + ')'"
        class="slide"
      ></div>
    </div>
    <span class="arrow left material-symbols-outlined"> </span>
    <span class="arrow right material-symbols-outlined"> </span>
    <ul>
      <li v-for="(url, index) in carouselUrls" :key="index"></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// carousel images
const carouselUrls = ref(['https://i.imgur.com/Cqv3xm6.png','https://i.imgur.com/9myUD3h.jpg'])

onMounted(() => {
  //carousel
  const slides = document.querySelector('.slides')
  const leftArrow = document.querySelector('.left')
  const rightArrow = document.querySelector('.right')
  const ul = document.querySelector('.carousel ul')

  slides.style.width = carouselUrls.value.length + '00%'

  var currentIndex = 0

  // set first dot to active
  ul.children[0].classList.add('selected')

  leftArrow.addEventListener('click', function () {
    if (currentIndex > 0) currentIndex -= 1
    document.querySelector('.carousel .selected').classList.remove('selected')
    ul.children[currentIndex].classList.add('selected')
    slides.style.transform = 'translate(' + currentIndex * (-100 / carouselUrls.value.length) + '%)'
  })

  rightArrow.addEventListener('click', function () {
    if (currentIndex < carouselUrls.value.length - 1) currentIndex += 1
    document.querySelector('.carousel .selected').classList.remove('selected')
    ul.children[currentIndex].classList.add('selected')
    slides.style.transform = 'translate(' + currentIndex * (-100 / carouselUrls.value.length) + '%)'
  })

  document.querySelectorAll('.carousel ul li').forEach(function (indicator, index) {
    indicator.addEventListener('click', function () {
      currentIndex = index
      document.querySelector('.carousel .selected').classList.remove('selected')
      indicator.classList.add('selected')
      slides.style.transform =
        'translate(' + currentIndex * (-100 / carouselUrls.value.length) + '%)'
    })
  })
})
</script>

<style scoped>
.carousel {
  background-color: #ffffff;
  height: 512px;
  margin: 30px 40px 30px 40px;
  width: 90%;
  border: 1px solid #5291B9;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

.carousel div {
  flex-grow: 1;
  text-align: center;
}

.slides {
  display: flex;
  height: 100%;
  transition: all 0.3s;
}

.slide {
  flex-basis: 100%;
  display: block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.arrow {
  position: absolute;
  top: 40%;
  display: block;
  margin: 30px auto;
  width: 3vw;
  height: 3vw;
  border-top: 5px solid #7ea3b8;
  border-left: 5px solid #7ea3b8;
  cursor: pointer;
}

.arrow.left {
  left: 2%;
  transform: rotate(-45deg);
}

.arrow.right {
  right: 2%;
  transform: rotate(135deg);
}

.carousel ul {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.4);
}

.carousel ul li {
  height: 1vw;
  width: 1vw;
  background-color: #828181;
  border-radius: 50%;
  margin: 1vh 3vw;
  cursor: pointer;
}

.selected {
  background-color: #ffffff !important;
}

@media screen and (min-width: 801px) and (max-width: 1200px) {
  .carousel {
    height: 256px;
    margin: 30px 0 30px 0;
  }
  .arrow {
    top: 30%;
  }
}

@media screen and (max-width: 800px) {
  .carousel {
    height: 256px;
    margin: 30px 0 30px 0;
  }

  .slide {
    background-size: 400px 200px;
  }

  .arrow {
    top: 30%;
  }

  .arrow.left {
    left: 2%;
  }

  .arrow.right {
    right: 2%;
  }
}

@media screen and (max-width: 600px) {
  .slide {
    background-size: 340px 170px;
  }

  .carousel {
    height: 200px;
  }

  .arrow {
    border-top: 3px solid #33378c;
    border-left: 3px solid #33378c;
  }
}
</style>
