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
      listIconSize: '36',
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

<style>
body {
  font-size: 48;
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

.title-container h1 {
  position: relative;
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
  font-size: 3em;
}

.title-container h1::before,
.title-container h1::after {
  content: '';
  width: 10px;
  height: 10px;
  background-color: #7a65a3;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.title-container h1::before {
  left: -15px;
}

.title-container h1::after {
  right: -15px;
}

.categories-list {
  margin: 0;
  padding: 0 0 50px 0;
  display: flex;
  flex-wrap: wrap;
  background: #eaebf6;
  min-height: calc(100vh - 48px);
}

.column {
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: auto;
}

@media screen and (min-width: 1200px) {
  .column {
    flex: 0 0 33.33%;
    max-width: 33.33%;
  }
}

@media screen and (min-width: 600px) and (max-width: 1199px) {
  body {
    font-size: 20px;
  }
  .column {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media screen and (max-width: 600px) {
  body {
    font-size: 16px;
  }
  .categories-list {
    flex-direction: column;
  }

  .column {
    width: 100%;
  }
}
</style>
