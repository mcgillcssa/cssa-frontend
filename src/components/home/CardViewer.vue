<template>
  <div class="card-container">
    <div ref="cardSection" class="card-section" :class="{ 'fade-in': isIntersecting }">
      <div class="left-column">
        <div class="flip-card" ref="flipCard">
          <img src="https://i.imgur.com/74uHgMG.jpeg" class="front-image"/>
          <img src="https://i.imgur.com/GXMsxyJ.jpeg" class="back-image"/>
        </div>
        <p class="invitation-text" :class="{ 'fade-in': isIntersecting }">WANT TO GET ONE?</p>
      </div>
      <div class="right-column">
        <h1 class="header" :class="{ 'fade-in': isIntersecting }">什么是会员卡?</h1>
        <div class="line">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <p class="body-text" :class="{ 'fade-in': isIntersecting }">
          CSSA会员卡<br>
          是McGill CSSA携手蒙城各大商家，<br>
          为大家准备的福利折扣卡！<br>
          凡是在合作商家店铺消费<br>
          出示此卡，都可以享受优惠！
        </p>
        <div>
          <router-link class="to-membership" to="/membership" :class="{ 'fade-in': isIntersecting }">
            <div class="text-wrapper">
              <h2 class="button-text">SEE MEMBERSHIP PAGE</h2>
            </div>
            <div class="circle-wrapper">
              <div class="circle">
                <arrow-right :size="arrowSize" fill="#431070" theme="filled" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { ArrowRight } from '@icon-park/vue-next';

export default {
  name: 'CardViewer',
  components: {
    ArrowRight
  },
  setup() {
    const arrowSize = ref(64);
    const cardSection = ref(null);
    const flipCard = ref(null);
    const isIntersecting = ref(false);
    let observer;

    onMounted(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isIntersecting.value = true;
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      if (cardSection.value) {
        observer.observe(cardSection.value);
      }

      watchEffect(() => {
        const width = window.innerWidth;
        if (width < 600) {
          arrowSize.value = 32;
        } else if (width > 600 && width < 700) {
          arrowSize.value = 35;
        } else if (width > 700 && width < 1024) {
          arrowSize.value = 55;
        } else {
          arrowSize.value = 64;
        }
      });

      if (flipCard.value) {
        flipCard.value.style.animation = 'flipCard 3s infinite';
      }
    });

    onUnmounted(() => {
      if (cardSection.value && observer) {
        observer.disconnect();
      }
    });

    return {
      arrowSize,
      cardSection,
      isIntersecting
    };
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EEE1FF;
  width: 100%;
  margin: 4vw 0;
}

