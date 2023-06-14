<template>
  <div>
    <ul class="nav_list sticky">
      <li class="nav_icon">
        <router-link to="/">
          <img src="https://i.imgur.com/rZahX5F.png" width="60" height="60" class="d-inline-block align-text-top">
        </router-link>
      </li>
      <li class="nav_item">
        <router-link to="/event">Events</router-link>
      </li>
      <li class="nav_item" style="width: 1%">
        |
      </li>
      <li class="nav_item">
        <router-link to="/">Membership</router-link>
      </li>
      <li class="nav_item" style="width: 1%">
        |
      </li>
      <li class="nav_item" style="margin-right: 5%">
        <router-link to="/">Sponsors</router-link>
      </li>
    </ul>
  </div>
  <router-view></router-view>
</template>

<script setup></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body{
  margin: 0;
}

.nav_list{
  display: flex;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #E8DED1;
  color: #FF6C6C;
  align-items: center;
  justify-content: flex-end;
}

.nav_icon{
  list-style: none;
  margin-left: 2%;
  margin-right: auto;
  flex-grow: 0.5;
}

.nav_item{
  margin-right: 2%;
  list-style: none;
  text-align: center;
  font-family: Corbel;
  font-size: 1.5em;
  color: #FF6C6C;
}

.nav_item a{
  text-decoration: none;
  color: #FF6C6C;
}

.nav_item a:hover{
  color: #2c3e50;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

</style>
