import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.css'
import App from './App.vue'
import mitt from "mitt";


const pinia = createPinia()
const emitter = mitt();
const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)

app.provide('emitter', emitter);

app.mount('#app')



