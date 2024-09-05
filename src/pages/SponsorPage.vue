<template>
  <div class="container" @update-sponsors="updateSponsors">
    <div v-bind="attrs" class="nav-bar">
      <NavBar/>
    </div>
    <div class="title-text-1 title-text">
      <p>Sponsors</p>
    </div>

    <div class="sponsor-page">

      <!-- Section 1: Diamond Exclusive -->
      <section class="section">
        <div class="title-wrapper">
          <h1 class="page-title">Diamond Exclusive</h1>
        </div>
        <div class="sponsor-list" ref="sponsorListDE" @wheel="handleWheel">
          <div v-for="(page, index) in de_pages" :key="'de-' + index" v-show="currentPage_de === index">
            <div v-for="sponsor in page" :key="sponsor.id" class="sponsor-card">
              <div class="sponsor-total">
                <div class="logo-background">
                  <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
                </div>
                <h2 class="sponsor-name">{{ sponsor.name }}</h2>
              </div>
              <p class="sponsor-description">{{ sponsor.description }}</p>
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

      <!-- Section 2: Diamond -->
      <section class="section">
        <div class="title-wrapper">
          <h1 class="page-title">Diamond</h1>
        </div>
        <div class="sponsor-list" ref="sponsorListD" @wheel="handleWheel">
          <div v-for="(page, index) in d_pages" :key="'d-' + index" v-show="currentPage_d === index">
            <div v-for="sponsor in page" :key="sponsor.id" class="sponsor-card">
              <div class="sponsor-total">
                <div class="logo-background">
                  <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
                </div>
                <h2 class="sponsor-name">{{ sponsor.name }}</h2>
              </div>
              <p class="sponsor-description">{{ sponsor.description }}</p>
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

      <!-- Section 3: Gold -->
      <section class="section">
        <div class="title-wrapper">
          <h1 class="page-title">Gold</h1>
        </div>
        <div class="sponsor-list" ref="sponsorListG" @wheel="handleWheel">
          <div v-for="(page, index) in g_pages" :key="'g-' + index" v-show="currentPage_g === index">
            <div v-for="sponsor in page" :key="sponsor.id" class="sponsor-card">
              <div class="sponsor-total">
                <div class="logo-background">
                  <img :src="sponsor.logo" :alt="sponsor.name" class="sponsor-logo" />
                </div>
                <h2 class="sponsor-name">{{ sponsor.name }}</h2>
              </div>
              <p class="sponsor-description">{{ sponsor.description }}</p>
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
    <gradientstripe></gradientstripe>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import { sponsorState } from '../states/sponsorState';
import { useAttrs } from 'vue';
import gradientstripe from '../components/GradientStripe.vue';

const sponsorUrl = process.env.VUE_APP_BACKEND_URL + '/api/sponsors/';

const attrs = useAttrs();

const de_sponsors = ref(sponsorState.de_sponsors);
const d_sponsors = ref(sponsorState.d_sponsors);
const g_sponsors = ref(sponsorState.g_sponsors);

const itemsPerPage = 2;
const currentPage_de = ref(0);
const currentPage_d = ref(0);
const currentPage_g = ref(0);

const de_pages = computed(() => chunkArray(de_sponsors.value, itemsPerPage));
const d_pages = computed(() => chunkArray(d_sponsors.value, itemsPerPage));
const g_pages = computed(() => chunkArray(g_sponsors.value, itemsPerPage));

