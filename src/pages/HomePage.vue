<template>
  <div class="page-container">
    <div class="banner-wrapper">
      <div class="navbar" style="color: white">Placeholder for Navigation Bar</div>
      <div class="banner-content">
        <div class="banner-title">
          <div>
            <p>MCGILL</p>
            <p>CSSA</p>
          </div>
        </div>
      </div>
    </div>

    <RecentEvents></RecentEvents>

    <div class="about-us"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
import RecentEvents from '../components/RecentEvents.vue'

export default {
  components: {
    RecentEvents
  }
}
</script>

<style>
body {
  margin: 0;
}

.page-container {
  display: flex;
  flex-direction: column;
}

.banner-wrapper {
  display: flex;
  background: #ff94a0 url('https://i.imgur.com/NzO1g9L.png');
  background-size: cover;
  background-blend-mode: luminosity;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.navbar {
  background-color: #333333;
  width: 100%;
  height: 60px;
}

.banner-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  font-size: 164px;
  padding-bottom: 1vh;
}

.banner-title {
  margin-left: 2vw;
  margin-top: 10vh;
  flex: 1;
  display: flex;
  align-items: center;
}

.banner-title p {
  margin: 0;
  font-size: 1em;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -8px; /* Adjust the value to decrease letter spacing */
  line-height: 120px; /* Adjust the value to decrease the line height */
  transform: scale(1, 0.95); /* Adjust the first value to squash horizontally */
}

.about-us {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 750px;
  background-color: #e8ded1;
}
</style>
