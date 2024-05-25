<template>
  <div class="container">
    <NavBar class="nav-bar"/>
    <div class="title-text-1 title-text">
            <p>Sponsors</p>
    </div>

  <div class="sponsor-page">
      <section class="section">
      <!-- section 1 -->
      <div class="title-wrapper">
        <h1 class="page-title">Diamond Exclusive</h1>
      </div>
      <div class="sponsor-list" :ref="'sponsorListDE'" @wheel="handleWheel" v-for="(page, index) in de_pages" :key="'de-' + index" v-show="currentPage_de === index">
      <div v-for="(page, index) in de_pages" :key="index" v-show="currentPage_de === index">
        <div v-for="sponsor in page" :key="sponsor.id" class="sponsor-card">
          <div class="sponsor-total">
            <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
            <h2 class="sponsor-name">{{ sponsor.name }}</h2>
          </div>
          <p class="sponsor-description">{{ sponsor.description }}</p>
          <a :href="sponsor.website" class="sponsor-website">➤</a>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPageDE" :disabled="currentPage_de === 0">
        <i class="arrow-icon left-arrow"></i>
      </button>
      <button
        v-for="(_, index) in de_pages"
        :key="index"
        @click="changePageDE(index)"
        :class="{ active: currentPage_de === index }"
      >
        {{ index + 1 }}
      </button>
      <button @click="nextPageDE" :disabled="currentPage_de === de_pages.length - 1">
        <i class="arrow-icon right-arrow"></i>
      </button>
    </div>
    </section>

    <section class="section">
      <!-- section 2 -->
      <div class="title-wrapper">
        <h1 class="page-title">Diamond</h1>
      </div>
      <div class="sponsor-list" :ref="'sponsorListD'" @wheel="handleWheel" v-for="(page, index) in d_pages" :key="'d-' + index" v-show="currentPage_d === index">
      <div v-for="(page, index) in d_pages" :key="index" v-show="currentPage_d === index">
        <div v-for="sponsor in page" :key="sponsor.id" class="sponsor-card">
          <div class="sponsor-total">
            <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
            <h2 class="sponsor-name">{{ sponsor.name }}</h2>
          </div>
          <p class="sponsor-description">{{ sponsor.description }}</p>
          <a :href="sponsor.website" class="sponsor-website">➤</a>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPageD" :disabled="currentPage_d === 0">
        <i class="arrow-icon left-arrow"></i>
      </button>
      <button
        v-for="(_, index) in d_pages"
        :key="index"
        @click="changePageD(index)"
        :class="{ active: currentPage_d === index }"
      >
        {{ index + 1 }}
      </button>
      <button @click="nextPageD" :disabled="currentPage_d === d_pages.length - 1">
        <i class="arrow-icon right-arrow"></i>
      </button>
    </div>
    </section>
    <!-- section 2 -->

    <section class="section">
      <!-- section 3 -->
      <div class="title-wrapper">
        <h1 class="page-title">Gold</h1>
      </div>
      <div class="sponsor-list" :ref="'sponsorListG'" @wheel="handleWheel" v-for="(page, index) in g_pages" :key="'g-' + index" v-show="currentPage_g === index">
      <div v-for="(page, index) in g_pages" :key="index" v-show="currentPage_g === index">
        <div v-for="sponsor in page" :key="sponsor.id" class="sponsor-card">
          <div class="sponsor-total">
            <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
            <h2 class="sponsor-name">{{ sponsor.name }}</h2>
          </div>
          <p class="sponsor-description">{{ sponsor.description }}</p>
          <a :href="sponsor.website" class="sponsor-website">➤</a>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="previousPageG" :disabled="currentPage_g === 0">
        <i class="arrow-icon left-arrow"></i>
      </button>
      <button
        v-for="(_, index) in g_pages"
        :key="index"
        @click="changePageG(index)"
        :class="{ active: currentPage_g === index }"
      >
        {{ index + 1 }}
      </button>
      <button @click="nextPageG" :disabled="currentPage_g === g_pages.length - 1">
        <i class="arrow-icon right-arrow"></i>
      </button>
    </div>
    </section>


  </div>
  
  <div>
    <Footer class="footer">
    </Footer>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      de_sponsors: [], // Initially empty, will be filled with fetched data
      itemsPerPage: 2,
      currentPage_de: 0,
      currentPage_d: 0,
      currentPage_g: 0,
      de_pages: [],
      d_pages: [],
      g_pages: []
    }
  },
  mounted() {
    this.fetchSponsors(); // Fetch sponsors when component mounts
    this.calculatePages(); // This might need to be moved or called again after data is fetched
  },
  methods: {
    async fetchSponsors() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/sponsors/`);
        this.de_sponsors = response.data; // Populate de_sponsors with fetched data
        console.log(response)
        this.calculatePages(); // Recalculate pages after data is fetched
      } catch (err) {
        console.error('Failed to fetch sponsors:', err);
        alert('Failed to fetch sponsors.');
      }
    },
    calculatePages() {
      // Clear previous pages
      this.de_pages = [];
      this.d_pages = [];
      this.g_pages = [];
      // Populate pages based on the current data
      for (let i = 0; i < this.de_sponsors.length; i += this.itemsPerPage) {
        this.de_pages.push(this.de_sponsors.slice(i, i + this.itemsPerPage));
      }
      // Similarly, populate d_pages and g_pages if needed
    },
    changePageDE(index) {
      this.currentPage_de = index;
    },
    previousPageDE() {
      if (this.currentPage_de > 0) {
        this.currentPage_de--;
      }
    },
    nextPageDE() {
      if (this.currentPage_de < this.de_pages.length - 1) {
        this.currentPage_de++
      }
      console.log("next called")
    },
    changePageD(index) {
      this.currentPage_d = index
    },
    previousPageD() {
      if (this.currentPage_d > 0) {
        this.currentPage_d--
      }
    },
    nextPageD() {
      if (this.currentPage_d < this.d_pages.length - 1) {
        this.currentPage_d++
      }
    },
    changePageG(index) {
      this.currentPage_g = index
    },
    previousPageG() {
      if (this.currentPage_g > 0) {
        this.currentPage_g--
      }
    },
    nextPageG() {
      if (this.currentPage_g < this.g_pages.length - 1) {
        this.currentPage_g++
      }
    },
    handleWheel() {
    }
  }
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}
.nav-bar {
  width: 100%;
  z-index: 100;
}
.title-text {
  margin-left: 3vw;
  position: relative;
  font-size: 5vw;
  line-height: 6vw;
  transform: scale(1, 0.95);
  user-select: none;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -3px;
}

.title-text p {
  -webkit-text-stroke: 2px #ffffff;
  color: transparent;
}
.title-text-1 {
  z-index: 2;
  position: absolute;
  top: 30%;
}

.sponsor-page {
  background-image: linear-gradient(#ac94c5 ,#f7bfc9), url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.sponsor-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 27.5%;
  height: 330vh;
  background-color: #ac94c5;
}
section {
  box-sizing: border-box;
  scroll-snap-align: end;
  height: 100%;
  color: white;

}

.page-title {
  text-align: center;
  font-size: 6vh;
  padding-top: 12vh;
  margin-top: 6vh;
  margin-bottom: 3vh;
  margin-left: 72vh;
  margin-right: 15vh;
  color: #ececec;
  box-shadow: #000000;
  font-family: 'Raleway', sans-serif;
  -webkit-text-stroke: 3px #ffffff;
  color: transparent;
  user-select: none;
}

.sponsor-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.sponsor-total {
  width: 30vh;
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  justify-content: center; /* Center children vertically, if needed */
}

.sponsor-card {
  width: 55vw;
  height: 23vh;
  padding: 20px;
  margin: 10px;
  margin-left: 72vh;
  margin-right: 15vh;
  margin-bottom: 3vh;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  opacity: 0.9;
  display: table;
  border-radius: 20px;
  max-width: 100%; /* Ensures the card is not wider than its container */
  box-sizing: border-box; /* Includes padding and border in the element's total width */
}
.sponsor-logo {
  width: 12vh;
  position: center;
  margin-top: 3vh;
  user-select: none;
  border-radius: 50%; /* Makes the image round */
  box-shadow: 0 0 25px #ac94c5; /* Adds an ambient border/shadow */
  display: block; /* To ensure box-shadow is properly displayed */
  object-fit: cover; /* Ensures the image covers the area without distortion */
}

.sponsor-name {
  font-size: 2.2vh;
  margin-bottom: 1vh;
  color: #777;
  user-select: none;
}

.sponsor-description {
  font-size: 2vh;
  width: 70vh;
  font-weight: bold;
  color: #777;
  display: table-cell;
  vertical-align: middle;
  text-align: left;
  border: 20px transparent solid;
}

.sponsor-website {
  padding: 4px;
  font-size: 20px;
  text-decoration: none;
  background-color: #8f8585;
  color: #fff;
  display: table-cell;
  vertical-align: middle;
  border-radius: 30px;
  width: 1vw;
  user-select: none;
}

.sponsor-website:hover {
  background-color: #ac94c5
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  margin-left: 72vh;
  margin-right: 15vh;
}

.pagination button {
  padding: 8px 12px;
  margin: 0 5px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #77539d;
  color: #fff;
}

.pagination button:hover {
  background-color: #ac94c5
}
.left-arrow:before,
.right-arrow:before {
  display: inline-block;
  content: '';
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.left-arrow:before {
  border-right: 7px solid #555;
}

.right-arrow:before {
  border-left: 7px solid #555;
}

.left-arrow,
.right-arrow {
  width: 20px;
  height: 20px;
}

.left-arrow {
  transform: rotate(180deg);
  margin-right: 5px;
}

.right-arrow {
  margin-left: 5px;
}

@media (max-width: 1024px) {
  html, body {
    width: 100%;
    overflow-x: hidden; /* Prevent horizontal scrolling */
    margin: 0; /* Remove any default margin */
  }
  .nav-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .container {
    max-width: 100%;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  .title-text {
    font-size: 4vw; /* Smaller font size for mobile */
  }
  .title-text p {
  -webkit-text-stroke: 0px;
  color: transparent;
}
.title-text-1 {
  z-index: 10;
  top: 30%;
}
.title-wrapper {
  width: 100%;
  margin-top: 2em;
}
  .sponsor-page {
  background-image: linear-gradient(#ac94c5 ,#f7bfc9), url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
  .sponsor-page::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 0;
  }
  .title-text-1.title-text {
    font-size: 5vh; /* Increase font size */
    text-align: center; /* Center text */
    width: 100%; /* Use full width to aid in centering */
    left: 50%; /* Center the div horizontally */
    top: 6vh;
    transform: translateX(-50%); /* Adjust for exact centering */
  }
  .section{
    height: 100%;
    color: white;
  }
  .sponsor-description{
    display: none;
  }
  .page-title {
    margin-left: 0; /* Adjust margins for mobile */
    margin-right:0;
    margin-bottom: 0vh;
    margin-top: 14vh;
    font-size: 3vh; /* Larger font size for better readability */
    -webkit-text-stroke: 0px; /* Disable text stroke for mobile */
    color: #77539d;
    font-style: italic;
    position: relative;
    padding: 1em;
    text-align: center;
    height: 50px; /* Or min-height if you want it to be flexible */
    line-height: 50px; /* Should match the height for vertical centering */
  }
  .page-title::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; /* Place the pseudo-element behind the text */
  
  /* Apply the gradient to the pseudo-element, which matches the text's box model */
  background: linear-gradient(to right, #ac94c5 ,#f7bfc9);
  
  /* Set the margin to match the padding of the .page-title element */
  margin: 1em;
  
  /* If you have border-radius on the .page-title, match it here */
  border-radius: inherit;
}
  .sponsor-card {
    width: 20vw; /* Use more of the screen width for each card */
    margin-left: 2vw; /* Center the cards with smaller margins */
    margin-right: 2vw;
  }
  .pagination {
    margin-left: 2vh; /* Adjust pagination position for mobile */
    margin-right: 2vh;
  }
  .title-text p {
  -webkit-text-stroke: 2px #ffffff;
  color: transparent;
}
  .title-text-1 {
  z-index: 2;
  position: absolute;
  top: 30%;
}
  /* Add additional mobile-specific styles as needed */
}

</style>
