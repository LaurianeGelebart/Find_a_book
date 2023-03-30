<template>
    <div class="Book_Carrousel">
        <h2>{{ name }}</h2>  
        <div v-if="bookData.items"  class="content_carrousel">
          <img v-on:click="back" class="arrow" id="back" src="../img/back.svg">
          <ul class="carrousel">
            <Book_Card class="card" v-for="(item) in bookData.items" :key="item.id" :infos="item.volumeInfo" :authors="item.volumeInfo.authors" :title="item.volumeInfo.title" :image-links="item.volumeInfo.imageLinks"></Book_Card >
          </ul>
          <img v-on:click="forward" class="arrow" id="forward" src="../img/forward.svg">
        </div>
     </div>
  </template>
  
  <script>
import Book_Card from './Book_Card.vue'
import { getBooks } from '../api/getBooksData.js'

  export default {
    name: 'Book_Carrousel',
    props: {
      name: {type: String, required: true}
    },
    components: {
        Book_Card
    },
    data() {
      return {
        bookData: [], 
        position:0, 
        tx : 0
        }
    },
    methods: {
        async retrieveBookData() {
          this.bookData = await getBooks()
        }, 
        forward(){
          this.position = this.position-40 
          this.tx = this.position+"vw"
        },
        back(){
          this.position = this.position+40 
          this.tx = this.position+"vw"
        }
    },
    beforeMount(){
      this.retrieveBookData()
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .Book_Carrousel{
    padding: 4rem 7rem;
    margin: 5vh 0;
  }
.carrousel{
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: hidden;
}

.content_carrousel{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.arrow{
  height: 4rem;
  transition: 0.2s ease-out;
}
.arrow:hover{
  height: 5rem;
}
h2{
  padding: 0 7rem;
}
.carrousel .card{
  transition: 0.3s ease-out;
  transform: translateX(v-bind(tx));
}

  </style>
  