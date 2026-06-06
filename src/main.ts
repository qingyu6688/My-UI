import { createApp } from 'vue'
import App from './App.vue'
import MyUI from '../packages/my-ui/index'
import { router } from './router'
import './styles/app.css'

createApp(App).use(router).use(MyUI).mount('#app')
