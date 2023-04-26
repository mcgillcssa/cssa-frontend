<template>
  <div class="container">
    <side-bar></side-bar>
    <div class="content">
      <img class="banner" src="https://i.imgur.com/jXWUriN.png" alt="Example Banner" />
      <div>
        <h1>Welcome to My Vue.js App!</h1>
        <p>This is the homepage.</p>
        <router-link to="/about">Go to About page</router-link>
      </div>
      <hello-world></hello-world>
    </div>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
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

.banner {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
