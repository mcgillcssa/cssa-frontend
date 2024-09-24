<template>
    <nav-bar/>
    <div :style="{ 'background-image': 'url(' + bannerUrl + ')' }" class="banner vertical-flex">
      <div class="event-title"><em>EVENTS</em></div>
      <div class="arrow-down">
          <arrow-down fill="#FFFFFF" size="124" strokeLinecap="butt" theme="filled" />
      </div>
    </div>
    <!-- <div class="event-year-list">
      <div
        class=""
        v-for="(value, index) in [column1Benefits, column2Benefits, column3Benefits]"
        :key="index"
      >
        <event-accordion :events="events" />
      </div>
      
    </div> -->

</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import { ArrowDown} from '@icon-park/vue-next'

const bannerUrl = ref('https://i.imgur.com/x3IJjj2.jpg')
const contentSections = ref([])
// const eventsByYear = ref({})

let arrowSize = ref(64)


onMounted(async () => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)

  contentSections.value = document.querySelectorAll('.content-container > div')
  window.addEventListener('scroll', handleScroll)

  // try {
  //   const response = await axios.get(
  //     `${process.env.VUE_APP_BACKEND_URL}/api/events/all`
  //   )
  //   eventsByYear.value = response.data.eventsByYear
  //   await nextTick()

  // } catch (err) {
  //   console.error(err)
  //   alert('Failed to fetch events.')
  // }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
  window.removeEventListener('scroll', handleScroll)
})

const updateWindowWidth = () => {
  const aspectRatio = window.innerWidth / window.innerHeight

  if (aspectRatio < 1) {
    bannerUrl.value = 'https://i.imgur.com/SRk5nUk.jpg'
  } else {
    bannerUrl.value = 'https://i.imgur.com/x3IJjj2.jpg'
  }
  if (window.innerWidth <= 600) {
    arrowSize.value = 24
  } else if (window.innerWidth <= 800) {
    arrowSize.value = 36
  } else if (window.innerWidth <= 1200) {
    arrowSize.value = 48
  } else {
    arrowSize.value = 64
  }
}

const handleScroll = () => {
  contentSections.value.forEach((section, index) => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.style.transitionDelay = `${index * 0.15}s`
      section.classList.add('fadeInUp')
    }
  })
}
  
</script>
  
<style scoped>

.vertical-flex {
  display: flex;
  flex-direction: column;
}

.banner {
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.event-title {
  margin: 0;
  opacity: 0;
  color: #ffffff;

  font-size: 12vw;
  font-family: 'Infinity';
  text-align: center;
  text-shadow: 2px 2px 5px #634791;
  animation: fadeInUp 1s forwards 0.5s;
}

.arrow-down {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: fadeIn 1s forwards 2s, pulse 3s infinite 2.5s;
}

@keyframes pulse {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 0.7;
  }
  25% {
    transform: translateX(-50%) translateY(-10px) scale(1.02);
    opacity: 0.8;
  }
  40% {
    transform: translateX(-50%) translateY(-15px) scale(1.05);
    opacity: 0.9;
  }
  60% {
    transform: translateX(-50%) translateY(-10px) scale(1.02);
    opacity: 0.8;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.content-container > div {
  opacity: 0;
  transform: translateY(20px);
}

.fadeInUp {
  animation: fadeInUp 1s forwards;
}


</style>