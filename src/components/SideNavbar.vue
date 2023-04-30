<!-- eslint-disable vue/no-unused-components -->
<template>
  <div class="container">
    <div class="shell">
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
      <a href="#" class="box">
        <span class="icon"><home theme="outline" size="48" fill="#FF6666" /></span>
        <span class="text">Home</span>
      </a>
    </div>
  </div>
</template>

<script>
import { Home, CalendarThirtyTwo } from '@icon-park/vue-next'
export default {
  components: {
    Home,
    // eslint-disable-next-line vue/no-unused-components
    CalendarThirtyTwo
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}

.container {
  display: flex;
  border-right: 5px solid #ff6666;
  justify-content: center; /* Align horizontally */
  height: 100%; /* Height of the entire viewport */
  position: fixed; /* Position referring to viewport only, does not scroll */
  background-color: white;
}

.shell {
  width: 70px;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  transition: 0.1s;
}

.box {
  height: 40px;
  min-height: 40px;
  width: 85%;
  margin: 9px;
  border-radius: 5px;
  position: relative;
  transition: 0.2s;
  display: flex;
  align-items: center;
}

.icon {
  font-size: 60px;
  position: absolute;
  margin: 7px 0 0 7px;
}

.box:nth-child(1)::before,
.box:nth-child(5)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: #ff6666;
  position: absolute;
  bottom: -10px;
}

.text {
  position: relative;
  left: 40px;
  top: 2px;
  font: 500 20px Arial;
  opacity: 0;
  transition: 0.1s;
  margin-left: 20px;
  color: #ff6666;
}

.text.active {
  transition-delay: 0;
}

.shell:hover {
  width: 150px;
}

.box:hover {
  background-color: #ffcccc;
}

.shell:hover .text {
  opacity: 1;
}
</style>
