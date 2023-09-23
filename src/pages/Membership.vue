<template>
  <nav-bar />
  <div class="banner vertical-flex" :style="{ 'background-image': 'url(' + bannerUrl + ')' }">
    <div class="banner-title"><em>MEMBERSHIP</em></div>
    <div class="arrow-down">
      <arrow-down theme="filled" size="124" fill="#FFFFFF" strokeLinecap="butt" />
    </div>
  </div>
  <div class="content-container vertical-flex">
    <div class="presentation vertical-flex">
      <h3>什么是CSSA会员?</h3>
      <h2>What is CSSA Membership?</h2>
      <div class="presentation-description">
        <img src="https://i.imgur.com/gAU1htm.jpg" alt="Small Card Design" />
        <div class="description-container">
          <p>
            &lt;Placeholder&gt;McGill University Chinese Students and Scholars Association (CSSA),
            is the only student community certified by the Chinese Consulate on campus, and it is
            the only cultural club dedicated mainly to students and scholars from Mainland China.
          </p>
          <p>
            麦吉尔大学中国学生学者联合会（McGill
            CSSA）是一个无政治、无宗教、非营利、而且唯一正式在麦吉尔校方注册的主要面向本科生的官方学生组织。
          </p>
        </div>
      </div>
    </div>
    <div class="separator">
      <div class="circle-start"></div>
      <div class="line"></div>
      <div class="circle-end"></div>
    </div>
    <div>
      <router-link class="to-benefits" to="/benefits">
        <div class="text-wrapper">
          <h2 class="button-text">点击查看完整商家名单</h2>
        </div>
        <div class="circle"><arrow-right theme="filled" :size="arrowSize" fill="#967eb8" /></div>
      </router-link>
    </div>
    <div class="presentation vertical-flex">
      <h3>以往会员卡设计</h3>
      <h2>Past Membership Card Design</h2>
    </div>
    <div class="carousel">
        <div class="slides">
        </div>
        <span class="arrow left material-symbols-outlined">
        </span>
        <span class="arrow right material-symbols-outlined">
        </span>
        <ul>
        </ul>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted} from 'vue'
import NavBar from '../components/NavBar.vue'
import { ArrowDown, ArrowRight } from '@icon-park/vue-next'

const bannerUrl = ref('https://i.imgur.com/9myUD3h.jpg')
const contentSections = ref([])

let arrowSize = ref(64)

// carousel images
const carouselUrls = ['https://i.imgur.com/9myUD3h.jpg', 'https://i.imgur.com/gAU1htm.jpg'];

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)

  contentSections.value = document.querySelectorAll('.content-container > div')
  window.addEventListener('scroll', handleScroll)

  //carousel
  const slides = document.querySelector('.slides');
  const leftArrow = document.querySelector('.left');
  const rightArrow = document.querySelector('.right');
  const ul = document.querySelector('.carousel ul');

  var currentIndex = 0;

  console.log(slides);
  // add slides
  for (let i in carouselUrls){
    var slide = document.createElement("div");
    slide.classList.add("slide");
    slide.style.backgroundImage = 'url(' + carouselUrls[i] + ')';
    slides.appendChild(slide);

    var dot = document.createElement("li");
    ul.appendChild(dot);
  }

  // set first dot to active
  ul.children[0].classList.add('selected');

  leftArrow.addEventListener('click', function(){
    if (currentIndex > 0) currentIndex -= 1;
    document.querySelector('.carousel .selected').classList.remove('selected');
    ul.children[currentIndex].classList.add('selected');
    slides.style.transform = 'translate('+ (currentIndex) * (-25) +'%)';
  })

  rightArrow.addEventListener('click', function(){
    if (currentIndex < carouselUrls.length - 1) currentIndex += 1;
    document.querySelector('.carousel .selected').classList.remove('selected');
    ul.children[currentIndex].classList.add('selected');
    slides.style.transform = 'translate('+ (currentIndex) * (-25) +'%)';
  })

  document.querySelectorAll('.carousel ul li').forEach(function(indicator, index){
    indicator.addEventListener('click', function(){
      currentIndex = index;
      document.querySelector('.carousel .selected').classList.remove('selected');
      indicator.classList.add('selected');
      slides.style.transform = 'translate('+ (currentIndex) * (-25) +'%)';
    });
  });

})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})

