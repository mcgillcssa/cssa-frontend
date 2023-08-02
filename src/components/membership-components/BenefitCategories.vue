<!-- BenefitCategories.vue -->
<template>
  <div class="benefit-categories">
    <div
      class="category-table"
      v-for="(benefits, categoryName) in benefitsByType"
      :key="categoryName"
    >
      <h3 class="category-title">{{ categoryName }}</h3>
      <div class="benefit-images-container">
        <img
          v-for="benefit in benefits"
          :key="benefit.merchantName"
          :src="benefit.stripeUrl"
          :alt="benefit.merchantName"
          @click.stop="showWebsitePopup(benefit)"
          class="benefit-image"
        />
      </div>
    </div>
    <div v-if="showPopup" class="popup" @click="hideWebsitePopup">
      <div class="popup-content">
        <ImageCarousel class="carousel" v-slot="{ currentSlide }">
          <ImageSlide v-for="(slide, index) in this.currentBenefit.merchantImagesUrl" :key="index">
            <div v-show="currentSlide === index + 1" class="slide-info">
              <img :src="slide" :alt="slide.alt" class="slide-image" />
            </div>
          </ImageSlide>
        </ImageCarousel>
        <p>{{ this.currentBenefit.merchantName }}</p>
        <p>{{ this.currentBenefit.merchantAlternativeName }}</p>
        <p>地址: {{ this.currentBenefit.merchantAddress }}</p>
        <p>电话: {{ this.currentBenefit.merchantPhone }}</p>
        <p>营业时间: {{ this.currentBenefit.merchantOpeningHours }}</p>
        <p>折扣: {{ this.currentBenefit.merchantDiscount }}</p>
        <p>支付方式: {{ this.currentBenefit.merchantPaymentMethods }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCarousel from './ImageCarousel.vue'
import ImageSlide from './ImageSlide.vue'
import axios from 'axios'
export default {
  components: {
    ImageCarousel,
    ImageSlide
  },

  data() {
    return {
      benefitsByType: [],
      showPopup: false,
      currentBenefit: null
    }
  },

  async created() {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/membershipBenefits/allByMerchantType'
      )
      this.benefitsByType = response.data.benefitsByType
      console.log(response.data.benefitsByType)
    } catch (err) {
      console.error(err)
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    showWebsitePopup(benefit) {
      this.showPopup = true
      this.currentBenefit = benefit
    },
    hideWebsitePopup() {
      this.showPopup = false
      this.currentBenefit = null
    },
    handleClickOutside(event) {
      const popup = this.$el.querySelector('.popup')
      if (popup && !popup.contains(event.target)) {
        this.hideWebsitePopup()
      }
    }
  }
}
</script>

<style>
/* Styling for the component */
.benefit-categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 4 columns per row for PC screens */
  gap: 5px; /* 5px spacing between grid items */
}

.category-table {
  padding: 10px;
  box-sizing: border-box; /* Include padding and border in the width calculation */
}

.category-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

/* Center benefit images under category title */
.benefit-images-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Apply a custom size to benefit images */
.benefit-image {
  width: 300px; /* Fixed image size for benefit images */
  height: auto;
  display: block;
  margin: 5px; /* 5px spacing between benefit images */
  cursor: pointer;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  justify-content: center;
  height: auto;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.carousel {
  position: relative;
  max-width: 200px;
  max-height: 200px;
}

.slide-info {
  display: flex;
  justify-content: center;
}

.slide-image {
  max-width: 250px;
  max-height: 200px; /* Reducing the height */
  object-fit: contain;
  align-self: center;
  margin-bottom: 10px;
}
/* Media query for smaller screens */
@media (max-width: 992px) {
  .benefit-categories {
    grid-template-columns: repeat(2, 1fr); /* 2 columns per row for smaller screens */
  }

  .benefit-image {
    width: 300px; /* Smaller image size for smaller screens */
  }
}

@media (max-width: 768px) {
  .benefit-categories {
    grid-template-columns: repeat(1, 1fr); /* 2 columns per row for smaller screens */
  }

  .benefit-image {
    width: 300px; /* Smaller image size for smaller screens */
  }
}
</style>
