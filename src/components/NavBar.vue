<template>
  <div class="navbar">
    <router-link class="home-link" to="/">
      <img class="home-logo" :src="logoSrc" alt="CSSA Logo" />
    </router-link>
    <div
      class="menu-icon"
      v-if="isSmallScreen"
      @click="toggleDropdown"
      :class="isDropdownOpen ? 'shift-right' : ''"
    >
      <div
        class="bar"
        :style="{ backgroundColor: barColor }"
        :class="isDropdownOpen ? 'rotate-to-x' : ''"
      ></div>
      <div
        class="bar"
        :style="{ backgroundColor: barColor }"
        :class="isDropdownOpen ? 'disappear' : ''"
      ></div>
      <div
        class="bar"
        :style="{ backgroundColor: barColor }"
        :class="isDropdownOpen ? 'rotate-to-x' : ''"
      ></div>
    </div>
  </div>
  <ul class="dropdown" :class="{ open: isDropdownOpen }">
    <li v-if="isDropdownOpen">
      <router-link class="link-element" to="/membership">Membership</router-link>
    </li>
    <li v-if="isDropdownOpen">Sponsors</li>
    <li v-if="isDropdownOpen">Events</li>
  </ul>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, onUnmounted } from 'vue'

const logoSrc = ref('https://i.imgur.com/ZFcXCeq.png')
const barColor = ref('#ffffff')
const isDropdownOpen = ref(false)
const isSmallScreen = ref(false)

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const updateWindowWidth = () => {
  if (window.innerWidth <= 800) {
    logoSrc.value = 'https://i.imgur.com/VCAT7eS.png'
    isSmallScreen.value = true
  } else {
    logoSrc.value = 'https://i.imgur.com/ZFcXCeq.png'
    isSmallScreen.value = false
    isDropdownOpen.value = false
  }
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value

  if (isDropdownOpen.value) {
    barColor.value = '#33378c'
    document.body.style.overflow = 'hidden'
  } else {
    barColor.value = '#ffffff'
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.navbar {
  margin: 0;
  position: absolute;
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  z-index: 11;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-link {
  margin-left: 15px;
  height: 100%;
  z-index: 11;

  display: flex;

  text-decoration: none;
}

.home-logo {
  height: 50px;

  align-self: center;
}

.home-link p {
  font-family: 'Raleway', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #9c71c6;
}

.menu-icon {
  height: 30px;
  width: 30px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;
  z-index: 11;

  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.shift-right {
  transform: translateX(7px);
}

.bar {
  width: 30px;
  height: 2px;

  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin 0.3s ease,
    background-color 0.3s ease;
  transform-origin: center;
}

.bar.rotate-to-x:first-child {
  transition-delay: 0.1s; /* Added delay for a sequential feel */
  transform: rotate(45deg) translateY(6px);
}

.bar.rotate-to-x:last-child {
  transition-delay: 0.2s; /* Added delay for a sequential feel */
  transform: rotate(-45deg) translateY(-6px);
}

.bar.disappear {
  opacity: 0;
  margin: 0 0 -5px 0;
}

.dropdown {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;

  margin: 0;
  padding: 0 0 0 20px;

  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  background-color: #fff;

  transform: translateX(100%); /* Start the dropdown off-screen */
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
}

.dropdown.open {
  transform: translateX(0); /* Slide the dropdown into view */
}

.dropdown li {
  font-family: 'CircularStd';
  font-size: 64px;
  font-weight: 700;
  color: #33378c;
  letter-spacing: -3px;

  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown.open li:nth-child(1) {
  animation: fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.1s; /* Modified timing and easing function */
}

.dropdown.open li:nth-child(2) {
  animation: fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.25s; /* Modified timing and easing function */
}

.dropdown.open li:nth-child(3) {
  animation: fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.4s; /* Modified timing and easing function */
}

@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.link-element,
.link-element:visited {
  text-decoration: none;
  color: inherit;
}
</style>
