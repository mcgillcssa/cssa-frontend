<template>
<div class="aboutus-root">
  <div class="banner-background">
    <NavBar />
    <div class="aboutus-background-image"></div>
    <img class="aboutus-hero" src="@/assets/AboutUs.svg" alt="About Us" />
  </div>
  <!-- About Us Intro Card -->
  <section class="about-intro" ref="aboutUsRef">
    <h1 class="about-title">
      <span class="about-cn">关于我们</span><br />
      <span class="about-en">About Us</span>
    </h1>
    <div class="about-card">
      <div class="about-text">
        <p class="en">
          McGill University Chinese Students and Scholars Association (CSSA), is the only student community certified by the Chinese Consulate on campus, and it is the only cultural club dedicated mainly to students and scholars from Mainland China.
        </p>
        <p class="cn">
          这是麦吉尔大学中国学生学者联谊会（McGill CSSA），是一 个正式认证、官方承认、非盈利，并且唯一正式受官方校方允许的主要面向本科生的官方学生组。
        </p>
      </div>
      <img class="about-logo" src="@/assets/CSSALogo.svg" alt="CSSA Logo" />
    </div>
  </section>
  <section class="about-intro"></section>
  <!-- Executive Team -->
  <section class="exec-wrapper" ref="execRef">
    <h3 class="exec-title">Executive Team</h3>
    <div class="exec-list">
      <article class="exec-card" v-for="team in execTeams" :key="team.role">
        <div class="exec-role">
          <span>{{ team.role }}</span>
        </div>
        <div class="exec-names">
          <div class="name" v-for="m in team.members" :key="m.email">{{ m.name }}</div>
        </div>
        <div class="exec-contacts">
          <a class="email" v-for="m in team.members" :key="'e-'+m.email" :href="`mailto:${m.email}`">
            <svg class="mail-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>
            <span>{{ m.email }}</span>
          </a>
        </div>
      </article>
    </div>
  </section>

  <gradient-stripe/>
  <Footer></Footer>
</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import GradientStripe from '../components/GradientStripe.vue';

const aboutUsRef = ref(null);
const execRef = ref(null);
const execTeams = [
  {
    role: 'Co-President',
    members: [
      { name: 'Ivanka Han', email: 'yinuo.han@mail.mcgill.ca' },
      { name: 'Rachel Fu', email: 'yijia_fu@mail.mcgill.ca' }
    ]
  },
  { role: 'VP Event', members: [{ name: 'Alice Zheng', email: 'alice.zz3@gmail.com' }] },
  { role: 'VP External', members: [{ name: 'Rachel Wen', email: 'rachel.xlwen@icloud.com' }] },
  { role: 'VP Finance', members: [{ name: 'Yuchen Song', email: 'yuchen.song8795@gmail.com' }] },
  { role: 'VP Media', members: [{ name: 'Irene Wang', email: 'media.mcgillcssa@gmail.com' }] },
  { role: 'VP Communication', members: [{ name: 'Lucy Yang', email: 'commu.mcgillcssa@gmail.com' }] },
  { role: 'VP Academic', members: [{ name: 'Ziting Xu', email: 'academic.mcgillcssa@gmail.com' }] },
  { role: 'VP Internal', members: [{ name: 'Nick Chen', email: 'internal.mcgillcssa@gmail.com' }] },
  { role: 'IT Director', members: [{ name: 'Cleo Tang', email: 'it.mcgillcssa@gmail.com' }] },
  // { role: 'VP Secretariat', members: [{ name: 'Irene Wang', email: 'media.mcgillcssa@gmail.com' }] },
]

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
  const bannerBackground = document.querySelector('.aboutus-background-image');
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

onMounted(() => {
    const root = document.querySelector('.aboutus-root');
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

    if (aboutUsRef.value) observer.observe(aboutUsRef.value);
    if (execRef.value) observer.observe(execRef.value);
});

onUnmounted(() => {
    const root = document.querySelector('.aboutus-root');
    if (root) root.removeEventListener('scroll', handleRootScroll);
});
</script>

