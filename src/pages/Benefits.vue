<template>
  <div class="navbar-with-background">
    <nav-bar-gradient-stripe></nav-bar-gradient-stripe>
    <NavBar />
  </div>
  <div class="page-content">
    <div class="title-container">
      <div class="b-title-wrapper">
        <div class="left-square"></div>
        <div class="title-content">
          <h1 class="title">{{ $t('benefits.title') }}</h1>
          <h2 class="subtitle">{{ $t('benefits.subtitle') }}</h2>
        </div>
        <div class="right-square"></div>
      </div>
    </div>
    <div class="categories-list">
      <div
        class="column"
        v-for="(benefits, index) in [column1Benefits, column2Benefits, column3Benefits]"
        :key="index"
      >
        <category-accordion :benefits="benefits" />
      </div>
    </div>
  </div>
  <div class="benefits-separator first-line-break">
      <div class="circle-start"></div>
      <div class="line"></div>
      <div class="circle-end"></div>
    </div>
  <div>
    <a
      ref="formSection"
      class="to-membership-card-form"
      href="https://wj.qq.com/s2/23671058/2dd9/"
      target="_blank"
      rel="noopener noreferrer"
      :class="{ 'fade-in': isIntersecting }"
    >
      <div class="form-text-wrapper">
        <h2 class="form-button-text">REGISTER NOW!</h2>
      </div>
      <div class="form-circle-wrapper">
        <div class="form-circle">
          <arrow-right :size="arrowSize" class="arrow-right" theme="filled" />
        </div>
      </div>
    </a>
  </div>
  <gradient-stripe></gradient-stripe>
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, nextTick, watchEffect } from 'vue'
import { ArrowRight } from '@icon-park/vue-next';
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
import NavBarGradientStripe from '../components/NavBarGradientStripe.vue'
import GradientStripe from '../components/GradientStripe.vue'
import CategoryAccordion from '../components/benefits/CategoryAccordion.vue'
import Footer from '../components/Footer.vue'

const benefitsByType = ref({})
const column1Benefits = ref({})
const column2Benefits = ref({})
const column3Benefits = ref({})

const distributeBenefits = () => {
  let column1Weight = 0
  let column2Weight = 0
  let column3Weight = 0

  for (let [categoryName, benefits] of Object.entries(benefitsByType.value)) {
    const categoryWeight = benefits.length

    if (Math.min(column1Weight, column2Weight, column3Weight) === column1Weight) {
      column1Benefits.value[categoryName] = benefits
      column1Weight += categoryWeight
    } else if (Math.min(column1Weight, column2Weight, column3Weight) === column2Weight) {
      column2Benefits.value[categoryName] = benefits
      column2Weight += categoryWeight
    } else {
      column3Benefits.value[categoryName] = benefits
      column3Weight += categoryWeight
    }
  }
}

onMounted(async () => {
  window.scrollTo(0, 0);

  try {
    const response = await axios.get(
      `${process.env.VUE_APP_BACKEND_URL}/api/membershipBenefits/allByMerchantType`
    )
    benefitsByType.value = response.data.benefitsByType
    distributeBenefits()

    await nextTick()
    requestAnimationFrame(() => {
      const title = document.querySelector('.title')
      const subtitle = document.querySelector('.subtitle')
      const leftSquare = document.querySelector('.left-square')
      const rightSquare = document.querySelector('.right-square')
      const categoryList = document.querySelector('.categories-list')

      if (title) title.classList.add('animate')
      if (subtitle) subtitle.classList.add('animate')
      if (leftSquare) leftSquare.classList.add('animate')
      if (rightSquare) rightSquare.classList.add('animate')
      if (categoryList) categoryList.classList.add('animate')
    })
  } catch (err) {
    console.error(err)
    alert('Failed to fetch benefits.')
  }
})

