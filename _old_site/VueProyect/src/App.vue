<template>
  <header>
    <div class="wrapper">
      <h1>Mis Proyectos</h1>
    </div>
  </header>

  <main>
    <div v-if="proyectos.length === 0">Cargando proyectos...</div>
    <div v-else>
      <div v-for="proyecto in proyectos" :key="proyecto.id" class="proyecto">
        <h2>{{ proyecto.titulo }}</h2>
        <p>{{ proyecto.descripcion }}</p>
        <img :src="proyecto.url_imagen" alt="Imagen del proyecto" width="150">
        <a :href="proyecto.url_web" target="_blank">Ver más</a>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      proyectos: []
    }
  },
  created() {
    axios.get('http://localhost/api_porfolio/proyectos.php')
      .then(res => {
        this.proyectos = res.data;
      })
      .catch(err => {
        console.error("Error cargando proyectos:", err);
      });
  }
}
</script>

<style>
.proyecto {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
