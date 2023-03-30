<template>
    <div class="Book_Gallery">
      <div class="options">
          <label for="book_sort">Trier par : </label>
          <select v-model="booksSortType" id="book_sort">
            <option value="AZName">Noms de A à Z</option>
            <option value="ZAName">Noms de Z à A</option>
          </select>
      </div>

        <h2>{{ name }}</h2> 
        
        <div v-if="bookData.items" class="galerie">
            <Book_Card v-for="(item) in bookData.items" :key="item.id" :infos="item.volumeInfo" :authors="item.volumeInfo.authors" :title="item.volumeInfo.title" :image-links="item.volumeInfo.imageLinks"></Book_Card >
        </div>
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
        search: "",
        booksSortType: "AZName"
        }
    },
    methods: {
        async retrieveBookData() {
          this.bookData = await getBookBySubject(this.category)
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
}
.Book_Gallery{
  padding: 2vw 5vw;
}
h2{
  padding: 0 5vw;
  width: 50vw;
}
.options{
  float : right;
  width: 10vw;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 0.7vw;
}
.options select{
  width: 8vw;
  height: 3vh;
}
input{
  width: 8vw;
  height: 3vh;
}

  </style>
  