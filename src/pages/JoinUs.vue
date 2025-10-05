<template>
<div class="joinus-root">
  <div class="banner-background">
    <NavBar />
    <div class="joinus-background-image"></div>
    <img class="joinus-title" src="@/assets/JoinUs.svg" alt="Join Us" />
  </div>
  <!-- Join Us Card -->
  <section class="join-intro" ref="joinUsRef">
    <h1 class="join-title">
        <span class="join-cn">{{ $t('joinUs.titleCn') }}</span><br />
        <span class="join-en">{{ $t('joinUs.title') }}</span>
    </h1>
    <div class="joinus-description">
        <p class="joinus-desc-en">
            {{ $t('joinUs.descriptionEn') }}
        </p>
        <p class="joinus-desc-cn">
            {{ $t('joinUs.descriptionCn') }}
        </p>
    </div>
    <div class="join-card">
      <h2 class="join-heading">{{ $t('joinUs.whyJoinUs') }}</h2>
      <div class="join-divider">
        <img class="divider" src="@/assets/HorizontalDivider.svg" alt="divider" />
      </div>

      <ol class="join-list">
        <li>
          {{ $t('joinUs.benefits.internal') }}
        </li>
        <li>
          {{ $t('joinUs.benefits.networking') }}
        </li>
        <li>
          {{ $t('joinUs.benefits.resume') }}
        </li>
        <li>
          {{ $t('joinUs.benefits.skills') }}
        </li>
      </ol>

      <p class="join-cta">{{ $t('joinUs.cta') }}</p>
      <p class="join-subcta">{{ $t('joinUs.subcta') }}</p>
    </div>
  </section>
  <section class="apply-section" ref="applyRef">
    <div class="join-card">
      <h2 class="join-heading">{{ $t('joinUs.howToApply') }}</h2>
      <div class="join-divider">
        <img class="divider" src="@/assets/HorizontalDivider.svg" alt="divider" />
      </div>
      <ol class="join-list">
        <li>{{ $t('joinUs.applicationSteps.step1') }}</li>
        <li>{{ $t('joinUs.applicationSteps.step2') }}</li>
      </ol>
    </div>
  </section>

    <!-- Register Form -->
    <div class="register-form">
        <a
        class="register-button"
        href="https://nsgst58fjs1z.sg.larksuite.com/share/base/form/shrlgIEwr4VrEYNZbVOH4XtWZkn"
        target="_blank"
        rel="noopener noreferrer"
        >
        <span class="register-text">{{ $t('joinUs.registerButton') }}</span>
        <span class="register-icon">→</span>
        </a>
    </div>

    <!-- Departments Introduction -->
    <section class="departments" ref="deptsRef">
      <h2 class="depts-title">{{ $t('joinUs.departments') }}<br/><span>Departments</span></h2>
      <div class="dept-toggle-list">
        <div class="dept-toggle-item" v-for="d in departments" :key="d.key">
          <button 
            class="dept-toggle-header" 
            @click="toggleDepartment(d.key)"
            :class="{ 'active': expandedDepartments.includes(d.key) }"
          >
            <div class="dept-header-content">
              <h3 class="dept-name">{{ d.name }}</h3>
              <div class="dept-cap" v-if="d.capacity">{{ d.capacity }}</div>
            </div>
            <div class="dept-toggle-icon">
              <span :class="{ 'rotated': expandedDepartments.includes(d.key) }">▼</span>
            </div>
          </button>
          <div 
            class="dept-toggle-content" 
            :class="{ 'expanded': expandedDepartments.includes(d.key) }"
          >
            <div class="dept-body">
              <p class="dept-intro" v-if="d.intro">{{ d.intro }}</p>
              <template v-for="block in d.blocks" :key="block.title">
                <p class="dept-sub" v-if="block.title">{{ block.title }}</p>
                <ol class="dept-list" v-if="block.items && block.items.length">
                  <li v-for="(item, idx) in block.items" :key="idx">{{ item }}</li>
                </ol>
              </template>
              <p class="dept-note" v-if="d.note">{{ d.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  <gradient-stripe/>
  <Footer></Footer>
</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import GradientStripe from '../components/GradientStripe.vue';

const { t } = useI18n();

const joinUsRef = ref(null);
const applyRef = ref(null);
const deptsRef = ref(null);
const expandedDepartments = ref([]);

const toggleDepartment = (departmentKey) => {
  const index = expandedDepartments.value.indexOf(departmentKey);
  if (index > -1) {
    expandedDepartments.value.splice(index, 1);
  } else {
    expandedDepartments.value.push(departmentKey);
  }
};

const calculateRadius = (scrollY) => {
  const screenWidth = window.innerWidth;
  // Start slightly smaller and reduce faster so clipping happens earlier
  let baseRadius = 90; // was 100

  if (screenWidth > 1200) {
    baseRadius -= scrollY / 5;   // was /8
  } else if (screenWidth > 700 && screenWidth < 1200) {
    baseRadius -= scrollY / 7;   // was /10
  } else {
    baseRadius -= scrollY / 9;   // was /13
  }

  return Math.max(0, baseRadius);
};

const updateClip = (scrollY) => {
  const bannerBackground = document.querySelector('.joinus-background-image');
  if (!bannerBackground) return;

  const radius = calculateRadius(scrollY);
  const xPosition = 50;
  const yPosition = 50;
  const clipPathValue = `circle(${radius}% at ${xPosition}% ${yPosition}%)`;
  bannerBackground.style.clipPath = clipPathValue;
};

const handleRootScroll = (e) => {
  const root = e.currentTarget;
  updateClip(root.scrollTop || 0);
};

const departments = ref([
  {
    key: 'secretariat',
    name: 'Secretariat',
    capacity: '3-5 人',
    intro: '招新对象： 面向社团内外同步开放——无论你是社团现成员，还是对我们充满兴趣的新朋友，都欢迎加入秘书处，成为秘书处初创团队的一员，一起搭建秩序、提升效率、推进协作。',
    blocks: [{ title: '主要工作：', items: [
        "秘书处作为组织中枢，承担观察、协调与推进的职能。秘书处成员需具备对整体节奏的高度敏锐性，能够以理性思维与责任感辅助团队高效运作，成为主席团的坚实后盾",
        "跟进各部门工作进展，定期向主席团反馈整体情况",
        "协助制定并执行时间表，及时发现问题并推动解决",
        "在部门协作时帮助沟通、澄清职责，确保信息顺畅传达",
        "参与优化社团内部规范，推动流程与制度落地",
        "在紧急问题或临时挑战中，保持冷静并提出可行方案",
    ] },
    { title: '招新要求：', items: [
        "责任心强，可靠稳重：能够独立完成交办任务并持续跟进，做到“交事必有回”",
        "有经验者优先：有过活动策划、项目管理、团队协作、或学生组织工作经验者更佳",
        "抗压与应变能力：能在紧急或高压情况下保持冷静，快速做出判断并采取行动",
        "逻辑与执行力：清晰分析问题、提出建设性意见，并落实到位",
        "沟通与协调：善于跨部门沟通，能清晰表达并推动合作",
        "团队意识：具备大局观，能在全局和细节间灵活切换",
    ]},
    { title: '加分项', items: [
        "熟悉 Lark（飞书） 等协作工具",
        "有大型项目统筹/流程管理/社团管理等PM经验",
        "对提升组织效率、建立制度有热情与思考",
        "勇于挑战自我，乐于在复杂环境中学习和成长",
        "自信，开朗，善于沟通，有自我认同感和团队精神",
        "能够从学生利益视角出发，有主观能动性，有大局观",
    ]},
    ],
    note: "如果你想站在组织的核心位置，锻炼统筹与协调能力，并接受真正的挑战，秘书处就是最适合你的舞台。这里不仅能让你深入参与大型活动的策划与执行，还可能接触到国际名企管理层、世界级论坛峰会等高端平台，积累宝贵的项目管理经验。在提升自我的同时，你也将在 CSSA 的平台上，服务好蒙特利尔的海外学子，创造真正有价值的影响力。"
  },
  {
    key: 'event',
    name: 'Event',
    capacity: '2-4人',
    blocks: [
      {
        title: '主要工作：',
        items: [
          '独立或以团队合作的形式完成整场活动，包括但不限于活动构思、活动执行、活动反馈。',
          '及时将各活动的文件及资料上传到部门硬盘，实时更新。',
          '积极宣传部门活动，包括但不限于微信、小红书、Instagram 等。',
          '积极参与队内讨论，主动承担责任和准备工作，每次活动紧急情况需要到场。'
        ]
      },
      {
        title: '招新要求：',
        items: [
          '有强烈的责任心、执行力以及策划能力。',
          '有良好的语言沟通和团队协作能力。',
          '可以细致冷静地办事，且拥有随机应变的能力。',
          '拥有丰富的大型活动组织经验。',
          '熟悉了解各类综艺节目以及游戏环节，同时对过往 CSSA 的活动有所了解，便于达到更高的完成度。',
          '积极参与每次活动、会议、和群讨论，愿意主动承担部分体力活，包括但不限于布置场地、搬运物料。'
        ]
      },
      {
        title: '加分项：',
        items: [
          '过往拥有活动主持经历，请在报名表内列举并说明。',
          '可以在本地驾车。'
        ]
      }
    ]
  },
  {
    key: 'academic',
    name: 'Academic',
    capacity: '1-2 人',
    blocks: [
      { title: '主要工作：', items: [
        "负责每月Newsletter的运营管理，确保内容的及时更新和质量控制",
        "组织和筹划学术讲座，邀请行业内专家与学者分享知识和经验",
        "与团队成员共同参与各种集体活动，增强团队凝聚力",
        "积极支持CSSA的各类活动，确保活动顺利进行并达到预期效果",]
      },
      { title: '招新要求：', items: [
        "自信与沟通能力：要求自信大方，能够流畅表达自己的想法，具备良好的与各行业专家沟通的能力与情商",
        "具备信息检索能力和文字功底，对Newsletter可以进行撰写和创新",
        "注重团队合作与责任感",
        "有参与组织策划学术活动经历者优先；具备中/英文活动主持经验者优先 (需在简历中说明)",
      ] }
    ]
  },
  {
    key: 'media',
    name: 'Media',
    capacity: '1–2人（平面设计师）',
    intro: '空有一身才华无处展示？对设计/美术感兴趣的小朋友快来让你的灵感落地吧～',
    blocks: [
      {
        title: '主要工作：',
        items: [
          '参与活动海报/公众号推文封面/周边小物的设计。',
          '加分项：接触过 Canva、Photoshop 或者 Illustrator。'
        ]
      },
      {
        title: '招新要求：',
        items: [
          '具有一定审美，有相关设计经验者优先。',
          '报名时附上一些个人作品（如文件过大，可以使用网盘链接），内容包括但不限于制作过的海报、绘画等。'
        ]
      }
    ]
  },
  {
    key: 'external',
    name: 'External',
    capacity: '1-3 人',
    blocks: [
      { title: '主要工作：', items: [
        "通过与各大公司，各国学联等各类组织展开友好互惠合作，为McGill CSSA面向的学生群体带来多方面实用高效的资源。",
        "增强McGill和McGill CSSA在外界的认知",
        "与国内外各类企业洽谈合作",
        "与各国学联进行沟通合作",
        "全力为本CSSA各类活动提供赞助支持",
        "与小伙伴们吃喝玩乐",]
    },
      { title: '招新要求：', items: [
        "热爱生活（绝大部分时间is ok）",
        "自信大方，具有较好的沟通能力（优先）。",
        "胆大心细，敢于创新，注意细节。",
        "善于团队协作，拥有较强的执行力与责任感。"] 
    }
    ]
  },
  {
    key: 'finance',
    name: 'Finance',
    capacity: '1-2 人',
    blocks: [
      { title: '主要工作：', items: [
        "负责核实 CSSA 各部门的支出与收入情况",
        "制作和管理年度/活动预算",
        "确保并监管 CSSA 资金的合理使用",
        "维持资金稳定，为各类活动提供可靠支持",
      ] },
      { title: '招新要求：', items: [
        "细心认真，责任感强",
        "保持积极态度，善于沟通与协调",
        "具备财务或相关经验者优先",
      ] }
    ]
  },
  {
    key: 'internal',
    name: 'Internal',
    capacity: '2-3 人',
    intro: '如果你对活动策划充满创意与热情，有领导力、细心又有条理，Internal真诚欢迎你的加入！',
    blocks: [
      { title: '主要工作：', items: [
        "策划有趣又好玩的内部团建活动，为CSSA成员留下美好的社团回忆",
        "制定并落实内部考核与奖励制度",
        "协调并支持CSSA内部各部门的工作",
      ] },
    { title: '招新要求：', items: [
        "具备策划和组织CSSA内部团建活动的能力",
        "有社团经验或对CSSA较为熟悉",
        "拥有较强的社交与协调能力者将更具优势",
        ]
    }
    ]
  },
  {
    key: 'communication',
    name: 'Communication',
    capacity: '3-4 人',
    intro: '谁说不能玩着玩着就干出一番事业！？我们欢迎网感爆棚的你输出你的奇思妙想～ 如果在有些方面没有经验也无需担心，只要你愿意学习成长，均可报名！',
    blocks:[
        { title: '主要工作：', items: [
          '管理CSSA微信公众号及CSSA其他社交媒体账号的宣传内容（B站、小红书、Instagram、微博等）。',
          '撰写活动推文、文案，转载推广内容。',
          '利用秀米 / Canva / PS 为推送做排版。'
        ]
      },
      {
        title: '招新要求：',
        items: [
          '富有耐心、责任心、创造力，乐于沟通。',
          '对时下热门话题有一定了解。',
          '美工 & 文案 & 运营。'
        ]
      },
      {
        title: '美工：',
        items: [
          '有良好审美，有使用 Canva / 秀米 / PS 进行长图排版者优先。'
        ]
      },
      {
        title: '文案：',
        items: [
          '有较强的文字表达能力，逻辑通顺且主题明确（建议提供短篇文章或相关作品）。',
          '可独立撰稿，关注社会热点，具备良好的时事敏感度。',
          '拥有超绝网感，善于制造爆点话题。'
        ]
      },
      {
        title: '运营：',
        items: [
          '有社交平台账号运营经验者优先（建议在简历中写明正在运营的社交账号）。'
        ]
      },
      {
        title: '加分项：',
        items: [
          '爱看影视综艺 / 热爱流行音乐 / 关注娱乐新闻 / 曾为喜爱的艺人发电 / 玩转豆瓣、抖音、小红书等——超绝网络青年必备技能都是你的加分项哦！！'
        ]
      },
      {
        title: '作品集（非必需）：',
        items: [
          '如有设计作品集（例如参与制作公众号、照片、PPT、海报、绘画、长图排版等不限）请通过 email 上传。'
        ]
      }
    ]},
  {
    key: 'it',
    name: 'IT',
    capacity: '本部门不参与FALL2025招新，我们WINTER2025再见！',
    blocks: [
    ]
  },
]);

onMounted(() => {
    const root = document.querySelector('.joinus-root');
    if (root) {
      root.scrollTo(0, 0);
      root.addEventListener('scroll', handleRootScroll, { passive: true });
      updateClip(0);
    }

    const options = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
        });
    }, options);

    if (joinUsRef.value) observer.observe(joinUsRef.value);
    if (applyRef.value) observer.observe(applyRef.value);
    if (deptsRef.value) observer.observe(deptsRef.value);
});

