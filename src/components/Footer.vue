<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="follow-us">
        <p class="all-text" id="follow">FOLLOW US!</p>
      </div>
      <div class="left-box">
        <div class="social-icons">
          <a href="https://www.facebook.com/McGillCSSA/" class="icon-background">
            <fa :icon="['fab', 'facebook']" size="3x"/>
          </a>
          <a href="https://www.youtube.com/@mcgillcssa" class="icon-background">
            <fa :icon="['fab', 'youtube']" size="3x"/>
          </a>
          <a href="https://www.instagram.com/mcgill.cssa" class="icon-background">
            <fa :icon="['fab', 'instagram']" size="3x"/>
          </a>
          <a href="https://mp.weixin.qq.com/s/yoD-Ozd4EMK0Fy07NbZaHg" class="icon-background">
            <fa :icon="['fab', 'weixin']" size="3x"/>
          </a>
          <a href="https://space.bilibili.com/405502104?spm_id_from=333.337.search-card.all.click" class="icon-background">
            <fa :icon="['fab', 'bilibili']" size="3x"/>
          </a>
          <a href="https://www.xiaohongshu.com/user/profile/5c0a27d00000000006009dcc" class="icon-background">
            <fa :icon="['fab', 'readme']" size="3x"/>
          </a>
        </div>
      </div>
      <div class="footer-separator"></div>
      <div class="right-box">
        <div class="rcol1">
          <a href="https://mp.weixin.qq.com/s/Qi_su6jtGOjAKyHV2TSudg"><p class="all-text">About Us</p></a>
          <router-link to="/Membership"><p class="all-text">Membership</p></router-link>
        </div>
        <div class="rcol2">
          <router-link to="/"><p class="all-text">Event</p></router-link>
        </div>
        <div class="rcol3">
          <router-link to="/Sponsor"><p class="all-text">Sponsor</p></router-link>
        </div>
      </div>
      <div class="copyright">
        <p id="copy">&copy; {{ currentYear }} CSSA</p>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'web-Footer',

  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.footer {
  background-color: #3364BB;
  color: #ffffff;
}

.footer-container {
  display: grid;
  grid-template-columns: 1fr 1px 2fr;
  grid-template-areas:
    'follow follow follow'
    'icon line tag'
    'icon line tag'
    'void void cp';
  max-width: inherit;
  max-height: inherit;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-right: 2vw;
  margin-left: 6.5vw;
  padding: 0vw;
  position: relative;
}

.follow-us {
  display: flex;
  font-weight: bold;
  font-size: clamp(25px, 15px + 2vw, 65px);
  line-height: 20px;
  grid-area: follow;
  justify-content: space-between;
  align-content: space-between;
  padding: 0;
  margin-top: -1vw;
  margin-bottom: -1.5vw;
}

#follow {
  margin-block-start: 1em;
  margin-block-end: 1em;
}

.all-text {
  font-family: 'CircularStd';
  font-weight: 800;
  text-align: left;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.left-box {
  display: grid;
  grid-area: icon;
  padding: 0;
  margin: 0;
}

.social-icons {
  display: grid;
  color: #3364BB;
  font-size: 1vw;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 0;
}

.icon-background  {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 4.5em;
  height: 4.5em;
  background: #ffffff;
  margin: 1em;
  position: relative;
  overflow: hidden;
  transition: color 0.6s ease;
  z-index: 1;
  transition: transform 0.6s ease, background-color 0.6s ease;
}

.icon-background:before{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: #3364BB;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s ease;
  z-index: -1;
}

.icon-background:hover:before {
  transform: translate(-50%, -50%) scale(1.1);
}

.icon-background:hover {
  color: #ffffff;
  transform: scale(1.2);
  animation: light 1.5s ease-in-out infinite alternate;
  z-index: 2;
}

@keyframes light {
  0%, 100% {
    box-shadow: 0 0 6px 0 #F5ECFF;
  }
  50% {
    box-shadow: 0 0 12px 2px #c0b4ce;
  }
}

a:link, a:visited, a:hover, a:active a:focus {
  text-decoration: none;
  color: #3364BB;
}

.footer-separator {
  border-left: 2.0px solid rgb(255, 255, 255);
  grid-area: line;
  padding-left: 2vw;
  padding-right: 2vw;
}

.right-box {
  display: grid;
  grid-area: tag;
  font-size: clamp(15px, 10px + 1.25vw, 35px);
  grid-template-areas: 't1 t2 t3';
  justify-content: space-evenly;
  transition: transform 0.6s ease;
}

.rcol1, .rcol2, .rcol3 {
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  gap: 0;
}

.rcol1 > *, .rcol2 > *, .rcol3 > * {
  transition: transform 0.6s ease;
}

.rcol1 > :hover, .rcol2 > :hover, .rcol3 > :hover {
  transform: scale(1.15);
}

.copyright {
  display: flex;
  color: rgb(255, 255, 255);
  grid-area: cp;
  place-content: flex-start flex-end;
  justify-self: end;
  font-size: 1.5vw;
  padding: 0;
  margin-top: -3vw;
}

@media screen and (min-width: 1921px){
  .follow-us {
    font-size: 3.5vw;
  }

  .footer-separator {
    height: 220px;
  }
}

@media screen and (max-width: 700px){
  .follow-us {
    font-size: 4vw;
    padding:0;
    gap: 0;
    margin-bottom: -2vw;;
    margin-left: 4vw;
  }

  .footer-container{
    grid-template-columns: 1fr;
    grid-template-areas:
    'follow'
    'icon'
    'line'
    'tag'
    'cp';
    margin-bottom: 0px;
    margin-top: 0px;
    margin-right: 6.5vw;
    margin-left: 6.5vw;
    position: relative;
  }

  .left-box {
  grid-area: icon;
}

.social-icons {
  grid-template-columns: repeat(6, 1fr);
  justify-content: start;
  align-items: center;
  justify-self: center;
  padding: 0vw 2vw 0 2vw;
  gap: 3vw;
  font-size: 1.5vw;
}

.icon-background {
  text-align: center;
}

  .right-box {
    grid-area: tag;
    grid-template-columns:auto;
    margin-top: -1vw;
    font-size: clamp(5px, 10px + 1.25vw, 20px);
  }

  .rcol1, .rcol2, .rcol3 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    margin: 0;
    padding: 0;
  }

  .rcol1 > *, .rcol2 > *, .rcol3 > * {
    margin: 0;
    padding: 0;
  }

  .footer-separator{
    border-left: none;
    border-top: 1.75px solid rgb(255, 255, 255);
    padding: 0vw;
    width: 100%;
    margin-top: 1.2vw;
  }

  .copyright {
  font-size: 2.2vw;
  display: flex;
  justify-self: center;
  margin-top: -4.5vw;
}
}
</style>
