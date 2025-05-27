import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Login from './components/Login.vue'
import TelaPrincipal from './components/TelaADM.vue'
import FormCategoria from './components/FormCategoria.vue'
import FormUsuario from './components/FormUsuario.vue'
import AdminDashboard from './components/AdminDashboard.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/tela-principal/:msg', component: TelaPrincipal, props: true },
  { path: '/form-categoria/:msg', component: FormCategoria, props: true },
  { path: '/form-usuario/:msg', component: FormUsuario, props: true },
  { path: '/admin', component: AdminDashboard }
]

const router = createRouter({ history: createWebHistory(), routes })

createApp(App).use(router).mount('#app')
