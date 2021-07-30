import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import './assets/font/iconfont.css'
import './assets/font/iconfont'
import router from './router'

const app = createApp(App).use(router)
installElementPlus(app)
app.mount('#app')