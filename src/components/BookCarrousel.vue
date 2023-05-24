<template>
  <section class="BookCarrousel">

    <h2>{{ name }}</h2>

    <div v-if="bookData" class="contentCarrousel">
      <img v-on:click="back" class="arrow" id="back" src="back.svg">
      <ul class="carrousel">
        <BookCard class="card" v-for="(item) in bookData" :key="item.id" :infos="item.volumeInfo"
          :authors="item.volumeInfo.authors" :title="item.volumeInfo.title" :image-links="item.volumeInfo.imageLinks"
          :date="findYear(item.volumeInfo['publishedDate'])">
        </BookCard>
      </ul>
      <img v-on:click="forward" class="arrow" id="forward" src="forward.svg">
    </div>

  </section>
</template>
  

<script>
import BookCard from './BookCard.vue'
import { getBooks } from '../api/getBooksData.js'

export default {
  name: 'BookCarrousel',
  components: {
    BookCard
  },
  props: {
    name: { type: String, required: true },
    search: { type: String, required: true },
    order: { type: String, required: true },
  },
  data() {
    return {
      bookData: [],
      position: 0,
      tx: 0
    }
  },
  methods: {
    async retrieveBookData() {
      this.bookData = await getBooks(this.search, this.order)
    },
    findYear(date) {
      const year = new Date(date)
      return year.getFullYear()
    },
    forward() {
      if (this.position > -100) {
        this.position = this.position - 40
        this.tx = this.position + "rem"
      }
    },
    back() {
      if (this.position < 0) {
        this.position = this.position + 40
        this.tx = this.position + "rem"
      }
    }
  },
  beforeMount() {
    this.retrieveBookData()
  }
}
</script>


<style scoped>
.BookCarrousel {
  padding: 3rem 5.5rem;
  margin: 5vh 0;
}

.carrousel {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  padding: 0;
}

.contentCarrousel {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.arrow {
  height: 3rem;
  transition: 0.2s ease-out;
}

.arrow:hover {
  height: 4rem;
}

h2 {
  padding: 0 5.5rem;
}

.carrousel .card {
  transition: 0.3s ease-out;
  transform: translateX(v-bind(tx));
}

@media screen and (max-width: 1024px) {
  .BookCarrousel {
    padding: 4rem 1rem;
  }

  h2 {
    padding: 0;
  }
}

@media screen and (max-width: 768px) {
  .BookCarrousel {
    padding: 4rem 1rem;
  }

  h2 {
    padding: 0;
  }

  .arrow {
    height: 2rem;
  }

  .arrow:hover {
    height: 2.5rem;
  }
}
</style>
