<template>
  <div class="container">
    <side-navbar></side-navbar>
    <div class="content"></div>
  </div>
</template>

<script setup>
import SideNavbar from '@/components/SideNavbar.vue'
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

.container {
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
}

.content {
  flex: 1;
  margin: 0 0 0 75px;
  padding: 0;
  background-color: #eee;
}
</style>
