<template>
    <div class="Book_Infos">
        <h3>{{ infos.title }}</h3>  
        <p class="resume">{{ infos.description  }}</p>
        <p class="date"><strong>Date de publication :</strong> {{ date  }}</p>
        <p><strong>ISBN :</strong> {{ infos.industryIdentifiers[0].identifier  }}</p>
        
     </div>
  </template>
  
  <script>

  export default {
    name: 'Book_Infos',
    props: {
      infos: {type: Object, required: true},
      // isbn: {type: String, required: true},
      // title: {type: String, required: true},
      // dateFull: {type: String, required: true},
      // description: {type: String, required: true}
    },
    components: {
    },
    data() {
      return {
        date: ''
        }
    },
    methods: {
      findYear(){
        const year = new Date(this.infos.publishedDate)
        this.date = year.getFullYear() 
      }
    },
    created (){
      this.findYear()
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
    height: 88% ;
    width: 85%;
  }
  h3{
    padding: 2rem 0;
    font-size: 2rem;
  }
  p{
    padding: 1rem 0 ;
    font-size: 1.3rem; 
  }
  .resume{
    font-size: 1.5rem; 
    overflow-y: hidden;
    max-height: 50%;
  }

  @media screen and (max-width: 1024px) {

  }

  </style>
  