const handleWheel = (event) => {
  const delta = Math.sign(event.deltaY);
  if (event.currentTarget === de_pages.value) {
    if (delta > 0) {
      nextPageDE();
    } else {
      previousPageDE();
    }
  } else if (event.currentTarget === d_pages.value) {
    if (delta > 0) {
      nextPageD();
    } else {
      previousPageD();
    }
  } else if (event.currentTarget === g_pages.value) {
    if (delta > 0) {
      nextPageG();
    } else {
      previousPageG();
    }
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(sponsorUrl);
    if (!Array.isArray(response.data)) {
      throw new Error('Expected an array of sponsors');
    }
    sponsorState.de_sponsors = [];
    sponsorState.d_sponsors = [];
    sponsorState.g_sponsors = [];

    response.data.forEach(sponsor => {
      const formattedSponsor = {
        id: sponsor.sponsorName,
        name: sponsor.sponsorName,
        description: sponsor.sponsorDescription,
        logo: sponsor.sponsorImageUrl
      };

      switch (sponsor.sponsorClass.toUpperCase()) {
        case 'DIAMOND_EXCLUSIVE':
          sponsorState.de_sponsors.push(formattedSponsor);
          break;
        case 'DIAMOND':
          sponsorState.d_sponsors.push(formattedSponsor);
          break;
        case 'GOLD':
          sponsorState.g_sponsors.push(formattedSponsor);
          break;
      }
    });
  } catch (err) {
    console.error('Failed to fetch sponsors:', err);
    alert('Failed to fetch sponsors.');
  }
});

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function changePageDE(index) {
  currentPage_de.value = index;
}

function previousPageDE() {
  if (currentPage_de.value > 0) {
    currentPage_de.value--;
  }
}

function nextPageDE() {
  if (currentPage_de.value < de_pages.value.length - 1) {
    currentPage_de.value++;
  }
}

function changePageD(index) {
  currentPage_d.value = index;
}

function previousPageD() {
  if (currentPage_d.value > 0) {
    currentPage_d.value--;
  }
}

function nextPageD() {
  if (currentPage_d.value < d_pages.value.length - 1) {
    currentPage_d.value++;
  }
}

function changePageG(index) {
  currentPage_g.value = index;
}

function previousPageG() {
  if (currentPage_g.value > 0) {
    currentPage_g.value--;
  }
}

function nextPageG() {
  if (currentPage_g.value < g_pages.value.length - 1) {
    currentPage_g.value++;
  }
}

