<template>
  <div class="benefit-category" v-for="(benefits, categoryName) in benefits" :key="categoryName">
    <h3 class="category-title">
      {{ categoryName
      }}<down
        class="expand-icon"
        theme="filled"
        :size="iconSize"
        fill="#9C71C6"
        :strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </h3>
    <div class="benefit-images-container">
      <img
        v-for="benefit in benefits"
        :key="benefit.merchantName"
        :src="benefit.stripeUrl"
        :alt="benefit.merchantName"
        @click="showModal(benefit)"
        class="benefit-image"
      />
    </div>
  </div>
  <benefit-modal
    :visibleModal="this.visibleModal"
    :benefit="this.currentBenefit"
    @hide-modal="hideModal"
  />
</template>

<script>
import { Down } from '@icon-park/vue-next'
import BenefitModal from './BenefitModal.vue'

export default {
  components: {
    Down,
    BenefitModal
  },
  props: {
    benefits: { type: Object, required: true }
  },
  data() {
    return {
      iconSize: '36',
      visibleModal: false,
      currentBenefit: null
    }
  },
  created() {
    window.addEventListener('resize', this.updateIconSize)
  },
  mounted() {
    this.updateIconSize()
  },
  methods: {
    showModal(benefit) {
      this.visibleModal = true
      this.currentBenefit = benefit
    },
    hideModal() {
      this.visibleModal = false
      this.currentBenefit = null
    },
    updateIconSize() {
      if (window.innerWidth <= 600) {
        this.iconSize = '24'
      } else if (window.innerWidth <= 1200) {
        this.iconSize = '28'
      } else {
        this.iconSize = '36'
      }
    }
  }
}
</script>

<style scoped>
.benefit-category {
  background: #fff;
  margin: 10px;
  padding: 20px;
  border: 1px solid #cbbcdb;
  border-radius: 10px;
}

.category-title {
  position: relative;
  margin: 0 0 20px 0;
  padding: 10px;
  background: #eaebf6;
  color: #9c71c6;
  border: 1px solid #cbbcdb;
  font-size: 1em;
  font-weight: bold;
  font-family: 'Raleway';
  text-align: center;
  border-radius: 10px;
}

.expand-icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}

.benefit-images-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 0 10px 0 10px;
}

.benefit-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 10px 0 10px 0;
  cursor: pointer;
}

@media screen and (min-width: 600px) and (max-width: 1199px) {
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

@media screen and (max-width: 600px) {
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
</style>