.card-section {
  display: flex;
  background-color: white;
  justify-content: center;
  border-radius: 40px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  width: 90vw;
  height: auto;
  border: 1px solid #CBBCDB;
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.left-column {
  padding: 2vw 0 2vw 2vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  -webkit-perspective: 5000px;
  perspective: 5000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.flip-card {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 60%;
  height: auto;
  -webkit-animation: flipCard 8s infinite;
  animation: flipCard 8s infinite;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.front-image, .back-image {
  display: -webkit-box;
  width: 160%;
  height: auto;
  transition: transform 3s;
  -webkit-transition: transform 3s;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  border-radius: 2vw;
  margin-bottom: -35vw;
}

.back-image {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

@-webkit-keyframes flipCard {
  0% {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  50% {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
}

@keyframes flipCard {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.invitation-text {
  font-family: 'Raleway';
  font-weight: 700;
  color: #431070;
  font-style: italic;
  font-size: 2vw;
  text-align: center;
  padding: 0 0 27px 0;
  position: absolute;
  bottom: 0;
}

.right-column {
  width: 150%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2vw 2vw 2vw 0;
}

.header {
  font: 'Raleway';
  font-weight: 700;
  color: #431070;
  font-size: 2.5vw;
  text-align: center;
  padding: auto;
}

.line {
  width: 18vw;
  height: 2px;
  background-color: #431070;
  position: relative;
  margin: 0 auto 0vw auto;
}

.dot {
  position: absolute;
  top: -4px;
  width: 10px;
  height: 10px;
  background-color: #431070;
  border-radius: 50%;
}

.dot:first-child {
  left: 0;
}

.dot:last-child {
  right: 0;
}

.body-text {
  font: 'Raleway';
  font-size: 2vw;
  color: #9D69E2;
  font-weight: 700;
  text-align: center;
  white-space: pre-wrap;
}

.to-membership {
  display: flex;
  width: 45vw;
  height: auto;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right,
    #431070 0.67%,
    #7E21D0 13.5%,
    #9D69E2 26.5%,
    #DBC7F5 44.5%,
    #9D69E2 62%,
    #7E21D0 75.5%,
    #431070 90.99%
    );
  text-decoration: none;
  padding: 2vw;
}

.text-wrapper{
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-right: 2vw;
  border-radius: 20px;
  height: 85px;
  width: 350px;
}

.circle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.circle {
  flex: 0 0 auto;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

}

.arrow-right {
  color: #431070;
  font-size: 3vw;
}

.button-text {
  color: #431070;
  letter-spacing: 0.2vw;
  font-size: 1em;
  text-decoration: none;
  position: relative;
  display: inline-block;
}

.button-text::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -7px;
  height: 2px;
  background-color: #431070;
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media screen and (min-width: 1921px) {
  .left-column {
  -webkit-perspective: 1200px;
  perspective: 1200px;
}

.flip-card {
  width: 45%;
}

.front-image, .back-image {
  margin-bottom: -26vw;
}
.header {
  font-size: 2vw;
}

.line {
  width: 15vw;
  height: 3px;
}

.body-text {
  font-size: 1.8vw;
}

.card-container .right-column .to-membership .text-wrapper .button-text::after {
    bottom: -7px;
    height: 2.8px;
  }
}

@media screen and (max-width: 1921px) {
  .left-column {
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

.flip-card {
  width: 50%;
}

.front-image, .back-image {
  margin-bottom: -30vw;
}
}

@media screen and (max-width: 1600px) {
.flip-card {
  width: 52%;
}

.front-image, .back-image {
  margin-bottom: -30vw;
}
}

@media screen and (max-width: 1200px) {
.flip-card {
  width: 55%;
}

.front-image, .back-image {
  margin-bottom: -33vw;
}
}

@media screen and (max-width: 850px) {
.front-image, .back-image {
  margin-bottom: -38vw;
}

  .button-text {
  letter-spacing: 0vw;
  font-size: 2.4vw;
  }
}

@media screen and (max-width: 700px) {
.card-section {
  flex-direction: column;
  justify-content: center;
  border-radius: 40px;
  width: 90vw;
  height: 115vw;
  margin-bottom: 2vw;
  box-sizing: border-box;
  padding: 2vw;
}

.left-column {
  height: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  transform: translateY(6vw);
  padding:0;
}

.front-image, .back-image {
  width: 110%;
  margin-bottom: 20vw;
}

.invitation-text {
  font-size: 3vw;
  margin-top: -0.5vw;
  position: absolute;
  padding-top: 2vw;
  bottom: 0;
  padding: unset;
}

.right-column {
  width: 100%;
  flex-direction: column;
  align-items: center;
  bottom: 0;
  transform: translateY(6vw);
}

.header {
  font-size: 3vw;
}

.line {
  width: 20vw;
  height: 1.5px;
}

.dot {
  top: -3px;
  width: 8px;
  height: 8px;
}

.body-text {
  font-size: 2.8vw;
}

.to-membership {
  width: 70vw;
  height: auto;
  padding: 3vw;
}

.text-wrapper{
  height: 50px;
}

.circle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.circle {
  width: 50px;
  height: 50px;
}

.button-text {
  font-size: 3vw;
  }
}

.button-text::after {
  bottom: -5px;
  height: 1.5px;
}

@media screen and (min-width: 2500px) {
  .left-column {
  -webkit-perspective: 2000px;
  perspective: 2000px;
}

.flip-card {
  width: 42%;
}

.front-image, .back-image {
  margin-bottom: -24vw;
}
}

@media screen and (min-width: 4600px) {
  .left-column {
  -webkit-perspective: 2000px;
  perspective: 2000px;
}

.flip-card {
  width: 40%;
}

.front-image, .back-image {
  margin-bottom: -24vw;
}
}

</style>
