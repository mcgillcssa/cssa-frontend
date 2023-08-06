<template>
  <div class="gradient-stripe"></div>

  <div class="title-container"><h1>会员卡合作商家</h1></div>
  <div class="categories-list">
    <div class="column">
      <div
        class="benefit-category"
        v-for="(benefits, categoryName) in column1Benefits"
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
    </div>

    <div class="column">
      <div
        class="benefit-category"
        v-for="(benefits, categoryName) in column2Benefits"
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
    </div>

    <div class="column">
      <div
        class="benefit-category"
        v-for="(benefits, categoryName) in column3Benefits"
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
    </div>
    <!-- The modal overlay is displayed when a benefit image is clicked -->
    <div v-if="showPopup" class="modal-overlay" @click.self="hideWebsitePopup">
      <!-- The content of the modal -->
      <div class="modal">
        <!-- Container of merchant name and carousel-->
        <div class="modal-top-container">
          <div class="merchant-name">
            {{ this.currentBenefit.merchantName }} <br />
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
              :size="listIconSize"
              fill="#9C71C6"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            <span class="list-content">{{ this.currentBenefit.merchantAddress }}</span>
          </li>
          <li>
            <phone-call
              theme="filled"
              :size="listIconSize"
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
              :size="listIconSize"
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
              :size="listIconSize"
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
              :size="listIconSize"
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
  <div class="gradient-stripe"></div>
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
      listIconSize: '36',
      // Data arrays for benefits and current benefit
      benefitsByType: {},
      column1Benefits: {},
      column2Benefits: {},
      column3Benefits: {},
      benefitWeights: {},
      showPopup: false,
      currentBenefit: null
    }
  },

  async created() {
    window.addEventListener('resize', this.updateListIconSize)
    try {
      // Fetch data from backend API on component creation
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

  mounted() {
    this.updateListIconSize()
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
    },
    updateListIconSize() {
      if (window.innerWidth < 600) {
        this.listIconSize = '24'
      } else {
        this.listIconSize = '36'
      }
    },
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
  content: ''; /* this is necessary for the pseudo-element to be shown */
  width: 10px; /* width of the square */
  height: 10px; /* height of the square */
  background-color: #7a65a3; /* color of the square */
  position: absolute; /* position it absolutely with respect to the h1 element */
  top: 50%; /* center it vertically */
  transform: translateY(-50%); /* perfectly center it vertically */
}

.title-container h1::before {
  left: -15px; /* position it to the left of the h1 */
}

.title-container h1::after {
  right: -15px; /* position it to the right of the h1 */
}

.categories-list {
  margin: 0;
  padding: 0 0 50px 0;
  display: flex;
  flex-wrap: wrap; /* Wrap the columns if they don't fit the container width */
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

.benefit-category {
  background: #fff;
  margin: 10px;
  padding: 20px;
  border: 1px solid #cbbcdb;
  border-radius: 10px;
}

/* Title for each benefit category is bold and centered */
.category-title {
  margin: 0 0 20px 0;
  padding: 10px;
  background: #eaebf6;
  color: #9c71c6;
  border: 1px solid #cbbcdb;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Raleway';
  text-align: center;
  border-radius: 10px;
}

/* Benefit images are displayed under the category title and centered */
.benefit-images-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 0 10px 0 10px;
}

/* Custom size for benefit images */
.benefit-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 10px 0 10px 0;
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
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: auto;
  width: 500px;
  padding-top: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  max-height: 90vh; /* Set the maximum height to 90% of the viewport height */
  overflow-y: auto; /* Add vertical scroll when needed */
  margin: 5% auto; /* Add vertical margin to the modal */
  flex-shrink: 0;
}

.modal::-webkit-scrollbar {
  width: 8px;
}

.modal::-webkit-scrollbar-thumb {
  background-color: rgba(156, 113, 198, 0.5); /* Semi-transparent purple */
  border-radius: 4px;
}

.modal::-webkit-scrollbar-track {
  background: transparent; /* Make the track transparent */
}

/* Styling the scrollbar for Firefox */
.modal {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 113, 198, 0.5) transparent;
}

.modal-top-container {
  margin: auto;
  position: relative;
  font-size: 1em;
  background-color: #9c71c6;
  width: 100%;
}

.merchant-name {
  text-align: center;
  font-size: 1.5em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: #ffffff;
  padding: 10px;
}

.info-list {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: calc(100% - 40px);
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 1em;
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
  font-weight: 450;
  color: #9c71c6;
  border-radius: 5px;
  transform: scale(1, 0.95);
}
/* Three Columns for Large Screens (for screens larger than 1200px) */
@media (min-width: 1200px) {
  .column {
    flex: 0 0 33.33%; /* flex-grow, flex-shrink, flex-basis */
    max-width: 33.33%;
  }
}

/* Two Columns for Medium Screens (for screens between 600px and 1199px) */
@media (min-width: 600px) and (max-width: 1199px) {
  .column {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
/* Small devices */
@media (max-width: 600px) {
  .categories-list {
    flex-direction: column; /* This will stack the columns vertically */
  }

  .column {
    width: 100%;
  }

  .modal {
    padding-top: 10px;
    width: 300px;
    font-size: 12px;
  }

  .merchant-name {
    padding: 5px;
  }

  .info-list {
    margin-top: 10px;
    width: calc(100% - 20px);
    gap: 10px;
  }

  .info-list li {
    gap: 10px;
  }
}
</style>
