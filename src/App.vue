<template>
  <div id="app">
      <Header_Page v-model:userSearch="userSearch" v-model:activPage="activPage"></Header_Page>
      
      <nav id="#top">
        <div class="navbar_header">
          <button type="button" class="navbar_toggle" @click="toggleNav">
              <span :class="{ 'open': isOpen }"></span>
              <span :class="{ 'open': isOpen }"></span>
              <span :class="{ 'open': isOpen }"></span>
          </button>
        </div>
        <div class="navbar_collapse" :class="{ 'in': isOpen }">
            <button v-on:click="() => isActiv('Home')">Home</button>
            <button v-for="(category) in categories" :key="category" v-on:click="() => isActiv(category)">{{category}}</button>
        </div>
      </nav>

      <a href="#top" class="fleche">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32">
              <path
                  d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z">
              </path>
          </svg>
      </a>

      <div class="content">
        <div v-show="this.activPage == 'Home'" >
          <Book_Carrousel name="The news" ></Book_Carrousel>
          <div class="description_site">
            <h2>Find a book ?</h2>
            <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est. Arcu ac tortor dignissim convallis aenean. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. In hendrerit gravida rutrum quisque. Turpis egestas maecenas pharetra convallis. Enim praesent elementum facilisis leo vel fringilla est. Augue interdum velit euismod in pellentesque massa placerat duis. Semper risus in hendrerit gravida. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. In nulla posuere sollicitudin aliquam ultrices sagittis. Egestas dui id ornare arcu odio ut sem nulla. Urna et pharetra pharetra massa massa ultricies mi quis. Amet facilisis magna etiam tempor orci eu lobortis elementum. Dictum non consectetur a erat nam at. Tempus quam pellentesque nec nam aliquam sem. <br> Orci dapibus ultrices in iaculis nunc sed augue lacus. Ut lectus arcu bibendum at varius. Justo nec ultrices dui sapien eget. Sapien nec sagittis aliquam malesuada bibendum arcu. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Morbi leo urna molestie at elementum eu facilisis. Ornare massa eget egestas purus viverra accumsan in. Donec enim diam vulputate ut pharetra sit amet. At erat pellentesque adipiscing commodo elit at. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Est placerat in egestas erat imperdiet. Proin libero nunc consequat interdum varius. Placerat duis ultricies lacus sed. Arcu non odio euismod lacinia at quis. Ut diam quam nulla porttitor massa id neque. Tellus rutrum tellus pellentesque eu tincidunt.<br>Vulputate odio ut enim blandit volutpat maecenas. Tortor condimentum lacinia quis vel eros donec ac. Nibh tortor id aliquet lectus proin nibh. A iaculis at erat pellentesque adipiscing. Sed odio morbi quis commodo odio aenean sed. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Velit aliquet sagittis id consectetur purus ut. Turpis massa tincidunt dui ut ornare lectus sit. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Cursus in hac habitasse platea dictumst quisque sagittis purus. Euismod nisi porta lorem mollis. Nisi scelerisque eu ultrices vitae. Quam quisque id diam vel quam elementum pulvinar. Nisi porta lorem mollis aliquam. Aliquet risus feugiat in ante metus.</p>
          </div>
          <Book_Carrousel name="Our recommandations"></Book_Carrousel>
        </div>
        <!-- <Book_Gallery v-for="(category) in categories" :key=categories v-show=category :name=category :category=category></Book_Gallery> -->
        <Book_Gallery v-for="(category) in categories" :key="category" v-show="this.activPage == category" :name=category :category=category></Book_Gallery>
        <Book_Search  v-show="this.activPage == 'Search'" :name=this.userSearch :activPage=this.activPage :userSearch=this.userSearch></Book_Search>
      </div>

      <Footer_Page ></Footer_Page>

  </div>
</template>

<script>
import Book_Gallery from './components/Book_Gallery.vue'
import Book_Search from './components/Book_Search.vue'
import Book_Carrousel from './components/Book_Carrousel.vue'
import Header_Page from './components/Header_Page.vue'
import Footer_Page from './components/Footer_Page.vue'

