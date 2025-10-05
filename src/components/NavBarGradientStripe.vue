<template>
  <div class="navbar-gradient-stripe"></div>
</template>

<style scoped>
.navbar-gradient-stripe {
  width: 100%;
  height: 100px;
  position: absolute; /* 绝对定位，作为背景 */
  top: 0;
  left: 0;
  z-index: 1; /* 低于navbar */
  background: linear-gradient(
    90deg,
    #431070 1%,
    #7E21D0 17%,
    #9D69E2 30%,
    #DBC7F5 44%,
    #9D69E2 62%,
    #7E21D0 81%,
    #431070 100%
  );
}

/* 响应式设计 */
@media screen and (min-width: 501px) and (max-width: 800px) {
  .navbar-gradient-stripe {
    height: 80px;
  }
}

@media screen and (max-width: 500px) {
  .navbar-gradient-stripe {
    height: 70px;
  }
}
</style>