onUnmounted(() => {
    const root = document.querySelector('.joinus-root');
    if (root) root.removeEventListener('scroll', handleRootScroll);
});
</script>

<style scoped>
.joinus-root {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
  background-color: #EEE1FF;
}

:deep(.navbar) {
  position: absolute !important; /* overlay within banner only */
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100%;
  z-index: 2 !important; /* above background and hero */
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

:deep(.navbar.nav-hidden) {
  transform: none !important; /* disable hide-on-scroll in this page */
  opacity: 1 !important;
}

body {
  margin: 0;
  background-color: #EEE1FF;
}

.banner-background {
  position: relative;
  width: 100%;
  height: calc(100vh);
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #f6f5ea 60%, #EEE1FF 100%);

}

.joinus-background-image {
  background-image: linear-gradient(
    90deg, 
    rgba(239, 223, 251, 0.783) 0%,
    rgb(216, 192, 249) 28.5%, 
    rgb(199, 163, 246) 66.66%, 
    rgba(176, 134, 244, 0.825) 90%),
    url('https://i.imgur.com/HuDDhsB.jpeg'
    );
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: transform 0.1s ease, clip-path 0.1s ease;
  clip-path: circle(200% at 50% 50%);
}


.fade-in {
    animation: fadeInAnimation 1s;
}

@keyframes fadeInAnimation {
    from {
        opacity: 0;
        transform: translatey(20px);
    }
    to {
        opacity: 1;
        transform: translatey(0);
    }
}


/* Center the JoinUs SVG image in the banner-background */
.banner-background img.joinus-title{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    height: auto;
}


.join-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: clamp(30px, 5vw, 72px); /* bigger, responsive */
  line-height: 0.6;
  text-align: center;
  margin: 3 auto;
  padding: 1rem 0; /* a bit more breathing room */
  color: #431070;
}
.join-title .join-cn,
.join-title .join-en {
  font-size: inherit;
  display: block;
  margin-top: 0;
}


