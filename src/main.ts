import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { filters, utils } from './utils/globalFunctions'

const app = createApp(App)
// import GlobalComponent from './views/note/Component/GlobalComponent.vue'
// app.component('GlobalComponent',GlobalComponent).mount('#app')

// 注册全局过滤器
app.config.globalProperties.$filters = filters

// 注册全局工具函数
app.config.globalProperties.$utils = utils

// 注册全局变量
app.config.globalProperties.$appName = 'Vue 3 Demo'
app.config.globalProperties.$version = '1.0.0'
app.config.globalProperties.$env = import.meta.env.MODE as 'development' | 'production'

app.use(createPinia())
app.use(router)

app.mount('#app')
