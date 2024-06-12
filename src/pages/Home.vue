<template>
  <NavBar />
  <div class="banner-background">
    <img
      class="home-title"
      src="https://i.imgur.com/e75ru0y.png"
    />
  </div>
  <gradient-stripe />
  <AboutUs id="about-us" ref="aboutUsRef" />
  <div class="section-break" ref="sectionBreakRef">
    <div class="mask"></div>
  </div>
  <Presentation id="presentation" ref="presentationRef" />
  <div class="card-presentation">
    <!-- <card-viewer /> -->
    <!-- <h2>THIS IS A TITLE</h2> -->
  </div>
  <gradient-stripe />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import GradientStripe from '../components/GradientStripe.vue';
import AboutUs from '../components/home/AboutUs.vue';
import Presentation from '../components/home/Presentation.vue';
// import CardViewer from '../components/home/CardViewer.vue'

const aboutUsRef = ref(null);
const presentationRef = ref(null);
const sectionBreakRef = ref(null);

onMounted(() => {
  const options = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('section-break')) {
          entry.target.classList.add('slide-in-right');
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
  z-index: 0;
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

.slide-in-right {
    animation: slideInRightAnimation 0.5s forwards;
  }

  @keyframes slideInRightAnimation {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
