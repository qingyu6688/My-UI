import { createApp } from 'vue'
import App from './App.vue'
import MyUI from '../packages/my-ui'
import './styles/app.css'

createApp(App).use(MyUI).mount('#app')

