<template>
  <NavBar />
  <div class="banner-background">
    <img
      class="home-title"
      src="https://i.imgur.com/e75ru0y.png"
    />
  </div>
  <gradient-stripe />
  <AboutUs id="about-us" />
  <div class="section-break">
    <div class="mask"></div>
  </div>
  <Presentation id="presentation" />
  <div class="card-presentation">
    <!-- <card-viewer /> -->
    <!-- <h2>THIS IS A TITLE</h2> -->
  </div>
  <gradient-stripe />
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, ref } from 'vue';
import NavBar from '../components/NavBar.vue'
import GradientStripe from '../components/GradientStripe.vue'
import AboutUs from '../components/home/AboutUs.vue'
import Presentation from '../components/home/Presentation.vue'
// import CardViewer from '../components/home/CardViewer.vue'

let observer;
const hasFaded = ref({ background: false, aboutUs: false, presentation: false, sectionBreak: false });

onMounted(async () => {
  await nextTick();
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id') || (entry.target.classList.contains('section-break') ? 'sectionBreak' : undefined);
    if (entry.isIntersecting && !hasFaded.value[id]) {
      entry.target.classList.add("visible");
      hasFaded.value[id] = true;
    }
  });
}, options);

  const elements = [
    document.querySelector('.banner-background'),
    document.getElementById('about-us'),
    document.getElementById('presentation'),
    document.querySelector('.section-break')
  ];

  elements.forEach(el => {
    if (el) {
      observer.observe(el);
    }
  });
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<style>
body {
  margin: 0;
  background-color: #eaebf6;
}

.page {
  overflow: hidden;
}

.vertical-flex-container {
  flex-direction: column;
}

.banner-background {
  position: relative;

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
  width: 100%;
  height: calc(100vh - 24px);
}

.home-title {
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
}

.section-break {
  position: relative;
  height: 1.2vw;
  background: linear-gradient(to right, #4f78c9, #8986ed, #ad87cb, #ffa7d1, #ffc6b4);
  width: 80%;
  margin: 5vw auto;
  border-radius: 20px;
  overflow: hidden;
  opacity: 0;
  transition: opacity 2s ease-in-out;

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

.card-presentation {
  display: flex;
}

#about-us, #presentation {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.banner-background.visible, #about-us.visible, #presentation.visible {
  opacity: 1;
}

@keyframes horizontalFadeIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.section-break.visible {
  animation: horizontalFadeIn 0.7s ease forwards;
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
