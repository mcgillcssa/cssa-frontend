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
}

.presentation-column {
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
}

@media (max-width: 700px) {

  .presentation {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    padding: 2vw 0 2vw 0;
  }

  .presentation-column {
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
  font-size: calc(2rem + 1.5vw);
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
