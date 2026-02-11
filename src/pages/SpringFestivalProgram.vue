<template>
  <NavBar />
  <div class="banner-background">
    <div class="home-background-image"></div>
    <div class="page-title-container">
      <h1 class="page-title">
        <span class="title-cn">春晚节目单</span>
        <span class="title-en">SPRING FESTIVAL GALA PROGRAM LIST</span>
      </h1>
    </div>
  </div>
  
  <div class="spring-festival-program">
    <div class="program-content">
        <!-- Sponsors Section -->
        <div class="sponsors-section">
          <h2 class="sponsors-title">
            <span class="sponsors-title-cn">赞助商</span>
            <span class="sponsors-title-en">Our Sponsors</span>
          </h2>
          <div class="sponsors-grid">
            <div 
              v-for="(sponsor, index) in sponsors" 
              :key="index"
              class="sponsor-card"
            >
              <img 
                :src="sponsor.logoUrl" 
                :alt="sponsor.name"
                class="sponsor-logo"
              />
            </div>
          </div>
        </div>
        
        <div class="image-container">
          <img 
            :src="programImageUrl" 
            alt="春节节目单"
            class="program-image"
          />
        </div>

        
    </div>
  </div>
  <GradientStripe />
  <Footer />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import GradientStripe from '../components/GradientStripe.vue';
import Footer from '../components/Footer.vue';

// 图片URL占位符 - 稍后替换为实际的春节节目单图片URL
const programImageUrl = ref('https://i.imgur.com/rcFNFua.png');

// 赞助商数据 - 请替换为实际的赞助商Logo URL
const sponsors = ref([
  { name: 'CIBC', logoUrl: 'https://i.imgur.com/czfG6Tg.png' },
  { name: 'CUSSA', logoUrl: 'https://i.imgur.com/BRAyZxQ.jpeg' },
  { name: '低卡工厂', logoUrl: 'https://i.imgur.com/DR7XnLj.jpeg' },
]);

const calculateRadius = (scrollY) => {
  const screenWidth = window.innerWidth;
  let baseRadius = 100;

  if (screenWidth > 1200) {
    baseRadius -= scrollY / 8;
  } else if (screenWidth > 700 && screenWidth < 1200) {
    baseRadius -= scrollY / 10;
  } else {
    baseRadius -= scrollY / 13;
  }

  return Math.max(0, baseRadius);
};

const handleScroll = () => {
  const bannerBackground = document.querySelector('.home-background-image');
  const titleContainer = document.querySelector('.page-title-container');
  const scrollY = window.scrollY;

  if (bannerBackground) {
    const scale = 1 + scrollY / 1000;
    const radius = calculateRadius(scrollY);
    const xPosition = 30;
    const yPosition = 30;
    const clipPathValue = `circle(${radius}% at ${xPosition}% ${yPosition}%)`;

    bannerBackground.style.transform = `scale(${scale})`;
    bannerBackground.style.clipPath = clipPathValue;
  }

  if (titleContainer) {
    const opacity = Math.max(0, 1 - scrollY / 500);
    const translateY = scrollY * (-0.8);
    titleContainer.style.opacity = opacity;
    titleContainer.style.transform = `translate(-50%, -50%) translateZ(0) translateY(${translateY}px)`;
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Banner Background - 与主页相同的样式 */
.banner-background {
  position: relative;
  width: 100%;
  height: calc(100vh);
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #f6f5ea 60%, #EEE1FF 100%);
}

.home-background-image {
  background-image: linear-gradient(
    90deg, 
    rgba(239, 223, 251, 0.783) 0%,
    rgb(216, 192, 249) 28.5%, 
    rgb(199, 163, 246) 66.66%, 
    rgba(176, 134, 244, 0.825) 90%),
    url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-blend-mode: multiply;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: transform 0.1s ease, clip-path 0.1s ease;
  clip-path: circle(200% at 50% 50%);
}

.page-title-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.page-title {
  margin: 0;
  font-family: 'Raleway', 'Noto Sans SC', sans-serif;
}

.title-cn {
  display: block;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
  letter-spacing: 4px;
  color: #ffffff;
}

.title-en {
  display: block;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 6px;
  color: #ffffff;
}

.spring-festival-program {
  min-height: 100vh;
  background: linear-gradient(180deg, #EEE1FF 0%, #f8f9fa 50%, #ffffff 100%);
}

.program-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.image-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 40px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
}

.program-image {
  width: 100%;
  height: auto;
  display: block;
  background: linear-gradient(135deg, #f5f5f5 25%, #e0e0e0 25%, #e0e0e0 50%, #f5f5f5 50%, #f5f5f5 75%, #e0e0e0 75%, #e0e0e0);
  background-size: 20px 20px;
  min-height: 600px;
  object-fit: contain;
}

/* Sponsors Section */
.sponsors-section {
  margin-top: 80px;
  padding: 40px 20px;
  text-align: center;
}

.sponsors-title {
  margin-bottom: 50px;
  font-family: 'Raleway', 'Noto Sans SC', sans-serif;
}

.sponsors-title-cn {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 3px;
}

.sponsors-title-en {
  display: block;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #666;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  align-items: center;
  justify-items: center;
}

.sponsor-card {
  width: 100%;
  max-width: 280px;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sponsor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.sponsor-logo {
  width: 100%;
  height: auto;
  max-height: 100px;
  object-fit: contain;
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title-cn {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .title-en {
    font-size: 1.2rem;
    letter-spacing: 3px;
  }

  .program-content {
    padding: 40px 15px;
  }

  .program-image {
    min-height: 400px;
  }

  .sponsors-title-cn {
    font-size: 2rem;
  }

  .sponsors-title-en {
    font-size: 1rem;
  }

  .sponsors-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .title-cn {
    font-size: 2rem;
  }

  .title-en {
    font-size: 1rem;
    letter-spacing: 2px;
  }

  .program-image {
    min-height: 300px;
  }

  .sponsors-title-cn {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }

  .sponsors-title-en {
    font-size: 0.9rem;
    letter-spacing: 2px;
  }

  .sponsors-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .sponsor-card {
    max-width: 100%;
    padding: 20px;
  }
}
</style>
