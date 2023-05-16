<template>
  <section class="BookInfos">

    <h3>{{ title }}</h3>
    <p class="resume">{{ description }}</p>
    <p class="date"><strong>Published date :</strong> {{ date }}</p>
    <p><strong>ISBN :</strong> {{ isbn }}</p>

  </section>
</template>


<script>
export default {
  name: 'BookInfos',
  props: {
    isbn: {type: String},
    title: {type: String, required: true},
    date: { type: Number},
    description: {type: String, required: true}
  }
}
</script>


<style scoped>
.BookInfos {
  position: absolute;
  top: 0;
  display: flex;
  background-color: var(--background-color-secondary);
  margin: auto;
  padding: 2.4rem 1.6rem;
  flex-direction: column;
  height: 88%;
  width: 85%;
}

h3 {
  padding: 1.2rem 0;
  font-size: 1.6rem;
}

p {
  padding: 1rem 0;
  font-size: 1rem;
}

.resume {
  font-size: 1.2rem;
  overflow-y: hidden;
  max-height: 50%;
}</style>
