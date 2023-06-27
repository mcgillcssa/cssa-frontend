<template>
  <div class="page">
    <div class="banner-background">
      <NavBar />
      <div class="banner-title">
        <div>
          <p>MCGILL</p>
          <p>CSSA</p>
        </div>
      </div>
    </div>

    <RecentEvents />

    <!-- <div class="about-us"></div>
    <div class="footer"></div> -->
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import RecentEvents from '../components/RecentEvents.vue'

export default {
  components: {
    RecentEvents,
    NavBar
  }
}
</script>

<style>
body {
  margin: 0;
}

.navbar {
  background-color: #333333;
  width: 100%;
  height: 60px;
}

.banner-background {
  position: relative;
  display: flex;
  background: #804147 url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-blend-mode: overlay;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.banner-title {
  margin-left: 2vw;
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 6vh;
  z-index: 2;
}

.banner-title p {
  margin: 0;
  font-size: 10vw;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -8px;
  line-height: 6vw;
  transform: scale(1, 0.95);
}
</style>
