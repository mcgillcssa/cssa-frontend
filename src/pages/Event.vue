<template>
  <NavBar />
  <div class="event-container">
    <div class="title-text title-text-1">
      <p>Events</p>
    </div>
    <div class="event-page">
      <div class="background-stripe"></div>
      <div class="event-right">
        <div
            class="event-block"
            v-for="(yearSection, index) in eventByYear"
            :key="yearSection.year"
        >
          <div class="year-wrapper">
            <div class="year-header" @click="yearSection.open = !yearSection.open">
              <h2>{{ yearSection.year }}</h2>
              <span :class="yearSection.open ? 'arrow-down' : 'arrow-up'"></span>
            </div>
            <div v-show="yearSection.open" class="events-list">
              <EventCard
                  v-for="e in yearSection.events"
                  :key="e.id"
                  :event="e"
              />
            </div>
          </div>
          <!-- Only show break section if not the last item -->
          <div
              v-if="index < eventByYear.length - 1"
              class="section-break"
              ref="sectionBreakRef"
          >
            <div class="mask"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <gradient-stripe/>
  <Footer />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import EventCard from "@/components/Event/EventCard.vue";
import GradientStripe from '../components/GradientStripe.vue';
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "EventPage",
  components: { NavBar, EventCard, Footer, GradientStripe },
  data() {
    return {
      eventByYear: []
    };
  },
  methods: {
  },
  async mounted() {
    try {
      const eventUrl = process.env.VUE_APP_BACKEND_URL + "/api/events/all";
      console.log(eventUrl);
      const res = await axios.get(eventUrl);
      const events = res.data.events || [];
      const map = new Map();

      for (const event of events) {
        const year = event.eventStartDate.substring(0, 4);
        if (!map.has(year)) map.set(year, []);
        map.get(year).push(event);
      }

      this.eventByYear = Array.from(map.entries())
          .sort((a, b) => b[0] - a[0]) // Sort years descending (newest first)
          .map(([year, evts]) => ({
            year: Number(year),
            events: evts.sort((a, b) => {
              // Sort events within each year by date
              // For ascending order (oldest first within year):
              return new Date(b.eventStartDate) - new Date(a.eventStartDate);

              // For descending order (newest first within year), use:
              // return new Date(b.eventStartDate) - new Date(a.eventStartDate);
            }),
            open: false
          }));

      console.log(res.data.events);

    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
body {
  margin: 0;
  background-color: #EEE1FF;
}

.event-container {
  width: 100%;
  position: relative;
  min-height: 100vh;
}

.event-block{
  margin-bottom: 5px;
}

.nav-bar {
  width: 100%;
  z-index: 100;
  position: relative;
}

.title-text {
  margin-left: 3.5vw;
  position: relative;
  font-size: 6vw;
  line-height: 6vw;
  transform: scale(1, 0.95);
  user-select: none;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: -0.2vw;
  text-shadow: 4px 6px 8px rgba(42, 30, 121, 0.8);
}

.title-text-1 {
  z-index: 2;
  position: absolute;
  top: 30%;
  font-style: italic;
}

.event-page {
  background-image: linear-gradient(#6733bbb1, #f1e3ff), url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-position: center;
  /* background-repeat: no-repeat; */
  background-blend-mode: overlay;
  position: relative;
  width: 100%;
  min-height: 100vh;   /* fill at least viewport height */
  height: auto;        /* allow content to define height */
  overflow: visible;   /* page scrolls, not this div */
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  background-attachment: fixed;
}

.background-stripe {
  width: 23%;
  flex: 0 0 23%;
  height: 100vh;           /* full viewport height, independent of event-right expansion */
  background-color: rgba(214, 191, 250, 0.482);
  z-index: 0;
}


.section-break {
  position: relative;
  height: 1vw;
  background: linear-gradient(
      90deg,
      #FFC6B4 0.67%,
      #FFA7D1 13.5%,
      #AD87CB 26.5%,
      #A78CD0 44.5%,
      #8266b3 62%,
      #5c3f93 75.5%,
      #431070 96.99%
  );
  width: 80%;
  border-radius: 20px;
  margin: 5px 6vw 12px 6vw;

}

.event-layout {
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
}

.event-right {
  flex: 1;
  padding-left: 24px;
  padding-top: 12vh;
  padding-right: 26px;
  height: calc(100vh - 12vh);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.year-wrapper {
  border: 1px solid #D1B3E0;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #F9F7FB;
}

.year-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
}
.year-header h2 {
  margin: 0;
  color: #68428B;
  font-size: 4vw;
}
.arrow-up::before {
  content: "▲";
  color: #68428B;
}
.arrow-down::before {
  content: "▼";
  color: #68428B;
}
.events-list {
  padding: 16px;
}

@media (max-width: 600px) {
  .nav-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .title-text-1.title-text {
    z-index: 2;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scale(1, 0.95);
    font-style: italic;
    margin-left: 3.5vw;
    font-size: 6vw;
    line-height: 6vw;
    user-select: none;
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: -0.2vw;
    text-shadow: 4px 6px 8px rgba(30, 61, 121, 0.8);
  }

  .event-container {
    max-width: 100%;
    overflow-x: hidden;
    position: relative;
    width: 100%;
    min-height: 100vh;
  }

  .event-page {
    background-image: linear-gradient(#6733bbb1, #f1e3ff), url('https://i.imgur.com/ZgCeJBq.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: overlay;
    position: relative;
    width: 100%;
    min-height: 100vh;  /* ensure at least full screen height */
    height: auto;       /* content drives height */
    overflow: visible;  /* allow page (body) to scroll */
    display: flex;
    flex-direction: column;
  }

  .background-stripe { display: none; }

  .event-layout {
    flex-direction: column;
    gap: 8px;
  }

  .event-right {
    margin-left: 0;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 20vh;
    height: calc(100vh - 20vh);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .events-list {
    padding: 12px;
  }
}
</style>