<template>
  <div id="app">

    <HeaderPage v-model:userSearch="userSearch" v-model:activPage="activPage"></HeaderPage>
    
    <NavbarPage v-model:activPage="activPage" :categories=categories></NavbarPage>

    <a href="#top" class="fleche">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32">
        <path
          d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z">
        </path>
      </svg>
    </a>

    <div class="content">

      <div v-show="this.activPage == 'Home'">
        <BookCarrousel name="The news" search="Charles III" order="newest"></BookCarrousel>
        <div class="descriptionSite">
          <h2>Find a book ?</h2>
          <p class="des">Welcome to our wacky world of books! We believe that reading is not just a hobby, but a way of
            life. Our love for books is as boundless as our imagination, and we want to share that passion with all of
            you. With our site, you can dive into the world of books by themes, and discover new stories that will take
            you to other galaxies, magical lands, and thrilling adventures. We understand that finding the perfect book
            can be a challenge, and that's why we're here to help you find your literary soulmate.<br><br>Our site is
            designed to be a fun and easy way to browse and search for books. With our search bar, you can type in any
            word that comes to mind, and we'll find books that match your interests. We want to make it easy for you to
            discover new stories and authors, and that's why we've curated our collections based on themes that will pique
            your interest. We believe that books have the power to transport you to new worlds, inspire you to greatness,
            and connect you with people from all walks of life.<br><br>So come on in, and start your journey through the
            wonderful world of books. Whether you're a fan of romance, sci-fi, or mystery, we have something for you.
            We're confident that you'll find the book that speaks to your heart, and makes you fall in love with reading
            all over again. So grab a cup of tea, curl up in your favorite chair, and let us take you on a journey you'll
            never forget. Because with our site, anything is possible, and the perfect book is just a click away.</p>
        </div>
        <BookCarrousel name="The works of Joseph Kessel" order="relevance" search="Joseph Kessel"></BookCarrousel>
        <BookCarrousel name="The works of Karen Russell" order="relevance" search="Karen Russell"></BookCarrousel>
      </div>

      <BookGallery v-for="(category) in categories" :key="category" v-show="this.activPage == category" :name=category
        :category=category></BookGallery>

      <BookSearch v-show="this.activPage == 'Search'" :name=this.userSearch :activPage=this.activPage
        :userSearch=this.userSearch></BookSearch>

    </div>

    <FooterPage></FooterPage>

  </div>
</template>

<script>
import BookGallery from './components/BookGallery.vue'
import BookSearch from './components/BookSearch.vue'
import BookCarrousel from './components/BookCarrousel.vue'
import HeaderPage from './components/HeaderPage.vue'
import NavbarPage from './components/NavbarPage.vue'
import FooterPage from './components/FooterPage.vue'

export default {
  name: 'App',
  components: {
    BookCarrousel,
    BookGallery,
    BookSearch,
    HeaderPage,
    NavbarPage,
    FooterPage
  },
  data() {
    return {
      isOpen: false,
      userSearch: "",
      activPage: "Home",
      categories: ["Action", "Mystery", "Thriller", "Romance", "Adventure", "Classic"]
    }
  },
  methods: {
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
  --background-color-primary: rgb(34, 34, 34);
  --background-color-secondary: rgb(58, 58, 58);
  --accent-color: rgb(75, 109, 114);
  --accent-color-hover: rgb(119, 148, 144);
  --text-primary-color: rgb(236, 236, 236);
}

* {
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
  scroll-behavior: smooth;
}

body {
  background-color: var(--background-color-primary);
  position: relative;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary-color);
}

p {
  font-size: 1.1rem;
  text-align: left;
}

h2 {
  font-size: 2.5rem;
  text-align: start;
  margin: 2rem;
}

input {
  border: none;
}

.descriptionSite {
  background-color: var(--background-color-secondary);
  padding: 4rem 20rem;
}

.descriptionSite h2 {
  margin: 1.5rem 0;
  padding: 0;
}

.des {
  font-size: 1.5rem;
}

.fleche {
  fill: var(--text-primary-color);
  position: fixed;
  right: 3%;
  bottom: 4%;
  transition: 0.1s ease-in;
  z-index: 10;
  width: 4rem;
}

.fleche:hover {
  fill: var(--accent-color-hover);
  transform: scale(1.1);
}

@media screen and (max-width: 1024px) {
  .descriptionSite {
    padding: 5rem;
  }
}

@media screen and (max-width: 768px) {
  .descriptionSite {
    padding: 5rem 2rem;
    font-size: 1rem;
  }

  .descriptionSite h2 {
    margin: 2rem 0rem;
  }

  h2 {
    font-size: 2.5rem;
  }
}</style>
