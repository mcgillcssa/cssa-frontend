<template>
  <gradient-stripe></gradient-stripe>
  <div class="page-content">
    <div class="title-container">
      <div class="b-title-wrapper">
        <div class="left-square"></div>
        <h1 class="title">会员卡合作商家 Loyalty Merchants</h1>
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
      href="https://docs.google.com/forms/d/e/1FAIpQLSfUENPuXO-JNhb2nKPcZW6hhytXsdGfCV8vYv5Q8zDBC-JHqg/viewform"
      target="_blank"
      rel="noopener noreferrer"
      :class="{ 'fade-in': isIntersecting }"
    >
      <div class="form-text-wrapper">
        <h2 class="form-button-text">REGISTER NOW!</h2>
      </div>
      <div class="form-circle-wrapper">
        <div class="form-circle">
          <arrow-right :size="arrowSize" fill="#1A4F87" theme="filled" />
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
      const leftSquare = document.querySelector('.left-square')
      const rightSquare = document.querySelector('.right-square')
      const categoryList = document.querySelector('.categories-list')

      if (title) title.classList.add('animate')
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
body {
  font-size: 24px;
}
.page-content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 48px);
  background-color: #E3F4FF;
  align-items: center;
}

.title-container {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E3F4FF;
  margin: 0;
  padding: 0;
}

.b-title-wrapper {
  /* display: inline-block; */

  display: flex;
  align-items: center;
  justify-content: center;
  background: #3F83CE;
  width: 60vw;
  height: auto;
  border-radius: 20px;
  position: relative;
}

.title {
  background: #3F83CE;
  text-align: center;
  margin: 0 auto;
  padding: 5px 0 0 0;
  width: 70vw;
  height: auto;
  color: #fff;
  letter-spacing: 2px;
  font-weight: 600;
  border-radius: 20px;
  font-size: 1.8em;
  opacity: 0;
}

.left-square,
.right-square {
  width: 10px;
  height: 10px;
  background-color: #1A4F87;
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
}

.circle-start,
.circle-end {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #87AECB;
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

.to-membership-card-form {
  display: flex;
  width: 90vw;
  height: auto;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right,
    #FFEE8F 0.67%,
    #E3FBCF 16.5%,
    #BBF0FA 30%,
    #ABD9FF 44.5%,
    #5DABF3 62%,
    #448FD6 81.5%,
    #3262BA 99.99%
    );
  text-decoration: none;
  padding: 2vw;
  margin-bottom: 4vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
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
  color: #1A4F87;
  font-size: 3vw;
}

.form-button-text {
  color: #1A4F87;
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
  background-color: #1A4F87;
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
    background-color: #7ea3b8;
  }
}

/* Small devices */
@media screen and (min-width: 501px) and (max-width: 800px) {
  body {
    font-size: 16px;
  }

  .title-container {
    height: 120px;
  }

  .title {
    padding: 2px 0 0 0;
    height: auto;
    font-size: 5vw;
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
    background-color: #7ea3b8;
  }
}

@media screen and (max-width: 500px) {
  body {
    font-size: 12px;
  }

  .title-container {
    height: 75px;
  }

.title{
  font-size: 5vw;
  height: 70px;
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
    background-color: #7ea3b8;
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
