import { createApp } from 'vue'
import '@/styles/index.less'
import '@/styles/normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