function updateSponsors(sponsors) {
  de_sponsors.value = sponsors.diamond_exclusive;
  d_sponsors.value = sponsors.diamond;
  g_sponsors.value = sponsors.gold;
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.nav-bar {
  width: 100%;
  z-index: 100;
  position: relative;
}

.title-text {
  margin-left: 4.5vw;
  position: relative;
  font-size: 5vw;
  line-height: 6vw;
  transform: scale(1, 0.95);
  user-select: none;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -0.2vw;
}

.title-text-1 {
  z-index: 2;
  position: absolute;
  top: 30%;
  font-style: italic;
}

.sponsor-page {
  background-image: linear-gradient( #3364BB ,#E3F4FF), url('https://i.imgur.com/ZgCeJBq.jpg');
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
  background-color: #3364BB;
}

section {
  box-sizing: border-box;
  scroll-snap-align: end;
  height: 100%;
  width: 100vw;
  color: white;
  overflow: hidden;
  position: relative;
}

.title-wrapper {
  left: 63.75%;
  transform: translateX(-50%);
  margin-bottom: 0.2vh;
}

.page-title {
  text-align: center;
  font-size: 3vw;
  padding-top: 8vh;
  color: #ececec;
  font-family: 'Raleway', sans-serif;
  text-shadow: 2px 4px 6px #000000;
  user-select: none;
}

.sponsor-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  left: 63.75%;
  transform: translateX(-50%);
  margin-bottom: 0.2vh;
}

.sponsor-card {
  width: 55vw;
  height: auto;
  padding: 2vw;
  margin: 1.2vw;
  margin-top: -0.5vw;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  opacity: 0.9;
  display: table;
  border-radius: 20px;
  max-width: 100%;
  box-sizing: border-box;
}

.sponsor-total {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo-background {
    width: calc(8vw + 0.8vw);
    height: calc(8vw + 0.8vw);
    background: linear-gradient(to right,
    #FFEE8F 10.28%,
    #E3FBCF 20.63%,
    #BBF0FA 42.36%,
    #ABD9FF 56.45%,
    #5DABF3 70.52%,
    #448FD6 84.88%,
    #3262BA 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    border-radius: 50%;
    padding: 0;
}

.sponsor-logo {
  width: 8vw;
  height: 8vw;
  position: center;
  user-select: none;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}

.sponsor-name {
  font-size: 1.5vw;
  margin-top: 1vh;
  color: #1E3D79;
  user-select: none;
}

.sponsor-description {
  font-size: 1.2vw;
  width: 90%;
  font-weight: bold;
  color: #1E3D79;
  display: table-cell;
  vertical-align: middle;
  text-align: justify;
  padding: 1vw;
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
  position: absolute;
  left: 63.75%;
  transform: translateX(-50%);
  justify-content: center;
  justify-content: center;
  width: 100%;
  bottom: 4vh;
}

.pagination button {
  padding: 0.8vw 1vw;
  margin: 0 0.5vw;
  background-color: #E3F4FF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color:#1E3D79;
  font-size: 1vw;
}

.pagination button.active {
  background-color: #1E3D79;
  color: #E3F4FF;
}

.pagination button:hover {
  background-color: #1E3D79;
  color: #E3F4FF;
}

.left-arrow:before,
.right-arrow:before {
  display: inline-block;
  content: '';
  border-top: 0.4vw solid transparent;
  border-bottom: 0.4vw solid transparent;
}

.left-arrow:before {
  border-right: 0.8vw solid #3364BB;
}

.right-arrow:before {
  border-left: 0.8vw solid #3364BB;
}

.pagination button:hover .left-arrow:before {
  border-right: 0.8vw solid #E3F4FF;
}

.pagination button:hover .right-arrow:before {
  border-left: 0.8vw solid #E3F4FF;
}

.left-arrow,
.right-arrow {
  width: 0.8vw;
  height: 0.8vw;
  color:#E3F4FF;
}

.left-arrow {
  transform: rotate(180deg);
  margin-right: 0.8vw;
}

.right-arrow {
  margin-left: 0.8vw;
}

.gradientstripe {
  position: absolute;
  z-index: 100000;
}

@media (max-width: 600px) {
  html, body {
    width: 100%;
    overflow-x: hidden;
    margin: 0;
  }

  .nav-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .title-text-1.title-text {
    font-size: 8vh;
    text-align: center;
    width: 100%;
    left: 50%;
    top: 9vh;
    transform: translateX(-50%);
    margin-left: 0;
    text-shadow: 4px 6px 8px rgba(30, 61, 121, 0.8);
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

  .sponsor-page {
  background-image: linear-gradient( #3364BB ,#E3F4FF), url('https://i.imgur.com/ZgCeJBq.jpg');
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
    width: 100vw;
    height: 25vh;
  }

  .title-wrapper {
  width: 100%;
  margin-top: 2em;
  left: 0%;
  transform: translateX(0%);
  margin-bottom: 0.2vh;
  }

  .page-title {
    margin-top: 22vh;
    font-size: 5vw;
    -webkit-text-stroke: 0px;
    color: #ffff;
    font-style: normal;
    position: relative;
    padding: 1em;
    height: 8vw;
    line-height: 8vw;
    text-shadow: 0px 0px 0px #000000;
  }

  .page-title::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(to left,
    rgba(255, 238, 143, 0.6) 10.28%,
    rgba(227, 251, 207, 0.6) 20.63%,
    rgba(187, 240, 250, 0.6) 42.36%,
    rgba(171, 217, 255, 0.6) 56.45%,
    rgba(93, 171, 243, 0.6) 70.52%,
    rgba(68, 143, 214, 0.6) 84.88%,
    rgba(50, 98, 186, 0.6) 100%
);
  margin: 1em;
  border-radius: inherit;
  border-radius: 20px;
  width: 90vw;
}

  .sponsor-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  left: 0%;
  transform: translateX(0%);
  width: 100%;
}

  .sponsor-card {
    width: 90vw;
    padding: auto;
    text-align: center;
    justify-self: center;;
    display: table;
    max-width: 100%;
    box-sizing: border-box;
    margin-bottom: 4vw;
  }

  .sponsor-total {
  width: 80%;
}

  .logo-background {
    margin-top: 2vw;
}

.sponsor-name {
  font-size: 2.5vw;
}

.sponsor-description {
  font-size: 2vw;
  width: 80%;
  padding-right: 2vw;
}

  .pagination {
  left: 0%;
  transform: translateX(0%);
}
}
</style>
