<!-- BenefitCategories.vue -->
<template>
  <div class="benefit-categories">
    <div class="category-table" v-for="category in categories" :key="category.id">
      <h3 class="category-title">{{ category.name }}</h3>
      <div class="benefit-images-container">
        <img
          v-for="benefit in category.benefits"
          :key="benefit.id"
          :src="benefit.imageUrl"
          :alt="benefit.name"
          @click.stop="showWebsitePopup(benefit)"
          class="benefit-image"
        />
      </div>
    </div>
    <div v-if="showPopup" class="popup" @click="hideWebsitePopup">
      <div class="popup-content">
        <ImageCarousel class="carousel" v-slot="{ currentSlide }">
          <ImageSlide v-for="(slide, index) in this.currentBenefit.shopImages" :key="index">
            <div v-show="currentSlide === index + 1" class="slide-info">
              <img :src="slide.url" :alt="slide.alt" class="slide-image" />
            </div>
            <p>hello</p>
          </ImageSlide>
        </ImageCarousel>
        <p>Address: {{ this.currentBenefit.websiteUrl }}</p>
        <p>Website: {{ this.currentBenefit.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCarousel from './ImageCarousel.vue'
import ImageSlide from './ImageSlide.vue'
export default {
  components: {
    ImageCarousel,
    ImageSlide
  },

  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Category 1',
          benefits: [
            {
              id: 1,
              name: 'CNTRBND',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.cntrbndshop.com/',
              address: ': 2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/JfjKXl2.png', alt: 'Image 2' }
              ]
            },
            {
              id: 2,
              name: 'Benefit B',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.cntrbndshop.com/',
              address: ': 2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 2' }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Category 2',
          benefits: [
            {
              id: 3,
              name: 'Benefit C',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.benefitC-website.com',
              address: '2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 2' }
              ]
            },
            {
              id: 4,
              name: 'Benefit D',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.benefitD-website.com',
              address: ': 2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 2' }
              ]
            },
            {
              id: 5,
              name: 'Benefit F',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.benefitD-website.com',
              address: '2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 2' }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Category 3',
          benefits: [
            {
              id: 3,
              name: 'Benefit C',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.benefitC-website.com',
              address: '2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 2' }
              ]
            },
            {
              id: 4,
              name: 'Benefit D',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.benefitD-website.com',
              address: '2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 2' }
              ]
            },
            {
              id: 5,
              name: 'Benefit F',
              imageUrl: 'https://i.imgur.com/BA7Se7s.png',
              websiteUrl: 'https://www.benefitD-website.com',
              address: '2185 Rue Crescent, Montréal, QC H3G 2C1',
              shopImages: [
                { id: 1, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 1' },
                { id: 2, url: 'https://i.imgur.com/BA7Se7s.png', alt: 'Image 2' }
              ]
            }
          ]
        }
        // Add more categories here if you have any initial data
      ],
      showPopup: false,
      currentBenefit: null
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
  display: grid;
  gap: 5px;
  background-color: #fff;
  height: 500px;
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

.slide-image {
  max-width: 350px;
  max-height: 350px;
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
