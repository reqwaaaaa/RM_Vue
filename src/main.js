import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Login from "@/components/Login.vue";
import axios from 'axios'
import qs from 'qs'
import Register from "@/components/Register.vue";
import Main from "@/components/Main.vue"
import POI from "@/components/POI.vue"
import PinChe from "@/components/pinxche.vue"
import TodayMenu from "@/web_page/TodayMenu.vue"
import CoverPage from "@/components/CoverPage.vue";




const routes = [
    { path: '/', component: CoverPage }, // 添加默认路径，指向封面页面
    { path: '/0', component: Login },
    { path: '/1',component: Register},
    { path: '/main', component: Main},
    { path: '/pinche', component: PinChe},
    { path: '/poi', component: POI},
    { path: '/todaymenu', component: TodayMenu}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.provide("$axios",axios);
app.provide("$qs",qs);
app.use(router)
app.use(ElementPlus)
app.mount('#app')




