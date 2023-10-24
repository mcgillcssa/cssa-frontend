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
          /></a>
        </div>
      </div>
      <!--vertical line-->
      <div class="separator"></div>
      <!--other pages-->
      <div class="right-box">
        <div class="rcol1">
          <router-link to="/"><p class="all-text">About Us</p></router-link>
          <router-link to="/"><p class="all-text">Membership</p></router-link>
        </div>
        <div class="rcol2">
          <router-link to="/"><p class="all-text">Event</p></router-link>
        </div>
        <div class="rcol3">
          <router-link to="/"><p class="all-text">Sponsor</p></router-link>
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
  background-color: #7f6293;
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
  margin-right: 70px;
  margin-left: 70px;
  position: relative;
  /*grid-template-rows: 1fr 1fr 1fr 1fr; */
}

.left-box {
  bottom: 10px;
  left: 10px;
  display: grid;
  grid-area: icon;
  grid-template-areas:
  'i1 i2 i3'
  'i4 i5 i6';
  /* grid-template-columns: repeat(3, 33%); */
  /* grid-column-gap: 20px; */
  /* justify-content: space-evenly; */
  /* width:cal((100% - 1px) /3); */
}

.separator {
  border-left: 2.0px solid rgb(255, 255, 255);
  grid-area: line;
}

.right-box {
  display: grid;
  grid-area: tag;
  font-size: 30px;
  grid-template-areas: 't1 t2 t3';
  justify-content: space-evenly;
}

.all-text {
  font-family: Raleway;
  font-weight: 800;
  text-align: left;
  margin-block-start: 0px;
  margin-block-end: 2em;
  color: #ffffff;
  /* padding: 0px; */
}

.social-icons {
  display: flex;
  flex-flow: wrap;
  color: #7f6293;
  font-size: 18px;
  /* gap: 0px 70px; */
  /* padding: 40px 100px 25px; */
  /* left: 5%; */
  /* position: relative; */
}

.icon-background  {
  display: inline-block;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  text-align: center;
  line-height: 100px;
  background: #ffffff;
  margin: 5px;
}

.copyright {
  display: flex;
  color: rgb(255, 255, 255);
  grid-area: cp;
  place-content: flex-start flex-end;
  justify-self: end;
}

.follow-us {
  /* text-edge: cap; */
  display: flex;
  font-size: 55px;
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

a:visited {
  color: #7f6293;
}
a:link {
  text-decoration: none;
}
</style>
