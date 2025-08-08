<template>
  <NavBar />
  <div class="banner-background">
    <div class="home-background-image"></div>
    <img class="home-title" src="https://i.imgur.com/e75ru0y.png" />
  </div>
  <AboutUs id="about-us" ref="aboutUsRef" />
  <div class="section-break" ref="sectionBreakRef">
    <div class="mask"></div>
  </div>
  <Information id="information" ref="informationRef" />
  <div class="section-break1" ref="sectionBreak1Ref">
    <div class="mask"></div>
  </div>
  <h4 ref="vipHeaderRef">
    <span class="vip-title-cn">2025 - 2026 会员卡</span><br>
    <span class="vip-title-en">2025 - 2026 VIP CARD</span>
  </h4>
    <card-viewer id="card-viewer" ref="cardViewerRef"/>

  <!--RecentEvents-->
  <h4 ref="recentEventsHeaderRef">
    <span class="vip-title-cn">近期活动</span><br>
    <span class="vip-title-en">RECENT EVENTS</span>
  </h4>
    <RecentEvents id="recent-events" ref="recentEventsRef"/> 

  <gradient-stripe/>
<Footer></Footer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import GradientStripe from '../components/GradientStripe.vue';
import AboutUs from '../components/home/AboutUs.vue';
import Information from '../components/home/Information.vue';
import CardViewer from '../components/home/CardViewer.vue'
import Footer from '../components/Footer.vue';

import RecentEvents from '../components/home/RecentEvents.vue';

const aboutUsRef = ref(null);
const informationRef = ref(null);
const sectionBreakRef = ref(null);
const sectionBreak1Ref = ref(null);
const vipHeaderRef = ref(null);
const recentEventsHeaderRef = ref(null); //recent events header

const calculateRadius = (scrollY) => {
  const screenWidth = window.innerWidth;
  let baseRadius = 100;

  if (screenWidth > 1200) {
    baseRadius -= scrollY / 8;
  } else if (screenWidth > 700 && screenWidth < 1200) {
    baseRadius -= scrollY / 10;
  } else {
    baseRadius -= scrollY / 13;
  }

  return Math.max(0, baseRadius);
};

const handleScroll = () => {
  const bannerBackground = document.querySelector('.home-background-image');
  const homeTitle = document.querySelector('.home-title');
  const scrollY = window.scrollY;

  const scale = 1 + scrollY / 1000;
  const opacity = 1 - scrollY / 500;
  const translateY = scrollY * (-0.8);

  const radius = calculateRadius(scrollY);
  const xPosition = 30;
  const yPosition = 30;

  const clipPathValue = `circle(${radius}% at ${xPosition}% ${yPosition}%)`;

  bannerBackground.style.transform = `scale(${scale})`;
  bannerBackground.style.clipPath = clipPathValue;
  homeTitle.style.opacity = opacity;
  homeTitle.style.transform = `translateY(-50%) translateZ(0) translateY(${translateY}px)`;
};

onMounted(() => {
  window.scrollTo(0, 0);
  window.addEventListener('scroll', handleScroll);

  const options = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  if (aboutUsRef.value) observer.observe(aboutUsRef.value.$el);
  if (informationRef.value) observer.observe(informationRef.value.$el);
  if (sectionBreakRef.value) observer.observe(sectionBreakRef.value);
  if (sectionBreak1Ref.value) observer.observe(sectionBreak1Ref.value);
  if (vipHeaderRef.value) observer.observe(vipHeaderRef.value);
  if (recentEventsHeaderRef.value) observer.observe(recentEventsHeaderRef.value);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
body {
  margin: 0;
  background-color: #E3F4FF;
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
  height: calc(100vh);
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #f6f5ea 60%, #E3F4FF 100%);

}

.home-background-image {
  background-image: linear-gradient(
    90deg, 
    rgba(114, 231, 235, 0.41) 0%,
    rgba(101, 210, 240, 0.41) 28.5%, 
    rgba(92, 176, 246, 0.41) 66.66%, 
    rgba(25, 120, 208, 0.41) 100%),
    url('https://i.imgur.com/ZgCeJBq.jpg'
    );
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
  background: linear-gradient(
    90deg, 
    #FFEE8F 0.67%, 
    #E3FBCF 16.5%, 
    #BBF0FA 30%, 
    #ABD9FF 44.5%, 
    #5DABF3 62%, 
    #448FD6 81.5%, 
    #3262BA 99.99%
    );
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

.section-break1 {
  position: relative;
  height: 1.2vw;
  background: linear-gradient(
    to left, 
    #FFEE8F 0.67%, 
    #E3FBCF 16.5%, 
    #BBF0FA 30%, 
    #ABD9FF 44.5%, 
    #5DABF3 62%, 
    #448FD6 81.5%, 
    #3262BA 99.99%
    );
  width: 80%;
  margin: 5vw auto;
  border-radius: 20px;
}

h4 {
  text-align: center;
  width: 100%;
  margin: 0 auto;
  background-color: #BBDEF5;
  padding: 1vw 0;
}

h4 br {
  margin-bottom: 0px;
}

.vip-title-cn {
  color: #1A4F87;
  font-family: 'Raleway';
  font-size: 2vw;
  display: block;
}

.vip-title-en {
  color: #5291B9;
  font-family: 'Raleway';
  font-weight: bold;
  font-size: 2.5vw;
  display: block;
  margin-top: -2vw;
}

.card-presentation {
  display: flex;
}

@media screen and (min-width: 1921px) {
  .home-title {
    max-width: 800px;
    left: 3%;
  }

  .vip-title-en {
  margin-top: -1.5vw;
  }
}

@media screen and (max-width: 700px) {
  .banner-background {
  background: linear-gradient(to bottom, #f6f5ea 60%, #E3F4FF 100%);
}

  h3 {
  padding: 0.5vw 0;
}

  .vip-title-en{
  margin-top: -3vw;
}

.home-title {
    max-width: 80vw;
    left: 3%;
  }

/* Recent Events */
.events-title-cn {
  color: #1A4F87;
  font-family: 'Raleway';
  font-size: 2vw;
  display: block;
}

.events-title-en {
  color: #5291B9;
  font-family: 'Raleway';
  font-weight: bold;
  font-size: 2.5vw;
  display: block;
  margin-top: -2vw;
}

/* Add responsive styles */
@media screen and (min-width: 1921px) {
  .events-title-en {
    margin-top: -1.5vw;
  }
}

@media screen and (max-width: 700px) {
  .events-title-en {
    margin-top: -3vw;
  }

}
}

</style>
