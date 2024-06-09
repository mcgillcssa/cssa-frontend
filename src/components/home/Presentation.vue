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
    margin: 5vh auto;
}

.presentation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to right, #EAEBF6 25%, #d0c4ed 60%, #E2D8EC 100%);
  margin: 4vh auto;
  border-radius: 40px;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
  width: 90vw;
  justify-content: center;
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
}

.number {
  font-size: calc(2rem + 1vw);
  color: #7A65A3;
  font: Raleway;
  font-weight: 700;
  align-items: center;
  margin: 1vw 0;
}

.text {
  font: Raleway;
  font-size: calc(1rem + 0.5vw);
  color: #7A65A3;
  text-align: center;
  padding-bottom: 3vh;
  margin: 1vw 0;
}

@media (max-width: 600px) {
  .number {
    font-weight: 500;
    font-size: 3vw;
  }

  .text {
    font-size: 1.8vw;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .number {
    font-weight: 600;
    font-size: 4vw;
  }

  .text {
    font-size: 2vw;
  }
}

@media (min-width: 961px) {
  .number {
    font-weight: 700;
  }
}
</style>
