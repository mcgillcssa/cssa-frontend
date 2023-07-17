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
      <div id="about-us-left">
        <img
          id="about-us-image"
          src="https://res.cloudinary.com/mcgillcssa/image/upload/s--ztjHHMAh--/q_jpegmini/v1574799607/cssa_jpqr5f.jpg"
        />
        <div class="vertical-flex-container">
          <div id="about-us-description">
            <h3>ABOUT US</h3>
            <p>
              McGill University Chinese Students and Scholars Association (CSSA), is the only
              student community certified by the Chinese Consulate on campus, and it is the only
              cultural club dedicated mainly to students and scholars from Mainland China.
            </p>
            <p>
              麦吉尔大学中国学生学者联合会 (McGill CSSA)
              是一个无政治、无宗教、非营利、并且唯一正式在麦吉尔校方注册的主要面向本科生的官方学生组织。
            </p>
          </div>
        </div>
      </div>
      <ul id="about-us-number">
        <li class="about-us-info">
          <div class="info-number">16000</div>
        </li>
        <li class="about-us-info">
          <div class="info-number">1408</div>
        </li>
        <li class="about-us-info">
          <div class="info-number">283</div>
        </li>
        <li class="about-us-info">
          <div class="info-number">70</div>
        </li>
      </ul>
      <ul id="about-us-right">
        <li class="about-us-info">
          <div class="info-description">WECHAT <br />FOLLOWERS</div>
        </li>
        <li class="about-us-info">
          <div class="info-description">MEMBERSHIP</div>
        </li>
        <li class="about-us-info">
          <div class="info-description">EVENTS</div>
        </li>
        <li class="about-us-info">
          <div class="info-description">EXECS</div>
        </li>
      </ul>
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

.page {
  overflow: hidden;
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
  background-color: #ab3232;
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

.about-us {
  position: relative;
  overflow: visible;
  display: flex;
  margin-left: 20px;
  width: calc(100%-20px);
  height: 400px;
  margin-bottom: 100px;
}

#about-us-left {
  display: flex;
  background-color: #ab3232;
  width: 85%;
}

#about-us-image {
  margin-top: -30px;
  margin-left: 30px;
  width: 30%;
  height: 100%;
  object-fit: cover;
}

#about-us-description {
  margin-left: 100px;
  margin-right: 100px;
  color: #ffffff;
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
}

#about-us-description h3 {
  margin-left: -30px;
  font-size: 1.5em;
}

#about-us-number {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-end;
}

#about-us-right {
  margin: 0;
  padding: 0;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
}

.about-us-info {
  list-style: none;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'Infinity';
  font-weight: bold;
}

.info-number {
  font-size: 5em;
}

.info-description {
  margin: 0;
  padding: 0;
}
</style>
