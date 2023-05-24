<template>
  <div class="BookCard" 
    @mouseover="isMobile ? null : vueInfo = true"
    @click="isMobile ? vueInfo = !vueInfo : null" 
    @mouseleave="isMobile ? null : vueInfo = false">

    <img class="couverture" :src="imageLinks.smallThumbnail">
    <div class="infos">
      <h3>{{ title }}</h3>
      <p>{{ authors[0] }}</p>
      <div class="stars">
        <div><img src="stars.png"> </div>
      </div>
    </div>
    <BookInfos v-if="vueInfo" :title="title" :description="infos.description" :date="date"
      :isbn="infos.industryIdentifiers[0].identifier"></BookInfos>

  </div>
</template>

<script>
import BookInfos from './BookInfos.vue'

export default {
  name: 'BookCard',
  components: {
    BookInfos
  },
  props: {
    authors: { type: Object, default: () => ({ 0: "Authors available" }) },
    infos: { type: Object, default: () => ({}) },
    title: { type: String, default: () => "Name available" },
    imageLinks: { type: Object, default: () => ({"smallThumbnail" : "CoverNotAvailable.jpg"}) },
    date: { type: Number, default: () => 0}
  },
  data() {
    return {
      vueInfo: false,
      isMobile: false,
      stars: 0
    }
  },
  methods: {
    getStars() {
      if (isNaN(this.infos.averageRating)) this.stars = 0
      else this.stars = this.infos.averageRating / 5 * 100 + "%"
    }
  },
  beforeMount() {
    this.getStars()
    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    this.isMobile = mediaQuery.matches;
  }
}
</script>
  

<style scoped>
.BookCard {
  background-color: var(--background-color-secondary);
  width: 17rem;
  height: 37rem;
  margin: 2.4rem;
  text-align: left;
  position: relative;
  transition: 0.3s ease-out;
}

.BookCard:hover {
  box-shadow: 0 0 30px rgba(172, 172, 172, 0.555);
  transform: translateY(-10px);
}

h3 {
  font-size: 1.2rem;
  margin: 1vw 0 0.3vw;
  max-height: 5rem;
  overflow-y: hidden;
}

.couverture {
  width: 100%;
  max-height: 65%;
  overflow-y: hidden;
}

.infos {
  margin: 0.7rem 1.5rem;
}

p {
  font-size: 1.2rem;
}

.stars {
  height: 3rem;
  width: 12rem;
  background-color: rgb(204, 204, 204);
}

.stars div {
  height: 100%;
  width: v-bind(stars);
  background-color: rgb(255, 174, 0);
  margin: 2rem 0;
}

.stars img {
  height: 100%;
  width: 12rem;
}


@media screen and (max-width: 1024px) {
  .BookCard {
    width: 17rem;
    height: 35rem;
    margin: 2rem;
  }

  .stars {
    height: 2.6rem;
    width: 10rem;
  }

  .stars div {
    height: 100%;
    width: v-bind(stars);
    margin: 0.5rem 0;
  }

  .stars img {
    height: 100%;
    width: 10rem;
  }
}
</style>
  