.joinus-description {
  text-align: center;
  color: #6e549a;
  font-size: clamp(16px, 1.6vw, 22px);
  font-weight: 600;
  line-height: 1.5;
  margin: 0.5rem auto;
  max-width: 900px;
}
.joinus-desc-en {
  margin-bottom: 0.4rem;
}
.joinus-desc-cn {
  margin-top: 0;
}
.join-intro { 
  width: 95%; 
  margin: 2rem auto;
  scroll-snap-align: start;       /* snap to viewport top */
  scroll-snap-stop: normal;       /* snap when near */
  scroll-margin-top: 12px;        /* leave room for navbar if overlapping */
}
.apply-section { width: 95%; margin: 2rem auto; }

.join-card {
  background: #fff;
  border: 3px solid #B39AF0; /* soft purple border similar to screenshot */
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(67,16,112,0.12);
  padding: 1.8rem 2rem 2.2rem;
  color: #431070;
}

.join-heading {
  margin: 0 0 .4rem 0;
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  letter-spacing: .5px;
  font-size: clamp(28px, 4.2vw, 60px);
}

.join-divider { display: flex; align-items: center; gap: .75rem; margin-bottom: 1.2rem; }

/* numbered list */
.join-list {
  counter-reset: items;
  list-style: none;
  padding: 0;
  margin: 0 0 1.6rem 0;
}
.join-list li {
  counter-increment: items;
  position: relative;
  padding-left: 2.2rem;
  font-size: clamp(16px, 1.6vw, 24px);
  font-weight: 800;
  line-height: 1.6;
  margin: .45rem 0;
}
.join-list li::before {
  content: counter(items) '.';
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 900;
  color: #431070; /* accent purple for numbers */
}

