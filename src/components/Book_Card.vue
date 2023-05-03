<template>
    <div v-if="infos.imageLinks" class="Book_Card" @mouseover="vue_info = true" @mouseleave="vue_info = false" >
      <img  class="couverture" :src="infos.imageLinks.smallThumbnail" > 
      <div class="infos">
        <h3>{{ title }}</h3>  
        <p>{{ authors[0] }}</p>
        <div class="stars"><div><img src="stars.png"> </div></div>
      </div>
      <transition name="slide-fade">
          <!-- <Book_Infos :description="description" :dateFull="dateFull" :isbn="isbn" :title="title" v-if="vue_info" :infos="infos"></Book_Infos > -->
          <Book_Infos v-if="vue_info" :infos="infos"></Book_Infos >
      </transition>
    </div>
    
  </template>
  
  <script>
import Book_Infos from './Book_Infos.vue'

  export default {
    name: 'Book_Card',
    props: {
      authors: {type: Object, required: true},
      infos: {type: Object, required: true},
      title: {type: String, required: true},
      imageLinks: {type: Object},
      // isbn: {type: String, required: true},
      // dateFull: {type: String, required: true},
      // description: {type: String, required: true}
      averageRating: {type: Number}
    },
    components: {
      Book_Infos
    },
    data() {
      return {
        vue_info : false, 
        stars : 0
        }
    },
    methods: {
        getStars(){
            if(isNaN(this.infos.averageRating)) this.stars = 0 
            else this.stars = this.infos.averageRating/5*100 +"%"
        }
    },
    beforeMount(){
      this.getStars()
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .Book_Card {
    background-color: var(--background-color-secondary);
    width: 25rem;
    height: 50rem;
    margin: 3rem ; 
    text-align: left;
    position: relative;
    transition: 0.3s ease-out;
  }
  .Book_Card:hover{
    box-shadow: 0 0 30px  rgba(172, 172, 172, 0.555);
    transform: translateY(-10px);
  }
  h3 {
    font-size: 1.5rem;
    margin: 1vw 0 0.3vw ;
    max-height: 6rem;
    overflow-y: hidden;
  }
  .couverture {
    width: 100%;
    max-height: 65%;
    overflow-y: hidden;
  }
  .infos{
    margin: 1rem 2rem ;
  }
  p{
    font-size: 1.5rem;
  }
  .stars{
    height: 3.2rem;
    width: 14rem;
    background-color: rgb(204, 204, 204);
  }  
  .stars div{
    height: 100%;
    width: v-bind(stars);
    background-color: rgb(255, 174, 0);
    margin: 2rem 0;
  }
  .stars img{
    height: 100%;
    width: 14rem ; 
  }
  /* Transition */
  .slide-fade-enter-active {
    transition: all .5s ease-in;
  }
  .slide-fade-leave-active {
    transition: all .3s ease-in;
  }

  @media screen and (max-width: 1024px) {
    .Book_Card {
      width: 17rem;
      height: 35rem;
      margin: 2rem ; 
    }
    .stars{
      height: 2.6rem;
      width: 10rem;
    }  
    .stars div{
      height: 100%;
      width: v-bind(stars);
      margin: 0.5rem 0;
    }
    .stars img{
      height: 100%;
      width: 10rem ; 
    }
  }

  </style>
  