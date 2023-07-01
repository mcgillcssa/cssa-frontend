<template>
    <footer class="footer">
      <div class="container">
        <!--Follow us and Icons-->
        <div class="follow-us">
          <p class="all-text" id="follow">Follow Us!</p>
        </div>
        <div class="left-box">
          <div class="social-icons">
            <a href="https://www.facebook.com/McGillCSSA/"
              ><fa :icon="['fab', 'facebook']" size="3x"
            /></a>
            <a href="https://www.youtube.com/@mcgillcssa"
              ><fa :icon="['fab', 'youtube']" size="3x"
            /></a>
            <a href="https://www.instagram.com/mcgill.cssa"
              ><fa :icon="['fab', 'instagram']" size="3x"
            /></a>
            <a href=""><fa :icon="['fab', 'weixin']" size="3x" /></a>
            <a
              href="https://space.bilibili.com/405502104?spm_id_from=333.337.search-card.all.click"
              ><fa :icon="['fab', 'bilibili']" size="3x"
            /></a>
          </div>
        </div>
        <!--vertical line-->
        <div class="separator"></div>
        <!--other pages-->
        <div class="right-box">
          <div class="rcol1">
            <router-link to="/"><p class="all-text">About us</p></router-link>
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
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style>
  * {
    box-sizing: border-box;
  }
  
  .footer {
    background-color: #e8ded1;
    color: #ff6c6c;
  }
  
  .container {
    display: grid;
    grid-template-columns: 1fr 1px 2fr;
    /*grid-template-rows: 1fr 1fr 1fr 1fr; */
    grid-template-areas:
      "follow follow follow"
      "icon line tag"
      "icon line tag"
      "void void cp";
    max-width: inherit;
    max-height: inherit;
    margin: 30px;
    margin-bottom: 0px;
    margin-top: 0px;
    position: relative;
  }
  
  .left-box {
    bottom: 10px;
    left: 10px;
    display: grid;
    gap: 10px;
    grid-area: icon;
    grid-template-areas: "i1 i2 i3";
  }
  
  .separator {
    border-left: 1.5px solid black;
    grid-area: line;
  }
  
  .right-box {
    display: grid;
    grid-area: tag;
    font-size: 20px;
    grid-template-areas: "t1 t2 t3";
  }
  
  .all-text {
    font-family: Raleway;
    font-weight: 800;
    margin-block-start: 0px;
    margin-block-end: 2em;
  }
  
  .social-icons {
    display: flex;
    flex-flow: wrap;
    gap: 40px;
    color: black;
    position: relative;
  }
  
  .copyright {
    display: flex;
    color: black;
    grid-area: cp;
    place-content: flex-start flex-end;
    justify-self: end;
  }
  
  .follow-us {
    /*text-edge: cap; */
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

  body{
    margin: 0;
  }
  
  a:visited {
    color: black;
  }
  </style>