<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="nome" type="text" placeholder="Usuário" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="erro" class="erro">{{ erro }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      nome: '',
      senha: '',
      erro: ''
    }
  },
  methods: {
    login() {
      axios.get('http://localhost:8080/apis/usuario')
        .then(resp => {
          const usuarios = resp.data;
          const usuario = usuarios.find(u => u.nome === this.nome && u.senha === this.senha);
          if (usuario) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            this.$router.push('/tela-principal/' + usuario.nome);
          } else {
            this.erro = 'Usuário ou senha inválidos.';
          }
        })
        .catch(() => this.erro = 'Erro ao conectar ao servidor.');
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px; margin: auto;
  padding: 20px; border: 1px solid #ccc;
  border-radius: 10px; margin-top: 100px;
}
input {
  width: 100%; padding: 10px; margin-bottom: 10px;
}
button {
  width: 100%; padding: 10px; background: #4CAF50; color: white;
  border: none; border-radius: 5px;
}
.erro {
  color: red;
  margin-top: 10px;
}
</style>
