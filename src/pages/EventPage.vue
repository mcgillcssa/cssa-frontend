<template>
  <div class="container">
    <div class="year">
      <header>
        <p class="number">
          2023
        </p>
      </header>
      <button class="collapsible" style="color: #E8DED1; font-size: 40px; margin-left: auto; margin-top: auto">
        &#9650;
      </button>
    </div>
    <div class="collapse-content">
      <div class="flex-container" style="margin-right: 1%">
        <div style="flex-grow: 1">
          &#9658;
        </div>
        <div style="flex-grow: 2">
          6/10/2023
        </div>
        <div style="flex-grow: 6">
          <img src="https://i.imgur.com/syf1nkI.jpg" width="256" height="256">
        </div>
        <div class="event flex-container" style="flex-grow: 12">
          <div>
            <p style="border-bottom: 1px solid black;">
              McGill Frosh
            </p>
          </div>
          <div>
            <p style="margin-right: 0;">
              每年9月开学季CSSA会组织新生Frosh活动。活动中，学长学姐组织各种有趣的游戏，带大家玩转Montreal。新生们既能结交到新朋友，也可以进一步适应McGill的校园生活。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="year">

    </div>
    <div class="year">

    </div>
  </div>
</template>

<script>
export default {
  name: "EventPage",
  mounted() {
    var coll = document.getElementsByClassName("collapsible");
    var content = document.getElementsByClassName("collapse-content");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        if (content[0].style.display === "block") {
          self.className = "close"
          content[0].style.display = "none";
        } else {
          self.className = "open"
          content[0].style.display = "block";
        }
      });
    }
  }
}
</script>

<style>
.year{
  display: flex;
  height: 16em;
  width: 100%;
  background-color: #FF6C6C;
  margin-bottom: 1%;
}

.container{
  background-color: #E8DED1;
  padding-top: 60px;
  padding-left: 1%;
  padding-right: 1%;
}

header{
  display: flex;
  max-height: 100%;
  flex-direction: column;
  color: #E8DED1;
  font-family: Century Gothic;
  font-size: 6em;
  font-weight: lighter;
  margin-left: 2%;
}

p.number{
  margin-top: 20%;
  margin-bottom: auto;
}

.event{
  font-family: 	Microsoft JhengHei;
  background-color: whitesmoke;
  border: 2px black solid;
  flex-direction: column
}

button{
  background-color: transparent;
  border-width: 0;
  cursor: pointer;
}

.open{
  transform: rotate(180deg);
}

.close{
  transform: rotate(0deg);
}

.collapse-content {
  margin-left: 1%;
  border-left: 2px solid black;
  display: none;
  overflow: hidden;
}

.flex-container{
  display: flex;
}

.flex-container > div {
  flex-basis: 0;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 20px;
  min-width: 0
}
</style>