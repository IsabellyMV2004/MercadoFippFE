<template>
  <div class="principal">
    <h2>Bem-vindo, {{ usuario.nome }}!</h2>
    <p>Nível de acesso: {{ usuario.nivel }}</p>

    <router-link to="/form-categoria/Categorias">
      <button>Manutenção de Categorias</button>
    </router-link>

    <router-link to="/form-usuario/Usuario">
      <button v-if="usuario.nivel === '2'">Cadastro de Usuários</button>
    </router-link>

    <router-link to="/admin">
      <button v-if="usuario.nivel === '1'">Painel Administrativo</button>
    </router-link>

    <router-link to="/">
      <button @click="logout">Sair</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TelaPrincipal',
  props: ['msg'],
  data() {
    return {
      usuario: { nome: '', nivel: '' }
    }
  },
  mounted() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario) {
      this.$router.push('/');
    } else {
      this.usuario = usuario;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usuarioLogado');
    }
  }
}
</script>

<style scoped>
button {
  display: block; margin: 10px; padding: 10px;
}
</style>
