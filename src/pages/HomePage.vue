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
        <dl class="info-list">
          <dt>INFO1</dt>
          <dd>Description this is a placeholder for description.</dd>
          <dt>INFO1</dt>
          <dd>Description this is a placeholder for description.</dd>
          <dt>INFO1</dt>
          <dd>Description this is a placeholder for description.</dd>
        </dl>
      </div>
    </div>
    <div class="recent-events"></div>
    <div class="about-us"></div>
    <div class="footer"></div>
  </div>
</template>

<script setup></script>

<style>
body {
  margin: 0;
}

.page-container {
  background-color: red;
  display: flex;
  flex-direction: column;
}

.banner-wrapper {
  display: flex;
  background: #ff94a0 url('https://i.imgur.com/NzO1g9L.png');
  background-size: cover;
  background-blend-mode: luminosity;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

.navbar {
  background-color: #333333;
  width: 100%;
  height: 80px;
}

.banner-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  font-size: 18vh;
  /* padding-bottom: 1vh; */
}

.banner-title {
  margin-left: 3vw;
  margin-top: 5vh;
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
  line-height: 14vh; /* Adjust the value to decrease the line height */
  transform: scale(1, 0.95); /* Adjust the first value to squash horizontally */
}

.info-list {
  display: grid;
  grid-template-rows: auto auto;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  column-gap: 3vw;
  align-self: center;
  font-size: 0.2em;
  color: #ffffff;
  margin-bottom: 5vh;
}
</style>
