<template>
    <div class="Book_Search">

      <div class="options">
        <input type="text" v-model="bookSearch" placeholder="Chercher un livre">
        <div class="tri">
          <label for="book_sort">Trier par </label>
          <select v-model="booksSortType" id="book_sort">
              <option value="AZName">Noms de A à Z</option>
              <option value="ZAName">Noms de Z à A</option>
              <option value="AZAuthors">Auteurs de A à Z</option>
              <option value="ZAAuthors">Auteurs de Z à A</option>
              <option value="topStars">Le mieux noté</option>
              <option value="lessStrars">Le moins bien noté</option>
          </select>
        </div>
      </div>

        <h2>Votre recherche : {{ name }}</h2> 
        
        <div v-if="bookData" class="galerie">
            <Book_Card v-for="(item) in bookOrganizedData" :key="item.id" :infos="item.volumeInfo" :authors="item.volumeInfo.authors" :title="item.volumeInfo.title" :image-links="item.volumeInfo.imageLinks"></Book_Card >
        </div>
    </div>
    
</template>
  
  <script>
import Book_Card from './Book_Card.vue'
import { getBooksForUser } from '@/api/getBooksData.js'

  export default {
    name: 'Book_Search',
    props: {
      name: {type: String, required: true},
      userSearch: {type: String, required: true}
    },
    components: {
        Book_Card
    },
    data() {
      return {
        bookData: [],
        booksSortType: "AZName",
        bookSearch : ""
        }
    },

    methods: {
        async retrieveBookData() {
            if (this.userSearch && this.userSearch !== ""){
                this.bookData = await getBooksForUser(this.userSearch)
                console.log(this.bookData)
            }
        }
    },

    computed:{
      bookOrganizedData: function() {
          const reversed = ["ZAName", "ZAAuthors"].includes(this.booksSortType) ? -1 : 1
          const  comparator = (a,b)=> {
            if (["AZName", "ZAName"].includes(this.booksSortType)){
                return a.volumeInfo["authors"][0].localeCompare(b.volumeInfo["authors"][0]) 
            }
            else {
                return a.volumeInfo["title"].localeCompare(b.volumeInfo["title"]) 
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
         },
        userSearch() {
            this.retrieveBookData()
        }
    },

    mounted(){
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
.Book_Search{
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

@media screen and (max-width: 1024px) {
  .Book_Search{
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
  .Book_Search{
    padding: 4rem 1rem;
  }

}

  </style>
  