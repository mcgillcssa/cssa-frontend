<template>
  <div>
    <ul id="nav_bar" class="nav_list">
      <li class="nav_icon">
        <router-link to="/">
          <img src="https://i.imgur.com/L0ikCsh.png" width="60" height="60" />
        </router-link>
      </li>
      <li class="nav_item">
        <router-link to="/">EVENTS</router-link>
      </li>
      <!-- <li class="nav_item" style="width: 1%">|</li> -->
      <li class="nav_item">
        <router-link to="/">MEMBERSHIP</router-link>
      </li>
      <!-- <li class="nav_item" style="width: 1%">|</li> -->
      <li class="nav_item" style="margin-right: 5%">
        <router-link to="/">SPONSORS</router-link>
      </li>
      <li class="dropdown">
        <button v-on:click="drop()" class="dropdown_button">|||</button>
      </li>
    </ul>
    <div id="dropdown" class="dropdown-content">
      <div class="phone_nav_item">
        <router-link to="/">Events</router-link>
      </div>
      <div class="phone_nav_item">
        <router-link to="/">Membership</router-link>
      </div>
      <div class="phone_nav_item">
        <router-link to="/">Sponsors</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    drop: function () {
      var position = document.getElementById('nav_bar').getBoundingClientRect()
      var dropdown = document.getElementById('dropdown')
      dropdown.style.top = position.bottom + 'px'
      dropdown.classList.toggle('display')
    },
    handleResize: function () {
      const dropdown = document.getElementById('dropdown')
      if (window.innerWidth > 720 && dropdown.classList.contains('display')) {
        dropdown.classList.remove('display')
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style>
@media only screen and (max-width: 720px) {
  .nav_item {
    display: none;
  }

  .dropdown {
    display: list-item !important;
    list-style: none;
    margin-right: 2%;
    font-size: 1.5em;
  }
}

body {
  margin: 0;
}

.phone_nav_item {
  margin: 5% 5% 5%;
}

.phone_nav_item a {
  text-decoration: none;
  font-weight: 300;
  color: #ff6c6c;
}

.phone_nav_item a:hover {
  color: #2c3e50;
}

.nav_list {
  display: flex;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100px;
  /* background-color: #e8ded1; */
  align-items: center;
  justify-content: flex-end;
}

.nav_icon {
  list-style: none;
  margin-left: 2%;
  margin-right: auto;
  flex-grow: 0.5;
}

.nav_item {
  margin-left: 50px;
  list-style: none;
  text-align: center;
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 1.5em;
  color: #ffffff;
}

.nav_item a {
  text-decoration: none;
  color: #ffffff;
}

.nav_item a:hover {
  color: #959a9f;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

.dropdown {
  display: none;
}

.dropdown_button {
  background-color: transparent;
  border: none;
  color: #ffffff;
  margin-right: 2%;
  font-family: Corbel;
  font-size: 1.5em;
  font-weight: 300;
  cursor: pointer;
}

.dropdown_button:hover {
  color: #2c3e50;
}

.dropdown-content {
  list-style: none;
  display: none;
  position: fixed;
  background-color: #e8ded1;
  z-index: 1;
  font-size: 1.5em;
  font-family: Corbel;
  right: 0;
  width: 100%;
}

.display {
  display: flex;
  flex-direction: column;
}
</style>
