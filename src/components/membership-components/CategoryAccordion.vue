<template>
  <div class="benefit-category" v-for="(benefits, categoryName) in benefits" :key="categoryName">
    <h3 class="category-title" @click.self="toggleCategoryVisibility(categoryName)">
      {{ categoryName
      }}<down
        class="expand-icon"
        v-show="isCollapsible"
        theme="filled"
        :size="iconSize"
        fill="#9C71C6"
        :strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
        :style="{
          transform: visibleCategories[categoryName] ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center'
        }"
      />
    </h3>
    <div class="benefit-images-container" :ref="el => setContainerRef(el, categoryName)">
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
import { Down } from '@icon-park/vue-next'
import BenefitModal from './BenefitModal.vue'

const props = defineProps({
  benefits: { type: Object, required: true }
})

const isCollapsible = ref(true)
const visibleCategories = ref({})
const iconSize = ref('30')
const isModalVisible = ref(false)
const currentBenefit = ref(null)
const containerRefs = ref({})

const setContainerRef = (element, categoryName) => {
  containerRefs.value[categoryName] = element
}

watch(
  props.benefits,
  newBenefits => {
    for (let categoryName in newBenefits) {
      visibleCategories.value[categoryName] = true
    }
  },
  { deep: true, immediate: true }
)

watch(
  containerRefs,
  newContainerRefs => {
    for (let categoryName in newContainerRefs) {
      const container = containerRefs.value[categoryName]
      const height = container.scrollHeight
      container.style.maxHeight = `${height}px`
    }
  },
  { deep: true }
)

const updateWindowWidth = () => {
  if (window.innerWidth <= 800) {
    iconSize.value = '24'
    isCollapsible.value = true
  } else if (window.innerWidth <= 1200) {
    iconSize.value = '28'
    isCollapsible.value = true
  } else {
    iconSize.value = '30'
    isCollapsible.value = true
  }
}

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const toggleCategoryVisibility = categoryName => {
  if (!isCollapsible.value) return

  const container = containerRefs.value[categoryName]
  if (!container) return

  if (visibleCategories.value[categoryName] === undefined) {
    visibleCategories.value[categoryName] = true
  } else {
    visibleCategories.value[categoryName] = !visibleCategories.value[categoryName]
  }

  if (visibleCategories.value[categoryName]) {
    const height = container.scrollHeight
    container.style.maxHeight = `${height}px`
  } else {
    container.style.maxHeight = '0px'
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
  cursor: pointer;
}

.expand-icon {
  position: absolute;
  right: 5px;
  transition: transform 0.5s ease-out;
}

.benefit-images-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 0 10px 0 10px;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.benefit-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 10px 0 10px 0;
  cursor: pointer;
}

@media screen and (min-width: 801px) and (max-width: 1200px) {
  .benefit-category {
    font-size: 22px;
  }
}

@media screen and (max-width: 800px) {
  .benefit-category {
    font-size: 20px;
  }
}
</style>
