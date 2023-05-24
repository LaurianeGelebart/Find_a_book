<template>
  <nav id="NavbarPage">

    <div class="navbarHeader">
      <button type="button" class="navbarToggle" @click="toggleNav">
        <span :class="{ 'open': isOpen }"></span>
        <span :class="{ 'open': isOpen }"></span>
        <span :class="{ 'open': isOpen }"></span>
      </button>
    </div>

    <div class="navbarCollapse" :class="{ 'in': isOpen }">
      <button v-on:click="() => isActiv('Home')">Home</button>
      <button v-for="(category) in categories" :key="category" v-on:click="() => isActiv(category)">{{ category
      }}</button>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'NavbarPage',
  props: {
    activPage: { type: String, required: true },
    categories: { type: Object, required: true }
  },
  emits: ["update:activPage"],
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen;
    },
    isActiv(page) {
      this.isOpen = false;
      this.$emit("update:activPage", page)
    }
  }
}
</script>

<style scoped>
nav {
  background-color: var(--accent-color);
  height: auto;
}

.navbarHeader {
  display: none;
}

.navbarCollapse {
  background-color: var(--accent-color);
  height: 5rem;
  padding-bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.navbarCollapse button {
  width: 10rem;
  height: 100%;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary-color);
}

.navbarCollapse button:hover {
  border-bottom: 7px solid var(--accent-color-hover);
}


@media screen and (max-width: 1024px) {
  .navbarHeader {
    display: block;
    display: flex;
    justify-content: end;
  }

  .navbarToggle {
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0.5rem 2rem;
    cursor: pointer;
  }

  .navbarToggle span {
    background-color: black;
    display: block;
    height: 0.3rem;
    width: 3rem;
    margin: 0.8rem auto;
    transition: all 0.3s ease;
  }

  .navbarToggle span.open:nth-child(1) {
    transform: translateY(1rem) rotate(45deg);
  }

  .navbarToggle span.open:nth-child(2) {
    opacity: 0;
  }

  .navbarToggle span.open:nth-child(3) {
    transform: translateY(-1.2rem) rotate(-45deg);
  }

  .navbarCollapse {
    height: auto;
    max-height: 0;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .navbarCollapse.in {
    max-height: 500px;
    padding-bottom: 3rem;
  }

  .navbarCollapse button {
    width: 100%;
    height: 3rem;
    font-size: 1.6rem;
  }

  .navbarCollapse button:hover {
    border-bottom: none;
    background-color: var(--accent-color-hover);
  }
}
</style>