export default {
  name: 'App',
  components: {
    Book_Carrousel,
    Book_Gallery,
    Book_Search,
    Header_Page,
    Footer_Page
  },
  data () {
      return {
        isOpen: false,
        userSearch: "",
        activPage : "Home", 
        categories : ["Fantastic", "Thriller", "Romance", "Adventure", "Action", "Classic"]
      }

  },
  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen;
    },
    isActiv(page) {
      this.isOpen = false; 
      this.activPage = page;
    }
  }
}
</script>

<style>

:root {
  --background-color-primary: rgb(236, 236, 236);
  --background-color-secondary: rgb(255, 255, 255);
  --accent-color: rgb(119, 148, 144);
  --accent-color-hover: rgb(75, 109, 114);
  --text-primary-color: rgb(34, 34, 34);
}
:root.dark-theme {
  --background-color-primary:  rgb(34, 34, 34);
  --background-color-secondary:  rgb(58, 58, 58);
  --accent-color: rgb(75, 109, 114);
  --accent-color-hover: rgb(119, 148, 144);
  --text-primary-color: rgb(236, 236, 236);
}

*{
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
  scroll-behavior: smooth;
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
  font-size: 1.6rem; 
  text-align: left;
}
h2{
    font-size: 3rem;
    text-align: start;
    margin: 2rem;
}
input{
  border: none;
}
.description_site{
  background-color: var(--background-color-secondary);
  padding: 5rem 25rem;
}
.description_site h2{
  margin: 2rem 0;
  padding: 0 ;
}
nav {
  background-color: var(--accent-color);
  height: auto;
}
.navbar_header{
  display: none;
}
.navbar_collapse{
  background-color: var(--accent-color);
  height: 6rem;
  padding-bottom:0 ;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.navbar_collapse button{
  width: 13rem;
  height: 100%;
  border: none;
  background: none;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary-color);
}
.navbar_collapse button:hover{
  border-bottom: 7px solid var(--accent-color-hover);
}
.fleche{
  fill: var(--text-primary-color);
  position: fixed;
  right: 3%;
  bottom: 4%;
  transition: 0.1s ease-in;
  z-index: 10;
  width: 5rem;
}
.fleche:hover{
  fill: var(--accent-color-hover);
  transform:scale(1.1) ;
}

@media screen and (max-width: 1024px) {
  .description_site{
    padding: 5rem ;
  }
  .navbar_header{
    display: block;
    display: flex;
    justify-content: end;
  }
  .navbar_buttons{
    height: auto;
    flex-direction: column;
  }
  .navbar_toggle {
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0.5rem 2rem ;
    cursor: pointer;
  }
  .navbar_toggle span {
    background-color: black;
    display: block;
    height: 0.3rem;
    width: 4rem;
    margin: 0.8rem auto;
    transition: all 0.3s ease;
  }
  .navbar_toggle span.open:nth-child(1) {
    transform: translateY(1rem) rotate(45deg);
  }
  .navbar_toggle span.open:nth-child(2) {
    opacity: 0;
  }
  .navbar_toggle span.open:nth-child(3) {
    transform: translateY(-1.2rem) rotate(-45deg);
  }
  .navbar_collapse {
    height: auto;
    max-height: 0;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .navbar_collapse.in {
    max-height: 500px;
    padding-bottom:3rem ;
  }
  .navbar_collapse button{
    width: 100%;
    height: 4rem;
    font-size: 1.8rem;
  }
  .navbar_collapse button:hover{
    border-bottom: none;
    background-color: var(--accent-color-hover);
  }
}

@media screen and (max-width: 768px) {
  .description_site{
    padding: 5rem 2rem;
    font-size: 1rem;
  }
  .description_site h2{
    margin: 2rem 0rem;
  } 
  h2{
    font-size: 2.5rem;
  }
}
</style>
