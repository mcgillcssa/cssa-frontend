<template>
  <div class="benefit-category" v-for="(benefits, categoryName) in benefits" :key="categoryName">
    <h3 class="category-title" @click.self="toggleCategoryVisibility(categoryName)">
      {{ categoryName
      }}<down
        class="expand-icon"
        v-show="!visibleCategories[categoryName]"
        theme="filled"
        :size="iconSize"
        fill="#9C71C6"
        :strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <up
        class="expand-icon"
        v-show="visibleCategories[categoryName]"
        theme="filled"
        :size="iconSize"
        fill="#9C71C6"
        :strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </h3>
    <div class="benefit-images-container" v-show="visibleCategories[categoryName]">
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
    :isModalVisible="isModalVisible"
    :benefit="currentBenefit"
    @hide-modal="hideModal"
  />
</template>

<script setup>
import { ref, defineProps, watch, onMounted, onUnmounted } from 'vue'
import { Down, Up } from '@icon-park/vue-next'
import BenefitModal from './BenefitModal.vue'

const props = defineProps({
  benefits: { type: Object, required: true }
})

const visibleCategories = ref({})
const iconSize = ref('36')
const isModalVisible = ref(false)
const currentBenefit = ref(null)

watch(
  props.benefits,
  newBenefits => {
    for (let categoryName in newBenefits) {
      visibleCategories.value[categoryName] = true
    }
  },
  { deep: true, immediate: true }
)

const updateIconSize = () => {
  if (window.innerWidth <= 600) {
    iconSize.value = '24'
  } else if (window.innerWidth <= 1200) {
    iconSize.value = '28'
  } else {
    iconSize.value = '36'
  }
}

onMounted(() => {
  updateIconSize()
  window.addEventListener('resize', updateIconSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIconSize)
})

const toggleCategoryVisibility = categoryName => {
  if (visibleCategories.value[categoryName] === undefined) {
    visibleCategories.value[categoryName] = true
  } else {
    visibleCategories.value[categoryName] = !visibleCategories.value[categoryName]
  }
}

const showModal = benefit => {
  isModalVisible.value = true
  currentBenefit.value = benefit
}

const hideModal = () => {
  isModalVisible.value = false
  currentBenefit.value = null
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
  margin: 0;
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
  margin-top: 20px;
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
