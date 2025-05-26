<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TelaPrincipal',
  props: {
    msg: String
  },
  data(){
    return {id:0, titulo:"",formOn:false, 
    anuncios:[]}
  },
  methods:{
    mostrarForm(flag)
    {
      this.formOn=flag;
    },
    carregarDados(){
      axios.get("http://localhost:8080/apis/anuncio")
      .then(result=>{
        this.anuncios=result.data
      })
      .catch(error=>{alert(error)})
    },
    ordenarNome(){
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