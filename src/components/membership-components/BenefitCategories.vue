<template>
  <!-- The outer div contains all the benefit categories -->
  <div class="benefit-categories">
    <!-- A category table is created for each benefit type -->
    <div
      class="category-table"
      v-for="(benefits, categoryName) in benefitsByType"
      :key="categoryName"
    >
      <!-- Display the name of the benefit category -->
      <h3 class="category-title">{{ categoryName }}</h3>
      <!-- Container for all the images related to the benefits in this category -->
      <div class="benefit-images-container">
        <!-- An image is displayed for each benefit. Clicking on the image opens a popup with more information -->
        <img
          v-for="benefit in benefits"
          :key="benefit.merchantName"
          :src="benefit.stripeUrl"
          :alt="benefit.merchantName"
          @click="showWebsitePopup(benefit)"
          class="benefit-image"
        />
      </div>
    </div>
    <!-- The modal overlay is displayed when a benefit image is clicked -->
    <div v-if="showPopup" class="modal-overlay" @click.self="hideWebsitePopup">
      <!-- The content of the modal -->
      <div class="modal">
        <!-- Carousel of images related to the benefit -->
        <ImageCarousel :images="this.currentBenefit.merchantImagesUrl"> </ImageCarousel>
        <!-- The information related to the benefit is displayed -->
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
import axios from 'axios'

export default {
  // Importing used components
  components: {
    ImageCarousel
  },

  data() {
    return {
      // Data arrays for benefits and current benefit
      benefitsByType: [],
      showPopup: false,
      currentBenefit: null
    }
  },

  async created() {
    try {
      // Fetch data from backend API on component creation
      const response = await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/membershipBenefits/allByMerchantType`
      )
      this.benefitsByType = response.data.benefitsByType
    } catch (err) {
      console.error(err)
    }
  },

  methods: {
    // Show the website popup and set the current benefit when an image is clicked
    showWebsitePopup(benefit) {
      this.showPopup = true
      this.currentBenefit = benefit
    },
    // Hide the website popup when anywhere outside the popup is clicked
    hideWebsitePopup() {
      this.showPopup = false
      this.currentBenefit = null
    }
  }
}
</script>

<style>
/* Styling for the component */
/* 3 columns grid to display the benefit categories */
.benefit-categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

/* Each benefit category has a padding and includes the padding and border in width */
.category-table {
  padding: 10px;
  box-sizing: border-box;
}

/* Title for each benefit category is bold and centered */
.category-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

/* Benefit images are displayed under the category title and centered */
.benefit-images-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Custom size for benefit images */
.benefit-image {
  width: 300px;
  height: auto;
  display: block;
  margin: 5px;
  cursor: pointer;
}

/* Styles for the modal overlay when it is displayed */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Styles for the content in the modal window */
.modal {
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

/* Adjust grid and image size for smaller screens */
@media (max-width: 992px) {
  .benefit-categories {
    grid-template-columns: repeat(2, 1fr);
  }

  .benefit-image {
    width: 200px;
  }
}

/* Adjust grid and image size for even smaller screens */
@media (max-width: 768px) {
  .benefit-categories {
    grid-template-columns: repeat(1, 1fr);
  }

  .benefit-image {
    width: 150px;
  }
}
</style>
