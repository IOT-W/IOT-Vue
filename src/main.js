import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import element from 'element-plus'//饿了么组件
import 'element-plus/theme-chalk/index.css'//饿了么组件样式引用
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(element).use(store).use(router).mount('#app')

//添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        if (window.sessionStorage["token"]) {
            config.headers.Authorization = window.sessionStorage["token"];
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