const updateWindowWidth = () => {
  const aspectRatio = window.innerWidth / window.innerHeight

  if (aspectRatio < 1) {
    bannerUrl.value = 'https://i.imgur.com/4Xf94jX.jpg'
  } else {
    bannerUrl.value = 'https://i.imgur.com/9myUD3h.jpg'
  }
  if (window.innerWidth <= 600) {
    arrowSize.value = 24
  } else if (window.innerWidth <= 800) {
    arrowSize.value = 36
  } else if (window.innerWidth <= 1200) {
    arrowSize.value = 48
  } else {
    arrowSize.value = 64
  }
}

const handleScroll = () => {
  contentSections.value.forEach((section, index) => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.style.transitionDelay = `${index * 0.15}s`
      section.classList.add('fadeInUp')
    }
  })
}
</script>

<style scoped>
.vertical-flex {
  display: flex;
  flex-direction: column;
}

.banner {
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner-title {
  margin: 0;
  opacity: 0;
  color: #ffffff;

  font-size: 12vw;
  font-family: 'Infinity';
  text-align: center;
  text-shadow: 2px 2px 5px #634791;
  animation: fadeInUp 1s forwards 0.5s;
}

.arrow-down {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0; /* starts as hidden */
  animation: fadeIn 1s forwards 2s, pulse 3s infinite 2.5s;
}

@keyframes pulse {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 0.7;
  }
  25% {
    transform: translateX(-50%) translateY(-10px) scale(1.02);
    opacity: 0.8;
  }
  40% {
    transform: translateX(-50%) translateY(-15px) scale(1.05);
    opacity: 0.9;
  }
  60% {
    transform: translateX(-50%) translateY(-10px) scale(1.02);
    opacity: 0.8;
  }
}

.content-container {
  align-items: center;

  background-color: #eaebf6;
}

.presentation {
  margin: 40px 0 0 0;

  width: 100%;
  align-items: center;
  gap: 10%;
  font-family: 'CircularStd';
}

.presentation h3 {
  margin: 0;
  font-size: 1.5vw;
  color: #33378c;
}

.presentation h2 {
  margin: 0;
  font-size: 3vw;
  color: #988fce;
}

.presentation-description {
  margin: 30px 40px 0 40px;
  padding: 100px;

  display: flex;
  width: 85%;
  flex-wrap: nowrap;

  gap: 50px;

  background-color: #ffffff;
  border: 1px solid #cbbcdb;
  border-radius: 30px;
}

.presentation-description img {
  width: 100%;
  max-width: 50%;
  flex: 0 0 50%;
}

.description-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  font-family: 'Infinity';
  color: #33378c;
  text-align: center;

  font-size: 1.5vw;
}

.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin: 20px 0 20px 0;
}

.circle-start,
.circle-end {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #967eb8; /* Color of the circle. You can change it as per your design */
}

.line {
  flex-grow: 0.9;
  height: 2px;
  background-color: #967eb8; /* Color of the line. You can change it as per your design */
  margin: 0 20px; /* Spacing between circles and line. Adjust as needed. */
}

.to-benefits {
  display: flex;
  width: 90vw;
  height: 150px;
  border-radius: 30px;
  align-items: center;
  background-image: linear-gradient(
    90deg,
    #ffc6b4 0.67%,
    #ffa7d1 14.09%,
    #ad87cb 68.63%,
    #a78cd0 80.36%,
    #726cad 100%
  );
  margin-bottom: 20px;
  text-decoration: none;
}

.text-wrapper {
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  width: 75%;
  margin: 0 20px 0 60px;
  padding: 20px 0;
  background-color: #ffffff;
  border-radius: 20px;
}

.button-text {
  margin: 0;
  text-align: center;
  color: #967eb8;
  letter-spacing: 20px;
  font-size: 1.75em;
  text-decoration: none;
}

.circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-right: 20px;

  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
}

.carousel{
  background-color: #ffffff;
  height: 512px;
  margin: 30px 40px 30px 40px;
  width: 90%;
  border: 1px solid #cbbcdb;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.carousel div{
  flex-grow: 1;
  text-align: center;
}

.slides{
  display: flex;
  height: 100%;
  width: 400%;
  transition: all 0.3s;
}

.slide{
  flex-basis: 100%;
  display: block;
  background-size: 1200px 400px;
  background-repeat: no-repeat;
  background-position: center;
}

.arrow{
  position: absolute;
  top: 40%;
  display: block;
  margin: 30px auto;
  width: 50px;
  height: 50px;
  border-top: 10px solid #33378C;
  border-left: 10px solid #33378C;
  cursor: pointer;
}

.arrow.left{
  left:3%;
  transform: rotate(-45deg);
}

.arrow.right{
  right:3%;
  transform: rotate(135deg);
}

.carousel ul{
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0,0,0,0.4);
}

.carousel ul li{
  height: 1vw;
  width: 1vw;
  background-color: #828181;
  border-radius: 50%;
  margin: 1vh 3vw;
  cursor: pointer;
}

.selected{
  background-color: #FFFFFF !important;
}

@media screen and (min-width: 1201px) and (max-width: 1600px) {
  .presentation-description {
    padding: 60px;
  }
}

@media screen and (min-width: 1001px) and (max-width: 1200px) {
  .presentation-description {
    padding: 20px;
  }

  .text-wrapper {
    margin: 0 40px 0 40px;
    padding: 20px 0;
    background-color: #ffffff;
    border-radius: 20px;
  }

  .circle {
    width: 100px;
    height: 100px;
  }
}

@media screen and (min-width: 801px) and (max-width: 1000px) {
  .presentation-description {
    padding: 20px;
  }

  .text-wrapper {
    margin: 0 40px 0 40px;
    padding: 25px 0;
  }

  .button-text {
    font-size: 1.5em;
  }

  .circle {
    width: 80px;
    height: 80px;
  }
}

@media screen and (max-width: 800px) {
  .presentation h3 {
    font-size: 1em;
  }

  .presentation h2 {
    font-size: 2em;
  }

  .presentation-description {
    padding: 30px;
  }

  .presentation-description {
    flex-direction: column;
    gap: 10px;
  }

  .presentation-description img {
    width: 100%;
    max-width: 100%;
    flex: 0 0 100%;
  }

  .presentation-description p {
    padding-left: 30px;
    padding-right: 30px;
  }

  .separator {
    height: 30px;
    margin: 10px 0;
  }

  .to-benefits {
    height: 100px;
  }

  .text-wrapper {
    margin: 0 30px 0 30px;
    padding: 15px 0;
  }

  .button-text {
    font-size: 1.2em;
    letter-spacing: 15px;
  }

  .circle {
    width: 60px;
    height: 60px;
  }

  .carousel {
    height: 256px;
    margin: 30px 0 30px 0;
    width: 100%;
  }

  .slide{
    background-size: 380px 210px;
  }

  .arrow{
    top: 30%;
    height: 20px;
    width: 20px;
    border-top: 5px solid #33378C;
    border-left: 5px solid #33378C;
  }

  .arrow.left{
    left: 2%;
  }

  .arrow.right{
    right: 2%;
  }
}

@media screen and (max-width: 600px) {
  .to-benefits {
    height: 80px;
  }

  .text-wrapper {
    margin: 0 30px 0 30px;
    padding: 15px 0;
  }

  .button-text {
    font-size: 1em;
    letter-spacing: 10px;
  }

  .circle {
    width: 40px;
    height: 40px;
  }

  .slide{
    background-size: 320px 180px;
  }

  .carousel {
    height: 200px;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.content-container > div {
  opacity: 0;
  transform: translateY(20px);
}

.fadeInUp {
  animation: fadeInUp 1s forwards;
}
</style>