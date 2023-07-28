<template>
  <Membership />
  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue";
import Membership from "./pages/Membership.vue";
export default {
  name: "App",
  components: {
    Membership,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
}
</style>