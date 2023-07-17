<template>
  <NavBar></NavBar>
  <div class="container" id="container">
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from 'axios';
export default {
  name: "EventPage",
  components: {NavBar},
  data: function() {
    return {
      years: [
          2023, 2022, 2021, 2020
      ],
      posts: [],
    }
  },
  methods: {
    async getPosts() {
      this.posts = await axios.get('http://localhost:8080/api/events/all')
      let events = this.posts.data.events
      for (let i in events){
        this.addEvent(events[i], Number(events[i].eventStartDate.substring(0,4)));
      }
    }
    ,
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

      //image
      var image_div = document.createElement("div");
      image_div.style.flexGrow = "3";
      var image = document.createElement("img");
      image.src = event.eventImageUrl;
      image.width = 384;
      image.height = 384;
      image.style.display = "block";
      image.style.marginLeft = "auto";
      image.style.marginRight = "auto";

      image_div.appendChild(image);
      container.appendChild(image_div);

      //event
      var event_container = document.createElement("div");
      event_container.style.flexGrow = "5";
      event_container.classList.add("event");
      var event_title = document.createElement("div");
      event_title.classList.add("event-title");
      var title = document.createElement("span");
      title.innerHTML = event.eventName;
      event_title.appendChild(title);
      var event_content = document.createElement("div");
      event_content.classList.add("event-content");
      event_content.innerHTML = event.eventDescription;
      event_container.appendChild(event_title);
      event_container.appendChild(event_content);
      container.appendChild(event_container);

      //right side
      var side_block = document.createElement("div");
      side_block.style.flexGrow="2";

      // date
      var date_block = document.createElement("flex-container-vertical");
      date_block.style.backgroundColor="#E8DED1";
      var date_title = document.createElement("div");
      date_title.innerHTML = "Date"
      var date = document.createElement("div");
      date.classList.add("side");
      date.innerHTML= event.eventStartDate + " -> " + event.eventEndDate;
      date_block.appendChild(date_title);
      date_block.appendChild(date);

      // location
      var location_block = document.createElement("flex-container-vertical");
      location_block.style.backgroundColor="#E8DED1";
      location_block.style.marginTop = "2%";
      var location_title = document.createElement("div");
      location_title.innerHTML = "Location"
      var location = document.createElement("div");
      location.classList.add("side");
      location.innerHTML= event.eventLocation;
      location_block.appendChild(location_title);
      location_block.appendChild(location);

      side_block.appendChild(date_block);
      side_block.appendChild(location_block);
      container.appendChild(side_block);

      document.getElementById("collapse-" + year).appendChild(container);
    }
  },
  mounted() {
    this.getPosts()
    for (let i in this.years){
      this.addYear(this.years[i]);
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
    margin-right: 0% !important;
  }

  .collapse-content {
    border-left: none !important;
  }

  .event{
    border-left: none !important;
  }

  .event-title{
    text-align: center !important;
    border-bottom: 1px solid black !important;
    font-size: 2em !important;
  }

  .event-content{
    margin-right: 0;
    font-size: 1em !important;
  }

  .date{
    font-size: 2em !important;
    font-variant-numeric: oldstyle-nums;
    background-color: #2c3e50;
    color: #FFF7EC;
    text-align: center;
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
  background-color: transparent;
  border-bottom: 2px solid black;
  margin-top: 1%;
}

.container{
  background-color: #B84545;
  padding-top: 60px;
  padding-left: 1%;
  padding-right: 1%;
}

.number{
  display: flex;
  max-height: 100%;
  flex-direction: column;
  color: white;
  font-size: 6em;
  margin-left: 2%;
  margin-top: auto;
  margin-bottom: auto;
  font-variant-numeric: proportional-nums;
}

.event{
  font-family: 	Microsoft JhengHei;
  flex-direction: column;
  color: black;
}

.event-title{
  text-align: left;
  font-size: 3em;
  font-weight: 200;
  color: white;
}

.event-title span{
  background-color: #B84545;
  padding: 1% 2%;
}

.event-content{
  margin-top: 2%;
  margin-right: 0;
  font-size: 1.5em;
  font-weight: 200;
}

button {
  width: 0.5em;
  height: 0.5em;
  border: 2px solid black;
  border-left: 0;
  border-top: 0;
  background-color: transparent;
  cursor: pointer;
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
  padding: 2% 1%;
  border-bottom: 2px solid #B84545;
}

.flex-container > div {
  flex-basis: 0;
  min-width: 0;
}

.flex-container-vertical {
  display: flex;
  flex-direction: column;
}


.side{
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5em;
}

::-webkit-scrollbar {
  width: 0;
}

</style>