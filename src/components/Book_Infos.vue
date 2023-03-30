<template>
    <div class="Book_Infos">
        <h3>{{ infos.title }}</h3>  
        <p>{{ infos.description  }}</p>
        
     </div>
  </template>
  
  <script>
import { getBooks } from '../api/getBooksData.js'

  export default {
    name: 'Book_Infos',
    props: {
      infos: {type: Object, required: true}
    },
    components: {
    },
    data() {
      return {
        bookData: []
        }
    },
    methods: {
        async retrieveBookData() {
          this.bookData = await getBooks()
        }, 
        forward(){
          
        }
    },
    beforeMount(){
      this.retrieveBookData()
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .Book_Infos{
    position: absolute;
    top: 0;
    display: flex;
    background-color: var(--background-color-secondary);
    margin: auto;
    padding: 3rem 2rem;
    flex-direction: column;
    height: 89% ;
    width: 100%;
  }
h3{
  padding: 2rem 0;
  font-size: 1.8rem;
}
p{
  font-size: 1.5rem; 
  overflow-y: hidden;
}

  </style>
  