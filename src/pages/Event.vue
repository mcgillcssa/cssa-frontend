<template>
  <div class="event-container">
    <div class="nav-bar">
      <NavBar />
    </div>
    <div class="title-text title-text-1">
      <p>Events</p>
    </div>
    <div class="event-page">
      <div class="event-layout">
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
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import EventCard from "@/components/Event/EventCard.vue";
import axios from "axios";

export default {
  name: "EventPage",
  components: { NavBar, EventCard },
  data() {
    return {
      eventByYear: []
    };
  },
  async mounted() {
    try {
      const res = await axios.get("http://localhost:8080/api/events/all");
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
  }
};
</script>

<style scoped>
.event-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
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

.event-page {
  background-image: linear-gradient(#3364BB, #E3F4FF), url('https://i.imgur.com/ZgCeJBq.jpg');
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

.event-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 23%;
  height: 330vh;
  background-color: #3364BB;
}

.event-page::after {
  content: '';
  position: absolute;
  top: 0;
  left: 22.5%;
  width: 9px;
  height: 200vh;
  background: linear-gradient(
      to bottom,
      #FFEE8F 0.67%,
      #E3FBCF 16.5%,
      #BBF0FA 30%,
      #ABD9FF 44.5%,
      #5DABF3 62%,
      #448FD6 81.5%,
      #3262BA 99.99%
  );
  animation: pulseStripe 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes pulseStripe {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.section-break {
  position: relative;
  height: 1vw;
  background: linear-gradient(
      90deg,
      #FFEE8F 0.67%,
      #E3FBCF 16.5%,
      #BBF0FA 30%,
      #ABD9FF 44.5%,
      #5DABF3 62%,
      #448FD6 81.5%,
      #3262BA 99.99%
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
  margin-left: calc(23% + 16px); /* ensure no overlap with blue bar and gradient stripe */
  padding-left: 24px;
  padding-top: 12vh;
  padding-right: 26px;
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
    font-size: 8vh;
    text-align: center;
    width: 100%;
    left: 50%;
    top: 9vh;
    transform: translateX(-50%);
    margin-left: 0;
    text-shadow: 4px 6px 8px rgba(30, 61, 121, 0.8);
  }

  .event-container {
    max-width: 100%;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  .event-page {
    background-image: linear-gradient(#3364BB, #E3F4FF), url('https://i.imgur.com/ZgCeJBq.jpg');
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

  .event-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 25vh;
  }

  .event-page::after {
    content: '';
    position: absolute;
    top: 25vh;
    left: 0;
    width: 100vw;
    height: 9px;
    background: linear-gradient(
        to right,
        #FFEE8F 0.67%,
        #E3FBCF 16.5%,
        #BBF0FA 30%,
        #ABD9FF 44.5%,
        #5DABF3 62%,
        #448FD6 81.5%,
        #3262BA 99.99%
    );
    animation: pulseStripe 3s ease-in-out infinite;
    z-index: 1;
  }

  .event-layout {
    flex-direction: column;
    gap: 8px;
  }

  .event-right {
    margin-left: 0;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 20vh;
  }

  .events-list {
    padding: 12px;
  }
}
</style>