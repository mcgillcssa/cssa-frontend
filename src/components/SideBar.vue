<template>
  <div class="container">
    <div class="icon-container"><img class="icon1" src="https://i.imgur.com/djRtTKV.png" /></div>
    <div class="icon-container"><img class="icon2" src="https://i.imgur.com/djRtTKV.png" /></div>
    <div class="cssa-name">
      <router-link to="/" class="router-link">MCGILL CSSA</router-link>
    </div>
    <div class="icon-container"><img class="icon3" src="https://i.imgur.com/djRtTKV.png" /></div>
    <div class="icon-container"><img class="icon4" src="https://i.imgur.com/djRtTKV.png" /></div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
.container {
  background-color: white;
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 10px 10px 10px 10px;
  position: fixed;
  top: 0;
  width: 60px;
}

.icon-container {
  align-items: top;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 70px;
}

.icon1,
.icon2 {
  align-self: flex-start;
  width: 100%;
  fill: #a12627;
  cursor: pointer;
}

.icon3,
.icon4 {
  align-self: flex-end;
  width: 100%;
  fill: #a12627;
  cursor: pointer;
}

.icon:hover {
  fill: #4fba91;
}
.cssa-name {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 400px;
  min-height: 400px;
}

.router-link {
  align-items: center;
  color: #a12627;
  display: flex;
  font-family: 'Hertical Smooth', 'Garet', sans-serif;
  font-size: 50px;
  justify-content: center;
  text-decoration: none;
  transform: rotate(-90deg);
  white-space: nowrap;
}
</style>
