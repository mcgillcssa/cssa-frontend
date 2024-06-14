<template>
  <NavBar />
  <div class="banner-background">
    <div class="background-image"></div>
    <img class="home-title" src="https://i.imgur.com/e75ru0y.png" />
  </div>
  <gradient-stripe/>
  <AboutUs id="about-us" ref="aboutUsRef" />
  <div class="section-break" ref="sectionBreakRef">
    <div class="mask"></div>
  </div>
  <Presentation id="presentation" ref="presentationRef" />
  <div class="card-presentation">
    <!-- <card-viewer /> -->
    <!-- <h2>THIS IS A TITLE</h2> -->
  </div>
  <gradient-stripe/>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import GradientStripe from '../components/GradientStripe.vue';
import AboutUs from '../components/home/AboutUs.vue';
import Presentation from '../components/home/Presentation.vue';
// import CardViewer from '../components/home/CardViewer.vue'

const aboutUsRef = ref(null);
const presentationRef = ref(null);
const sectionBreakRef = ref(null);

const handleScroll = () => {
  const bannerBackground = document.querySelector('.background-image');
  const homeTitle = document.querySelector('.home-title');
  const scrollY = window.scrollY;

  const scale = 1 + scrollY / 1000;
  const opacity = 1 - scrollY / 500;
  const translateY = scrollY * (-0.8);

  const radius = Math.max(0, 100 - scrollY / 6);
  const xPosition = 30;
  const yPosition = 30;

  const clipPathValue = `circle(${radius}% at ${xPosition}% ${yPosition}%)`;

  bannerBackground.style.transform = `scale(${scale})`;
  bannerBackground.style.clipPath = clipPathValue;
  homeTitle.style.opacity = opacity;
  homeTitle.style.transform = `translateY(-50%) translateZ(0) translateY(${translateY}px)`;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  const options = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === sectionBreakRef.value) {
          entry.target.classList.add('fade-in-top-to-bottom');
        } else {
          entry.target.classList.add('fade-in');
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);

  if (aboutUsRef.value) {
    observer.observe(aboutUsRef.value.$el);
  }
  if (presentationRef.value) {
    observer.observe(presentationRef.value.$el);
  }
  if (sectionBreakRef.value) {
    observer.observe(sectionBreakRef.value);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
body {
  margin: 0;
  background-color: #eaebf6;
}

.navbar {
z-index: 1;
}

.page {
  overflow: hidden;
}

.vertical-flex-container {
  flex-direction: column;
}

.banner-background {
  position: relative;
  width: 100%;
  height: calc(100vh - 24px);
  z-index: 0;
  overflow: hidden;
  background-color: #E2D8EC;

}

.background-image {
  background-image: linear-gradient(
      122.63deg,
      #ffc6b4 0.67%,
      #ffa7d1 25.09%,
      #ad87cb 50.63%,
      #8986ed 84.36%,
      #4f78c9 100%
    ),
    url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-blend-mode: multiply;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: transform 0.1s ease, clip-path 0.1s ease;
  clip-path: circle(200% at 50% 50%);
}

.home-title {
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
  z-index: 1;
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.section-break {
  position: relative;
  height: 1.2vw;
  background: linear-gradient(to right, #4f78c9, #8986ed, #ad87cb, #ffa7d1, #ffc6b4);
  width: 80%;
  margin: 5vw auto;
  border-radius: 20px;
}

.mask {
  position: absolute;
  width: calc(100% - 0.6vw);
  height: calc(100% - 0.6vw);
  background-color: #ffffff;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fade-in {
  animation: fadeInAnimation 1s;
}

@keyframes fadeInAnimation {
  from {
    opacity: 0;
    transform: translatey(20px);
  }
  to {
    opacity: 1;
    transform: translatey(0);
  }
}

@keyframes fadeInTopToBottom {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-top-to-bottom {
  animation: fadeInTopToBottom 1s;
}

.card-presentation {
  display: flex;
}

@media screen and (min-width: 1921px) {
  .home-title {
    max-width: 800px;
    left: 3%;
  }
}

@media screen and (max-width: 700px) {
  .home-title {
    max-width: 80vw;
    left: 3%;
  }
}
</style>
