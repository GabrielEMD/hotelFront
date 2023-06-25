import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

import HotelList from '../src/components/HotelList'
import HotelCreate from '../src/components/HotelCreate'
import HotelRoomInsert from '../src/components/HotelRoomInsert'

const routes = [
    {
        path:'/', component: HotelList,
    },{
        path:'/HotelCreate', component: HotelCreate,
    },{
        path:'/HotelRoomInsert', component: HotelRoomInsert,
    }
]

const router = createRouter(
    {
        history: createWebHashHistory(),
        routes,
    }
)

const app = createApp(App)

app.use(router)
app.mount('#app')
