<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div v-if="formOn"> 
        
        <form @submit.prevent="this.gravar()">
          <label for="idAnuncio">Id</label>
          <input type="text" id="idAnuncio" v-model="id" placeholder="ID da anuncio..">
          <label for="name">Titulo</label>
          <input type="text" id="titulo" v-model="titulo" placeholder="Titulo do anuncio..">
          <input type="submit" value="Cadastrar">

          <input type="text" id="descricao" v-model="descricao" placeholder="Descrição do anuncio..">
          <input type="submit" value="Cadastrar">
          <input type="number" id="preco" v-model="preco" placeholder="Preço do anuncio..">
          <input type="submit" value="Cadastrar">
        </form>
      </div>
      <div style="display: flex; justify-content: flex-end;">
        <button @click="this.mostrarForm(true)">Novo anuncio</button>
      </div>
      <div>
        <table id="customers">
          <thead>
            <tr>
              <th>Id</th>
              <th  @click="ordenarTitulo()">Titulo</th>
              <th colspan="2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="anu in this.anuncios.slice(0,5)">
              <td>{{anu.id}}</td>
              <td>{{anu.titulo}}</td>
              <td><button @click="this.alterar(anu.id)">Alterar</button></td>
              <td><button @click="this.apagar(anu.id)">Apagar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Formanuncio',
    props: {
      msg: String
    },
    data(){
      return {id:0, titulo:"",data:"",descricao:"",preco:0,categoria:{},usuario:{},formOn:false, 
      anuncios:[]}
    },
    methods:{
      mostrarForm(flag)
      {
        this.formOn=flag;
      },
      gravar(){
        const url = 'http://localhost:8080/apis/anuncio';
        const data = { id:this.id,  titulo: this.titulo};
        this.titulo="";
        axios.post(url, data)
        .then(response => {
          this.carregarDados();
        })
        .anuch(error => {
          alert('Erro:', error);
        });
        this.mostrarForm(false);
      },
      apagar(id){
        alert('Apagando '+id);
        axios.delete("http://localhost:8080/apis/anuncio/"+id)
        .then(result=>{
          this.carregarDados()})
        .anuch(error=>{alert(error)})
      },
      alterar(id){
        alert('Alterando '+id);
        this.formOn=true;
        axios.get("http://localhost:8080/apis/anuncio/"+id)
        .then(result=>{
          const anuncio=result.data;
          this.id=anuncio.id;
          this.titulo=anuncio.titulo;
        })
        .anuch(error=>{alert(error)})
      },
      carregarDados(){
        axios.get("http://localhost:8080/apis/anuncio")
        .then(result=>{
          this.anuncios=result.data
        })
        .anuch(error=>{alert(error)})
      },
      ordenarTitulo(){
        this.anuncios.sort((a,b)=>a.titulo.localeCompare(b.titulo));
      }
    },
    mounted(){
      this.carregarDados();
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>