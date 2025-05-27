<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="formOn">
      <form @submit.prevent="this.gravar()">
        <label for="idusu">Id</label>
        <input type="text" id="idusu" v-model="id" placeholder="ID do Usuário..">

        <label for="name">Nome</label>
        <input type="text" id="name" v-model="nome" placeholder="Nome do Usuário..">

        <label for="senha">Senha</label>
        <input type="password" id="senha" v-model="senha" placeholder="Senha ..">

        <label for="nivel">Nível de Acesso</label>
        <select id="nivel" v-model="nivel">
          <option value="1">Administrador</option>
          <option value="2">Vendedor/Comprador</option>
        </select>

        <input type="submit" value="Confirmar">
      </form>
    </div>

    <div style="display: flex; justify-content: flex-end;">
      <button @click="this.mostrarForm(true)">Novo Usuário</button>
    </div>

    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th @click="ordenarNome()">Nome</th>
            <th>Senha</th>
            <th>Nível</th>
            <th colspan="2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usu in usuarios" :key="usu.id">
            <td>{{ usu.id }}</td>
            <td>{{ usu.nome }}</td>
            <td>{{ usu.senha }}</td>
            <td>{{ usu.nivel }}</td>
            <td><button @click="alterar(usu.id)">Alterar</button></td>
            <td><button @click="apagar(usu.id)">Apagar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormUsuario',
  props: { msg: String },
  data() {
    return {
      id: 0, nome: "", senha: "", nivel: "vendedor", formOn: false,
      usuarios: []
    }
  },
  methods: {
    mostrarForm(flag) {
      this.formOn = flag;
    },
    gravar() {
      const url = 'http://localhost:8080/apis/usuario';
      const data = { id: this.id, nome: this.nome, senha: this.senha, nivel: this.nivel };
      axios.post(url, data)
        .then(() => this.carregarDados())
        .catch(error => alert('Erro: ' + error));
      this.formOn = false;
    },
    apagar(id) {
      axios.delete(`http://localhost:8080/apis/usuario/${id}`)
        .then(() => this.carregarDados())
        .catch(error => alert(error));
    },
    alterar(id) {
      this.formOn = true;
      axios.get(`http://localhost:8080/apis/usuario/${id}`)
        .then(result => {
          const u = result.data;
          this.id = u.id;
          this.nome = u.nome;
          this.senha = u.senha;
          this.nivel = u.nivel;
        })
        .catch(error => alert(error));
    },
    carregarDados() {
      axios.get("http://localhost:8080/apis/usuario")
        .then(result => this.usuarios = result.data)
        .catch(error => alert(error));
    },
    ordenarNome() {
      this.usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
    }
  },
  mounted() {
    this.carregarDados();
  }
}
</script>

<style scoped>
input[type=text], input[type=password], select {
  width: 100%; padding: 12px 20px; margin: 8px 0;
  border: 1px solid #ccc; border-radius: 4px;
  box-sizing: border-box;
}
input[type=submit] {
  width: 100%; background-color: #4CAF50; color: white;
  padding: 14px 20px; margin: 8px 0; border: none;
  border-radius: 4px; cursor: pointer;
}
input[type=submit]:hover {
  background-color: #45a049;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse; width: 100%;
}
#customers td, #customers th {
  border: 1px solid #ddd; padding: 8px;
}
#customers tr:nth-child(even) { background-color: #f2f2f2; }
#customers tr:hover { background-color: #ddd; }
#customers th {
  background-color: blueviolet; color: white;
  padding: 12px; text-align: left;
}
</style>
