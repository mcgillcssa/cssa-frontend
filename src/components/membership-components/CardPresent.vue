<template>
  <div class="card-explain-container">
    <div class="what-is-membership-title">
      <p class="text cn">什么是CSSA会员?</p>
      <p class="text en" id="mem-title"><b>What is CSSA Membership?</b></p>
    </div>
    <div class="card-text-display">
      <div class="card-dis">
        <img src="https://i.imgur.com/A0HEhlU.jpg" alt="This is membership card" id="card" />
      </div>
      <div class="text-dis">
        <p class="text en" id="mem-text">
          Introducing the exclusive membership card by CSSA, the esteemed Chinese Students and
          Scholars Association at McGill University. Crafted with care, this exceptional card is
          designed to bestow a host of remarkable benefits upon Chinese students pursuing their
          studies at McGill. Unlock a world of advantages as you wield this card, gaining access to
          enticing discounts and special offers from a curated selection of renowned brands,
          elegantly listed on the card's back. Immerse yourself in a realm of savings and privileges
          tailored to enhance your student experience, courtesy of the CSSA membership card.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPresent'
}
</script>

<style>
.card-explain-container {
  background-color: #e8ded1;
  font-family: Raleway;
  padding: 2%;
}

.card-text-display {
  display: grid;
  grid-template-areas: 'image text';
  grid-template-columns: 40% 60%;
  gap: 25px;
  position: relative;
}

.card-dis {
  width: 380px;
  height: 250px;
  background: #e8ded1;
  margin: auto;
  padding: 15px 10px;
  grid-area: image;
  box-shadow: -50px -50px 0 -40px #b79d7c, 50px 50px 0 -40px #b79d7c;
}

.text-dis {
  grid-area: text;
  text-align: left;
}

#card {
  max-width: 350px;
  max-height: 250px;
  width: auto;
  height: auto;
}

.what-is-membership-title {
  padding: 10px;
}

#mem-title {
  font-size: 32px;
  margin-top: 0%;
}

#mem-text {
  font-size: 21px;
  font-weight: 500;
  line-height: 1.5;
}

.cn {
  color: #ff6c6c;
  margin-bottom: 0%;
}
@media (max-width: 1024px) {
  .card-text-display {
    display: grid;
    grid-template-areas: 'image' 'text';
    grid-template-rows: 40% 60%;
    position: relative;
  }
}
</style>
