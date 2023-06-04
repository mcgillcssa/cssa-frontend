<template>
  <div class="sponsor-page">
    <h1 class="page-title">Sponsors</h1>
    <h2 class="page-title-category">Platinum Sponsors</h2>
    <div class="sponsor-list" ref="sponsorList" @wheel="handleWheel">
      <div v-for="(page, index) in pages" :key="index" v-show="currentPage === index">
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
      <button @click="previousPage" :disabled="currentPage === 0">
        <i class="arrow-icon left-arrow"></i>
      </button>
      <button
        v-for="(_, index) in pages"
        :key="index"
        @click="changePage(index)"
        :class="{ active: currentPage === index }"
      >
        {{ index + 1 }}
      </button>
      <button @click="nextPage" :disabled="currentPage === pages.length - 1">
        <i class="arrow-icon right-arrow"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sponsors: [
        {
          id: 1,
          name: '茶语缘',
          description:
            '“茶语缘”奶茶品牌，我们是一家致力于提供高品质、多样化奶茶的品牌。' +
            '我们的品牌一直秉承“品质至上，服务第一”的理念，不断努力提高自己的品质和服务水平。' +
            '我们的目标是成为全球最受欢迎的奶茶品牌之一，让更多的人能够品尝到我们的美味。',
          logo: require('@/assets/sponsor_a_logo.png'),
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
          logo: require('@/assets/sponsor_b_logo.png'),
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
          logo: require('@/assets/sponsor_c_logo.png'),
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
          logo: require('@/assets/sponsor_d_logo.png'),
          website: 'https://www.mcgill.ca/'
        }
        // Add more sponsors as needed
      ],
      itemsPerPage: 2,
      currentPage: 0,
      pages: []
    }
  },
  mounted() {
    this.calculatePages()
  },
  methods: {
    calculatePages() {
      this.pages = []
      for (let i = 0; i < this.sponsors.length; i += this.itemsPerPage) {
        this.pages.push(this.sponsors.slice(i, i + this.itemsPerPage))
      }
    },
    changePage(index) {
      this.currentPage = index
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.pages.length - 1) {
        this.currentPage++
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
.sponsor-page {
  padding: 13px;
  background: #fcb2b2 url('@/assets/background.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: luminosity;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.page-title {
  text-align: center;
  font-size: 65px;
  margin-bottom: 20px;
  color: #ececec;
  box-shadow: #000000;
}
.page-title-category {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
  color: #ececec;
  box-shadow: #000000;
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
  position: center;
  width: 65vw;
  height: 27vh;
  padding: 20px;
  margin: 10px;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  opacity: 0.9;
  display: table;
  border-radius: 20px;
}
.sponsor-logo {
  max-width: 100px;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
}

.sponsor-name {
  font-size: 20px;
  margin-bottom: 10px;
}

.sponsor-description {
  font-size: 16px;
  width: 700px;
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
}

.sponsor-website:hover {
  background-color: #fad9d9;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  background-color: #ff5555;
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
