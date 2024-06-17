<template>
  <div class="card-container">
    <div ref="cardSection" class="card-section" :class="{ 'fade-in': isIntersecting }">
      <div class="left-column">
        <img src="https://i.imgur.com/qm7PupF.jpg"/>
        <p class="invitation-text">WANT TO GET ONE?</p>
      </div>
      <div class="right-column">
        <h1 class="header">什么是会员卡?</h1>
        <div class="line">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <p class="body-text">
          CSSA会员卡<br>
          是McGill CSSA携手蒙城各大商家，<br>
          为大家准备的福利折扣卡！<br>
          凡是在合作商家店铺消费<br>
          出示此卡，都可以享受优惠！
        </p>
        <div>
          <router-link class="to-membership" to="/membership">
            <div class="text-wrapper">
              <h2 class="button-text">SEE MEMBERSHIP PAGE</h2>
            </div>
            <div class="circle-wrapper">
              <div class="circle">
                <arrow-right :size="arrowSize" fill="#967eb8" theme="filled" />
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
  background-color: #EAEBF6;
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
  justify-content: center;
}

.left-column img {
  width: 65%;
  height: auto;
  padding: 0;
}

.invitation-text {
  font-family: 'Raleway';
  font-weight: 700;
  color: #7A65A3;
  font-style: italic;
  font-size: 2vw;
  text-align: center;
  padding: 0 0 (-2)vw 0;
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
  color: #33378C;
  font-size: 2.5vw;
  text-align: center;
  padding: auto;
}

.line {
  width: 18vw;
  height: 2px;
  background-color: #33378C;
  position: relative;
  margin: 0 auto 0vw auto;
}

.dot {
  position: absolute;
  top: -4px;
  width: 10px;
  height: 10px;
  background-color: #33378C;
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
  color: #7A65A3;
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
    90deg,
    #ffc6b4 0.67%,
    #ffa7d1 14.09%,
    #ad87cb 68.63%,
    #a78cd0 80.36%,
    #726cad 100%
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
  color: #967eb8;
  font-size: 3vw;
}

.button-text {
  color: #967eb8;
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
  background-color: #967eb8;
}

@media screen and (min-width: 1921px) {
  .card-container .right-column .to-membership .text-wrapper .button-text::after {
    bottom: -7px;
    height: 2.8px;
  }
}

@media screen and (max-width: 850px) {
  .button-text {
  letter-spacing: 0vw;
  font-size: 2.4vw;
  }
}

@media screen and (max-width: 700px) {
.card-section {
  flex-direction: column;
}

.left-column {
  padding: 4vw 0 0 0;
}

.left-column img {
  width: 50%;
  height: auto;
  padding: 0;
}

.invitation-text {
  font-size: 3vw;
  margin-top: -0.5vw;
}

.right-column {
  width: 100%;
  flex-direction: column;
  padding: 0 0 4vw 0;
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
</style>
