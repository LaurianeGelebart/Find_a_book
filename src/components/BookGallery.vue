<template>
  <section class="BookGallery">

    <div class="options">
      <input type="text" v-model="bookSearch" placeholder="Search a book">
      <div class="tri">
        <label for="bookSort">Sort by</label>
        <select v-model="booksSortType" id="bookSort">
          <option value="AZName" :selected="booksSortType === 'AZName'">Names from A to Z</option>
          <option value="ZAName" :selected="booksSortType === 'ZAName'">Names from Z to A</option>
          <option value="AZAuthors" :selected="booksSortType === 'AZAuthors'">Authors from A to Z</option>
          <option value="ZAAuthors" :selected="booksSortType === 'ZAAuthors'">Authors from Z to A</option>
          <option value="newest" :selected="booksSortType === 'newest'">Newest</option>
          <option value="oldest" :selected="booksSortType === 'oldest'">Oldest</option>
          <option value="topStars" :selected="booksSortType === 'topStars'">Top rated</option>
          <option value="lessStrars" :selected="booksSortType === 'lessStrars'">Lowest rated</option>
        </select>
      </div>
    </div>

    <h2>{{ name }}</h2>

    <div v-if="bookData" class="galerie">
      <BookCard v-for="(item) in bookOrganizedData" :key="item.volumeInfo.industryIdentifiers[0].identifier"
        :infos="item.volumeInfo" :authors="item.volumeInfo.authors" :title="item.volumeInfo.title"
        :image-links="item.volumeInfo.imageLinks"
        :date="findYear(item.volumeInfo['publishedDate'])"></BookCard>
    </div>
    <button v-on:click="() => getMoreBook()" class="getMoreBook">Voir plus</button>

  </section>
</template>
 

<script>
import BookCard from './BookCard.vue'
import { getBookBySubject } from '@/api/getBooksData.js'

export default {
  name: 'BookGallery',
  props: {
    name: { type: String, required: true },
    category: { type: String, required: true }
  },
  components: {
    BookCard
  },
  data() {
    return {
      bookData: [],
      booksSortType: "AZName",
      bookSearch: "",
      startIndex: 0
    }
  },
  methods: {
    async retrieveBookData() {
      this.bookData = await getBookBySubject(this.category, this.startIndex)
    },
    async getMoreBook() {
      this.startIndex += 40
      const newBooks = await getBookBySubject(this.category, this.startIndex)
        console.log(newBooks.length)
      this.bookData = [...this.bookData, ...newBooks]
    },
    getBooksSortType() {
      return localStorage.getItem("user-sortType")
    },
    setBooksSortType(type) {
      localStorage.setItem("user-sortType", type)
    },
    findYear(date) {
      const year = new Date(date)
      return year.getFullYear()
    }
  },
  computed: {
    bookOrganizedData: function () {
      const comparator = (a, b) => {
        if (["AZName", "ZAName"].includes(this.booksSortType)) {
          const titleA = a.volumeInfo["title"] || ""
          const titleB = b.volumeInfo["title"] || ""
          return titleA.localeCompare(titleB)
        }
        else if (["AZAuthors", "ZAAuthors"].includes(this.booksSortType)) {
          const authorsA = a.volumeInfo["authors"][0] || ""
          const authorsB = b.volumeInfo["authors"][0] || ""
          return authorsA.localeCompare(authorsB)
        }
        else if (["newest", "oldest"].includes(this.booksSortType)) {
          const newA = this.findYear(a.volumeInfo["publishedDate"]) || 0
          const newB = this.findYear(b.volumeInfo["publishedDate"]) || 0
          return (["oldest"].includes(this.booksSortType)) ? newA - newB : newB - newA
        }
        else {
          const ratingA = a.volumeInfo["averageRating"] || 0
          const ratingB = b.volumeInfo["averageRating"] || 0
          return (["topStars"].includes(this.booksSortType)) ? ratingB - ratingA : ratingA - ratingB 
        }
      }
      const reversed = ["ZAName", "ZAAuthors"].includes(this.booksSortType) ? -1 : 1
      const filterFunc = (a) => a.volumeInfo["title"].toLowerCase().includes(this.bookSearch.toLowerCase())

      let data = this.bookData.slice()
      data = data.filter(filterFunc)
      data.sort(comparator)
      if (reversed == -1) data = data.reverse()
      this.setBooksSortType(this.booksSortType)
      return data
    }
  },
  watch: {
    bookOrganizedData: {
      handler: function (data) {
        this.bookData = data
      }
    }
  },
  beforeMount() {
    this.retrieveBookData()
    const initSortType = this.getBooksSortType() || "AZName"
    this.booksSortType = initSortType
    this.setBooksSortType(initSortType)
  }
}
</script>
  

<style scoped>
.galerie {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.BookGallery {
  padding: 3rem 6rem;
}

h2 {
  padding: 0 6rem;
  width: 50vw;
}

.options {
  float: right;
  width: 25rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  font-size: 1.1rem;
}

.tri {
  display: flex;
  flex-direction: column;
  text-align: left;
}

input {
  width: 20rem;
  height: 2.2rem;
  margin-right: 1rem;
}

.tri select {
  width: 13rem;
  height: 2.5rem;
}

.tri input {
  width: 11rem;
}

label {
  margin-right: 0;
}

.getMoreBook {
  margin-top: 4rem;
  padding: 1.5rem 5rem;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--accent-color-hover);
  color: var(--text-primary-color);
}

.getMoreBook:hover {
  background-color: var(--accent-color);
  transform: scale(1.03);
}

@media screen and (max-width: 1024px) {
  .BookGallery {
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
  .BookGallery {
    padding: 4rem 1rem;
  }

}</style>
  