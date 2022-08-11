import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Accounts from '../views/home/Accounts'
import Data from '../views/home/Data'
import Hospitals from '../views/home/Hospitals'
import Drugstores from '../views/home/DrugStores'
import Shelters from '../views/home/Shelters'
import News from '../views/home/News'
// import {tokenLib} from '../lib/token.lib'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        redirect: '/home/accounts',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'accounts',
                name: 'Administrar Cuentas',
                component: Accounts,
            },
            {
                path: 'data',
                name: 'Administrar Datos',
                component: Data,
            },
            {
                path: 'hospitals',
                name: 'Gestionar Hospitales',
                component: Hospitals,
            },
            {
                path: 'drugstores',
                name: 'Gestionar Farmacias',
                component: Drugstores,
            },
            {
                path: 'shelters',
                name: 'Gestionar Albergues',
                component: Shelters,
            },
            {
                path: 'news',
                name: 'Administrar Noticias',
                component: News,
            },
            {path: '*', redirect: '/home/accounts'}

        ]
    },
    {path: '*', redirect: '/home/data'}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// router.beforeEach((to, _, next) => {
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const token = tokenLib.getToken()

//     if (authRequired && !token) {
//         return next('/login');
//     } else if (token && !authRequired) {
//         return next("/home")
//     } else {
//         next();
//     }
// })

export default router
