<template>
  <div class="container">
    <side-bar></side-bar>
    <div class="content"></div>
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
</script>

<style>
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
  margin: 0 0 0 80px;
  padding: 0;
  background-color: #eee;
}
</style>
