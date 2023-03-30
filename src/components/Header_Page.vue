<template>
    <div class="Header_Page">
       <div class="menu">
        <input @change="toggleTheme" id="checkbox" type="checkbox"  class="switch-checkbox" />
        <label for="checkbox" class="switch-label">
          <span>🌙</span>
          <span>☀️</span>
          <div class="switch-toggle"
            :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
          ></div>
        </label>
        <input type="text" v-model="search" placeholder="Nom d'un livre">
       </div>

        <div class="title">
            <h1>Tu cherches un livre à lire ?</h1>
            <h2>Ici tu vas le trouver</h2>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header_Page',
    data() {
      return {
        userTheme: "light-theme",
      };
    },
    methods: {
      setTheme(theme) {
        localStorage.setItem("user-theme", theme);
        this.userTheme = theme;
        document.documentElement.className = theme;
      },
      toggleTheme() {
        const activeTheme = localStorage.getItem("user-theme");
        if (activeTheme === "light-theme") {
          this.setTheme("dark-theme");
        } else {
          this.setTheme("light-theme");
        }
        console.log(this.userTheme)
      }, 
      getMediaPreference() {
        const hasDarkPreference = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (hasDarkPreference) {
          return "dark-theme";
        } else {
          return "light-theme";
        }
      },
      getTheme() {
        return localStorage.getItem("user-theme");
      }
    },
    mounted() {
      const initUserTheme = this.getTheme() || this.getMediaPreference();
      this.setTheme(initUserTheme);
      console.log(initUserTheme)
    }

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>





.Header_Page{
  background: center no-repeat url("../img/images.jpeg");
  background-size: cover;
  margin: 0;
  height: 50vh;
}
.menu{
  background-color: black;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.24);
  color: white;
}
.title  h1{
  font-size: 7rem;
  font-weight: bold;
}
.title h2{
  font-size: 4rem;
}
.menu input{
  width: 16rem;
  height: 50%;
  margin: auto 3rem;
}
.switch-checkbox {
  display: none;
}
.switch-toggle-checked {
  transform: translateX(calc(4rem * 0.6)) !important;
}
.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(4rem* 0.07);
  left: calc(4rem* 0.07);
  height: calc(4rem * 0.4);
  width: calc(4rem * 0.4);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-label {
  width: 4rem; 

  border-radius: 4rem;
  border: calc(4rem * 0.025) solid var(--accent-color);
  padding: calc(4rem* 0.1);
  font-size: calc(4rem * 0.3);
  height: calc(4rem * 0.35);

  align-items: center;
  background: var(--text-primary-color);
  cursor: pointer;
  display: flex;
  position: relative;
  transition: background-color 0.5s ease;
  justify-content: space-between;
  z-index: 1;
} 

@media screen and (max-width: 768px) {
  .Header_Page{
    height: 20vh;
  }
  .title  h1{
    font-size: 3rem;
  }
  .title h2{
    font-size: 1.8rem;
  }
}

  </style>
  