const arrowSize = ref(64)
const isIntersecting = ref(false)
const formSection = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isIntersecting.value = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (formSection.value) {
    observer.observe(formSection.value);
  }

  watchEffect(() => {
    const width = window.innerWidth
    if (width < 600) {
      arrowSize.value = 50
    } else if (width >= 600 && width < 700) {
      arrowSize.value = 55
    } else if (width >= 700 && width < 1024) {
      arrowSize.value = 60
    } else {
      arrowSize.value = 64
    }
  })
})

</script>

<style>
.navbar-with-background {
  position: relative; /* 相对定位容器 */
  width: 100%;
  height: 100px; /* 与gradient stripe高度匹配 */
}

body {
  font-size: 24px;
  /* background-color: #DBC7F5; */
}

/* Benefits页面的navbar样式 */
:deep(.navbar) {
  position: relative !important; /* 改为相对定位 */
  z-index: 10 !important; /* 提高z-index确保在gradient stripe之上 */
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
  border-bottom: 1px solid rgba(67, 16, 112, 0.1) !important;
  pointer-events: auto !important; /* 确保可以点击 */
}

:deep(.navbar .home-text) {
  color: #431070 !important;
}

:deep(.language-btn) {
  pointer-events: auto !important; /* 确保语言按钮可以点击 */
  z-index: 20 !important;
  background: rgba(67, 16, 112, 0.8) !important; /* 在Benefits页面使用更深的背景 */
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
}

:deep(.language-btn:hover) {
  background: rgba(67, 16, 112, 1) !important; /* 悬停时完全不透明 */
}

:deep(.language-dropdown) {
  pointer-events: auto !important; /* 确保下拉菜单可以点击 */
  z-index: 20 !important;
}

:deep(.navbar .link-element) {
  color: #431070 !important;
  font-weight: 600;
}

:deep(.navbar .link-element:hover) {
  color: #9d69e2 !important;
}

/* 为固定navbar留出空间 */
.navbar-spacer {
  height: 100px;
  width: 100%;
}

.page-content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 48px);
  background-color: #EEE1FF;
  align-items: center;
  padding-top: 0;
  margin-top: 0; /* 移除margin，因为navbar-spacer已经处理了间距 */
}

.title-container {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EEE1FF;
  margin: 0;
  padding: 0;
}

.b-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #9d69e2;
  width: 60vw;
  height: auto;
  border-radius: 20px;
  position: relative;
  padding: 10px 0;
}

.title-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.title {
  background: transparent;
  text-align: center;
  margin: 0;
  padding: 5px 0 0 0;
  width: 100%;
  height: auto;
  color: #fff;
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 1.8em;
  opacity: 0;
  /* 字体选择 - 可以尝试以下几种组合 */
  font-family: 'Raleway', 'CircularStd', 'Infinity', sans-serif;
  /* 
  其他字体选项：
  font-family: 'CircularStd', 'Raleway', sans-serif;  // 现代简洁
  font-family: 'Infinity', 'Raleway', sans-serif;     // 独特风格
  font-family: 'Raleway', sans-serif;                 // 经典优雅
  */
}

.subtitle {
  background: transparent;
  text-align: center;
  margin: 3px 0 0 0;
  padding: 0;
  width: 100%;
  height: auto;
  color: #fff;
  letter-spacing: 1px;
  font-weight: 400;
  font-size: 1.0em;
  opacity: 0;
  /* 副标题字体 - 与主标题保持一致或选择更轻的字重 */
  /* font-family: 'Raleway', 'CircularStd', 'Infinity', sans-serif; */

  /*其他副标题字体选项：*/
  font-family: 'CircularStd', 'Raleway', sans-serif;  /* 现代简洁 */
  /* font-family: 'Infinity', 'Raleway', sans-serif;     // 独特风格 */
  font-weight: 300;  /* 可以使用更轻的字重 */
}

.left-square,
.right-square {
  width: 10px;
  height: 10px;
  background-color: #431070;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
}

