<template>
    <div class="about-us-container">
      <div class="about-us-section">
        <div class="left-column">
          <div class="image-container">
            <img src="https://i.imgur.com/xfAdEm5.jpg" alt="Group Photo" class="group-photo">
            <div class="ellipse"></div>
            <div class="overlay-text">
              <span>ABOUT</span><br>
              <span>US</span>
            </div>
          </div>
        </div>
        <div class="right-column">
          <div class="text-content">
            <p>McGill University Chinese Students and Scholars Association (CSSA), is the only student community certified by the Chinese Consulate on campus, and it is the only cultural club dedicated mainly to students and scholars from Mainland China.</p>
            <p>这是麦吉尔大学中国学生学者联谊会 (McGill CSSA) 是一个正式认证、官方承、非营利，并且唯一正式受自治校方允许的主要面向本科生的官方学生组织。</p>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
    name: 'AboutUs'
}
</script>

<style scoped>
.about-us-container {
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #EAEBF6;
    min-height: 30vh;
    width: 100%;
    margin: 5vh auto;
}

.about-us-section {
    display: flex;
    /* flex-direction: column; */
    background-color: white;
    justify-content: center;
    border-radius: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90vw;
    padding-top: 0%;
    padding-bottom: 0%;
    padding-right: 0;
    padding-left: 0;
    border: 1px solid #CBBCDB;
}

.left-column, .right-column {
    flex: 1;
    padding: 1vw;
}

.left-column {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.group-photo-container {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.group-photo {
    width: 100%;
    height: auto;
    border-radius: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    opacity: 0.8;
    position: relative;
    z-index: 0;
}

.ellipse {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20vw;
    height: 20vw;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: linear-gradient(to top, #EDD0E8 12%, #9887DF, #6E80DC); /* outer circle with gradient */
    overflow: hidden;
    mask-image: radial-gradient(circle, transparent 60%, black 35%); /*  transparent inner circle */
    opacity: 0.5;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #EAEBF6;
  font-size: 3.5vw;
  font-weight: 900;
  text-align: center;
  font: Raleway;
  z-index: 3;
}

.right-column {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.text-content h1 {
    margin-bottom: 10px;
}

.text-content p {
    text-align: justify;
    font: Raleway;
    font-size: 1.8vw;
    font-weight: 500;
    color: #33378C;
    justify-content: center;
}

@media (max-width: 1024px) {
  .about-us-section {
    flex-direction: column;
  }

  .left-column, .right-column {
    padding: 3vw;
  }

  .overlay-text {
    font-size: 0.2vw;
  }

  .ellipse {
    width: 2vw;
    height: 2vw;
  }

  .text-content p {
    text-align: left;
    font-size: 2vw;
  }
}

@media (max-width: 768px) {
  .ellipse {
      width: 50vw;
      height: 50vw;
  }

  .overlay-text {
    font-size: 8vw;
  }
}

</style>
