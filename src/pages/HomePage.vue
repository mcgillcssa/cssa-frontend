<template>
  <div class="page">
    <div class="vertical-flex-container banner-background">
      <NavBar />
      <div class="banner-title">
        <div>
          <p style="margin-left: -5vw; font-size: 7vw">MCGILL</p>
          <div class="title-text">
            <p>CHINESE STUDENTS &</p>
            <p>SCHOLARS</p>
            <p>ASSOCIATION</p>
          </div>
        </div>
      </div>
    </div>

    <RecentEvents />

    <div class="about-us">
      <div class="vertical-flex-container about-us-desc"></div>
    </div>
    <div class="footer"></div>
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

.cssa-logo {
  position: absolute;
  bottom: 0;
  right: 0;
}

.vertical-flex-container {
  display: flex;
  flex-direction: column;
}

.banner-background {
  position: relative;
  background: #814147 url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-blend-mode: overlay;
  width: 100%;
  height: 100vh;
}

.banner-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 27.5%;
  height: 100%;
  background-color: rgba(173, 28, 28, 0.974);
}

.banner-title {
  margin-left: 6vw;
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 6vh;
  z-index: 2;
  position: relative;
}

.title-text {
  /* margin-left: 22vw; */
  position: relative;
}

.title-text::before {
  content: '';
  position: absolute;
  left: -3vw;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #ffffff;
}

.banner-title p {
  margin: 0;
  font-size: 8vw;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -3px;
  line-height: 6vw;
  transform: scale(1, 0.95);
  user-select: none;
}

.title-text p {
  -webkit-text-stroke: 2px #ffffff; /* Change to the desired stroke color */
  color: transparent;
}
</style>
