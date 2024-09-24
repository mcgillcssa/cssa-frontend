<template>
  <div class="about-us-container">
    <div class="about-us-section">
      <div class="left-column">
        <div class="about-us-image-container">
          <img src="https://i.imgur.com/xfAdEm5.jpg" alt="Group Photo" class="group-photo">
          <div class="ellipse"></div>
          <div class="about-us-overlay-text">
            <span>ABOUT</span><br>
            <span>US</span>
          </div>
        </div>
      </div>
      <div class="right-column">
        <div class="about-us-text-content">
          <p>McGill University Chinese Students and Scholars Association (CSSA), is the only student community certified by the Chinese Consulate on campus, and it is the only cultural club dedicated mainly to students and scholars from Mainland China.</p>
          <p>这是麦吉尔大学中国学生学者联谊会 (McGill CSSA) 是一个正式认证、官方承、非营利，并且唯一正式受自治校方允许的主要面向本科生的官方学生组织。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  mounted() {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px'
    });

    const elements = document.querySelectorAll('.about-us-text-content, .about-us-overlay-text');
    elements.forEach(element => {
      observer.observe(element);
    });
  }
}
</script>

<style scoped>
.about-us-container {
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #E3F4FF;
    min-height: 30vh;
    width: 100%;
    margin: 2vw 0 0 0;
}

.about-us-section {
    display: flex;
    background-color: white;
    justify-content: center;
    border-radius: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90vw;
    height: auto;
    padding: 2vw;
    border: 1px solid #5291B9;
    box-sizing: border-box;
}

.left-column, .right-column {
    flex: 1;
    padding: 1.5vw;
}

.left-column {
    display: flex;
    align-items: center;
    justify-content: center;
}

.about-us-image-container {
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
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.3);
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
    background: linear-gradient(
      0deg, 
      #72E7EB 0%, 
      #65D2F0 28.5%, 
      #5CB0F6 66.66%, 
      #1978D0 100%)
    ;
    overflow: hidden;
    mask-image: radial-gradient(circle, black 35%);
    opacity: 0.5;
}

.about-us-overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #def5fa;
  font-size: 3.5vw;
  font-weight: 900;
  text-align: center;
  font-family:'Raleway';
  z-index: 3;
  animation: fadeInFromTop 1.5s ease-out forwards;
}

@keyframes fadeInFromTop {
  0% {
    opacity: 0;
    transform: translate(-50%, -150%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.right-column {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
    transform-origin: center bottom;
  }
  25% {
    transform: scale(1.05) translateY(-5px);
  }
  50% {
    transform: scale(1.1) translateY(-10px);
  }
  75% {
    transform: scale(1.05) translateY(-5px);
  }
}

.about-us-overlay-text .is-visible {
    animation: bounce 0.6s ease-out;
    opacity: 1;

}

.about-us-text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0;

    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    transition-delay: 0.5s;
}

.about-us-text-content.is-visible {
    opacity: 1;
}

.about-us-text-content p {
    text-align: justify;
    font-family: 'Raleway';
    font-size: 1.6vw;
    font-weight: 500;
    color: #1A4F87;
}

.about-us-text-content h1 {
    margin-bottom: 10px;
}

@media screen and (min-width: 1024px) {

  .left-column, .right-column {
    padding: 1.2vw;
  }

  .about-us-overlay-text {
    font-size: 3vw;
    color: #def5fa;
    z-index: 3;
  }

  .ellipse {
    width: 20vw;
    height: 20vw;
    opacity: 0.5;
  }

  .about-us-text-content p {
    text-align: justify;
    font-size: 1.8vw;
  }
}

@media screen and (min-width: 700px) and (max-width: 1024px) {
  .about-us-section {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 90vw;
    height: auto;
}
}

@media screen and (max-width: 700px) {
  .about-us-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 2vw 0 0 0;
    margin: 0;
  }

.about-us-section {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

.group-photo-container {

    width: 90%;
    height: 90%;
}

.left-column {
    width: 100%;
    padding: 2vw 2vw 2vw 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

.right-column {
    width: 100%;
    padding: 0vw 4vw 0vw 4vw;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.group-photo {
    width: 90%;
    height: 90%;
    border-radius: 30px;
}

  .ellipse {
      width: 40vw;
      height: 40vw;
  }

  .about-us-overlay-text {
    font-size: 4vw;
  }

  .about-us-text-content p {
    text-align: center;
    justify-content: center;
    padding: 1vw;
    font-size: 2.8vw;
}
}

</style>
