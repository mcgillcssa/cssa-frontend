<template>
  <div class="information-container">
    <div class="information" ref="information">
      <div class="information-column" v-for="(item, index) in data" :key="index">
        <img :src="item.icon" :alt="`Icon ${index + 1}`" class="icon"/>
        <div class="section-break-small"></div>
        <p class="number">{{ displayedNumbers[index] }}</p>
        <p class="text" ref="textElements" :style="{opacity: 0}">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Information',
  props: {
    animationDuration: {
      type: Number,
      default: 2000 // Duration in milliseconds
    }
  },
  data() {
    return {
      data: [
        { icon: "https://i.imgur.com/uj6eEYS.png", number: 16000, text: "WECHAT FOLLOWERS" },
        { icon: "https://i.imgur.com/51lBXnQ.png", number: 283, text: "EVENTS" },
        { icon: "https://i.imgur.com/lTFcj7w.png", number: 1408, text: "MEMBERSHIPS" }
      ],
      displayedNumbers: [0, 0, 0],
      observer: null
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.1
    });
    this.observer.observe(this.$refs.information);
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateNumbers();
          this.observer.unobserve(this.$refs.information);
        }
      });
    },
    animateNumbers() {
      this.data.forEach((item, index) => {
        setTimeout(() => {
          this.animateValue(index, 0, item.number, this.animationDuration);
          this.$nextTick(() => {
            if (this.$refs.textElements && this.$refs.textElements[index]) {
              this.$refs.textElements[index].style.opacity = 1;
            }
          });
        }, index * 800);
      });
    },
    animateValue(index, start, end, duration) {
      const range = end - start;
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(timestamp - startTime, duration);
        const value = Math.floor((progress / duration) * range + start);
        this.displayedNumbers[index] = value;
        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          this.displayedNumbers[index] = end;
        }
      };
      requestAnimationFrame(step);
    }
  }
};
</script>

<style>
.information-container {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #EAEBF6;
  min-height: 30vh;
  width: 100%;
  margin: 2vw 0 2vw 0;
}

.information {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to right, #EAEBF6 25%, #d0c4ed 60%, #E2D8EC 100%);
  border-radius: 40px;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
  width: 90vw;
  justify-content: center;
  box-sizing: border-box;
}

.information-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  text-align: center;
}

.icon {
  width: 8vw;
  height: auto;
  padding-top: 3vh;
}

.section-break-small {
  width: 80%;
  height: 1px;
  background-color: #7A65A3;
  margin: 1rem 1rem;
}

.number {
  font-size: calc(2rem + 1vw);
  color: #7A65A3;
  font: Raleway;
  font-weight: 700;
  align-items: center;
  margin: 1rem 0;
}

.text {
  font: Raleway;
  font-size: calc(1rem + 0.5vw);
  color: #7A65A3;
  text-align: center;
  padding-bottom: 3vh;
  justify-content: center;
  align-items: center;
  margin: 0 0;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}


@media screen and (max-width: 700px) {

  .information {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    padding: 2vw 0 2vw 0;
  }

  .information-column {
    width: 65%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0px;
    text-align: center;
  }

  .icon {
    width: 10vw;
    height: auto;
    align-items: center;
    justify-content: center;
    padding-top: 0;
  }

  .section-break-small {
    width: 3px;
    height: 15vw;
    margin: 1vw 8vw 1vw 8vw;
    align-items: center;
    justify-content: center;
  }

  .number {
    width: 100vw;
    font-size: 4vw;
    text-align: left;
    margin: 0 0 0 0;
    justify-content: center;
  }

  .text {
    width: 100vw;
    font-size: 2.5vw;
    font-weight: 550;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 0;
    padding-bottom: 0;
  }
}

@media screen and (min-width: 1024px) {

  .icon {
  width: 8vw;
  height: auto;
  padding-top: 5vh;
}

.section-break-small {
  width: 80%;
  height: 2px;
  margin: 1rem 1rem;
}

.number {
  font-size: calc(2rem + 1vw);
  font-weight: 750;
}

.text {
  font: Raleway;
  font-size: calc(1rem + 1vw);
  padding-bottom: 3vh;
  font-weight: 500;
}

}
</style>