.join-cta {
  margin: 1.2rem 0 .2rem 0;
  font-weight: 900;
  font-size: clamp(18px, 2vw, 28px);
  color: #431070;
}

.join-subcta {
  margin: 0;
  font-weight: 700;
  font-size: clamp(16px, 1.6vw, 22px);
  color: #431070;
}

@media (max-width: 720px) {
  .join-card { padding: 1.25rem 1rem 1.4rem; }
}

/* === Register Form Box === */
.register-form {
  width: 95%;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
}

.register-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  background: linear-gradient(90deg, #5d2ecc, #9a4dff, #5d2ecc);
  padding: 0.75rem 1.25rem;
  border-radius: 18px;
  color: #fff;
  font-weight: 800;
  font-size: clamp(16px, 2vw, 24px);
  text-decoration: none;
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
}

.register-text {
  flex: 1;
  text-align: center;
  background: #fff;
  color: #6a28d9;
  border-radius: 12px;
  padding: 0.75rem;
}

.register-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #6a28d9;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 1.4rem;
  flex-shrink: 0;
}

/* === Departments (toggle list) === */
.departments { width: 95%; margin: 2.2rem auto 4rem; }
.depts-title { text-align: center; color: #431070; margin: 0 0 1.2rem; font-weight: 900; font-family: 'Raleway', sans-serif; font-size: clamp(22px, 3.2vw, 40px); }
.depts-title span { font-size: .9em; font-weight: 700; opacity: .9; }

.dept-toggle-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dept-toggle-item {
  border-radius: 16px;
  border: 2px solid #B39AF0;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(67,16,112,0.08);
  transition: box-shadow 0.3s ease;
}

.dept-toggle-item:hover {
  box-shadow: 0 6px 18px rgba(67,16,112,0.15);
}

.dept-toggle-header {
  width: 100%;
  padding: 1.25rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition: background-color 0.3s ease;
}

.dept-toggle-header:hover {
  background: #f8f5ff;
}

.dept-toggle-header.active {
  background: linear-gradient(90deg, #6730d0 0%, #a56cf8 50%, #6730d0 100%);
  color: #fff;
}

.dept-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-right: 1rem;
}

.dept-name { 
  margin: 0; 
  font-style: italic; 
  font-weight: 900; 
  font-size: clamp(18px, 2.4vw, 24px);
  color: #431070;
}

.dept-toggle-header.active .dept-name {
  color: #fff;
  text-shadow: 0 2px 6px rgba(0,0,0,.25);
}

.dept-cap { 
  font-weight: 800; 
  opacity: .95;
  color: #6e549a;
  font-size: clamp(14px, 1.4vw, 16px);
}

.dept-toggle-header.active .dept-cap {
  color: #fff;
  opacity: 0.9;
}

.dept-toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.dept-toggle-icon span {
  font-size: 16px;
  color: #6e549a;
  transition: transform 0.3s ease;
}

.dept-toggle-header.active .dept-toggle-icon span {
  color: #fff;
}

.dept-toggle-icon span.rotated {
  transform: rotate(180deg);
}

.dept-toggle-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f8f5ff;
}

.dept-toggle-content.expanded {
  max-height: 2000px; /* Large enough to accommodate content */
}

.dept-body { 
  padding: 1.5rem;
  font-weight: 700; 
  line-height: 1.6;
  color: #431070;
}

.dept-intro { 
  margin: 0 0 .8rem 0;
  font-size: clamp(15px, 1.5vw, 18px);
}

.dept-note { 
  margin: 0 0 .8rem 0;
  font-size: clamp(15px, 1.5vw, 18px);
}

.dept-sub { 
  margin: 1rem 0 .4rem; 
  font-weight: 900;
  font-size: clamp(16px, 1.6vw, 19px);
  color: #431070;
}

.dept-list { 
  margin: .4rem 0 1rem 0; 
  padding-left: 1.5rem;
  font-size: clamp(14px, 1.4vw, 17px);
}

.dept-list li { 
  margin: .4rem 0;
  line-height: 1.5;
}

@media (max-width: 800px) {
  .dept-toggle-header { padding: 1rem; }
  .dept-body { padding: 1rem; }
  .dept-header-content { margin-right: 0.5rem; }
}
</style>
