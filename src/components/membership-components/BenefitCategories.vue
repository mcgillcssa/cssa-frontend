<template>
  <div class="gradient-stripe"></div>

  <div class="title-container"><h1>会员卡合作商家</h1></div>
  <div class="categories-list">
    <div class="column"><category-accordion :benefits="this.column1Benefits" /></div>
    <div class="column"><category-accordion :benefits="this.column2Benefits" /></div>
    <div class="column"><category-accordion :benefits="this.column3Benefits" /></div>
  </div>
  <div class="gradient-stripe"></div>
</template>

<script>
import axios from 'axios'

import CategoryAccordion from './CategoryAccordion.vue'

export default {
  components: {
    CategoryAccordion
  },
  data() {
    return {
      iconSize: '36',
      // Data arrays for benefits and current benefit
      benefitsByType: {},
      column1Benefits: {},
      column2Benefits: {},
      column3Benefits: {}
    }
  },
  async created() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/membershipBenefits/allByMerchantType`
      )
      this.benefitsByType = response.data.benefitsByType
    } catch (err) {
      console.error(err)
      alert('Failed to fetch benefits.')
    }
    this.distributeBenefits()
  },
  methods: {
    distributeBenefits() {
      let column1Weight = 0
      let column2Weight = 0
      let column3Weight = 0

      for (let [categoryName, benefits] of Object.entries(this.benefitsByType)) {
        const categoryWeight = benefits.length

        if (Math.min(column1Weight, column2Weight, column3Weight) == column1Weight) {
          this.column1Benefits[categoryName] = benefits
          column1Weight += categoryWeight
        } else if (Math.min(column1Weight, column2Weight, column3Weight) == column2Weight) {
          this.column2Benefits[categoryName] = benefits
          column2Weight += categoryWeight
        } else {
          this.column3Benefits[categoryName] = benefits
          column3Weight += categoryWeight
        }
      }
    }
  }
}
</script>

<style scoped>
.carousel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.carousel img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  display: block;
}

.control {
  position: absolute;
  z-index: 1;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  cursor: pointer;
}

/* Apply hover effects only for devices that support hover */
@media (hover: hover) {
  .control:hover {
    transform: translateY(-50%) scale(1.2);
  }
}

.control:active {
  transform: translateY(-50%) scale(0.9);
}

.previous {
  left: 10px;
}

.next {
  right: 10px;
}

.slide-selector {
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 10px;
  background-color: #ffffff;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Updated .selector class */
.selector {
  height: 4px; /* Make the line thicker */
  margin: 0 5px;
  background-color: rgb(255, 255, 255);
  border: #9c71c6 2px solid;
  cursor: pointer;
  transition: width 0.3s ease, border-radius 0.3s ease; /* Added border-radius transition */
  border-radius: 2px; /* Make the ends rounded */
}

.selector.active {
  background-color: #9c71c6;
  border-radius: 2px; /* Keep the ends rounded when active */
}

@media (max-width: 600px) {
  .carousel img {
    max-height: 180px;
  }
}
</style>
