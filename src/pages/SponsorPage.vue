<template>
  <div>
  <div class="sponsor-page">
    <section>
    <div class="title-text-1 title-text">
            <p>Sponsors</p>
    </div>
      <NavBar />
      <h1 class="page-title">Diamond Exclusive</h1>
      <div class="sponsor-list" ref="sponsorList" @wheel="handleWheel">
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

    <section>
      <div class="title-text-2 title-text">
            <p>Sponsors</p>
      </div>
      <NavBar />
      <h1 class="page-title">Diamond</h1>
      <div class="sponsor-list" ref="sponsorList" @wheel="handleWheel">
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

    <section>
      <div class="title-text-3 title-text">
            <p>Sponsors</p>
      </div>
      <NavBar />
      <h1 class="page-title">Gold</h1>
      <div class="sponsor-list" ref="sponsorList" @wheel="handleWheel">
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
import NavBar from '../components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      de_sponsors: [
        {
          id: 1,
          name: '茶语缘',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'
        },
        {
          id: 2,
          name: '留学达人',
          description:
            '“留学达人”留学服务，我们是一家专业的留学服务机构，致力于为全球' +
            '学生提供高质量、综合性的留学服务。我们提供全方位的留学服务，包括留学咨询、院' +
            '校申请、签证申请、语言培训、文化适应培训等。我们的团队由留学专家、教育顾问、' +
            '签证顾问等多个领域的专业人士组成，拥有丰富的留学经验和专业知识。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'
        },
        {
          id: 3,
          name: '银峰银行',
          description:
            '“银峰银行”，我们是一家致力于为客户提供全方位金融服务' +
            '的银行品牌。作为一家专业、高效、创新的银行，我们以客户为中心，注重客户' +
            '体验和服务品质。“银峰银行”提供各种金融服务，包括个人储蓄、信用贷款、财富管' +
            '理、投资理财等。我们的产品针对不同客户需求，提供灵活的选择，以满足客户的不同' +
            '需求。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'
        },
        {
          id: 4,
          name: '饕餮食府',
          description:
            '“饕餮食府”餐厅品牌，我们是一家专业的餐厅品牌，致力于为客户提供高品' +
            '质、创意美食和愉悦的用餐体验。我们的菜品涵盖中西合璧的美食文化，融合了传统和现代' +
            '的烹饪技艺，为客户带来无尽的口感享受。我们的菜品种类丰富，包括烤鸭、红烧肉、海鲜、' +
            '意大利面、披萨等多种菜系，满足客户不同口味的需求。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'
        }
        // Add more sponsors as needed
      ],
      d_sponsors: [
        {id: 1,
          name: 'D1',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'},
        {id: 2,
          name: 'D2',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'},
          {id: 3,
          name: 'D3',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'},  
          {id: 4,
          name: 'D4',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'}
        ],
      g_sponsors: [
        {id: 1,
          name: 'G1',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'},
        {id: 2,
          name: 'G2',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'},
          {id: 3,
          name: 'G3',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'},  
          {id: 4,
          name: 'G4',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/logo.png'),
          website: 'https://www.mcgill.ca/'}
        ],
      itemsPerPage: 2,
      currentPage: 0,
      currentPage_de: 0,
      currentPage_d: 0,
      currentPage_g: 0,
      de_pages: [],
      d_pages: [],
      g_pages: []
    }
  },
  mounted() {
    this.calculatePages()
  },
  methods: {
    calculatePages() {
      this.dc_pages = []
      this.d_pages = []
      this.g_pages = []
      for (let i = 0; i < this.de_sponsors.length; i += this.itemsPerPage) {
        this.de_pages.push(this.de_sponsors.slice(i, i + this.itemsPerPage))
      }
      for (let i = 0; i < this.d_sponsors.length; i += this.itemsPerPage) {
        this.d_pages.push(this.d_sponsors.slice(i, i + this.itemsPerPage))
      }
      for (let i = 0; i < this.g_sponsors.length; i += this.itemsPerPage) {
        this.g_pages.push(this.g_sponsors.slice(i, i + this.itemsPerPage))
      }
    },
    changePageDE(index) {
      this.currentPage_de = index
    },
    previousPageDE() {
      if (this.currentPage_de > 0) {
        this.currentPage_de--
      }
    },
    nextPageDE() {
      if (this.currentPage_de < this.de_pages.length - 1) {
        this.currentPage_de++
      }
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
    handleWheel(event) {
      const sponsorList = this.$refs.sponsorList
      const deltaX = event.deltaX
      const deltaY = event.deltaY

      const rect = sponsorList.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const isCursorOverSponsorList =
        x >= 0 && x <= sponsorList.clientWidth && y >= 0 && y <= sponsorList.clientHeight

      if (isCursorOverSponsorList) {
        if (deltaX > 0 && deltaY < 5 && deltaY > -5) {
          this.nextPage()
        } else if (deltaX < 0 && deltaY < 5 && deltaY > -5) {
          this.previousPage()
        }

        // Prevent horizontal scrolling when the cursor is over the sponsor-list
      }
    }
  }
}
</script>

<style scoped>
.title-text {
  margin-left: 4vw;
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
.title-text::before {
  content: '';
  position: absolute;
  left: -2vw;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #ffffff;
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
.title-text-2 {
  z-index: 2;
  position: absolute;
  top: 130%;
}
.title-text-3 {
  z-index: 2;
  position: absolute;
  top: 230%;
}

.title-text-3::before {
  content: '';
  position: absolute;
  left: -2vw;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #ffffff;
}
.title-text-3 p {
  -webkit-text-stroke: 2px #ffffff;
  color: transparent;
}
.sponsor-page {
  background: #814147 url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  position: absolute;
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
  background-color: #ab3232;
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
  margin-top: 5vh;
  margin-bottom: 3vh;
  margin-left: 72vh;
  margin-right: 15vh;
  color: #ececec;
  box-shadow: #000000;
  font-family: 'Raleway', sans-serif;
  -webkit-text-stroke: 1.5px #ffffff;
  color: transparent;
  user-select: none;
}

.sponsor-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.sponsor-total {
  display: table-cell;
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
}
.sponsor-logo {
  max-width: 9vh;
  margin-top: 3vh;
  margin-left: 1vh;
  margin-right: 1vh;
  user-select: none;
}

.sponsor-name {
  font-size: 2.2vh;
  margin-bottom: 1vh;
  color: #777;
  user-select: none;
}

.sponsor-description {
  font-size: 2vh;
  width: 75vh;
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
  background-color: #814147
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
  background-color: #e57b7b;
  color: #fff;
}

.pagination button:hover {
  background-color: #d2727c
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
</style>
