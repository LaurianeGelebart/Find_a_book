<template>
  <section class="BookSearch">

    <div class="tri">
      <label for="bookSort">Trier par </label>
      <select v-model="booksSortType" id="bookSort">
        <option value="AZName">Noms de A à Z</option>
        <option value="ZAName">Noms de Z à A</option>
        <option value="AZAuthors">Auteurs de A à Z</option>
        <option value="ZAAuthors">Auteurs de Z à A</option>
        <option value="topStars">Le mieux noté</option>
        <option value="lessStrars">Le moins bien noté</option>
      </select>
    </div>

    <h2>Votre recherche : {{ name }}</h2>

    <div v-if="bookData" class="galerie">
      <BookCard v-for="(item) in bookOrganizedData" :key="item.id" :infos="item.volumeInfo"
        :authors="item.volumeInfo.authors" :title="item.volumeInfo.title" :image-links="item.volumeInfo.imageLinks"
        :date="findYear(item.volumeInfo['publishedDate'])">
      </BookCard>
    </div>

  </section>
</template>
  

<script>
import BookCard from './BookCard.vue'
import { getBooksForUser } from '@/api/getBooksData.js'

export default {
  name: 'BookSearch',
  props: {
    name: { type: String, required: true },
    userSearch: { type: String, required: true }
  },
  components: {
    BookCard
  },
  data() {
    return {
      bookData: [],
      booksSortType: "AZName",
    }
  },
  methods: {
    async retrieveBookData() {
      if (this.userSearch && this.userSearch !== "") {
        this.bookData = await getBooksForUser(this.userSearch)
      }
    },
    findYear(date) {
      const year = new Date(date)
      return year.getFullYear()
    }
  },
  computed: {
    bookOrganizedData: function () {
      const reversed = ["ZAName", "ZAAuthors"].includes(this.booksSortType) ? -1 : 1
      const comparator = (a, b) => {
        if (["AZName", "ZAName"].includes(this.booksSortType)) {
          return a.volumeInfo["authors"][0].localeCompare(b.volumeInfo["authors"][0])
        }
        else if (["AZAuthors", "ZAAuthors"].includes(this.booksSortType)) {
          return a.volumeInfo["title"].localeCompare(b.volumeInfo["title"])
        }
        else {
          const ratingA = a.volumeInfo["averageRating"] || 0
          const ratingB = b.volumeInfo["averageRating"] || 0
          if (["topStars"].includes(this.booksSortType)) return ratingA - ratingB;
          return ratingB - ratingA;
        }
      }
      let data = this.bookData.slice()
      data.sort(comparator)
      if (reversed) data = data.reverse()
      return data
    }
  },
  watch: {
    bookOrganizedData: {
      handler: function (data) { this.bookData = data }
    },
    userSearch() {
      this.retrieveBookData()
    }
  },
  mounted() {
    this.retrieveBookData()
  }
}
</script>
  

<style scoped>
.galerie {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.BookSearch {
  padding: 4rem 8rem;
}

h2 {
  padding: 0 8rem;
  width: 50vw;
}

.tri {
  float: right;
  align-items: end;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  text-align: left;
}

input {
  width: 22rem;
  height: 2.5rem;
  margin-right: 1rem;
}

.tri select {
  width: 13rem;
  height: 2.5rem;
}

.tri input {
  width: 13rem;
}

label {
  margin-right: 0;
}

@media screen and (max-width: 1024px) {
  .BookSearch {
    padding: 4rem;
  }

  h2 {
    padding: 0;
  }

  .options {
    flex-direction: column;
  }

  input {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .tri {
    flex-direction: row;
  }

  label {
    margin-right: 1rem;
  }
}

@media screen and (max-width: 768px) {
  .BookSearch {
    padding: 4rem 1rem;
  }

}</style>
  