.left-square {
  left: -40vw; /* position it to the left of the h1 */
  transition: all 0.5s;
}
.right-square {
  right: -40vw; /* position it to the right of the h1 */
  transition: all 0.5s;
}

.categories-list {
  display: grid;
  padding: 0 20px 0 20px;
  opacity: 0;
}
.column {
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: auto;
}

.benefits-separator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin: 40px 0;
  z-index: -1;
}

.circle-start,
.circle-end {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #9D69E2;
}

.line {
  flex-grow: 0.9;
  height: 4px;
  margin: 0 20px;
}

.first-line-break .line {
  background: linear-gradient(
    to right,
    #9D69E2 0%,
    #9D69E2 19%,
    transparent 19%,
    transparent 21%,
    #9D69E2 21%,
    #9D69E2 100%
  );
}

.last-line-break .line {
  background: linear-gradient(
    to right,
    #9D69E2 0%,
    #9D69E2 79%,
    transparent 79%,
    transparent 81%,
    #9D69E2 81%,
    #9D69E2 100%
  );
}

.to-membership-card-form {
  display: flex;
  width: 85vw;
  height: auto;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right,
    #431070 1%,
    #7E21D0 17%,
    #9D69E2 30%,
    #DBC7F5 44%,
    #9D69E2 62%,
    #7E21D0 81%,
    #431070 100%
    );
  text-decoration: none;
  padding: 2vw;
  margin-bottom: 4vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: auto;
}

.form-text-wrapper{
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

.form-circle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.form-circle {
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

.form-button-text {
  color: #431070;
  letter-spacing: 0.2vw;
  font-size: 1.4em;
  text-decoration: none;
  position: relative;
  display: inline-block;
}

.form-button-text::after {
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

@media screen and (min-width: 1201px) {
  .categories-list {
    grid-template-columns: repeat(3, 1fr);
  }

}

@media screen and (min-width: 801px) and (max-width: 1200px) {
  body {
    font-size: 20px;
  }

  .title-container {
    height: 125px;
  }

  .circle {
    width: 100px;
    height: 100px;
  }

  .benefits-separator {
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
    background-color: #9D69E2;
  }
}

/* Small devices */
@media screen and (min-width: 501px) and (max-width: 800px) {
  body {
    font-size: 16px;
  }

  .navbar-with-background {
    height: 80px; /* 匹配中等屏幕的gradient stripe高度 */
  }

  .navbar-spacer {
    height: 80px; /* 与小屏幕navbar高度匹配 */
  }

  .title-container {
    height: 120px;
  }

  .title {
    padding: 2px 0 0 0;
    height: auto;
    font-size: 5vw;
  }

  .subtitle {
    font-size: 2.5vw;
  }

  .benefits-separator {
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
    background-color: #9D69E2;
  }
}

@media screen and (max-width: 500px) {
  body {
    font-size: 12px;
  }

  .navbar-with-background {
    height: 70px; /* 匹配小屏幕的gradient stripe高度 */
  }

  .navbar-spacer {
    height: 70px; /* 与超小屏幕navbar高度匹配 */
  }

  .title-container {
    height: 75px;
  }

  .b-title-wrapper {
    margin-top: 10px;
}

.title{
  font-size: 5vw;
  height: 70px;
}

.subtitle {
  font-size: 3.5vw;
  height: auto;
}

.benefits-separator {
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
    background-color: #9D69E2;
  }

  .circle {
    width: 60px;
    height: 60px;
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

.title.animate {
  animation: fadeIn 0.5s forwards;
  animation-delay: 0.5s; /* Start fading in after squares are in position */
}

.subtitle.animate {
  animation: fadeIn 0.5s forwards;
  animation-delay: 0.7s; /* Start fading in after title */
}

.left-square.animate {
  left: -15px;
}

.right-square.animate {
  right: -15px;
}

.categories-list.animate {
  animation: fadeIn 1s forwards;
  animation-delay: 1s; /* Delay so it starts after title fades in */
}
</style>
