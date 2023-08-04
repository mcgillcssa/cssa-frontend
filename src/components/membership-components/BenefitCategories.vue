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
        <!-- Container of merchant name and carousel-->
        <div class="modal-top-container">
          <div class="merchant-name">
            {{ this.currentBenefit.merchantName }} /
            {{ this.currentBenefit.merchantAlternativeName }}
          </div>
          <!-- Carousel of images related to the benefit -->
          <ImageCarousel :images="this.currentBenefit.merchantImagesUrl"> </ImageCarousel>
        </div>
        <!-- The information related to the benefit is displayed -->
        <ul class="info-list">
          <li>
            <local
              theme="filled"
              size="36"
              fill="#9C71C6"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            <span class="list-content">{{ this.currentBenefit.merchantAddress }}</span>
          </li>
          <li>
            <phone-call
              theme="filled"
              size="36"
              fill="#9C71C6"
              :strokeWidth="3"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            <span class="list-content">{{ this.currentBenefit.merchantPhone }}</span>
          </li>
          <li>
            <alarm-clock
              theme="filled"
              size="36"
              fill="#9C71C6"
              :strokeWidth="3"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            <span class="list-content">{{ this.currentBenefit.merchantOpeningHours }}</span>
          </li>
          <li>
            <coupon
              theme="filled"
              size="36"
              fill="#9C71C6"
              :strokeWidth="3"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            <span class="list-content">{{ this.currentBenefit.merchantDiscount }}</span>
          </li>
          <li>
            <buy
              theme="filled"
              size="36"
              fill="#9C71C6"
              :strokeWidth="3"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            <span class="list-content">{{ this.currentBenefit.merchantPaymentMethods }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCarousel from './ImageCarousel.vue'
import axios from 'axios'
import { Local, PhoneCall, AlarmClock, Coupon, Buy } from '@icon-park/vue-next'

export default {
  // Importing used components
  components: {
    ImageCarousel,
    Local,
    PhoneCall,
    AlarmClock,
    Coupon,
    Buy
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
  font-family: 'Raleway';
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
  width: 500px;
  padding-top: 20px;
  border-radius: 5px;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.modal-top-container {
  background-color: #9c71c6;
  width: 100%;
}

.merchant-name {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: #ffffff;
  padding: 10px;
}

.info-list {
  margin-top: 20px;
  width: 450px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-list li {
  display: flex;
  align-items: center;
  padding: 0;
  position: relative;
  gap: 20px;
}

.list-content {
  display: flex;
  justify-content: center; /* New: centers the text */
  align-items: center; /* New: centers the text vertically */
  background-color: #f8f1ff;
  flex-grow: 1; /* New: makes the span fill the remaining space */
  padding: 10px 20px; /* New: adds some padding around the text */
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 450;
  color: #9c71c6;
  border-radius: 5px;
  transform: scale(1, 0.95);
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
