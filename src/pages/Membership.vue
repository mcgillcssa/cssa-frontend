<template>
  <nav-bar />
  <div :style="bannerStyle" class="membership-banner vertical-flex">
    <div class="membership-title"><em>MEMBERSHIP</em></div>
    <div class="arrow-down">
      <arrow-down fill="#FFFFFF" size="124" strokeLinecap="butt" theme="filled" />
    </div>
  </div>
  <div class="content-container vertical-flex">
    <div class="presentation vertical-flex">
      <h3>什么是CSSA会员?</h3>
      <h2>What is CSSA Membership?</h2>
      <div class="presentation-description">
        <img alt="Small Card Design" src="https://i.imgur.com/jkSJenF.png" />
        <div class="description-container">
          <p>
            CSSA会员卡是McGill CSSA携手蒙城各大商家, <br />为大家准备的福利折扣卡!<br />
            凡是在合作商家店铺消费，<br />出示此卡都可以享受优惠！
          </p>
          <p>
            无论百货购物, 还是美发快递看牙医, <br />CSSA会员卡都囊括其中!<br />
            小到买个奶茶, 大到超市采购, <br />它都可以帮你获得折扣！
          </p>
          <p>这种神仙会员卡不值得期待一番吗?</p>
        </div>
      </div>
    </div>
    <div class="membership-separator first-line-break">
      <div class="circle-start"></div>
      <div class="line"></div>
      <div class="circle-end"></div>
    </div>
    <div>
      <router-link class="to-benefits" to="/benefits">
        <div class="text-wrapper">
          <h2 class="button-text">点击查看完整商家名单</h2>
        </div>
        <div class="circle">
          <arrow-right :size="arrowSize" fill="#3961a7" theme="filled" />
        </div>
      </router-link>
    </div>
    <div class="membership-separator last-line-break">
      <div class="circle-start"></div>
      <div class="line"></div>
      <div class="circle-end"></div>
    </div>
    <div class="presentation vertical-flex">
      <h3>以往会员卡设计</h3>
      <h2>Past Membership Card Design</h2>
    </div>
    <card-carousel></card-carousel>
  </div>
  <gradient-stripe/>
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import CardCarousel from '../components/membership/CardCarousel.vue'
import GradientStripe from '@/components/GradientStripe.vue'
import { ArrowDown, ArrowRight } from '@icon-park/vue-next'
import Footer from '../components/Footer.vue'

const bannerUrl = ref('https://i.imgur.com/x3IJjj2.jpg')
const contentSections = ref([])

const bannerStyle = computed(() => ({
  backgroundImage: `url(${bannerUrl.value})`,
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

let arrowSize = ref(64)

onMounted(() => {
  window.scrollTo(0, 0);
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)

  contentSections.value = document.querySelectorAll('.content-container > div')
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})

const updateWindowWidth = () => {
  const aspectRatio = window.innerWidth / window.innerHeight

  if (aspectRatio < 1) {
    bannerUrl.value = 'https://i.imgur.com/SRk5nUk.jpg'
  } else {
    bannerUrl.value = 'https://i.imgur.com/x3IJjj2.jpg'
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

.membership-banner {
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
}

.membership-title {
  margin: 0;
  opacity: 0;
  color: #ffffff;

  font-size: 12vw;
  font-family: 'Infinity';
  text-align: center;
  text-shadow: 2px 2px 5px #1448a1;
  animation: fadeInUp 1s forwards 0.5s;
}

.arrow-down {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
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
  padding-top: 40px;
  background-color: #ddebf8;
}

.presentation {
  margin: 0;

  width: 100%;
  align-items: center;
  gap: 10%;
  font-family: 'CircularStd';
}

.presentation h3 {
  margin: 0;
  font-size: 2vw;
  color: #1c529a;
}

.presentation h2 {
  margin: 0;
  font-size: 3vw;
  color: #1c529a;
}

.presentation-description {
  margin: 30px 40px 0 40px;
  padding: 4vw;

  display: flex;
  width: 90vw;
  flex-wrap: nowrap;

  gap: 50px;

  background-color: #ffffff;
  border: 1px solid #99c0e9;
  border-radius: 30px;
  box-sizing: border-box;
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
  color: #33688c;
  text-align: center;

  font-size: 1.4vw;
}

.membership-separator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin: 40px 0;
}

.circle-start,
.circle-end {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #7ea3b8;
}

.line {
  flex-grow: 0.9;
  height: 4px;
  margin: 0 20px;
}

.first-line-break .line {
  background: linear-gradient(
    to right,
    #7ea3b8 0%,
    #7ea3b8 19%,
    transparent 19%,
    transparent 21%,
    #7ea3b8 21%,
    #7ea3b8 100%
  );
}

.last-line-break .line {
  background: linear-gradient(
    to right,
    #7ea3b8 0%,
    #7ea3b8 79%,
    transparent 79%,
    transparent 81%,
    #7ea3b8 81%,
    #7ea3b8 100%
  );
}

.to-benefits {
  display: flex;
  width: 90vw;
  height: 150px;
  border-radius: 30px;
  align-items: center;
  background-image: linear-gradient(
    90deg,
    #faf29b 0.67%,
    #93e994 14.09%,
    #93e9ca 20.01%,
    #90d3ef 80.36%,
    #6496c3 100%
  );
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
  color: #3961a7;
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

  .separator {
    margin: 20px 0;
  }

  .line {
    height: 2px;
  }

  .circle-start,
  .circle-end {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #7ea3b8;
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

  .membership-separator {
    margin: 20px 0;
  }

  .line {
    height: 2px;
  }

  .circle-start,
  .circle-end {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #7ea3b8;
  }
}

@media screen and (max-width: 800px) {
  .membership-banner {
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
}

  .presentation h3 {
    font-size: 1em;
  }

  .presentation h2 {
    font-size: 2em;
  }

  .presentation-description {
    padding: 30px;
    width: 90%;
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

  .description-container {
    font-size: 2.3vw;
  }

  .membership-separator {
    height: 30px;
    margin: 10px 0;
  }

  .membership-separator {
    margin: 20px 0;
  }

  .line {
    height: 2px;
  }

  .circle-start,
  .circle-end {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #7ea3b8;
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
}

@media screen and (max-width: 600px) {
  .membership-banner {
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
}

  .presentation-description {
    width: 90%;
  }

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