<style scoped>
.aboutus-root {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
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

.page {
  overflow: hidden;
}

.banner-background {
  position: relative;
  width: 100%;
  height: calc(100vh);
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #f6f5ea 60%, #EEE1FF 100%);

}

.aboutus-background-image {
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

/* === Executive Team === */
.exec-wrapper {
  width: 90%; 
  margin: 2vw auto 4vw;
  scroll-snap-align: start;       /* snap to viewport top */
  scroll-snap-stop: normal;       /* snap when near */
  scroll-margin-top: 12px;        /* leave room for navbar if overlapping */
}
.exec-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: clamp(32px, 5vw, 72px); /* bigger, responsive */
  line-height: 1.1;
  text-align: center;
  margin: 0 auto;
  padding: 1.2rem 0; /* a bit more breathing room */
  color: #2c1a4f;
}
.exec-list { display: grid; gap: 1.3vw; }
.exec-card {
    display: grid;
    grid-template-columns: 220px 1fr 1fr;
    align-items: center;
    background: linear-gradient(90deg,#a88cf7 0%, #9467f0 45%, #7a4be6 65%, #6a3fe0 100%);
    color: #fff;
    border-radius: 14px;
    box-shadow: 0 8px 22px rgba(67,16,112,0.15);
    padding: 1.2rem 1.4rem;
}
.exec-role { font-style: italic; font-weight: 800; color: #f5eaff; }
.exec-role span { display: inline-block; }
.exec-names { font-weight: 800; font-style: italic; display: grid; gap: .4rem; }
.exec-names .name { text-shadow: 0 1px 2px rgba(0,0,0,.15); }
.exec-contacts { justify-self: end; display: grid; gap: .8rem; }
.exec-contacts .email {
    display: flex;
    align-items: center;
    justify-content: center; /* center text horizontally */
    gap: .3rem;
    background: #ffffff33;
    border-radius: 12px;
    padding: .80rem .10rem;
    text-decoration: none;
    color: #fff;
    width: 400px; /* fixed width for all email containers */
    box-sizing: border-box;
}
.mail-icon { width: 18px; height: 18px; fill:#fff; opacity:.9; }

/* Responsive */
@media (max-width: 900px) {
    .exec-card { grid-template-columns: 1fr; gap: .6rem; padding: 1rem; }
    .exec-role { order: 1; }
    .exec-names { order: 2; }
    .exec-contacts { order: 3; justify-self: start; }
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

@media screen and (min-width: 1921px) {
  .home-title {
    max-width: 800px;
    left: 3%;
  }
}

@media screen and (max-width: 700px) {
    .banner-background {
        background: linear-gradient(to bottom, #f6f5ea 60%, #EEE1FF 100%);
    }

    h3 {
        padding: 0.5vw 0;
    }

    .home-title {
        max-width: 80vw;
        left: 3%;
        font-size: 10vw;
    }
}

/* Center the AboutUs SVG image in the banner-background */
.banner-background img.aboutus-hero{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    height: auto;
}

/* === About Intro Card === */
.about-intro { 
  width: 100%; 
  scroll-snap-align: start;       /* snap to viewport top */
  scroll-snap-stop: normal;       /* snap when near */
  scroll-margin-top: 12px;        /* leave room for navbar if overlapping */
}
.about-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 800;
  font-size: clamp(30px, 5vw, 72px); /* bigger, responsive */
  line-height: 0.6;
  text-align: center;
  margin: 3 auto;
  padding: 1.2rem 0; /* a bit more breathing room */
  color: #431070;
}
.about-title .about-cn,
.about-title .about-en {
  font-size: inherit;
  display: block;
  margin-top: 0;
}
.about-card {
    position: relative;
    width: 90%;
    margin: 2.5vw auto 4vw;
    padding: 2.5vw 3vw;
    background: #ffffff;
    border-radius: 18px;
    border: 2px solid #bda3ef;
    box-shadow: 0 8px 24px rgba(67,16,112,0.12);
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 2vw;
}
.about-text { color: #431070; }
.about-text p { margin: 0 0 1.2vw 0; line-height: 1.45; }
.about-logo {
    align-self: center;
    justify-self: center;
    max-width: 240px;
    width: 100%;
    height: auto;
}

/* Responsive */
@media screen and (max-width: 900px) {
  .about-title .about-cn { font-size: 3.6vw; }
  .about-title .about-en { font-size: 4.2vw; margin-top: -1.6vw; }
  .about-card { grid-template-columns: 1fr; gap: 4vw; padding: 5vw; }
  .about-logo { max-width: 34vw; }
}
</style>
