<template>
    <div class="presentation-container">
      <div class="presentation">
        <div class="presentation-column">
            <img src="https://i.imgur.com/uj6eEYS.png" alt="Icon 1" class="icon"/>
            <div class="section-break-small"></div>
            <p class="number">16000</p>
            <p class="text">WECHAT FOLLOWERS</p>
        </div>
        <div class="presentation-column">
            <img src="https://i.imgur.com/51lBXnQ.png" alt="Icon 2" class="icon"/>
            <div class="section-break-small"></div>
            <p class="number">283</p>
            <p class="text">EVENTS</p>
        </div>
        <div class="presentation-column">
            <img src="https://i.imgur.com/lTFcj7w.png" alt="Icon 3" class="icon"/>
            <div class="section-break-small"></div>
            <p class="number">1408</p>
            <p class="text">MEMBERSHIP</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Presentation'
}
</script>

<style>
.presentation-container {
  position: relative;
    display: flex;
    justify-content: center;
    background-color: #EAEBF6;
    min-height: 30vh;
    width: 100%;
    margin: 0 0 2vw 0;
}

.presentation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to right, #EAEBF6 25%, #d0c4ed 60%, #E2D8EC 100%);
  border-radius: 40px;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
  width: 90vw;
  justify-content: center;
  padding: 20px 0; /* Added padding for consistent spacing */
}

.presentation-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
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
  margin: 1rem auto; /* Centered horizontally */
}

.number {
  font-size: calc(2rem + 1vw);
  color: #7A65A3;
  font: Raleway;
  font-weight: 700;
  align-items: center;
  margin: 1vw 0;
  text-align: center; /* Center text */
}

.text {
  font: Raleway;
  font-size: calc(1rem + 0.5vw);
  color: #7A65A3;
  text-align: center;
  padding-bottom: 3vh;
  margin: 0 0;
}

@media (max-width: 700px) {

  .presentation {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    width: 90vw;
    padding: 2vw 0 4vw 0;
  }

  .presentation-column {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
  }

  .icon {
    width: 12vw;
    height: auto;
    padding-top: 3vh;
    align-items: center;
  }

  .section-break-small {
    width: 5px;
    height: 85%;
    /* margin: 3vw 0vw 0 6vw; */
    align-items: center;
    margin: 10px auto;
  }

  .number {
    width: 100%;
    font-size: 4.5vw;
    text-align: right;
    /* margin: 2vw 2vw 2ve 0vw; */
    margin: 10px auto;
  }

  .text {
    width: 100%;
    font-size: 2.5vw;
    font-weight: 700;
    text-align: left;
    margin: 2vw 4vw 2vw 4vw;
  }
}

@media (min-width: 1024px) {

  .icon {
  width: 10vw;
  height: auto;
  padding-top: 5vh;
}

.section-break-small {
  width: 80%;
  height: 2px;
  margin: 1rem 1rem;
}

.number {
  font-size: calc(2rem + 2vw);
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
