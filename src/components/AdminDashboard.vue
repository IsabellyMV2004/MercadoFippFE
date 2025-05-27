<template>
  <div>
    <h1>Painel Administrativo</h1>

    <h2>Usuários</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Nome</th><th>Nível</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in usuarios" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.nome }}</td>
          <td>{{ u.nivel }}</td>
          <td><button @click="apagarUsuario(u.id)">Excluir</button></td>
        </tr>
      </tbody>
    </table>

    <h2>Anúncios</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Título</th><th>Categoria</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in anuncios" :key="a.id">
          <td>{{ a.id }}</td>
          <td>{{ a.titulo }}</td>
          <td>{{ a.data }}</td>
          <td>{{ a.descricao }}</td>
          <td>{{ a.categoria.nome }}</td>
          <td><button @click="apagarAnuncio(a.id)">Excluir</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      usuarios: [],
      anuncios: []
    }
  },
  methods: {
    carregarDados() {
      axios.get('http://localhost:8080/apis/usuario')
        .then(resp => this.usuarios = resp.data)
        .catch(err => alert(err));
      axios.get('http://localhost:8080/apis/anuncio')
        .then(resp => this.anuncios = resp.data)
        .catch(err => alert(err));
    },
    apagarUsuario(id) {
      axios.delete(`http://localhost:8080/apis/usuario/${id}`)
        .then(() => this.carregarDados())
        .catch(err => alert(err));
    },
    apagarAnuncio(id) {
      axios.delete(`http://localhost:8080/apis/anuncio/${id}`)
        .then(() => this.carregarDados())
        .catch(err => alert(err));
    }
  },
  mounted() {
    this.carregarDados();
  }
}
</script>

<style scoped>
table {
  width: 100%; border-collapse: collapse; margin-bottom: 20px;
}
th, td {
  border: 1px solid #ccc; padding: 8px; text-align: left;
}
th {
  background-color: #333; color: white;
}
button {
  background-color: red; color: white;
  border: none; padding: 6px 10px;
  cursor: pointer; border-radius: 4px;
}
</style>
