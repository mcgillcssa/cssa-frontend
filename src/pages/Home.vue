<template>
  <NavBar />
  <div class="banner-background">
    <img
      class="home-title"
      src="https://media.discordapp.net/attachments/887824994602733598/1155642024175878215/image.png"
    />
  </div>
  <gradient-stripe></gradient-stripe>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import GradientStripe from '../components/GradientStripe.vue'
</script>

<style>
body {
  margin: 0;
}

.page {
  overflow: hidden;
}

.vertical-flex-container {
  flex-direction: column;
}

.banner-background {
  position: relative;

  background-image: linear-gradient(
      122.63deg,
      #ffc6b4 0.67%,
      #ffa7d1 25.09%,
      #ad87cb 50.63%,
      #8986ed 84.36%,
      #4f78c9 100%
    ),
    url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-blend-mode: multiply;
  width: 100%;
  height: calc(100vh - 24px);
}

.home-title {
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
}

@media screen and (min-width: 1921px) {
  .home-title {
    max-width: 800px;
    left: 3%;
  }
}
</style>
