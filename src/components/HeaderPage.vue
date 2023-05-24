<template>
  <header class="HeaderPage">

    <div class="menu">
      <input @change="toggleTheme" id="checkbox" type="checkbox" class="switch-checkbox" />
      <label for="checkbox" class="switch-label">
        <span>🌙</span>
        <span>☀️</span>
        <div class="switch-toggle" :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"></div>
      </label>
      <input type="text" @keydown.enter="emitUserSearch" v-model="search" placeholder="Search a book">
    </div>

    <div class="title">
      <h1>You are searching for a book ?</h1>
      <h2>Here you will find it</h2>
    </div>

  </header>
</template>

<script>
export default {
  name: 'HeaderPage',
  props: ['userSearch', 'activPage'],
  emits: ["update:userSearch", "update:activPage"],
  data() {
    return {
      userTheme: "",
      search: ""
    };
  },
  methods: {
    emitUserSearch() {
      this.$emit("update:userSearch", this.search)
      this.$emit("update:activPage", "Search")
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return (hasDarkPreference) ? "dark-theme" : "light-theme"
    },
    getTheme() {
      return localStorage.getItem("user-theme")
    },
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme")
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme")
      } else {
        this.setTheme("light-theme")
      }
    }
  },
  beforeMount() {
    const initUserTheme = this.getTheme() || this.getMediaPreference()
    this.setTheme(initUserTheme);
  }
}
</script>


<style scoped>
.HeaderPage {
  background: center no-repeat url("../img/background.jpeg");
  background-size: cover;
  margin: 0;
  height: 50vh;
}

.menu {
  background-color: black;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.24);
  color: white;
}

.title h1 {
  font-size: 5.5rem;
  font-weight: bold;
}

.title h2 {
  font-size: 3rem;
}

.menu input {
  width: 15rem;
  height: 50%;
  margin: auto 3rem;
}

.switch-checkbox {
  display: none;
}

.switch-toggle-checked {
  transform: translateX(calc(3rem * 0.6)) !important;
}

.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(3rem* 0.07);
  left: calc(3rem* 0.07);
  height: calc(3rem * 0.4);
  width: calc(3rem * 0.4);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-label {
  width: 3rem;

  border-radius: 3rem;
  border: calc(3rem * 0.025) solid var(--accent-color);
  padding: calc(3rem* 0.1);
  font-size: calc(3rem * 0.3);
  height: calc(3rem * 0.35);

  align-items: center;
  background: var(--text-primary-color);
  cursor: pointer;
  display: flex;
  position: relative;
  transition: background-color 0.5s ease;
  justify-content: space-between;
  z-index: 1;
}


@media screen and (max-width: 1024px) {
  .title h1 {
    font-size: 4rem;
  }

  .title h2 {
    font-size: 2.5rem;
  }
}

@media screen and (max-width: 768px) {
  .HeaderPage {
    height: 80vh;
  }

  .title h1 {
    font-size: 3rem;
  }

  .title h2 {
    font-size: 1.8rem;
  }

  .menu input {
    width: 16rem;
    margin: auto 1.5rem;
  }
}
</style>
  