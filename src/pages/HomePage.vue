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
        <ul class="info-list">
          <li class="info">
            <div>Description for the info, placeholder for now.</div>
            <div>INFO TITLE</div>
          </li>
          <li class="info">
            <div>Description for the info, placeholder for now.</div>
            <div>INFO TITLE</div>
          </li>
          <li class="info">
            <div>Description for the info, placeholder for now.</div>
            <div>INFO TITLE</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="recent-events">
      <div class="recent-events-title">
        <div class="zhs-title">近期活动</div>
        <div class="en-title">RECENT EVENTS</div>
      </div>
      <!-- <div class="events-wrapper">
        <div class="event"></div>
        <div class="event"></div>
        <div class="event"></div>
        <div class="event"></div>
      </div> -->
      <EventsCarousel></EventsCarousel>
    </div>
    <div class="about-us"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
import EventsCarousel from '../components/RecentEvents.vue'

export default {
  components: {
    EventsCarousel
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
  width: 100vw;
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

.info-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  align-self: center;
  gap: 2em;
  font-size: 0.15em;
  color: #ffffff;
}

.recent-events {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 750px;
  background-color: #e8ded1;
  padding-bottom: 10px;
}

.recent-events-title {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.recent-events-title .zhs-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  letter-spacing: 0.175em;
  line-height: 0.8em;
  color: #ff6c6c;
}

.recent-events-title .en-title {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 1.75em;
  line-height: 0.8em;
}

.events-wrapper {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding-left: 30px;
  padding-right: 30px;
}

.event {
  outline: 4px dotted #333333;
}

.about-us {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 750px;
  background-color: #e8ded1;
}
</style>
