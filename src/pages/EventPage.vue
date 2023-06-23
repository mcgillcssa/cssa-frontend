<template>
  <div class="container" id="container">
  </div>
</template>

<script>
export default {
  name: "EventPage",
  data: function() {
    return {
      years: [
          2023, 2022, 2021
      ],
      events: [
        {
          title: "McGill Frosh",
          content: "每年9月开学季CSSA会组织新生Frosh活动。活动中，学长学姐组织各种有趣的游戏，带大家玩转Montreal。新生们既能结交到新朋友，也可以进一步适应McGill的校园生活。",
          thumbnail: "https://i.imgur.com/syf1nkI.jpg",
          date: "6/10/2023"
        },
        {
          title: "McGill SendOff",
          content: "又是一年新生准备入学啦。这次cssa在北京、上海举办了send off，以第一手的入学信息帮助大家做好步入大学的准备。",
          thumbnail: "https://i.imgur.com/D5EzRhd.png",
          date: "6/5/2023"
        }
      ]
    }
  },
  methods: {
    addYear(year){
      // year header
      var header = document.createElement("div");
      header.classList.add("year");

      // year number
      var number = document.createElement("div");
      number.classList.add("number");
      number.innerHTML = ""+year;
      header.appendChild(number)

      // the button to display events
      var button = document.createElement("button");
      button.classList.add("collapsible")
      button.classList.add("close")
      header.appendChild(button)
      document.getElementById("container").appendChild(header);

      var content = document.createElement("div");
      content.classList.add("collapse-content");
      content.id = "collapse-" + year
      document.getElementById("container").appendChild(content);

      // add button animation
      button.addEventListener("click",  () => {
        if (content.style.display === "block") {
          content.style.display = "none";
          button.classList.add("close");
          button.classList.remove("open");
        } else {
          content.style.display = "block";
          button.classList.add("open");
          button.classList.remove("close");
        }
      });
    }
    ,
    addEvent(event, year){
      var container = document.createElement("div");
      container.classList.add("flex-container");
      container.style.marginRight = "1%";

      // date
      var triangle = document.createElement("div");
      var date = document.createElement("div");
      triangle.classList.add("date");
      triangle.classList.add("arrow");
      triangle.style.flexGrow="1";
      triangle.innerHTML = "&#9658;";
      date.classList.add("date");
      date.style.flexGrow="2";
      date.innerHTML= event.date;
      container.appendChild(triangle);
      container.appendChild(date);

      //image
      var image_div = document.createElement("div");
      image_div.style.flexGrow = "6";
      var image = document.createElement("img");
      image.src = event.thumbnail;
      image.width = 256;
      image.height = 256;
      image_div.appendChild(image);
      container.appendChild(image_div);

      //event
      var event_container = document.createElement("div");
      event_container.style.flexGrow = "12";
      event_container.classList.add("event");
      var event_title = document.createElement("div");
      event_title.classList.add("event-title");
      event_title.innerHTML = event.title;
      var event_content = document.createElement("div");
      event_content.classList.add("event-content");
      event_content.innerHTML = event.content;
      event_container.appendChild(event_title);
      event_container.appendChild(event_content);
      container.appendChild(event_container);

      document.getElementById("collapse-" + year).appendChild(container);
    }
  },
  mounted() {
    for (let i in this.years){
      this.addYear(this.years[i]);
    }

    for (let i in this.events){
      this.addEvent(this.events[i], 2023);
    }
  }
}
</script>

<style>
@media only screen and (max-width: 720px) {
  /* For mobile phones: */
  .flex-container{
    flex-direction: column;
    align-items: center;
  }

  .collapse-content {
    border-left: none !important;
  }

  .event{
    border: 1px solid #2c3e50 !important;
  }

  .event-title{
    border-bottom: 1px solid #2c3e50 !important;
    font-weight: 300 !important;
    font-size: 2em !important;
    text-align: center !important;
  }

  .event-content{
    margin-right: 0;
    font-weight: 200 !important;
    font-size: 1em !important;
  }

  .arrow{
    display: none;
  }

  .date{
    font-size: 2em !important;
    font-variant-numeric: oldstyle-nums;
    background-color: #2c3e50;
    color: #FFF7EC;
    text-align: center;
    border-radius: 20px;
    width: 100%;
  }

  .flex-container > div {
    margin-bottom: 5%;
  }
}

.year{
  display: flex;
  height: 8em;
  width: 100%;
  background-color: #E4C59D;
  margin-top: 1%;
  border-radius: 20px;
}

.container{
  background-color: #E8DED1;
  padding-top: 60px;
  padding-left: 1%;
  padding-right: 1%;
}

.number{
  display: flex;
  max-height: 100%;
  flex-direction: column;
  color: #FFF7EC;
  font-size: 6em;
  font-weight: lighter;
  margin-left: 2%;
  margin-top: auto;
  margin-bottom: auto;
  font-variant-numeric: proportional-nums;
}

.event{
  font-family: 	Microsoft JhengHei;
  border: 2px solid #2c3e50;
  flex-direction: column;
  border-radius: 20px;
  padding: 2%;
}

.event-title{
  border-bottom: 2px solid #2c3e50;
  font-weight: bold;
  font-size: 2em;
}

.event-content{
  margin-right: 0;
  font-weight: bold;
  font-size: 1.5em;
}

button {
  width: 1em;
  height: 1em;
  border: 4px solid #FFF7EC;
  border-left: 0;
  border-top: 0;
  background-color: transparent;
}

.open{
  transform: rotate(45deg);
}

.close{
  transform: rotate(225deg);
}
.collapsible{
  color: #E8DED1;
  font-size: 40px;
  margin: auto 1% 1% auto;
}
.collapse-content {
  margin-left: 1%;
  margin-right: 1%;
  border-left: 2px solid black;
  display: none;
  overflow: hidden;
  background-color: #FFF7EC;
}

.flex-container{
  display: flex;
  margin-top: 1%;
}

.flex-container > div {
  flex-basis: 0;
  min-width: 0;
}

.date{
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5em;
  font-variant-numeric: oldstyle-nums;
}

::-webkit-scrollbar {
  width: 0;
}

</style>