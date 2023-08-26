<template>
  <banner-layout
    :banner-source="'https://i.imgur.com/9myUD3h.jpg'"
    :banner-alter="'Membership Page Banner'"
  />
  <div class="content"></div>
</template>

<script setup>
import BannerLayout from '../components/BannerLayout.vue'
</script>

<style scoped>
.content {
  height: 100vh;
  width: 100%;
  background-color: #eaebf6;
}
</style>
