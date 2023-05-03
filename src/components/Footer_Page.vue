<template>
    <footer class="Footer_Page">
        <p>2023 | &copy;Lauriane Gélébart | Ingénieure IMAC </p>
        <div class="footer-links">
          <a href="https://fr.linkedin.com/in/lauriane-g%C3%A9l%C3%A9bart-b5893b1a2" target="_blank">LinkedIn</a>
          <a href="https://github.com/LaurianeGelebart" target="_blank">GitHub</a>
          <a href="https://laurianegelebart.fr/" target="_blank">Portfolio</a>
        </div>
      </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer_Page'
  }
  </script>
  
  <style scoped>
.Footer_Page{
    background-color: var(--accent-color);
    color: var(--text-primary-color);
    margin-top: 10vh;
    height: 8vh;
    padding: 0 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.footer-links a {
    color: var(--text-primary-color);
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 500;
    margin-right: 1rem;
    transition: all 0.3s ease;
  }
  .footer-links a:hover {
    color: var(--background-color-primary);

  }

  </style>
