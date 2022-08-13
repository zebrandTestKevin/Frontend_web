import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Accounts from '../views/homeAdmin/Accounts'
import Products from '../views/homeAdmin/Products'
import Data from '../views/home/Data'
import HomeAdmin from '../views/HomeAdmin.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        //routes for the viws of the admin users 
        path: '/homeAdmin',
        redirect: '/homeAdmin/accounts',
        name: 'Administracion',
        component: HomeAdmin,
        children: [
            {
                path: 'accounts',
                name: 'Administrar Cuentas',
                component: Accounts,
            },
            {
                path: 'products',
                name: 'Administrar Productos',
                component: Products,
            },
            {path: '*', redirect: '/home/data'}//path that for the redirection in case of a bad petition
        ]
    },
    {
        //routes for the views of the normal ussers
        path: '/home',
        redirect: '/home/accounts',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'data',
                name: 'Catalogo de Productos',
                component: Data,
            },
            {path: '*', redirect: '/home/data'}//path that for the redirection in case of a bad petition

        ]
    },
    {path: '*', redirect: '/home/data'}//path that for the redirection in case of a bad petition
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
