<template>
  <div class="credits-card">
    <p class="credits-card-text">Proyecto realizado por:</p>
    <p class="credits-card-name">Miguel Aguilar</p>
    <a
      href="https://github.com/Aquillare/vue-diagram"
      target="_blank"
      rel="noopener noreferrer"
      class="credits-card-link"
    >
      Ver en GitHub
    </a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.credits-card {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
}

.credits-card-text {
  margin: 0 0 5px 0;
  font-size: 0.8rem;
  color: #666;
}

.credits-card-name {
  margin: 0 0 10px 0;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.credits-card-link {
  color: #1976d2;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}

.credits-card-link:hover {
  color: #1565c0;
  text-decoration: underline;
}
</style>
