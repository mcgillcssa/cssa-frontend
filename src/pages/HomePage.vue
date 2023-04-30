<template>
  <div class="container">
    <side-navbar></side-navbar>
    <div class="content-container">
      <img class="banner" src="https://i.imgur.com/jXWUriN.png" alt="Example Banner" />
      <div class="content">
        <h1>Welcome to My Vue.js App!</h1>
        <p>This is the homepage.</p>
        <router-link to="/about">Go to About page</router-link>
        <hello-world></hello-world>
      </div>
    </div>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import SideNavbar from '@/components/SideNavbar.vue'
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

.content-container {
  flex: 1 1 0; /* Take up remaining space */
  margin: 0 0 0 75px;
  padding: 0;
  background-color: #eee;
}

.content {
  padding-left: 20px;
}

.banner {
  display: block;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
