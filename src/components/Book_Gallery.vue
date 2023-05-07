<template>
    <div class="Book_Gallery">

      <div class="options">
        <input type="text" v-model="bookSearch" placeholder="Search a book">
        <div class="tri">
          <label for="book_sort">Sort by</label>
          <select v-model="booksSortType" id="book_sort">
              <option value="AZName">Names from A to Z</option>
              <option value="ZAName">Names from Z to A</option>
              <option value="AZAuthors">Authors from A to Z</option>
              <option value="ZAAuthors">Authors from Z to A</option>
              <option value="topStars">Top rated</option>
              <option value="lessStrars">Lowest rated</option>
          </select>
        </div>
      </div>

        <h2>{{ name }}</h2> 
        
        <div v-if="bookData" class="galerie">
          <Book_Card v-for="(item) in bookOrganizedData" :key="item.volumeInfo.industryIdentifiers[0].identifier" :infos="item.volumeInfo" :authors="item.volumeInfo.authors" :title="item.volumeInfo.title" :image-links="item.volumeInfo.imageLinks"></Book_Card >
        </div>
        <button v-on:click="() => getMoreBook()" class="getMoreBook">Voir plus</button>
    </div>
    
</template>
  
  <script>
import Book_Card from './Book_Card.vue'
import { getBookBySubject } from '@/api/getBooksData.js'

  export default {
    name: 'Book_Gallery',
    props: {
      name: {type: String, required: true},
      category: {type: String, required: true}
    },
    components: {
        Book_Card
    },
    data() {
      return {
        bookData: [],
        booksSortType: "AZName",
        bookSearch : "", 
        startIndex : 0
        }
    },
    methods: {
        async retrieveBookData() {
          this.bookData = await getBookBySubject(this.category, this.startIndex)
        },
        async getMoreBook(){
          this.startIndex += 40
          const newBooks = await getBookBySubject(this.category, this.startIndex)
          this.bookData = [...this.bookData, ...newBooks]
          this.bookOrganizedData()
        }
    },
    computed:{
      bookOrganizedData: function() {
          const reversed = ["ZAName", "ZAAuthors"].includes(this.booksSortType) ? -1 : 1
          const  comparator = (a,b)=> {
            if (["AZName", "ZAName"].includes(this.booksSortType)){
                return a.volumeInfo["authors"][0].localeCompare(b.volumeInfo["authors"][0]) 
            }
           else if(["AZAuthors", "ZAAuthors"].includes(this.booksSortType)){
              return a.volumeInfo["title"].localeCompare(b.volumeInfo["title"]) 
            }
            else {
              const ratingA = a.volumeInfo["averageRating"] || 0;
              const ratingB = b.volumeInfo["averageRating"] || 0;
              if(["topStars"].includes(this.booksSortType)) return ratingA - ratingB;
              return ratingB - ratingA;
            }
          } 
          const filterFunc = (a) => a.volumeInfo["title"].toLowerCase().includes(this.bookSearch.toLowerCase())
          let data = this.bookData.slice()
          data = data.filter(filterFunc)
          data.sort(comparator)
          if (reversed) data = data.reverse()
          return data
        }
    },
    watch: {
      bookOrganizedData : {
        handler: function (data) {
          this.bookData = data
        }
      }
    },
    beforeMount(){
      this.retrieveBookData()
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.galerie{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.Book_Gallery{
  padding: 4rem 8rem;
}
h2{
  padding: 0 8rem; 
  width: 50vw;
}
.options{
  float : right;
  width: 30rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  font-size: 1.3rem;
}
.tri{
  display: flex;
  flex-direction: column;
  text-align: left;
}
input{
  width: 22rem;
  height: 2.5rem;
  margin-right: 1rem;
}
.tri select{
  width: 13rem;
  height: 2.5rem;
}
.tri input{
  width: 13rem;
}
label{
  margin-right: 0;
}
.getMoreBook{
  margin-top: 4rem;
  padding: 1.5rem 6rem;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--accent-color-hover);
  color: var(--text-primary-color);
}
.getMoreBook:hover{
  background-color: var(--accent-color);
  transform: scale(1.03);
}

@media screen and (max-width: 1024px) {
  .Book_Gallery{
    padding: 4rem;
  }
  h2{
    padding: 0 ; 
  }
  .options{
    flex-direction: column;
  }
  input{
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .tri{
    flex-direction: row;
  }
  label{
    margin-right: 1rem;
  }
}

@media screen and (max-width: 768px) {
  .Book_Gallery{
    padding: 4rem 1rem;
  }

}

  </style>
  