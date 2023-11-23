<template>
  <footer class="footer">
    <div class="container">
      <!--Follow us and Icons-->
      <div class="follow-us">
        <p class="all-text" id="follow">FOLLOW US!</p>
      </div>
      <div class="left-box">
        <div class="social-icons">
          <a href="https://www.facebook.com/McGillCSSA/" class="icon-background"
            ><fa :icon="['fab', 'facebook']" size="3x"
          /></a>
          <a href="https://www.youtube.com/@mcgillcssa" class="icon-background"
            ><fa :icon="['fab', 'youtube']" size="3x"
          /></a>
          <a href="https://www.instagram.com/mcgill.cssa" class="icon-background"
            ><fa :icon="['fab', 'instagram']" size="3x"
          /></a>
          <a href="" class="icon-background"
          ><fa :icon="['fab', 'weixin']" size="3x"
            /></a>
          <a href="https://space.bilibili.com/405502104?spm_id_from=333.337.search-card.all.click" class="icon-background"
            ><fa :icon="['fab', 'bilibili']" size="3x"
          /></a>-
        </div>
      </div>
      <!--vertical line-->
      <div class="separator"></div>
      <!--other pages-->
      <div class="right-box">
        <div class="rcol1">
          <router-link to="/"><p class="all-text">About Us</p></router-link>
          <router-link to="/Membership"><p class="all-text">Membership</p></router-link>
        </div>
        <div class="rcol2">
          <router-link to="/"><p class="all-text">Event</p></router-link>
        </div>
        <div class="rcol3">
          <router-link to="/Sponsor"><p class="all-text">Sponsor</p></router-link>
        </div>
      </div>
      <!--copyright-->
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
  background-color: #7A65A3;
  color: #ffffff;
}

.container {
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
  position: relative;
}

.left-box {
  display: grid;
  grid-area: icon;
}

.separator {
  border-left: 2.0px solid rgb(255, 255, 255);
  grid-area: line;
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
  gap: 1.2vw;
}

.rcol1 > *, .rcol2 > *, .rcol3 > * {
  transition: transform 0.6s ease;
}

.rcol1 > :hover, .rcol2 > :hover, .rcol3 > :hover {
  transform: scale(1.15);
}

.all-text {
  font-family: 'CircularStd';
  font-weight: 800;
  text-align: left;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.social-icons {
  display: grid;
  color: #7A65A3;
  font-size: 1vw;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-evenly;
  align-items: center;
  gap: 1.2vw;
}

.icon-background  {
  display: inline-block;
  border-radius: 50%;
  width: 4.2vw;
  height: 4.2vw;
  text-align: center;
  line-height: 5.6vw;
  background: #ffffff;
  margin: 5px;
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
  background-color: #8871b7;
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

.copyright {
  display: flex;
  color: rgb(255, 255, 255);
  grid-area: cp;
  place-content: flex-start flex-end;
  justify-self: end;
  font-size: 1.25vw;
}

.follow-us {
  display: flex;
  font-weight: bold;
  font-size: clamp(25px, 15px + 2vw, 65px);
  line-height: 20px;
  grid-area: follow;
  justify-content: space-between;
  align-content: space-between;
  padding: 0%;
}

#follow {
  margin-block-start: 1em;
  margin-block-end: 1em;
}

a:link, a:visited, a:hover, a:active a:focus {
  text-decoration: none;
  color: #7A65A3;
}

@media screen and (min-width: 1921px){
  .follow-us {
    font-size: 3.5vw;
  }

  .separator {
    height: 220px;
  }
}

@media screen and (max-width: 700px){
  .follow-us {
    font-size: 4vw;
    padding:0;
    gap: 0;
  }

  .container{
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
  grid-template-columns: repeat(5, 1fr);
  justify-content: start;
  align-items: center;
  justify-self: center;
  padding: 0vw;
  gap: 1vw;
  font-size: 1.4vw;
}

.icon-background {
  width: 5.2vw;
  height: 5.2vw;
  text-align: center;
  line-height: 7.5vw;
}

  .right-box {
    grid-area: tag;
    grid-template-columns:auto;
  }

.rcol1 {
  justify-self: center;
  align-self: center;
}

.rcol2 {
  justify-self: center;
  align-self: center;
}

.rcol3 {
  justify-self: center;
  align-self: center;
}

  .separator{
    border-left: none;
    border-top: 1.75px solid rgb(255, 255, 255);
    padding: 0vw;
  }
}
</style>