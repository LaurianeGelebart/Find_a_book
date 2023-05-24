<template>
  <section class="BookGallery">

    <div class="options">
      <input type="text" v-model="bookSearch" placeholder="Search a book">
      <div class="tri">
        <label :for="'bookSort' + search">Sort by</label>
        <select v-model="booksSortTypeActive" :id="'bookSort' + search">
          <option v-for="sort in booksSortType" :key="sort.id" :value="sort.value"
            v-bind:selected="booksSortTypeActive === sort.value">{{ sort.name }}</option>
        </select>
      </div>
    </div>

    <h2>{{ name }}</h2>

    <div v-if="bookOrganizedData" class="galerie">
      <BookCard v-for="(item) in bookOrganizedData" :key="item.volumeInfo.industryIdentifiers[0].identifier || ''"
        :infos="item.volumeInfo" :authors="item.volumeInfo.authors" :title="item.volumeInfo.title"
        :image-links="item.volumeInfo.imageLinks" :date="findYear(item.volumeInfo['publishedDate'])"></BookCard>
    </div>
    <button v-on:click="() => getMoreBook()" class="getMoreBook">Voir plus</button>

  </section>
</template>
 

<script>
import BookCard from './BookCard.vue'
import { getBookBySubject } from '@/api/getBooksData.js'
import { getBooksForUser } from '@/api/getBooksData.js'

export default {
  name: 'BookGallery',
  props: {
    name: { type: String, required: true },
    search: { type: String, required: true },
    typeOfSearch: { type: String, required: true }
  },
  components: {
    BookCard
  },
  data() {
    return {
      bookData: [],
      booksSortTypeActive: "AZName",
      bookSearch: "",
      startIndex: 0,
      booksSortType: [{
        value: "AZName",
        name: "Names from A to Z",
        sortFunction: (a, b) => this.sortByName(a, b)
      }, {
        value: "ZAName",
        name: "Names from Z to A",
        sortFunction: (a, b) => this.sortByName(a, b)
      }, {
        value: "newest",
        name: "Newest",
        sortFunction: (a, b) => this.sortByDate(a, b)
      }, {
        value: "oldest",
        name: "Oldest",
        sortFunction: (a, b) => this.sortByDate(a, b)
      }, {
        value: "topStars",
        name: "Top rated",
        sortFunction: (a, b) => this.sortByStars(a, b)
      }, {
        value: "lessStrars",
        name: "Lowest rated",
        sortFunction: (a, b) => this.sortByStars(a, b)
      },
      ],
    }
  },
  methods: {
    async retrieveBookData() {
      if (this.typeOfSearch == "category") this.bookData = await getBookBySubject(this.search, this.startIndex)
      else {
        if (this.search && this.search !== "") {
          this.bookData = await getBooksForUser(this.search, this.startIndex)
        }
      }
    },
    async getMoreBook() {
      this.startIndex += 40
      let newBooks;
      if (this.typeOfSearch == "category") newBooks = await getBookBySubject(this.search, this.startIndex)
      else newBooks = await getBooksForUser(this.search, this.startIndex)
      this.bookData = [...this.bookData, ...newBooks]
    },
    findYear(date) {
      const year = new Date(date)
      return year.getFullYear()
    },
    sortByName(a, b) {
      const titleA = a.volumeInfo["title"] || ""
      const titleB = b.volumeInfo["title"] || ""
      return titleA.localeCompare(titleB)
    },
    sortByDate(a, b) {
      const newA = this.findYear(a.volumeInfo["publishedDate"]) || 0
      const newB = this.findYear(b.volumeInfo["publishedDate"]) || 0
      return (["oldest"].includes(this.booksSortTypeActive)) ? newA - newB : newB - newA
    },
    sortByStars(a, b) {
      const newA = a.volumeInfo["averageRating"] || 0
      const newB = b.volumeInfo["averageRating"] || 0
      return (["oldest"].includes(this.booksSortTypeActive)) ? newA - newB : newB - newA
    }
  },
  computed: {
    bookOrganizedData: function () {
      const reversed = ["ZAName"].includes(this.booksSortTypeActive) ? -1 : 1
      const filterFunc = (a) => a.volumeInfo["title"].toLowerCase().includes(this.bookSearch.toLowerCase())
      const selectedSortType = this.booksSortType.find(
        sort => sort.value === this.booksSortTypeActive
      )
      const sortFunction = selectedSortType ? selectedSortType.sortFunction : null

      let data = this.bookData.slice()
      data = data.filter(filterFunc)
      data.sort(sortFunction)
      if (reversed == -1) data = data.reverse()
      return data
    }
  },
  watch: {
    search() {
      if (this.typeOfSearch == "user") this.retrieveBookData()
    }
  },
  beforeMount() {
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

}
</style>
  