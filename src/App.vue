<template>
  <div id="app">
      <Header_Page ></Header_Page>
      <div class="buttons">
        <button v-on:click="getHome">Home</button>
        <button v-on:click="getAction">Action</button>
        <button v-on:click="getArt">Art</button>
        <button v-on:click="getFantastique">Fantastique</button>
        <button v-on:click="getRomance">Romance</button>
        <button v-on:click="getScience">Science</button>
        <button v-on:click="getThriller">Thriller</button>
      </div>
      <div class="content">
        <div v-show="home" >
          <Book_Carrousel name="Les nouveautés" ></Book_Carrousel>
          <div class="description_site">
            <h2>Trouver un livre ?</h2>
            <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est. Arcu ac tortor dignissim convallis aenean. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. In hendrerit gravida rutrum quisque. Turpis egestas maecenas pharetra convallis. Enim praesent elementum facilisis leo vel fringilla est. Augue interdum velit euismod in pellentesque massa placerat duis. Semper risus in hendrerit gravida. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. In nulla posuere sollicitudin aliquam ultrices sagittis. Egestas dui id ornare arcu odio ut sem nulla. Urna et pharetra pharetra massa massa ultricies mi quis. Amet facilisis magna etiam tempor orci eu lobortis elementum. Dictum non consectetur a erat nam at. Tempus quam pellentesque nec nam aliquam sem. <br> Orci dapibus ultrices in iaculis nunc sed augue lacus. Ut lectus arcu bibendum at varius. Justo nec ultrices dui sapien eget. Sapien nec sagittis aliquam malesuada bibendum arcu. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Morbi leo urna molestie at elementum eu facilisis. Ornare massa eget egestas purus viverra accumsan in. Donec enim diam vulputate ut pharetra sit amet. At erat pellentesque adipiscing commodo elit at. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Est placerat in egestas erat imperdiet. Proin libero nunc consequat interdum varius. Placerat duis ultricies lacus sed. Arcu non odio euismod lacinia at quis. Ut diam quam nulla porttitor massa id neque. Tellus rutrum tellus pellentesque eu tincidunt.<br>Vulputate odio ut enim blandit volutpat maecenas. Tortor condimentum lacinia quis vel eros donec ac. Nibh tortor id aliquet lectus proin nibh. A iaculis at erat pellentesque adipiscing. Sed odio morbi quis commodo odio aenean sed. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Velit aliquet sagittis id consectetur purus ut. Turpis massa tincidunt dui ut ornare lectus sit. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Cursus in hac habitasse platea dictumst quisque sagittis purus. Euismod nisi porta lorem mollis. Nisi scelerisque eu ultrices vitae. Quam quisque id diam vel quam elementum pulvinar. Nisi porta lorem mollis aliquam. Aliquet risus feugiat in ante metus.</p>
          </div>
          <Book_Carrousel name="Nos recommandations"></Book_Carrousel>
        </div>
        <Book_Gallery v-show="art" name="Art" category="art"></Book_Gallery>
        <Book_Gallery v-show="action" name="Action" category="action"></Book_Gallery>
        <Book_Gallery v-show="romance" name="Romance" category="Romance"></Book_Gallery>
        <Book_Gallery v-show="thriller" name="Thriller" category="Thriller"></Book_Gallery>
        <Book_Gallery v-show="science" name="Science" category="Science"></Book_Gallery>
        <Book_Gallery v-show="fantastique" name="Fantastique" category="Fantastique"></Book_Gallery>
      </div>
      <Footer_Page ></Footer_Page>
  </div>
</template>

<script>
import Book_Gallery from './components/Book_Gallery.vue'
import Book_Carrousel from './components/Book_Carrousel.vue'
import Header_Page from './components/Header_Page.vue'
import Footer_Page from './components/Footer_Page.vue'

export default {
  name: 'App',
  components: {
    Book_Carrousel,
    Book_Gallery,
    Header_Page,
    Footer_Page
  },
  data () {
      return {
        romance : false,  
        thriller : false,  
        science : false,  
        fantastique : false,  
        art : false,  
        acction : false,  
        home : true
      }
  },
  methods: {
    getAction: function () {  
        this.art = false,  
        this.action = true,  
        this.romance = false,  
        this.thriller = false,  
        this.science = false,  
        this.fantastique = false,  
        this.home = false
    },
    getArt: function () {  
        this.art = true,  
        this.action = false,  
        this.romance = false,  
        this.thriller = false,  
        this.science = false,  
        this.fantastique = false,  
        this.home = false
    },
    getThriller: function () {  
        this.art = false,  
        this.action = false,  
        this.romance = false,  
        this.thriller = true,  
        this.science = false,  
        this.fantastique = false,  
        this.home = false
    },
    getRomance: function () {  
        this.art = false,  
        this.action = false,  
        this.romance = true,  
        this.thriller = false,  
        this.science = false,  
        this.fantastique = false,  
        this.home = false
    },
    getHome: function () {  
        this.art = false,  
        this.action = false,  
        this.romance = false,  
        this.thriller = false,  
        this.science = false,  
        this.fantastique = false,  
        this.home = true
    },
    getScience: function () {  
        this.art = false,  
        this.action = false,  
        this.romance = false,  
        this.thriller = false,  
        this.science = true,  
        this.fantastique = false,  
        this.home = false
    },
    getFantastique: function () {  
        this.art = false,  
        this.action = false,  
        this.romance = false,  
        this.thriller = false,  
        this.science = false,  
        this.fantastique = true,  
        this.home = false
    }
  }
}
</script>

<style>

:root {
  --background-color-primary: rgb(236, 236, 236);
  --background-color-secondary: rgb(255, 255, 255);
  --accent-color: rgb(70, 122, 114);
  --accent-color-hover: rgb(55, 88, 83);
  --text-primary-color: rgb(34, 34, 34);
}
:root.dark-theme {
  --background-color-primary:  rgb(34, 34, 34);
  --background-color-secondary:  rgb(58, 58, 58);
  --accent-color: rgb(75, 109, 114);
  --accent-color-hover: rgb(132, 156, 153);
  --text-primary-color: rgb(236, 236, 236);
}

*{
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
}
body{
  background-color: var(--background-color-primary);
  position: relative;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary-color);
}
p{
  font-size: 1vw;
  text-align: left;
}
h2{
    font-size: 2vw;
    text-align: start;
    margin: 1vw;
    position: relative;
}
/* h2:before {
  content : "";
  position: absolute;
  left    : 5vw;
  bottom  : -10px;
  width   : 20%;  
  border-bottom:7px solid black;
} */
.buttons{
  background-color: var(--accent-color);
  height: 7vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
button{
  width: 13rem;
  height: 100%;
  border: none;
  background: none;
  transition: 0.1s ease-in;
  font-size: 1.8rem;
  cursor: pointer;
}
button:hover{
  border-bottom: 7px solid var(--accent-color-hover);
}
.description_site{
  background-color: var(--background-color-secondary);
  padding: 3rem 15rem;
}
input{
  border: none;
}

@media screen and (max-width: 768px) {
  .buttons{
    height: auto;
    flex-direction: column;
  }
}


</style>