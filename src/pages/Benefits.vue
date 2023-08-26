<template>
  <div class="gradient-stripe"></div>
  <div class="page-content">
    <div class="title-container">
      <div class="title-wrapper">
        <div class="left-square"></div>
        <h1 class="title">会员卡合作商家</h1>
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
  <div class="gradient-stripe"></div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import CategoryAccordion from '../components/benefits/CategoryAccordion.vue'

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

    if (Math.min(column1Weight, column2Weight, column3Weight) == column1Weight) {
      column1Benefits.value[categoryName] = benefits
      column1Weight += categoryWeight
    } else if (Math.min(column1Weight, column2Weight, column3Weight) == column2Weight) {
      column2Benefits.value[categoryName] = benefits
      column2Weight += categoryWeight
    } else {
      column3Benefits.value[categoryName] = benefits
      column3Weight += categoryWeight
    }
  }
}

onMounted(async () => {
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

      title.classList.add('animate')
      leftSquare.classList.add('animate')
      rightSquare.classList.add('animate')
      categoryList.classList.add('animate')
    })
  } catch (err) {
    console.error(err)
    alert('Failed to fetch benefits.')
  }
})
</script>

<style>
body {
  font-size: 24px;
}
.gradient-stripe {
  width: 100%;
  height: 24px;
  background: linear-gradient(
    90deg,
    #ffc6b4 0.67%,
    #ffa7d1 14.09%,
    #ad87cb 39.63%,
    #8986ed 68.36%,
    #4f78c9 100%
  );
}
.page-content {
  min-height: calc(100vh - 48px);
  background-color: #eaebf6;
}
.title-container {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaebf6;
  margin: 0;
  padding: 0;
}
.title-wrapper {
  display: inline-block; /* This will make the div only as wide as its contents */
  position: relative;
}

.title {
  background: #8987cb;
  text-align: center;
  margin: 0 auto;
  padding: 5px 0 0 0;
  width: 600px;
  height: 75px;
  color: #fff;
  letter-spacing: 2px;
  font-weight: 600;
  border-radius: 20px;
  font-size: 2em;
  opacity: 0;
}

.left-square,
.right-square {
  width: 10px; /* width of the square */
  height: 10px; /* height of the square */
  background-color: #7a65a3; /* color of the square */
  position: absolute; /* position it absolutely with respect to the h1 element */
  top: 50%; /* center it vertically */
  transform: translateY(-50%); /* perfectly center it vertically */
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
  .title-container h1 {
    padding: 3px 0 0 0;
    width: 500px;
    height: 60px;
  }
}

/* Small devices */
@media screen and (min-width: 501px) and (max-width: 800px) {
  body {
    font-size: 16px;
  }
  .title-container {
    height: 100px;
  }
  .title-container h1 {
    padding: 2px 0 0 0;
    width: 400px;
    height: 50px;
  }
}

@media screen and (max-width: 500px) {
  body {
    font-size: 12px;
  }
  .title-container {
    height: 75px;
  }
  .title-container h1 {
    padding: 5px 0 0 0;
    width: 80vw;
    height: 40px;
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
