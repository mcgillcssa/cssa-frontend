<template>
  <div class="benefit-category" v-for="(benefits, categoryName) in benefits" :key="categoryName">
    <h3
      class="category-title"
      @click.self="toggleCategoryVisibility(categoryName)"
      @mouseover="handleMouseOver(categoryName)"
      @mouseleave="handleMouseLeave(categoryName)"
    >
      {{ categoryName }}
      <down
        class="expand-icon"
        v-show="isCollapsible"
        theme="filled"
        :size="iconSize"
        :fill="iconColors[categoryName]"
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
import { ref, defineProps, watch, onMounted, onUnmounted, nextTick } from 'vue'
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
const iconColors = ref({})

const setContainerRef = (element, categoryName) => {
  containerRefs.value[categoryName] = element

  const imgs = element.querySelectorAll('img')
  let loadedImagesCount = 0

  imgs.forEach(img => {
    img.addEventListener('load', () => {
      loadedImagesCount++
      if (loadedImagesCount === imgs.length) {
        setContainerHeight(categoryName)
      }
    })
  })
}

watch(
  props.benefits,
  async newBenefits => {
    await nextTick()

    for (let categoryName in newBenefits) {
      visibleCategories.value[categoryName] = true
      setContainerHeight(categoryName)
      iconColors.value[categoryName] = '#7E21D0'
    }
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

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

const setContainerHeight = categoryName => {
  const container = containerRefs.value[categoryName]
  const height = container.scrollHeight
  container.style.maxHeight = `${height}px`
}

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

const handleMouseOver = categoryName => {
  if ('ontouchstart' in window) return
  iconColors.value[categoryName] = '#c1a3e8'
}

const handleMouseLeave = categoryName => {
  if ('ontouchstart' in window) return
  iconColors.value[categoryName] = '#7E21D0'
}
</script>

<style scoped>
.benefit-category {
  position: relative;
  background: #fff;
  margin: 15px; /* Increased to accommodate the gradient border */
  padding: 20px;
  border-radius: 10px;
  z-index: 1;
}

.benefit-category {
  position: relative;
  border: 2px solid transparent;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  background-color: transparent; /* Ensure no background on the main div */
}

.benefit-category::before,
.benefit-category::after {
  content: '';
  position: absolute;
  border-radius: inherit;
  z-index: -1;
}

.benefit-category::before {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 1px solid #7E21D0;
  z-index: -2;
}

.benefit-category::after {
  top: 2px; /* Offset by the width of the border */
  right: 2px;
  bottom: 2px;
  left: 2px;
  background-color: #fff;
}

.category-title {
  position: relative;
  margin: 0;
  padding: 10px;
  background: #c1a3e8;
  color: #7e21d0;
  border: 1px solid #7E21D0;
  font-size: 1em;
  font-weight: bold;
  font-family: 'Raleway';
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
}

.category-title:hover {
  background-color: #7e21d0;
  color: #c1a3e8;
}

@media (hover: none) {
  .category-title:hover {
    background-color: #7e21d0;
    color: #c1a3e8;
  }
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
  border-radius: 10px;
  border: 1px solid #7E21D0;
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

@media screen and (max-width: 600px) {
  .benefit-category {
    font-size: 20px;
  }

  .category-title {
  padding-right: 30px;
}
}
</style>
